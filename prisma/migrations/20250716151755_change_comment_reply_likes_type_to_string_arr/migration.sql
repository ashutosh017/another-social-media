/*
  Warnings:

  - The `likes` column on the `CommentReply` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CommentReply" DROP COLUMN "likes",
ADD COLUMN     "likes" TEXT[] DEFAULT ARRAY[]::TEXT[];
