CREATE DATABASE helpdesk;
USE helpdesk;

CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `signupDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `status` text NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `TicketUserLink` (`user_id`),
  CONSTRAINT `TicketUserLink` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ticket_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `commentTicketIDLink` (`ticket_id`),
  KEY `commentUserIDLink` (`user_id`),
  CONSTRAINT `commentTicketIDLink` FOREIGN KEY (`ticket_id`) REFERENCES `Tickets` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `commentUserIDLink` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Users` (`id`, `email`, `password`, `signupDate`, `type`) VALUES (NULL, 'admin@email.com', '$2b$10$dIqCfPJfTTFatStd86dqLuKjSENZ/MVoR67GNsyerLlmnd.ictaXC', '2022-02-11 13:08:38', 'Admin');
INSERT INTO `Users` (`id`, `email`, `password`, `signupDate`, `type`) VALUES (NULL, 'bob@email.com', '$2b$10$dIqCfPJfTTFatStd86dqLuKjSENZ/MVoR67GNsyerLlmnd.ictaXC', '2022-02-11 13:08:38', 'User');
INSERT INTO `Users` (`id`, `email`, `password`, `signupDate`, `type`) VALUES (NULL, 'jim@email.com', '$2b$10$dIqCfPJfTTFatStd86dqLuKjSENZ/MVoR67GNsyerLlmnd.ictaXC', '2022-02-11 13:08:38', 'User');
INSERT INTO `Users` (`id`, `email`, `password`, `signupDate`, `type`) VALUES (NULL, 'sam@email.com', '$2b$10$dIqCfPJfTTFatStd86dqLuKjSENZ/MVoR67GNsyerLlmnd.ictaXC', '2022-02-11 13:08:38', 'User');

INSERT INTO `Tickets` (`id`, `title`, `description`, `status`, `user_id`) VALUES (NULL, 'Computer is very slow', 'Takes a while to boot up and to open applications', 'Closed', '3');
INSERT INTO `Tickets` (`id`, `title`, `description`, `status`, `user_id`) VALUES (NULL, 'Cant load any websites', 'Chrome browser says unable to connect when visiting any website', 'Closed', '4');
INSERT INTO `Tickets` (`id`, `title`, `description`, `status`, `user_id`) VALUES (NULL, 'Computer overheating', 'Computer overheats when opening apps', 'Closed', '2');

INSERT INTO `Tickets` (`id`, `title`, `description`, `status`, `user_id`) VALUES (NULL, 'Computer wont turn on', 'I am unable to turn on my laptop after a update', 'Open', '2');
INSERT INTO `Tickets` (`id`, `title`, `description`, `status`, `user_id`) VALUES (NULL, 'Laptop freezes', 'My laptop freezes when I open firefox', 'Open', '3');
INSERT INTO `Tickets` (`id`, `title`, `description`, `status`, `user_id`) VALUES (NULL, 'Cant connect to wifi', 'My laptop says wrong password', 'Open', '2');
INSERT INTO `Tickets` (`id`, `title`, `description`, `status`, `user_id`) VALUES (NULL, 'Computer wont turn on', 'I am unable to turn on my laptop after a update', 'Open', '4');

INSERT INTO `Comments` (`id`, `text`, `timestamp`, `ticket_id`, `user_id`) VALUES (NULL, 'I have fixed it', '2022-02-01 13:12:59', '1', '3');
INSERT INTO `Comments` (`id`, `text`, `timestamp`, `ticket_id`, `user_id`) VALUES (NULL, 'Ticket Closed', '2022-01-09 13:12:59', '1', '3');
INSERT INTO `Comments` (`id`, `text`, `timestamp`, `ticket_id`, `user_id`) VALUES (NULL, 'Please try another browser', '2021-07-11 16:12:59', '2', '1');
INSERT INTO `Comments` (`id`, `text`, `timestamp`, `ticket_id`, `user_id`) VALUES (NULL, 'Ticket Closed', '2022-01-09 13:12:59', '2', '1');
INSERT INTO `Comments` (`id`, `text`, `timestamp`, `ticket_id`, `user_id`) VALUES (NULL, 'Contact IT repair department', '2022-01-09 13:12:59', '7', '1');
INSERT INTO `Comments` (`id`, `text`, `timestamp`, `ticket_id`, `user_id`) VALUES (NULL, 'I have contacted them', '2022-01-24 13:12:59', '7', '4');
INSERT INTO `Comments` (`id`, `text`, `timestamp`, `ticket_id`, `user_id`) VALUES (NULL, 'Try rebooting', '2022-01-03 13:12:59', '6', '2');