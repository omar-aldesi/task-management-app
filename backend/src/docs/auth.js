module.exports = {
  "/api/auth/register": {
    post: {
      summary: "Register a new user",
      tags: ["Authentication"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email", "password"],
              properties: {
                name: { type: "string", example: "Omar Test" },
                email: {
                  type: "string",
                  format: "email",
                  example: "omar@example.com",
                },
                password: { type: "string", example: "password123" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "User registered successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  token: { type: "string" },
                  user: { $ref: "#/components/schemas/User" },
                },
              },
            },
          },
        },
        400: {
          description: "User already exists",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },
  "/api/auth/login": {
    post: {
      summary: "Login user",
      tags: ["Authentication"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "omar@example.com",
                },
                password: { type: "string", example: "password123" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  token: { type: "string" },
                  user: { $ref: "#/components/schemas/User" },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid credentials",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },
};
