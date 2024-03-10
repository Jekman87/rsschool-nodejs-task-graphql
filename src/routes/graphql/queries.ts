import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberTypeId, MemberType } from './types/member.js';
import { Args, GraphQLContext } from './types/common.js';
import { PostType } from './types/post.js';
import { UserType } from './types/user.js';
import { ProfileType } from './types/profile.js';
import { UUIDType } from './types/uuid.js';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_source, _args, { prisma }: GraphQLContext) => {
        return prisma.memberType.findMany();
      },
    },
    memberType: {
      type: MemberType,
      args: { id: { type: new GraphQLNonNull(MemberTypeId) } },
      resolve: async (_source, { id }: Args, { prisma }: GraphQLContext) => {
        return prisma.memberType.findUnique({ where: { id } });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_source, _args, { prisma }: GraphQLContext) => {
        return prisma.post.findMany();
      },
    },
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source, { id }: Args, { prisma }: GraphQLContext) => {
        return prisma.post.findUnique({ where: { id } });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_source, _args, { prisma }: GraphQLContext) => {
        return prisma.user.findMany();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source, { id }: Args, { prisma }: GraphQLContext) => {
        return prisma.user.findUnique({ where: { id } });
      },
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_source, _args, { prisma }: GraphQLContext) => {
        return prisma.profile.findMany();
      },
    },
    profile: {
      type: ProfileType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source, { id }: Args, { prisma }: GraphQLContext) => {
        return prisma.profile.findUnique({ where: { id } });
      },
    },
  }),
});
