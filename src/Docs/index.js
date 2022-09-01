const swaggerUI = require("swagger-ui-express");
const options = {
  customCss: ".swagger-ui { margin:0px 35px; } .topbar{display:none}",
};
const specs = {
  openapi: "3.0.0",
  info: {
    title: "JJopa-Savvy API",
    description: "The API endpoints documentation for the Jopa-Savvy API",
    version: "1.0.0",
  },
  servers: [
    {
      url: `http://localhost:5000`,
      description: "Localhost (Development) server",
    },
    // {
    //   url: "https://softstudy.herokuapp.com",
    // },
  ],
  components: {
    securitySchemes: {
      cutomersAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        in: "header",
      },
      adminsAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        in: "header",
      },
    },
    schemas: {
      admins: {
        type: "object",
        properties: {
          firstName: {
            type: "string",
          },
          lastName: {
            type: "string",
          },
          email: {
            type: "string",
          },
          phoneNumber: {
            type: "string",
          },
        },
        example: {
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@example.com",
          phoneNuber: "+233240000000",
        },
      },
      customers: {
        type: "object",
        properties: {
          firstName: {
            type: "string",
          },
          lastName: {
            type: "string",
          },
          email: {
            type: "string",
          },
          phoneNumber: {
            type: "string",
          },
        },
        example: {
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@example.com",
          phoneNuber: "+233240000000",
        },
      },
      products: {
        type: "object",
        properties: {
          description: {
            type: "string",
          },
          price: {
            type: "float",
          },
          quantity: {
            type: "number",
          },
          category: {
            type: "string",
          },
          stockStatus: {
            type: "string",
          },
        },
        example: {
          description: "Product description",
          price: "20000",
          quantity: 20,
          category: "Electronics",
          stockStatus: "In stock",
        },
      },
    },
    responses: {
      UnauthorizedError: {
        description: "Invalid email or password or Authentication error",
      },
    },
  },
};

const swagger = (app) => {
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs, options));
};

module.exports = swagger;
