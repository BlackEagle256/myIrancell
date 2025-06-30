CREATE DATABASE IF NOT EXISTS `myirancell` CHARACTER SET utf8 COLLATE utf8_persian_ci;
USE `myirancell`;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile` varchar(100) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `charge` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

CREATE TABLE IF NOT EXISTS `services` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `icon` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `max_date` varchar(100) NOT NULL,
  `isActive` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

CREATE TABLE IF NOT EXISTS `recommend_packet` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `off` int(100) NOT NULL,
  `price` int(100) NOT NULL,
  `max_date` varchar(100) NOT NULL,
  `userID` int(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

CREATE TABLE IF NOT EXISTS `sales` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `buy_date` varchar(100) NOT NULL,
  `max_date` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `off` int(100) NOT NULL,
  `price` int(100) NOT NULL,
  `userID` int(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `profile`, `phone`, `charge`) VALUES
(1, 'محمدحسین', 'دادگسترنژاد', 'mohammadhoseindadgostr@gmail.com', '$2b$10$ePViEElXDuVcKd0iIHPRV.ae1h1EgXjH.NImtojHBJ5Jn5KopNFLa', 'content/img/profile (1).jpg', 989366606536, 3000),
(2, 'زینب', 'اقتداری کیا', 'zeynap@gmail.com', '$2b$10$ePViEElXDuVcKd0iIHPRV.ae1h1EgXjH.NImtojHBJ5Jn5KopNFLa', 'content/img/profile (2).jpg', 98912000000, 4000);

INSERT INTO `services` (`id`, `icon`, `title`, `max_date`, `isActive`) VALUES
(1, '/img/icons/icon1.png', 'بسته مکالمه 10 روزه', 'تا تاریخ 12 مرداد 1404', 0),
(2, 'fa-regular fa-envelope', 'بسته اینترنت 30 روزه', 'تا تاریخ 12 شهریور 14041', 1),
(3, '/img/icons/icon1.png', 'بسته مکالمه 10 روزه', 'تا تاریخ 12 شهریور 1404', 0),
(4, 'fa-solid fa-wifi', 'بسته پیامک 30 روزه', 'تا تاریخ 12 مرداد 1404', 1);

INSERT INTO `recommend_packet` (`id`, `title`, `off`, `price`, `max_date`, `userID`) VALUES
(1, 'بسته مکالمه 12 ساعته', 20, 120000, 'تا تاریخ آخر شهریور', 1),
(2, 'بسته اینترنت 3 گیگ 3 ماهه', 50, 10000, 'پایان آبان 1404', 1),
(3, 'بسته اینترنت 5 گیگ 3 ماهه', 40, 24000, 'پایان آبان 1404', 2),
(4, 'بسته اینترنت 2 گیگ 3 ماهه', 40, 24000, 'پایان آبان 1404', 2);

INSERT INTO `sales` (`id`, `buy_date`, `max_date`, `title`, `off`, `price`, `userID`) VALUES
(1, '24 فروردین 1403', '24 فروردین 1404', 'بسته اینترنت 100 گیگ یک ساله', 30, 1400000, 1),
(2, '24 اردیبهشت 1403', '24 خرداد 1403', 'بسته اینترنت 50 گیگ یک ساله', 30, 1000000, 2);

SET FOREIGN_KEY_CHECKS = 1;

ALTER TABLE `recommend_packet`
  ADD CONSTRAINT `recommend_packet_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);