export type UserType =
  | ({
      posts: {
        caption: string | null;
        id: string;
        url: string;
        dateCreated: Date;
        userId: string;
      }[];
      followers: {
        id: string;
        dateCreated: Date;
        followerId: string;
        followingId: string;
      }[];
      following: {
        id: string;
        dateCreated: Date;
        followerId: string;
        followingId: string;
      }[];
      sentFollowRequests: {
        id: string;
        dateCreated: Date;
        senderId: string;
        receiverId: string;
      }[];
      receivedFollowRequests: {
        id: string;
        dateCreated: Date;
        senderId: string;
        receiverId: string;
      }[];
    } & {
      id: string;
      name: string;
      dateCreated: Date;
      username: string;
      profilePicUrl: string | null;
      bio: string | null;
      public: boolean;
      isVerified: boolean;
      DOB: Date | null;
    })
  | null;
