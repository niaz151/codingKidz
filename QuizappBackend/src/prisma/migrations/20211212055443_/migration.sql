/*
  Warnings:

  - You are about to drop the column `status` on the `Language` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UnitStatus" AS ENUM ('LOCKED', 'PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Language" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "status" "UnitStatus" NOT NULL DEFAULT E'LOCKED';

-- DropEnum
DROP TYPE "LanguageStatus";
