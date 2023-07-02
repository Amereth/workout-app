/*
  Warnings:

  - Made the column `exerciseId` on table `Set` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workoutId` on table `Set` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_workoutId_fkey";

-- AlterTable
ALTER TABLE "Set" ALTER COLUMN "exerciseId" SET NOT NULL,
ALTER COLUMN "workoutId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
