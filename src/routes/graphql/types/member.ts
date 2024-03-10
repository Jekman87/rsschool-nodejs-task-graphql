import { MemberTypeId as MemberEnum } from '../../member-types/schemas.js';
import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { ProfileType } from './profile.js';
import { Args, GraphQLContext } from './common.js';

export const MemberTypeId: GraphQLEnumType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    [MemberEnum.BASIC]: { value: MemberEnum.BASIC },
    [MemberEnum.BUSINESS]: { value: MemberEnum.BUSINESS },
  },
});

export const MemberType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: new GraphQLNonNull(MemberTypeId) },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(ProfileType)),
      resolve: async ({ id }: Args, _args, { prisma }: GraphQLContext) => {
        return prisma.profile.findMany({ where: { memberTypeId: id } });
      },
    },
  }),
});
