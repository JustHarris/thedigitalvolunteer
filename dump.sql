-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: thedigitalvolunteer
-- ------------------------------------------------------
-- Server version	5.7.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `thedigitalvolunteer`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `thedigitalvolunteer` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `thedigitalvolunteer`;

--
-- Table structure for table `help_requests`
--

DROP TABLE IF EXISTS `help_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `help_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fromUser` int(11) DEFAULT NULL,
  `assignedUser` int(11) DEFAULT NULL,
  `description` varchar(4096) DEFAULT NULL,
  `priority` int(11) DEFAULT '1',
  `status` int(11) DEFAULT '0',
  `locationLatitude` float(9,6) DEFAULT NULL,
  `locationLongitude` float(9,6) DEFAULT NULL,
  `helpType` enum('groceries','transport','medicine','other') DEFAULT NULL,
  `timeOptions` varchar(4096) DEFAULT NULL,
  `deliveryOption` enum('door','porch','drone') DEFAULT NULL,
  `paymentOption` enum('cash','card','swish') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `help_requests`
--

LOCK TABLES `help_requests` WRITE;
/*!40000 ALTER TABLE `help_requests` DISABLE KEYS */;
INSERT INTO `help_requests` VALUES (2,2,NULL,'Need some pork meat, 1 dozen eggs, 4 milk bottles, gouda',1,0,40.382507,-3.778288,'other','10:00-11:00|12:00-13:00','door','cash','2020-04-26 12:41:46','2020-04-26 14:07:51');
/*!40000 ALTER TABLE `help_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fromUser` int(11) DEFAULT NULL,
  `toUser` int(11) DEFAULT NULL,
  `helpRequest` int(11) DEFAULT NULL,
  `title` varchar(1024) DEFAULT NULL,
  `content` varchar(4096) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,3,1,NULL,'i am a title','thx for all folks','2020-04-26 10:18:34','2020-04-26 10:18:34'),(2,3,1,NULL,'i am a title2','thx for all folks2','2020-04-26 10:22:50','2020-04-26 10:22:50'),(4,1,3,NULL,'i am a title4','thx for all folks4','2020-04-26 10:23:07','2020-04-26 10:23:07');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_ratings`
--

DROP TABLE IF EXISTS `user_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_ratings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fromUser` int(11) DEFAULT NULL,
  `toUser` int(11) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  `comment` varchar(2048) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_ratings`
--

LOCK TABLES `user_ratings` WRITE;
/*!40000 ALTER TABLE `user_ratings` DISABLE KEYS */;
INSERT INTO `user_ratings` VALUES (1,1,3,8,'Lore lore macu macu','2020-04-26 09:06:50','2020-04-26 09:06:50'),(2,1,3,8,'Lore lore macu macu','2020-04-26 09:09:55','2020-04-26 09:09:55'),(3,1,3,8,'Lore lore macu macu','2020-04-26 09:10:35','2020-04-26 09:10:35'),(4,1,3,8,'Lore lore macu macu','2020-04-26 09:13:12','2020-04-26 09:13:12'),(5,1,3,8,'Lore lore macu macu','2020-04-26 09:14:35','2020-04-26 09:14:35'),(6,1,3,8,'Lore lore macu macu','2020-04-26 09:17:41','2020-04-26 09:17:41'),(7,1,3,10,'Lore lore macu macu','2020-04-26 09:20:18','2020-04-26 09:20:18'),(8,3,1,5,'Lore lore macu macu','2020-04-26 09:20:49','2020-04-26 09:20:49'),(9,3,1,10,'Lore lore macu macu','2020-04-26 09:20:59','2020-04-26 09:20:59');
/*!40000 ALTER TABLE `user_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `bankId` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `about` varchar(2048) DEFAULT NULL,
  `avatar` varchar(1024) DEFAULT NULL,
  `token` varchar(1024) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `role` enum('inneed','helper','admin') DEFAULT 'helper',
  `locationLatitude` float(9,6) DEFAULT NULL,
  `locationLongitude` float(9,6) DEFAULT NULL,
  `addressStreet` varchar(512) DEFAULT NULL,
  `addressPostalCode` varchar(255) DEFAULT NULL,
  `addressCity` varchar(255) DEFAULT NULL,
  `skills` varchar(1024) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `bankId` (`bankId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ivan','Ugarte','ivan.ugarte.castro@gmail.com',NULL,'$2a$10$nhc248lbJKzIV9r8YVBTUe0pX3gAIx3JDBlJylFtSBgh5VUpEbAYG','653666666','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum sem et tellus suscipit, eget laoreet sapien blandit. Phasellus diam turpis, sollicitudin egestas lacus eu, pulvinar porta neque. Nullam tristique massa auctor odio vestibulum, id malesuada arcu fringilla. Vestibulum feugiat lobortis purus, ut venenatis mi accumsan nec. ',NULL,'$2a$10$WVYD7Zh4nW205NivSxxUKOmqu75wbjLgo4wHttzIsCp1xEwtnABUG',0,'helper',40.381008,-3.779788,'Avda Random 125, 3B','28044','Madrid','driver|picker|shopper|inmune','2020-04-26 11:18:26','2020-04-26 11:18:26'),(2,'Ivan2','Ugarte','ivan.ugarte.castro2@gmail.com',NULL,'$2a$10$LYyqMSgsCw9jVmI/CJeaduWX1F94pmuz2MTlqP0cj5vqG9bmHAkqW','653666666','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum sem et tellus suscipit, eget laoreet sapien blandit. Phasellus diam turpis, sollicitudin egestas lacus eu, pulvinar porta neque. Nullam tristique massa auctor odio vestibulum, id malesuada arcu fringilla. Vestibulum feugiat lobortis purus, ut venenatis mi accumsan nec. ',NULL,'$2a$10$QEFxYsrmXxa/YvrwgWtdxu6lcJgonSbNkoyUbOVgeI85Z.Ik49eV.',0,'inneed',40.382008,-3.778788,'Avda Random 125, 3B','28044','Madrid',NULL,'2020-04-26 11:19:43','2020-04-26 11:19:43'),(3,'Ivan3','Ugarte','ivan.ugarte.castro3@gmail.com',NULL,'$2a$10$Z8hzqpii7cm8IXYmItvxWu2.8hVhiHj3cG0yMHB9B9vSY27B1Ojkq','653666666','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum sem et tellus suscipit, eget laoreet sapien blandit. Phasellus diam turpis, sollicitudin egestas lacus eu, pulvinar porta neque. Nullam tristique massa auctor odio vestibulum, id malesuada arcu fringilla. Vestibulum feugiat lobortis purus, ut venenatis mi accumsan nec. ',NULL,'$2a$10$vVNtp/Zy0VrtpTGz3Aeag.BIX4TaeqPuLXF7luZXDQQM3iF9Wznii',0,'helper',40.382507,-3.778288,'Avda Random 125, 3B','28044','Madrid','driver|picker|shopper','2020-04-26 11:20:37','2020-04-26 11:20:37');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-26 18:23:31
