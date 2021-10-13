/*
  Warnings:

  - Added the required column `status` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TopicStatus" AS ENUM ('LOCKED', 'PENDING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "UnitStatus" AS ENUM ('LOCKED', 'PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "status" "TopicStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "status" "UnitStatus" NOT NULL DEFAULT E'LOCKED';
