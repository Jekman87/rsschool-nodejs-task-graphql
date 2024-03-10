import { mutation } from './mutations.js';
import { query } from './queries.js';
import { Type } from '@fastify/type-provider-typebox';
import { GraphQLSchema } from 'graphql';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const schema: GraphQLSchema = new GraphQLSchema({
  query,
  mutation,
});
