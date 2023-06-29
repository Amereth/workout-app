/*
  Warnings:

  - The primary key for the `Exercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ExerciseRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Set` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Workout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WorkoutPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ExerciseRecord" DROP CONSTRAINT "ExerciseRecord_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseRecord" DROP CONSTRAINT "ExerciseRecord_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_exerciseRecordId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_workoutPlanId_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" DROP CONSTRAINT "_ExerciseToWorkoutPlan_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" DROP CONSTRAINT "_ExerciseToWorkoutPlan_B_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Exercise_id_seq";

-- AlterTable
ALTER TABLE "ExerciseRecord" DROP CONSTRAINT "ExerciseRecord_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "workoutId" SET DATA TYPE TEXT,
ALTER COLUMN "exerciseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ExerciseRecord_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ExerciseRecord_id_seq";

-- AlterTable
ALTER TABLE "Set" DROP CONSTRAINT "Set_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "exerciseRecordId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Set_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Set_id_seq";

-- AlterTable
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "workoutPlanId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Workout_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Workout_id_seq";

-- AlterTable
ALTER TABLE "WorkoutPlan" DROP CONSTRAINT "WorkoutPlan_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "WorkoutPlan_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "WorkoutPlan_id_seq";

-- AlterTable
ALTER TABLE "_ExerciseToWorkoutPlan" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "ExerciseRecord" ADD CONSTRAINT "ExerciseRecord_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseRecord" ADD CONSTRAINT "ExerciseRecord_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exerciseRecordId_fkey" FOREIGN KEY ("exerciseRecordId") REFERENCES "ExerciseRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" ADD CONSTRAINT "_ExerciseToWorkoutPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" ADD CONSTRAINT "_ExerciseToWorkoutPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
