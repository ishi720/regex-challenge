import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Regex Challenge API',
      version: '1.0.0',
      description: 'API for regex challenges and user results',
    },
    tags: [
      { name: 'Challenges', description: '正規表現問題のAPI' },
      { name: 'Results', description: '回答結果のAPI' },
    ],
    components: {
      schemas: {
        Challenge: {
          type: 'object',
          properties: {
            challenge_id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            difficulty: { type: 'string' },
            sample_inputs: {
              type: 'array',
              items: { type: 'string' },
            },
            expected_outputs: {
              type: 'array',
              items: { type: 'string' },
            },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Result: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            user_id: { type: 'string' },
            challenge_id: { type: 'string' },
            regex: { type: 'string' },
            replacement: { type: 'string' },
            is_correct: { type: 'boolean' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default (app) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        supportedSubmitMethods: [],
        defaultModelsExpandDepth: -1,
      },
    })
  );
};