import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { Args, GraphQLContext } from './common.js';
import { MemberTypeId } from './member.js';
import { UserType } from './user.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: async ({ id }: Args, _args, { prisma }: GraphQLContext) => {
        return prisma.user.findUnique({ where: { id } });
      },
    },
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    // memberType: {
    // },
    memberTypeId: {
      type: new GraphQLNonNull(MemberTypeId),
    },
  }),
});
