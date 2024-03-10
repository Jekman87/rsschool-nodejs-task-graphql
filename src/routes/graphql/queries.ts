import { GraphQLList, GraphQLObjectType } from 'graphql';
import { MemberType } from './types/memberType.js';
import { GraphQLContext } from './types/context.js';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_source, _args, { prisma }: GraphQLContext) => {
        return prisma.memberType.findMany();
      },
    },
    // human: {
    //   type: humanType,
    //   args: {
    //     id: {
    //       description: 'id of the human',
    //       type: new GraphQLNonNull(GraphQLString),
    //     },
    //   },
    //   resolve: (_source, { id }) => getHuman(id),
    // },
    // droid: {
    //   type: droidType,
    //   args: {
    //     id: {
    //       description: 'id of the droid',
    //       type: new GraphQLNonNull(GraphQLString),
    //     },
    //   },
    //   resolve: (_source, { id }) => getDroid(id),
    // },
  }),
});
