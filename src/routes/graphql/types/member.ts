import { MemberTypeId as MemberEnum } from '../../member-types/schemas.js';
import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    [MemberEnum.BASIC]: { value: MemberEnum.BASIC },
    [MemberEnum.BUSINESS]: { value: MemberEnum.BUSINESS },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: new GraphQLNonNull(MemberTypeId) },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    // profiles: {
    // },
  }),
});
