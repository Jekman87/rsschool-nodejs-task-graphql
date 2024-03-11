import { createDataLoaders } from '../dataLoader.js';
import { MemberTypeId } from './../../member-types/schemas.js';
import { PrismaClient } from '@prisma/client';

export type GraphQLContext = {
  prisma: PrismaClient;
  dataLoaders: ReturnType<typeof createDataLoaders>;
};

export type Args = {
  id: string;
  memberTypeId: MemberTypeId;
};

export type PostDTO = {
  authorId: string;
  title: string;
  content: string;
};

export type UserDTO = {
  name: string;
  balance: number;
};

export type ProfileDTO = {
  userId: string;
  memberTypeId: string;
  isMale: boolean;
  yearOfBirth: number;
};
