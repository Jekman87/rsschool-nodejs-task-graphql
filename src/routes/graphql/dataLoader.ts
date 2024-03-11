import DataLoader from 'dataloader';
import { Post, PrismaClient } from '@prisma/client';

export const createDataLoaders = (prisma: PrismaClient) => ({
  memberType: new DataLoader(async (ids: readonly string[]) => {
    const memberTypes = await prisma.memberType.findMany({
      where: { id: { in: [...ids] } },
    });
    const membersMap = new Map(memberTypes.map((member) => [member.id, member]));

    return ids.map((id) => membersMap.get(id));
  }),
  post: new DataLoader(async (ids: readonly string[]) => {
    const posts = await prisma.post.findMany({
      where: { id: { in: [...ids] } },
    });
    const postsMap = new Map(posts.map((post) => [post.id, post]));

    return ids.map((id) => postsMap.get(id));
  }),
  user: new DataLoader(async (ids: readonly string[]) => {
    const users = await prisma.user.findMany({
      where: { id: { in: [...ids] } },
    });
    const usersMap = new Map(users.map((user) => [user.id, user]));

    return ids.map((id) => usersMap.get(id));
  }),
  profile: new DataLoader(async (ids: readonly string[]) => {
    const profiles = await prisma.profile.findMany({
      where: { id: { in: [...ids] } },
    });
    const profilesMap = new Map(profiles.map((profile) => [profile.id, profile]));

    return ids.map((id) => profilesMap.get(id));
  }),
  userProfile: new DataLoader(async (ids: readonly string[]) => {
    const profiles = await prisma.profile.findMany({
      where: { userId: { in: [...ids] } },
    });
    const profilesMap = new Map(profiles.map((profile) => [profile.userId, profile]));

    return ids.map((id) => profilesMap.get(id) ?? null);
  }),
  userPosts: new DataLoader(async (ids: readonly string[]) => {
    const posts = await prisma.post.findMany({
      where: { authorId: { in: [...ids] } },
    });

    const postsMap = new Map<string, Post[]>();
    posts.forEach((post) => {
      const authorPosts = postsMap.get(post.authorId) || [];
      authorPosts.push(post);
      postsMap.set(post.authorId, authorPosts);
    });

    return ids.map((id) => postsMap.get(id) || []);
  }),
  userSubscribedTo: new DataLoader(async (ids: readonly string[]) => {
    const users = await prisma.user.findMany({
      where: { subscribedToUser: { some: { subscriberId: { in: [...ids] } } } },
      include: { subscribedToUser: true },
    });

    return ids.map((id) => {
      return users.filter((user) => {
        return user.subscribedToUser.some((u) => u.subscriberId === id);
      });
    });
  }),
  subscribedToUser: new DataLoader(async (ids: readonly string[]) => {
    const users = await prisma.user.findMany({
      where: { userSubscribedTo: { some: { authorId: { in: [...ids] } } } },
      include: { userSubscribedTo: true },
    });

    return ids.map((id) => {
      return users.filter((user) => {
        return user.userSubscribedTo.some((u) => u.authorId === id);
      });
    });
  }),
});
