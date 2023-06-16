-- This is an empty migration.
CREATE POLICY "Enable read access for all authenticated users" ON "public"."Exercise" AS PERMISSIVE FOR
SELECT TO authenticated USING (true)