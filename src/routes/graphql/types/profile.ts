import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { Args, GraphQLContext } from './common.js';
import { MemberType, MemberTypeId } from './member.js';
import { UserType } from './user.js';

export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: async ({ id }: Args, _args, { prisma }: GraphQLContext) => {
        return prisma.user.findUnique({ where: { id } });
      },
    },
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async ({ memberTypeId }: Args, _args, { prisma }: GraphQLContext) => {
        return prisma.memberType.findUnique({ where: { id: memberTypeId } });
      },
    },
    memberTypeId: {
      type: new GraphQLNonNull(MemberTypeId),
    },
  }),
});
