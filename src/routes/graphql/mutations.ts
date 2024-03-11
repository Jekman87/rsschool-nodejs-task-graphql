import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { ChangePostInput, CreatePostInput, PostType } from './types/post.js';
import { Args, GraphQLContext, PostDTO, ProfileDTO, UserDTO } from './types/common.js';
import { ChangeUserInput, CreateUserInput, UserType } from './types/user.js';
import { ChangeProfileInput, CreateProfileInput, ProfileType } from './types/profile.js';
import { UUIDType } from './types/uuid.js';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPost: {
      type: new GraphQLNonNull(PostType),
      args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
      resolve: async (_source, { dto }: { dto: PostDTO }, { prisma }: GraphQLContext) => {
        return prisma.post.create({ data: dto });
      },
    },
    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source, { id }: Args, { prisma }: GraphQLContext) => {
        await prisma.post.delete({ where: { id } });
      },
    },
    changePost: {
      type: new GraphQLNonNull(PostType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInput) },
      },
      resolve: async (
        _source,
        { id, dto }: { id: string; dto: PostDTO },
        { prisma }: GraphQLContext,
      ) => {
        return prisma.post.update({ where: { id }, data: dto });
      },
    },

    createUser: {
      type: new GraphQLNonNull(UserType),
      args: { dto: { type: new GraphQLNonNull(CreateUserInput) } },
      resolve: async (_source, { dto }: { dto: UserDTO }, { prisma }: GraphQLContext) => {
        return prisma.user.create({ data: dto });
      },
    },
    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source, { id }: Args, { prisma }: GraphQLContext) => {
        await prisma.user.delete({ where: { id } });
      },
    },
    changeUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: async (
        _source,
        { id, dto }: { id: string; dto: UserDTO },
        { prisma }: GraphQLContext,
      ) => {
        return prisma.user.update({ where: { id }, data: dto });
      },
    },

    createProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: { dto: { type: new GraphQLNonNull(CreateProfileInput) } },
      resolve: async (
        _source,
        { dto }: { dto: ProfileDTO },
        { prisma }: GraphQLContext,
      ) => {
        return prisma.profile.create({ data: dto });
      },
    },
    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source, { id }: Args, { prisma }: GraphQLContext) => {
        await prisma.profile.delete({ where: { id } });
      },
    },
    changeProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: async (
        _source,
        { id, dto }: { id: string; dto: ProfileDTO },
        { prisma }: GraphQLContext,
      ) => {
        return prisma.profile.update({ where: { id }, data: dto });
      },
    },

    subscribeTo: {
      type: new GraphQLNonNull(UserType),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        _source,
        { userId, authorId }: { userId: string; authorId: string },
        { prisma }: GraphQLContext,
      ) => {
        return prisma.user.update({
          where: { id: userId },
          data: { userSubscribedTo: { create: { authorId } } },
        });
      },
    },
    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        _source,
        { userId, authorId }: { userId: string; authorId: string },
        { prisma }: GraphQLContext,
      ) => {
        try {
          await prisma.subscribersOnAuthors.delete({
            where: { subscriberId_authorId: { subscriberId: userId, authorId } },
          });

          return true;
        } catch {
          return false;
        }
      },
    },
  }),
});
