import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { graphql } from 'graphql';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      console.log('!! query', query);
      console.log('!! variables', variables);
      try {
        const result = await graphql({
          schema,
          source: query,
          variableValues: variables,
          contextValue: {
            prisma: fastify.prisma,
          },
        });

        return result;
      } catch (error) {
        console.log('GQL server error: ', error);
      }
    },
  });
};

export default plugin;
