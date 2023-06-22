CREATE POLICY "Enable read access for all users" ON "public"."WorkoutPlan" AS PERMISSIVE FOR
SELECT TO public USING (true)