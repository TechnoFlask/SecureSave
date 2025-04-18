CREATE TYPE "public"."credType" AS ENUM('passwords', 'cards');--> statement-breakpoint
CREATE TABLE "creds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" varchar NOT NULL,
	"credType" "credType" NOT NULL,
	"name" varchar NOT NULL,
	"iv" varchar NOT NULL,
	"enc" varchar NOT NULL,
	"salt" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shared_creds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"credType" "credType" NOT NULL,
	"sender" varchar NOT NULL,
	"credId" uuid NOT NULL,
	"recipient" varchar NOT NULL,
	"iv" varchar NOT NULL,
	"enc" varchar NOT NULL,
	"salt" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "shared_creds" ADD CONSTRAINT "shared_creds_credId_creds_id_fk" FOREIGN KEY ("credId") REFERENCES "public"."creds"("id") ON DELETE cascade ON UPDATE no action;