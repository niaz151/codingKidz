/*
  Warnings:

  - The `questionImage` column on the `MultipleChoiceQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `correctAnswerImage` column on the `MultipleChoiceQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `wrongAnswer0Image` column on the `MultipleChoiceQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `wrongAnswer1Image` column on the `MultipleChoiceQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `wrongAnswer2Image` column on the `MultipleChoiceQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `questionImage` column on the `TrueFalseQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MultipleChoiceQuestion" DROP COLUMN "questionImage",
ADD COLUMN     "questionImage" INTEGER,
DROP COLUMN "correctAnswerImage",
ADD COLUMN     "correctAnswerImage" INTEGER,
DROP COLUMN "wrongAnswer0Image",
ADD COLUMN     "wrongAnswer0Image" INTEGER,
DROP COLUMN "wrongAnswer1Image",
ADD COLUMN     "wrongAnswer1Image" INTEGER,
DROP COLUMN "wrongAnswer2Image",
ADD COLUMN     "wrongAnswer2Image" INTEGER;

-- AlterTable
ALTER TABLE "TrueFalseQuestion" DROP COLUMN "questionImage",
ADD COLUMN     "questionImage" INTEGER;
