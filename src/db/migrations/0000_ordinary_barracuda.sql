CREATE TABLE "brands" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "brands_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "brands_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "employees_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"firstName" varchar NOT NULL,
	"lastName" varchar NOT NULL,
	"email" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "employees_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "graphics" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "graphics_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"manufacturer" integer,
	"memory" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "laptop_assignments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "laptop_assignments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"laptopId" integer NOT NULL,
	"employeeId" integer NOT NULL,
	"assignedAt" timestamp DEFAULT now(),
	"returnedAt" timestamp,
	"isCurrent" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "laptop_statuses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "laptop_statuses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"status" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "laptop_statuses_status_unique" UNIQUE("status")
);
--> statement-breakpoint
CREATE TABLE "laptops" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "laptops_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"serialNumber" varchar NOT NULL,
	"brand" integer,
	"processor" integer,
	"cores" integer,
	"clockSpeed" double precision,
	"graphics" integer,
	"storageType" integer,
	"storage" integer,
	"ramType" integer,
	"ram" integer,
	"operatingSystem" integer,
	"purchasePrice" double precision,
	"purchaseDate" date,
	"assignedEmployee" integer,
	"status" integer,
	"notes" varchar,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "manufacturers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "manufacturers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "manufacturers_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "operating_systems" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "operating_systems_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "operating_systems_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "processors" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "processors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"manufacturer" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ram_types" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ram_types_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"type" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "ram_types_type_unique" UNIQUE("type")
);
--> statement-breakpoint
CREATE TABLE "storage_types" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "storage_types_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"type" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "storage_types_type_unique" UNIQUE("type")
);
--> statement-breakpoint
ALTER TABLE "graphics" ADD CONSTRAINT "graphics_manufacturer_manufacturers_id_fk" FOREIGN KEY ("manufacturer") REFERENCES "public"."manufacturers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laptop_assignments" ADD CONSTRAINT "laptop_assignments_laptopId_laptops_id_fk" FOREIGN KEY ("laptopId") REFERENCES "public"."laptops"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laptop_assignments" ADD CONSTRAINT "laptop_assignments_employeeId_employees_id_fk" FOREIGN KEY ("employeeId") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laptops" ADD CONSTRAINT "laptops_brand_brands_id_fk" FOREIGN KEY ("brand") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laptops" ADD CONSTRAINT "laptops_processor_processors_id_fk" FOREIGN KEY ("processor") REFERENCES "public"."processors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laptops" ADD CONSTRAINT "laptops_graphics_graphics_id_fk" FOREIGN KEY ("graphics") REFERENCES "public"."graphics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laptops" ADD CONSTRAINT "laptops_storageType_storage_types_id_fk" FOREIGN KEY ("storageType") REFERENCES "public"."storage_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laptops" ADD CONSTRAINT "laptops_ramType_ram_types_id_fk" FOREIGN KEY ("ramType") REFERENCES "public"."ram_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laptops" ADD CONSTRAINT "laptops_operatingSystem_operating_systems_id_fk" FOREIGN KEY ("operatingSystem") REFERENCES "public"."operating_systems"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laptops" ADD CONSTRAINT "laptops_assignedEmployee_employees_id_fk" FOREIGN KEY ("assignedEmployee") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laptops" ADD CONSTRAINT "laptops_status_laptop_statuses_id_fk" FOREIGN KEY ("status") REFERENCES "public"."laptop_statuses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processors" ADD CONSTRAINT "processors_manufacturer_manufacturers_id_fk" FOREIGN KEY ("manufacturer") REFERENCES "public"."manufacturers"("id") ON DELETE no action ON UPDATE no action;