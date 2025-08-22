const API_URL = "http://localhost:5000/api";

// Request cache to prevent duplicate requests
const requestCache = new Map<string, Promise<any>>();

// Get token from localStorage
const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

// Simple fetch wrapper with caching
async function apiCall(endpoint: string, options: any = {}) {
  const token = getToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  // Create cache key for GET requests only
  const cacheKey =
    config.method === "GET" || !config.method
      ? `${endpoint}${JSON.stringify(config)}`
      : null;

  // Return cached promise for GET requests
  if (cacheKey && requestCache.has(cacheKey)) {
    console.log(`🔄 Using cached request: ${endpoint}`);
    return requestCache.get(cacheKey);
  }

  console.log(`🌐 API Call: ${config.method || "GET"} ${endpoint}`);

  const request = fetch(`${API_URL}${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        console.error(`❌ API Error: ${response.status}`, data);
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      console.log(`✅ API Success:`, data);
      return data;
    })
    .finally(() => {
      // Clear cache after request completes
      if (cacheKey) {
        setTimeout(() => requestCache.delete(cacheKey), 1000);
      }
    });

  // Cache GET requests
  if (cacheKey) {
    requestCache.set(cacheKey, request);
  }

  return request;
}

// Auth functions
export const auth = {
  login: (email: string, password: string) =>
    apiCall("/auth/login", {
      method: "POST",
      body: { email, password },
    }),

  register: (name: string, email: string, password: string) =>
    apiCall("/auth/register", {
      method: "POST",
      body: { name, email, password },
    }),
};

// Task functions
export const tasks = {
  getAll: (page = 1, limit = 50) =>
    apiCall(`/tasks?page=${page}&limit=${limit}`),

  create: (
    title: string,
    position: number,
    description?: string,
    status: string = "to do"
  ) =>
    apiCall("/tasks", {
      method: "POST",
      body: { title, description, status, position },
    }),

  update: (id: string, updates: any) =>
    apiCall(`/tasks/${id}`, {
      method: "PATCH",
      body: updates,
    }),

  delete: (id: string) =>
    apiCall(`/tasks/${id}`, {
      method: "DELETE",
    }),
};
