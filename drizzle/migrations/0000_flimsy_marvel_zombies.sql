-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `category` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` varchar(255) NOT NULL,
	`description` varchar(255),
	CONSTRAINT `category_id_pk` PRIMARY KEY(`id`),
	CONSTRAINT `category` UNIQUE(`category`)
);
--> statement-breakpoint
CREATE TABLE `videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` varchar(255) NOT NULL,
	`category_id` int,
	`likes` int,
	`description` varchar(255),
	CONSTRAINT `videos_id_pk` PRIMARY KEY(`id`),
	CONSTRAINT `url` UNIQUE(`url`)
);
--> statement-breakpoint
CREATE INDEX `category_id_idx` ON `videos` (`category_id`);
*/