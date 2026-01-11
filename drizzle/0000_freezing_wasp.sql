CREATE TABLE `notes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	`body` text DEFAULT '' NOT NULL,
	`date` text DEFAULT '' NOT NULL,
	`favorite` integer DEFAULT false NOT NULL
);
