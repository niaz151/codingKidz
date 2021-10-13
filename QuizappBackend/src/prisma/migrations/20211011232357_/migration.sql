/*
  Warnings:

  - Changed the type of `status` on the `Topic` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Unit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL;
