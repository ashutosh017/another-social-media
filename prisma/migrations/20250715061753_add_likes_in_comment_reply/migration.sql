/*
  Warnings:

  - Added the required column `likes` to the `CommentReply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommentReply" ADD COLUMN     "likes" INTEGER NOT NULL;
