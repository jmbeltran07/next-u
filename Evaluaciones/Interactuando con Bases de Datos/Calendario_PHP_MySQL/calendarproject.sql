-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2018 at 11:15 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `calendarproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(32) NOT NULL,
  `title` varchar(32) NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date DEFAULT NULL,
  `is_full_day` tinyint(1) NOT NULL,
  `email` varchar(32) NOT NULL,
  `starthour` time NOT NULL,
  `endhour` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `events`
--

--INSERT INTO `events` (`id`, `title`, `startdate`, `enddate`, `is_full_day`, `email`, `starthour`, `endhour`) VALUES
--(12, 'evento prueba', '2018-06-29', '2018-06-29', 0, 'jose.beltran@gmail.com', '05:00:00', '07:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(32) NOT NULL,
  `fullname` varchar(64) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthday` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

--INSERT INTO `users` (`email`, `fullname`, `password`, `birthday`) VALUES
--('jose.beltran@gmail.com', 'jose beltran', '$2y$10$MbUP1ccaIE2YHjpJZLlnuOHSl.ga6U1wNu7kvBtxGIGLdq9KOYRcO', '1991-03-07'),
--('juan.gomez@gmail.com', 'juan gomez', '$2y$10$rqI1t0k5olMWDCdpGWQ9E.c3SeI3ebQnMc2APs8mBkDJb2VLVZhHO', '1991-03-12'),
--('paco.perez@gmail.com', 'francisco perez', '$2y$10$KRS8PEf6crnUpaM4lGuPveLg7zwQ0tmwQy9K1L9CCEVdyQKtXWPOa', '1990-09-14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
