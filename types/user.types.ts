export type UserType =
  | ({
      posts: {
        id: string;
        dateCreated: Date;
        caption: string | null;
        url: string;
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
    } & {
      id: string;
      dateCreated: Date;
      name: string;
      username: string;
      profilePicUrl: string | null;
      bio: string | null;
      public: boolean;
      isVerified: boolean;
      DOB: Date | null;
    })
  | null;
