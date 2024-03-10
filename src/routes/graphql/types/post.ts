import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { UserType } from "./user.js";
import { Args, GraphQLContext } from "./common.js";

export const PostType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: {
      type: new GraphQLNonNull(UserType),
      resolve: async ({ id }: Args, _args, { prisma }: GraphQLContext) => {
        return prisma.user.findUnique({ where: { id } });
      },
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
    },
  }),
});