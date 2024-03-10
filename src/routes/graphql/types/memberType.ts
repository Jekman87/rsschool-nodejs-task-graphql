import { MemberTypeId } from './../../member-types/schemas.js';
import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const MemberIdType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    [MemberTypeId.BASIC]: { value: MemberTypeId.BASIC },
    [MemberTypeId.BUSINESS]: { value: MemberTypeId.BUSINESS },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: new GraphQLNonNull(MemberIdType) },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    // profiles: {
    //   //
    // },
  }),
});
