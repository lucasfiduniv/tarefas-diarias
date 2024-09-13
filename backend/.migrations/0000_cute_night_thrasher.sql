CREATE TABLE IF NOT EXISTS "goals" (
	"goal_id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"desired_weekly_frequency" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
