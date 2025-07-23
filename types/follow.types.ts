export type followersType =
  | {
      dateCreated: Date;
      follower: {
        id: string;
        name: string;
        username: string;
        profilePicUrl: string | null;
        isVerified: boolean;
        public: boolean;
        receivedFollowRequests: {
          id: string;
          dateCreated: Date;
          senderId: string;
          receiverId: string;
        }[];
        following: {
          id: string;
          dateCreated: Date;
          followerId: string;
          followingId: string;
        }[];
      };
    }[]
  | null;

export type followingTyep =
  | {
      dateCreated: Date;
      following: {
        id: string;
        name: string;
        username: string;
        profilePicUrl: string | null;
        isVerified: boolean;
        public:boolean;
        following: {
          id: string;
          dateCreated: Date;
          followerId: string;
          followingId: string;
        }[];
      };
    }[]
  | null;
