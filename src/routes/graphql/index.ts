import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { graphql, validate, parse } from 'graphql';
import depthLimit from 'graphql-depth-limit';

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

      try {
        const validateErrors = validate(schema, parse(query), [depthLimit(5)]);

        if (validateErrors?.length > 0) {
          return { errors: validateErrors };
        }

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
