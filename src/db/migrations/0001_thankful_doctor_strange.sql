CREATE TABLE "laptop_models" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "laptop_models_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "laptop_models_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "laptops" ADD COLUMN "model" integer;--> statement-breakpoint
ALTER TABLE "laptops" ADD CONSTRAINT "laptops_model_laptop_models_id_fk" FOREIGN KEY ("model") REFERENCES "public"."laptop_models"("id") ON DELETE no action ON UPDATE no action;