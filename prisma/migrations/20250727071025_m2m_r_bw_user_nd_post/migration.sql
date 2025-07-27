/*
  Warnings:

  - You are about to drop the column `postId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_postId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "postId";

-- CreateTable
CREATE TABLE "_Tagged" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Tagged_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Tagged_B_index" ON "_Tagged"("B");

-- AddForeignKey
ALTER TABLE "_Tagged" ADD CONSTRAINT "_Tagged_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Tagged" ADD CONSTRAINT "_Tagged_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
