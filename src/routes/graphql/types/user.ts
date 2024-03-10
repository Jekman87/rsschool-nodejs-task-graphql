import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { PostType } from './post.js';
import { Args, GraphQLContext } from './common.js';
import { ProfileType } from './profile.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      resolve: async ({ id }: Args, _args, { prisma }: GraphQLContext) => {
        return prisma.profile.findUnique({ where: { userId: id } });
      },
    },
    // posts: {
    // },
    // userSubscribedTo: {
    // },
    // subscribedToUser: {
    // },
  }),
});
