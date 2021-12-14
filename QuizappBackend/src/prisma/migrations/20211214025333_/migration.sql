-- CreateEnum
CREATE TYPE "TopicStatus" AS ENUM ('LOCKED', 'PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "status" "TopicStatus" NOT NULL DEFAULT E'LOCKED';
