import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberTypeId, MemberType } from './types/member.js';
import { Args, GraphQLContext } from './types/common.js';
import { PostType } from './types/post.js';
import { UserType } from './types/user.js';
import { ProfileType } from './types/profile.js';
import { UUIDType } from './types/uuid.js';
import {
  ResolveTree,
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';

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
      resolve: async (_source, { id }: Args, { dataLoaders }: GraphQLContext) => {
        return dataLoaders.memberType.load(id);
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
      resolve: async (_source, { id }: Args, { dataLoaders }: GraphQLContext) => {
        return dataLoaders.post.load(id);
      },
    },

    users: {
      type: new GraphQLList(UserType),
      resolve: async (
        _source,
        _args,
        { prisma, dataLoaders }: GraphQLContext,
        resolveInfo,
      ) => {
        const parsedResolveInfoFragment = parseResolveInfo(resolveInfo);
        const { fields } = simplifyParsedResolveInfoFragmentWithType(
          parsedResolveInfoFragment as ResolveTree,
          UserType,
        );

        const isSubscribedToUser = !!fields['subscribedToUser'];
        const isUserSubscribedTo = !!fields['userSubscribedTo'];

        const users = await prisma.user.findMany({
          include: {
            subscribedToUser: isSubscribedToUser,
            userSubscribedTo: isUserSubscribedTo,
          },
        });

        if (isSubscribedToUser) {
          users.forEach((user) => {
            const subscribers = users.filter((u) =>
              u.subscribedToUser.some((sub) => sub.subscriberId === user.id),
            );
            dataLoaders.subscribedToUser.prime(user.id, subscribers);
          });
        }

        if (isUserSubscribedTo) {
          users.forEach((user) => {
            const authors = users.filter((u) =>
              u.userSubscribedTo.some((sub) => sub.authorId === user.id),
            );
            dataLoaders.userSubscribedTo.prime(user.id, authors);
          });
        }

        if (isSubscribedToUser || isUserSubscribedTo) {
          users.forEach((user) => {
            if (isSubscribedToUser) {
              const subscribers = users.filter((u) =>
                u.subscribedToUser.some((sub) => sub.subscriberId === user.id),
              );

              dataLoaders.subscribedToUser.prime(user.id, subscribers);
            }

            if (isUserSubscribedTo) {
              const authors = users.filter((u) =>
                u.userSubscribedTo.some((sub) => sub.authorId === user.id),
              );

              dataLoaders.userSubscribedTo.prime(user.id, authors);
            }
          });
        }

        return users;
      },
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source, { id }: Args, { dataLoaders }: GraphQLContext) => {
        return dataLoaders.user.load(id);
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
      resolve: async (_source, { id }: Args, { dataLoaders }: GraphQLContext) => {
        return dataLoaders.profile.load(id);
      },
    },
  }),
});
