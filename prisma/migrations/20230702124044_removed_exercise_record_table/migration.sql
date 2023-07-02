/*
  Warnings:

  - You are about to drop the column `exerciseRecordId` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the `ExerciseRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseRecord" DROP CONSTRAINT "ExerciseRecord_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseRecord" DROP CONSTRAINT "ExerciseRecord_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_exerciseRecordId_fkey";

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "exerciseRecordId",
ADD COLUMN     "exerciseId" TEXT,
ADD COLUMN     "workoutId" TEXT;

-- DropTable
DROP TABLE "ExerciseRecord";

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
