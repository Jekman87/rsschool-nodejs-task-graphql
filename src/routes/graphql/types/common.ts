import { MemberTypeId } from './../../member-types/schemas.js';
import { PrismaClient } from '@prisma/client';

export type GraphQLContext = {
  prisma: PrismaClient;
};

export type Args = {
  id: string;
  memberTypeId: MemberTypeId;
};
