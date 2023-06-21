/*
  Warnings:

  - You are about to drop the `Workout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseToWorkout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExerciseToWorkout" DROP CONSTRAINT "_ExerciseToWorkout_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToWorkout" DROP CONSTRAINT "_ExerciseToWorkout_B_fkey";

-- DropTable
DROP TABLE "Workout";

-- DropTable
DROP TABLE "_ExerciseToWorkout";

-- CreateTable
CREATE TABLE "WorkoutPlan" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WorkoutPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToWorkoutPlan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToWorkoutPlan_AB_unique" ON "_ExerciseToWorkoutPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToWorkoutPlan_B_index" ON "_ExerciseToWorkoutPlan"("B");

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" ADD CONSTRAINT "_ExerciseToWorkoutPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" ADD CONSTRAINT "_ExerciseToWorkoutPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
