CREATE TABLE `files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`size` int NOT NULL,
	`type` varchar(255) NOT NULL,
	`url` varchar(500) NOT NULL,
	`uploadedAt` timestamp NOT NULL,
	CONSTRAINT `files_id` PRIMARY KEY(`id`),
	CONSTRAINT `files_url_unique` UNIQUE(`url`)
);
