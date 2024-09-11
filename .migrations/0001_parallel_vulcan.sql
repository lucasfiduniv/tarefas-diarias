CREATE TABLE IF NOT EXISTS "goal_completions" (
	"goal_completion_id" text PRIMARY KEY NOT NULL,
	"goal_id" text NOT NULL,
	"completed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goal_completions" ADD CONSTRAINT "goal_completions_goal_id_goals_goal_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goals"("goal_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
