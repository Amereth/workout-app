-- This is an empty migration.
CREATE POLICY "Enable insert for authenticated users only" ON "public"."WorkoutPlan" AS PERMISSIVE FOR
INSERT TO authenticated WITH CHECK (true)