-- CreateEnum
CREATE TYPE "LanguageStatus" AS ENUM ('LOCKED', 'PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "status" "LanguageStatus" NOT NULL DEFAULT E'PENDING';
