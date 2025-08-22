module.exports = {
  "/api/tasks": {
    get: {
      summary: "Get paginated tasks for logged-in user",
      tags: ["Tasks"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "page",
          schema: { type: "integer", default: 1 },
          description: "Page number",
        },
        {
          in: "query",
          name: "limit",
          schema: { type: "integer", default: 10 },
          description: "Number of tasks per page",
        },
      ],
      responses: {
        200: {
          description: "Tasks retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  tasks: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Task" },
                  },
                  totalTasks: { type: "integer" },
                  currentPage: { type: "integer" },
                  totalPages: { type: "integer" },
                },
              },
            },
          },
        },
        401: { description: "Unauthorized" },
      },
    },
    post: {
      summary: "Create a new task",
      tags: ["Tasks"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["title"],
              properties: {
                title: { type: "string", example: "Complete backend setup" },
                description: {
                  type: "string",
                  example: "Finish the Node.js backend implementation",
                },
                status: {
                  type: "string",
                  default: "to do",
                },
                position: { type: "integer", default: 0 },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Task created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  task: { $ref: "#/components/schemas/Task" },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/tasks/{id}": {
    patch: {
      summary: "Update a task",
      tags: ["Tasks"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                status: {
                  type: "string",
                },
                position: { type: "integer" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Task updated successfully" },
        404: { description: "Task not found" },
      },
    },
    delete: {
      summary: "Delete a task",
      tags: ["Tasks"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        200: { description: "Task deleted successfully" },
        404: { description: "Task not found" },
      },
    },
  },
};
