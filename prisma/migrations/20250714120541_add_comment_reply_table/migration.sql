/*
  Warnings:

  - You are about to drop the column `parentId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parentId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "parentId";

-- CreateTable
CREATE TABLE "CommentReply" (
    "id" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CommentReply_id_key" ON "CommentReply"("id");

-- AddForeignKey
ALTER TABLE "CommentReply" ADD CONSTRAINT "CommentReply_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReply" ADD CONSTRAINT "CommentReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReply" ADD CONSTRAINT "CommentReply_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
