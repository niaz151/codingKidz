/*
  Warnings:

  - The `questionImage` column on the `MultipleChoiceQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `correctAnswerImage` column on the `MultipleChoiceQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `wrongAnswer0Image` column on the `MultipleChoiceQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `wrongAnswer1Image` column on the `MultipleChoiceQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `wrongAnswer2Image` column on the `MultipleChoiceQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `status` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Unit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MultipleChoiceQuestion" DROP COLUMN "questionImage",
ADD COLUMN     "questionImage" BYTEA,
DROP COLUMN "correctAnswerImage",
ADD COLUMN     "correctAnswerImage" BYTEA,
DROP COLUMN "wrongAnswer0Image",
ADD COLUMN     "wrongAnswer0Image" BYTEA,
DROP COLUMN "wrongAnswer1Image",
ADD COLUMN     "wrongAnswer1Image" BYTEA,
DROP COLUMN "wrongAnswer2Image",
ADD COLUMN     "wrongAnswer2Image" BYTEA;

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "status";

-- DropEnum
DROP TYPE "TopicStatus";

-- DropEnum
DROP TYPE "UnitStatus";
