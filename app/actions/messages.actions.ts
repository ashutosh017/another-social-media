"use server";

import prisma from "@/lib/db";
import { getMe } from "./auth.actions";
import { pusherServer } from "@/lib/pusher-server";

export async function fetchConversations() {
  const me = await getMe();
  if (!me) return [];

  const conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          userId: me.id,
        },
      },
    },
    include: {
      // participants: {
      // //   where: {
      // //     userId: {
      // //       not: me.id, // Get other users in the conversation
      // //     },
      // //   },
      // //   include: {
      // //     user: {
      // //       select: {
      // //         id: true,
      // //         username: true,
      // //         name: true,
      // //         profilePicUrl: true,
      // //       },
      // //     },
      // //   },
      // },
      participants: {
        where: {
          userId: {
            not: me.id,
          },
        },
        include: {
          user: {
            select: {
              username: true,
              profilePicUrl: true,
            },
          },
        },
      },
      messages: {
        orderBy: {
          dateCreated: "desc",
        },
        take: 1, // Latest message
        include: {
          sender: {
            select: {
              id: true,
              username: true,
              name: true,
              profilePicUrl: true,
            },
          },
        },
      },
    },
    orderBy: {
      dateCreated: "desc",
    },
  });

  return conversations;
}
export async function fetchConversationDetails(withUsername: string) {
  // console.log("fetch conv called: ", withUsername)
  const me = await getMe();
  if (!me) {
    return null;
  }
  // console.log("after me fun")

  const otherUser = await prisma.user.findUnique({
    where: {
      username: withUsername,
    },
  });

  if (!otherUser) {
    // console.log("no other user exists: ", otherUser)
    throw new Error("User does not exist"); // or throw an error
  }

  const conversation = await prisma.conversation.findFirst({
    where: {
      participants: {
        some: {
          userId: me.id,
        },
      },
      AND: {
        participants: {
          some: {
            userId: otherUser.id,
          },
        },
      },
    },
    select: {
      id: true,
      messages: {
        include: {
          sender: true,
        },
        orderBy: {
          dateCreated: "asc",
        },
      },
      participants: {
        include: {
          user: true,
        },
      },
    },
  });

  return conversation;
}

export async function sendMessage(content: string, toUsername: string) {
  const me = await getMe();
  if (!me) return;

  const recipient = await prisma.user.findFirst({
    where: {
      username: toUsername, // ✅ You missed this in your code
    },
  });

  if (!recipient || recipient.id === me.id) {
    return;
  }

  const existingConv = await prisma.conversation.findFirst({
    where: {
      participants: {
        some: { userId: me.id },
      },
      AND: {
        participants: {
          some: { userId: recipient.id },
        },
      },
    },
    include: {
      participants: true,
    },
  });

  let convId: string;

  if (
    existingConv &&
    existingConv.participants.length === 2 &&
    existingConv.participants.some((p) => p.userId === me.id) &&
    existingConv.participants.some((p) => p.userId === recipient.id)
  ) {
    convId = existingConv.id;
  } else {
    const newConv = await prisma.conversation.create({
      data: {
        participants: {
          create: [{ userId: me.id }, { userId: recipient.id }],
        },
      },
    });
    convId = newConv.id;
  }

  await pusherServer.trigger(convId, "new-message", {
    content,
    senderId:me.id,
  });

  await prisma.message.create({
    data: {
      content,
      senderId: me.id,
      conversationId: convId,
    },
  });
}
