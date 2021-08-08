/*
  Warnings:

  - The values [PASSED,FAILED] on the enum `QuizResultStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuizResultStatus_new" AS ENUM ('LOCKED', 'PENDING', 'COMPLETED');
ALTER TABLE "QuizResult" ALTER COLUMN "status" TYPE "QuizResultStatus_new" USING ("status"::text::"QuizResultStatus_new");
ALTER TYPE "QuizResultStatus" RENAME TO "QuizResultStatus_old";
ALTER TYPE "QuizResultStatus_new" RENAME TO "QuizResultStatus";
DROP TYPE "QuizResultStatus_old";
COMMIT;
