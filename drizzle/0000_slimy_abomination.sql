CREATE TABLE IF NOT EXISTS "cars" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(120) NOT NULL,
	"model" varchar(120) NOT NULL,
	"category" varchar(40) NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"specifications" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"images" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"original_price" integer NOT NULL,
	"offer_price" integer NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"phone_number" varchar(32) DEFAULT '' NOT NULL,
	"whatsapp_number" varchar(32) DEFAULT '' NOT NULL,
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
