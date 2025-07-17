export type PostType =
  | ({
      user: {
        name: string;
        username: string;
        profilePicUrl: string | null;
        isVerified: boolean;
      };
      comments: {
        dateCreated: Date;
        text: string;
        user: {
          name: string;
          username: string;
          profilePicUrl: string | null;
          isVerified: boolean;
        };
        id: string;
        likes: {
          user: {
            name: string;
            username: string;
            profilePicUrl: string | null;
            isVerified: boolean;
          };
          id: string;
        }[];
        replies: {
          user: {
            name: string;
            username: string;
            profilePicUrl: string | null;
            isVerified: boolean;
          };
          likes: string[];
          text: string;
          id: string;
          dateCreated: Date;
          userId: string;
          postId: string;
          parentId: string;
        }[];
      }[];
      likes: {
        userId: string;
      }[];
    } & {
      caption: string | null;
      id: string;
      dateCreated: Date;
      url: string;
      userId: string;
    })
  | null;
