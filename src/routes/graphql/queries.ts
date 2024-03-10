import { GraphQLList, GraphQLObjectType } from 'graphql';
import { MemberType } from './types/member.js';
import { GraphQLContext } from './types/context.js';
import { PostType } from './types/post.js';
import { UserType } from './types/user.js';
import { ProfileType } from './types/profile.js';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_source, _args, { prisma }: GraphQLContext) => {
        return prisma.memberType.findMany();
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_source, _args, { prisma }: GraphQLContext) => {
        return prisma.post.findMany();
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_source, _args, { prisma }: GraphQLContext) => {
        return prisma.user.findMany();
      },
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_source, _args, { prisma }: GraphQLContext) => {
        return prisma.profile.findMany();
      },
    },
  }),
});
