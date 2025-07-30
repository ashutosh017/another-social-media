import { getFeed } from "../feed.actions";
import { fetchFollowers, fetchFollowing } from "../follow.actions";
import {
  fetchConversationDetails,
  fetchConversations,
} from "../messages.actions";
import { fetchNotifications } from "../notifications.actions";
import { fetchPost } from "../posts.actions";
import { fetchUsertDetails } from "../profile.actions";
import {
  fetchSearchFeed,
  searchUsers,
  searchUsersToSendMessage,
} from "../search.actions";

export type UserType = Awaited<ReturnType<typeof fetchUsertDetails>>;
export type FollowersType = Awaited<ReturnType<typeof fetchFollowers>>;
export type FollowingType = Awaited<ReturnType<typeof fetchFollowing>>;
export type PostType = Awaited<ReturnType<typeof fetchPost>>;
export type ConversationDetailsType = Awaited<
  ReturnType<typeof fetchConversationDetails>
>;
export type ConversationsType = Awaited<ReturnType<typeof fetchConversations>>;
export type FeedType = Awaited<ReturnType<typeof getFeed>>;

export type SearchedUsersType = Awaited<ReturnType<typeof searchUsers>>;
export type SearchFeedType = Awaited<ReturnType<typeof fetchSearchFeed>>;
export type NotificationsType = Awaited<ReturnType<typeof fetchNotifications>>;

export type searchedUsersToMessageType = Awaited<
  ReturnType<typeof searchUsersToSendMessage>
>;
