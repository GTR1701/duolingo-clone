-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2024 at 08:01 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `duolingo_clone`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `challengeoptions`
--

CREATE TABLE `challengeoptions` (
  `id` int(11) NOT NULL,
  `challengeId` int(11) NOT NULL,
  `text` varchar(191) NOT NULL,
  `correct` tinyint(1) NOT NULL,
  `imageSrc` varchar(191) DEFAULT NULL,
  `audioSrc` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `challengeoptions`
--

INSERT INTO `challengeoptions` (`id`, `challengeId`, `text`, `correct`, `imageSrc`, `audioSrc`) VALUES
(1, 1, 'el hombre', 1, '/boy.svg', '/es_man.mp3'),
(2, 1, 'la mujer', 0, '/girl.svg', '/es_woman.mp3'),
(3, 1, 'el zombie', 0, '/zombie.svg', '/es_zombie.mp3'),
(4, 4, 'el hombre', 1, '/boy.svg', '/es_man.mp3'),
(5, 4, 'la mujer', 0, '/girl.svg', '/es_woman.mp3'),
(6, 4, 'el zombie', 0, '/zombie.svg', '/es_zombie.mp3'),
(7, 5, 'el hombre', 0, '/boy.svg', '/es_man.mp3'),
(8, 5, 'la mujer', 0, '/girl.svg', '/es_woman.mp3'),
(9, 5, 'el zombie', 1, '/zombie.svg', '/es_zombie.mp3'),
(10, 6, 'el hombre', 1, '/boy.svg', '/es_man.mp3'),
(11, 6, 'la mujer', 0, '/girl.svg', '/es_woman.mp3'),
(12, 6, 'el zombie', 0, '/zombie.svg', '/es_zombie.mp3'),
(13, 7, 'el hombre', 1, '/boy.svg', '/es_man.mp3'),
(14, 7, 'la mujer', 0, '/girl.svg', '/es_woman.mp3'),
(15, 7, 'el zombie', 0, '/zombie.svg', '/es_zombie.mp3'),
(16, 8, 'el hombre', 0, '/boy.svg', '/es_man.mp3'),
(17, 8, 'la mujer', 0, '/girl.svg', '/es_woman.mp3'),
(18, 8, 'el zombie', 1, '/zombie.svg', '/es_zombie.mp3');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `challengeprogress`
--

CREATE TABLE `challengeprogress` (
  `id` int(11) NOT NULL,
  `challengeId` int(11) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `challenges`
--

CREATE TABLE `challenges` (
  `id` int(11) NOT NULL,
  `lessonId` int(11) NOT NULL,
  `type` varchar(191) NOT NULL,
  `question` varchar(191) NOT NULL,
  `order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`id`, `lessonId`, `type`, `question`, `order`) VALUES
(1, 1, 'SELECT', 'Which one of these is \"the man\"?', 1),
(4, 1, 'ASSIST', '\"the man\"', 2),
(5, 1, 'SELECT', 'Which one of these is \"the zombie\"?', 3),
(6, 3, 'SELECT', 'Which one of these is \"the man\"?', 1),
(7, 3, 'ASSIST', '\"the man\"', 2),
(8, 3, 'SELECT', 'Which one of these is \"the zombie\"?', 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `imageSrc` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `imageSrc`) VALUES
(1, 'Spanish', '/es.svg'),
(2, 'French', '/fr.svg'),
(3, 'Croatian', '/hr.svg'),
(4, 'Italian', '/it.svg'),
(5, 'Japanese', '/jp.svg');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `unitId` int(11) NOT NULL,
  `order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `title`, `unitId`, `order`) VALUES
(1, 'Nouns', 1, 1),
(3, 'Verbs', 1, 2),
(4, 'Adjectives', 1, 3),
(5, 'Pronouns', 1, 4),
(6, 'Adjectives', 1, 5),
(7, 'Pronouns', 1, 6);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `courseId` int(11) NOT NULL,
  `order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `title`, `description`, `courseId`, `order`) VALUES
(1, 'Unit 1', 'Learn the basics of Spanish', 1, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `userprogress`
--

CREATE TABLE `userprogress` (
  `userId` varchar(191) NOT NULL,
  `userName` varchar(191) NOT NULL DEFAULT 'User',
  `userImageSrc` varchar(191) NOT NULL DEFAULT '/mascot.svg',
  `activeCourseId` int(11) NOT NULL,
  `hearts` int(11) NOT NULL DEFAULT 5,
  `points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `userprogress`
--

INSERT INTO `userprogress` (`userId`, `userName`, `userImageSrc`, `activeCourseId`, `hearts`, `points`) VALUES
('user_2edqeLwxtM4pEQCRcTdLLuMQxVI', 'Dawid', 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZWRxZUtNT05oSVV0djJIajRWYlluMGdseXcifQ', 1, 3, 530);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `challengeoptions`
--
ALTER TABLE `challengeoptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ChallengeOptions_challengeId_fkey` (`challengeId`);

--
-- Indeksy dla tabeli `challengeprogress`
--
ALTER TABLE `challengeprogress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ChallengeProgress_challengeId_fkey` (`challengeId`);

--
-- Indeksy dla tabeli `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Challenges_lessonId_fkey` (`lessonId`);

--
-- Indeksy dla tabeli `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Lessons_unitId_fkey` (`unitId`);

--
-- Indeksy dla tabeli `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Units_courseId_fkey` (`courseId`);

--
-- Indeksy dla tabeli `userprogress`
--
ALTER TABLE `userprogress`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `UserProgress_activeCourseId_fkey` (`activeCourseId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `challengeoptions`
--
ALTER TABLE `challengeoptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `challengeprogress`
--
ALTER TABLE `challengeprogress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `challengeoptions`
--
ALTER TABLE `challengeoptions`
  ADD CONSTRAINT `ChallengeOptions_challengeId_fkey` FOREIGN KEY (`challengeId`) REFERENCES `challenges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `challengeprogress`
--
ALTER TABLE `challengeprogress`
  ADD CONSTRAINT `ChallengeProgress_challengeId_fkey` FOREIGN KEY (`challengeId`) REFERENCES `challenges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `challenges`
--
ALTER TABLE `challenges`
  ADD CONSTRAINT `Challenges_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `lessons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `Lessons_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `units` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `units`
--
ALTER TABLE `units`
  ADD CONSTRAINT `Units_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userprogress`
--
ALTER TABLE `userprogress`
  ADD CONSTRAINT `UserProgress_activeCourseId_fkey` FOREIGN KEY (`activeCourseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
