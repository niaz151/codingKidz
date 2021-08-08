/*
  Warnings:

  - Added the required column `grade` to the `QuizResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuizResult" ADD COLUMN     "grade" INTEGER NOT NULL;
