/*
Warnings:

- The `status` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.
- You are about to drop the column `isCollected` on the `InteractiveObject` table. All the data in the column will be lost.
- The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
- A unique constraint covering the columns `[userId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
- Added the required column `updatedAt` to the `Game` table without a default value. This is not possible if the table is not empty.
- Made the column `state` on table `Game` required. This step will fail if there are existing NULL values in that column.
- Made the column `order` on table `Room` required. This step will fail if there are existing NULL values in that column.

 */
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('active', 'abandoned', 'completed');

-- DropForeignKey
ALTER TABLE "Game"
DROP CONSTRAINT "Game_userId_fkey";

-- DropForeignKey
ALTER TABLE "InteractiveObject"
DROP CONSTRAINT "InteractiveObject_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Puzzle"
DROP CONSTRAINT "Puzzle_roomId_fkey";

-- DropIndex
DROP INDEX "Game_currentRoomId_idx";

-- DropIndex
DROP INDEX "Game_userId_idx";

-- DropIndex
DROP INDEX "Hint_puzzleId_idx";

-- DropIndex
DROP INDEX "Room_order_idx";

-- AlterTable
ALTER TABLE "Game"
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN "status" "GameStatus" NOT NULL DEFAULT 'active',
ALTER COLUMN "state"
SET
  NOT NULL;

-- AlterTable
ALTER TABLE "Hint"
ALTER COLUMN "order"
DROP DEFAULT;

-- AlterTable
ALTER TABLE "InteractiveObject"
DROP COLUMN "isCollected";

-- AlterTable
ALTER TABLE "Room"
ALTER COLUMN "order"
SET
  NOT NULL;

-- AlterTable
ALTER TABLE "User"
DROP COLUMN "role",
ADD COLUMN "role" "Role" NOT NULL DEFAULT 'user';

-- CreateIndex
CREATE UNIQUE INDEX "Game_userId_key" ON "Game" ("userId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Puzzle" ADD CONSTRAINT "Puzzle_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteractiveObject" ADD CONSTRAINT "InteractiveObject_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE;