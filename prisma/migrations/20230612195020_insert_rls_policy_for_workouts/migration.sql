-- This is an empty migration.
CREATE POLICY "Enable insert for authenticated users only" ON "public"."Workout" AS PERMISSIVE FOR
INSERT TO authenticated WITH CHECK (true)