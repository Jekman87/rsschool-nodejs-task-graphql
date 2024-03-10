import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { GraphQLContext } from './context.js';
import { MemberIdType } from './member.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    // user: {
    // },
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    // memberType: {
    // },
    memberTypeId: {
      type: new GraphQLNonNull(MemberIdType),
    },
  }),
});
