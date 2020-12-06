-- Adminer 4.7.6 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `last_name` varchar(200) DEFAULT NULL,
  `age` varchar(3) DEFAULT NULL,
  `address` text,
  `email` varchar(200) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `customer` (`id`, `name`, `last_name`, `age`, `address`, `email`, `phone`) VALUES
(13,	'Sarang',	'Patel',	'30',	NULL,	NULL,	NULL),
(15,	'Ram',	'Kumar',	'21',	NULL,	NULL,	NULL),
(16,	'Mohit',	'Kumar',	'32',	NULL,	NULL,	NULL),
(17,	'Sarang',	'Patel',	'30',	NULL,	NULL,	NULL),
(20,	'Sarang 12',	'Patel',	'30',	NULL,	NULL,	NULL);

DROP TABLE IF EXISTS `customer_fitness`;
CREATE TABLE `customer_fitness` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `fitness_type` varchar(50) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `customer_fitness` (`id`, `customer_id`, `fitness_type`, `unit`, `date_time`) VALUES
(1,	13,	'steps',	'15',	'2020-12-05 18:35:47'),
(2,	13,	'calories',	'20',	'2020-12-04 18:35:47'),
(3,	15,	'steps',	'20',	'2020-12-05 18:36:56'),
(4,	15,	'calories',	'40',	'2020-12-03 18:36:56');

-- 2020-12-06 07:18:58
