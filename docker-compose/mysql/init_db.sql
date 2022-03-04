-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 03/03/2022 às 03:54
-- Versão do servidor: 10.5.12-MariaDB-cll-lve
-- Versão do PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `u212360942_comporplay`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `albums`
--

CREATE TABLE `albums` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `release_date` date NOT NULL,
  `artist_id` int(11) NOT NULL,
  `created_by` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `genre_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isProduct` tinyint(1) NOT NULL DEFAULT 0,
  `isExclusive` tinyint(1) NOT NULL DEFAULT 0,
  `isExplicit` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `spotify_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `soundcloud_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itunes_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deezer_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `album_artist`
--

CREATE TABLE `album_artist` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `artist_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `artists`
--

CREATE TABLE `artists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `avatar` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `funds` double(8,2) NOT NULL DEFAULT 0.00,
  `firstname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `displayname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `available_disk_space` bigint(20) NOT NULL DEFAULT 500,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `spotify_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `soundcloud_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itunes_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deezer_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `artist_song`
--

CREATE TABLE `artist_song` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `artist_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `song_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `chats`
--

CREATE TABLE `chats` (
  `id` int(10) UNSIGNED NOT NULL,
  `message_id` int(10) UNSIGNED NOT NULL,
  `session_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `read_at` datetime DEFAULT NULL,
  `type` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `episodes`
--

CREATE TABLE `episodes` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `source` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `download_count` bigint(20) NOT NULL DEFAULT 0,
  `source_format` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `podcast_id` int(11) NOT NULL,
  `file_size` bigint(20) DEFAULT NULL,
  `file_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` int(10) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `follows`
--

CREATE TABLE `follows` (
  `followed_source` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `followed_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `followed_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `friendships`
--

CREATE TABLE `friendships` (
  `id` int(10) UNSIGNED NOT NULL,
  `friend_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `genres`
--

CREATE TABLE `genres` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `genres`
--

INSERT INTO `genres` (`id`, `name`, `slug`, `cover`, `icon`, `created_at`, `updated_at`) VALUES
(11, 'SERTANEJO', 'sertanejo', '{\"path\":\"\\/covers\\/genres\\/756039694podcast-art.png\",\"disk\":\"public\",\"url\":null}', NULL, '2022-01-14 20:11:02', '2022-02-08 02:46:44'),
(12, 'FORRÓ', 'forr', '{\"path\":\"\\/covers\\/genres\\/49660535podcast-comedy.png\",\"disk\":\"public\",\"url\":null}', NULL, '2022-01-14 20:12:17', '2022-02-08 02:47:20'),
(13, 'PISADINHA', 'pisadinha', '{\"path\":\"\\/covers\\/genres\\/500165076podcast-fiction.png\",\"disk\":\"public\",\"url\":null}', NULL, '2022-01-14 20:12:29', '2022-02-08 02:47:43'),
(14, 'GOSPEL', 'gospel', '{\"path\":\"\\/covers\\/genres\\/478490528podcast-news.png\",\"disk\":\"public\",\"url\":null}', NULL, '2022-01-14 20:12:41', '2022-02-08 02:48:12'),
(15, 'FUNK', 'funk', '{\"path\":\"\\/covers\\/genres\\/321043766podcast-health.png\",\"disk\":\"public\",\"url\":null}', NULL, '2022-02-08 02:48:36', '2022-02-08 02:48:36'),
(16, 'POP / ROCK', 'pop--rock', '{\"path\":\"\\/covers\\/genres\\/321370088podcast-gaming.png\",\"disk\":\"public\",\"url\":null}', NULL, '2022-02-08 02:49:31', '2022-02-08 02:49:31');

-- --------------------------------------------------------

--
-- Estrutura para tabela `genre_podcast`
--

CREATE TABLE `genre_podcast` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `podcast_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `genre_song`
--

CREATE TABLE `genre_song` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `song_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `languages`
--

CREATE TABLE `languages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL,
  `flag` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isDeletable` tinyint(1) NOT NULL DEFAULT 1,
  `isDefault` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `languages`
--

INSERT INTO `languages` (`id`, `name`, `locale`, `status`, `flag`, `isDeletable`, `isDefault`, `created_at`, `updated_at`) VALUES
(1, 'Brasil', 'en', 1, 'usa', 0, 1, '2022-01-14 20:09:04', '2022-02-08 01:31:23'),
(2, 'Español', 'es', -1, 'spain', 0, 0, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(3, 'Français', 'fr', -1, 'france', 0, 0, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(4, 'Deutsch', 'de', -1, 'germany', 0, 0, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(5, 'العربية', 'ar', -1, 'uae', 0, 0, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(6, 'हिंदी', 'hi', -1, 'india', 0, 0, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(7, 'Italiano', 'it', -1, 'italy', 0, 0, '2022-01-14 20:09:04', '2022-01-14 20:09:04');

-- --------------------------------------------------------

--
-- Estrutura para tabela `likes`
--

CREATE TABLE `likes` (
  `content_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_source` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ltm_translations`
--

CREATE TABLE `ltm_translations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `locale` varchar(191) COLLATE utf8mb4_bin NOT NULL,
  `group` varchar(191) COLLATE utf8mb4_bin NOT NULL,
  `key` text COLLATE utf8mb4_bin NOT NULL,
  `value` text COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Despejando dados para a tabela `ltm_translations`
--

INSERT INTO `ltm_translations` (`id`, `status`, `locale`, `group`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 0, 'en', '_json', 'Monetizing', 'Monetização', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(2, 0, 'en', '_json', 'Content', 'Categorias', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(3, 0, 'en', '_json', 'Analytics', 'Análise', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(4, 0, 'en', '_json', 'Translations', 'Traduções', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(5, 0, 'en', '_json', 'Settings', 'Configurações', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(6, 0, 'en', '_json', 'Members', 'Membros', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(7, 0, 'en', '_json', 'Indie', 'Indie', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(8, 0, 'en', '_json', 'Hip Hop', 'Hip-hop', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(9, 0, 'en', '_json', 'Classical', 'Clássico', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(10, 0, 'en', '_json', 'K Pop', 'K-pop', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(11, 0, 'en', '_json', 'Jazz', 'Jazz', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(12, 0, 'en', '_json', 'Chill', 'Frio', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(13, 0, 'en', '_json', 'Piano', 'Piano', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(14, 0, 'en', '_json', 'Gaming', 'Jogos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(15, 0, 'en', '_json', 'Electronic', 'Eletrônico', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(16, 0, 'en', '_json', 'Charts', 'Gráficos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(17, 0, 'en', '_json', 'Genres & Moods', 'Gêneros e humores', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(18, 0, 'en', '_json', 'Explore and listen to various genres & moods', 'Explore e ouça vários gêneros e humores', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(19, 0, 'en', '_json', 'Search', 'Procurar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(20, 0, 'en', '_json', 'There is no content to be displayed', 'Não há conteúdo a ser exibido', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(21, 0, 'en', '_json', 'No content!', 'Sem conteúdo!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(22, 0, 'en', '_json', 'Friends', 'Amigos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(23, 0, 'en', '_json', 'Explore', 'Explorar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(24, 0, 'en', '_json', 'Explore & enjoy listening to music', 'Explore e divirta-se ouvindo música', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(25, 0, 'en', '_json', 'Most played songs', 'Músicas mais tocadas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(26, 0, 'en', '_json', 'No data to show yet!', 'Ainda não há dados para mostrar!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(27, 0, 'en', '_json', 'Top Visiting Countries', 'Principais países visitantes', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(28, 0, 'en', '_json', 'Interval', 'Intervalo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(29, 0, 'en', '_json', 'Number of plays per interval', 'Número de jogadas por intervalo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(30, 0, 'en', '_json', 'New this month', 'Novidade este mês', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(31, 0, 'en', '_json', 'Save Changes', 'Salvar alterações', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(32, 0, 'en', '_json', 'Appearance', 'Aparência', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(33, 0, 'en', '_json', 'Configuration', 'Configuração', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(34, 0, 'en', '_json', 'Podcast Genres', 'Gêneros de podcast', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(35, 0, 'en', '_json', 'Song Genres', 'Gêneros de música', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(36, 0, 'en', '_json', 'Podcasts', 'Podcasts', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(37, 0, 'en', '_json', 'Playlists', 'Listas de reprodução', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(38, 0, 'en', '_json', 'Songs', 'Músicas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(39, 0, 'en', '_json', 'Albums', 'Álbuns', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(40, 0, 'en', '_json', 'Pages', 'Páginas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(41, 0, 'en', '_json', 'Your credentials are incorrect. Please try again', 'Suas credenciais estão incorretas. Por favor, tente novamente.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(42, 0, 'en', '_json', 'Account already exists', 'Essa conta já existe.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(43, 0, 'en', '_json', 'Logged out successfully', 'Desconectado com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(44, 0, 'en', '_json', 'Latest Podcasts', 'Últimos podcasts', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(45, 0, 'en', '_json', 'Popular Podcasts', 'Podcasts populares', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(46, 0, 'en', '_json', 'Login', 'Conecte-se', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(47, 0, 'en', '_json', 'Logout', 'Sair', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(48, 0, 'en', '_json', 'Light Mode', 'Modo de luz', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(49, 0, 'en', '_json', 'Dark Mode', 'Modo escuro', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(50, 0, 'en', '_json', 'Upgrade', 'Melhoria', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(51, 0, 'en', '_json', 'Friend Requests', 'Pedidos de amizade', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(52, 0, 'en', '_json', 'New Releases', 'Novos lançamentos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(53, 0, 'en', '_json', 'Plans', 'Planos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(54, 0, 'en', '_json', 'Subscriptions', 'Assinaturas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(55, 0, 'en', '_json', 'Advertisements', 'Anúncios', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(56, 0, 'en', '_json', 'New Translation', 'Nova tradução', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(57, 0, 'en', '_json', 'Add', 'Adicionar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(58, 0, 'en', '_json', 'Top', 'Principal', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(59, 0, 'en', '_json', 'Artists', 'Compositores', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(60, 0, 'en', '_json', 'Users', 'Usuário', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(61, 0, 'en', '_json', 'Roles', 'Funções', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(62, 0, 'en', '_json', 'Last Year', 'Ano passado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(63, 0, 'en', '_json', 'Last Month', 'Mês passado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(64, 0, 'en', '_json', 'Last 7 days', 'Últimos 7 dias', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(65, 0, 'en', '_json', 'Popular', 'Popular', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(66, 0, 'en', '_json', 'Top Visiting Browsers', 'Navegadores mais visitados', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(67, 0, 'en', '_json', 'Queue', 'Fila', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(68, 0, 'en', '_json', 'Download', 'Download', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(69, 0, 'en', '_json', 'Play Speed', 'Velocidade de reprodução', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(70, 0, 'en', '_json', 'Next', 'Próximo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(71, 0, 'en', '_json', 'Pause', 'Pausa', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(72, 0, 'en', '_json', 'Rewind', 'Retroceder', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(73, 0, 'en', '_json', 'Previous', 'Anterior', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(74, 0, 'en', '_json', 'Shuffle', 'Embaralhar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(75, 0, 'en', '_json', 'Loop', 'Laço', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(76, 0, 'en', '_json', 'Play', 'Toque', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(77, 0, 'en', '_json', 'Dislike', 'Não gosto', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(78, 0, 'en', '_json', 'No', 'Não', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(79, 0, 'en', '_json', 'Yes', 'sim', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(80, 0, 'en', '_json', 'podcast', 'podcast', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(81, 0, 'en', '_json', 'episode', 'episódio', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(82, 0, 'en', '_json', 'album', 'álbum', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(83, 0, 'en', '_json', 'Listening to', 'Ouvindo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(84, 0, 'en', '_json', 'from', 'a partir de', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(85, 0, 'en', '_json', 'by', 'por', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(86, 0, 'en', '_json', 'Are you sure you wanna be a friend with', 'Are you sure you wanna be a friend with', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(87, 0, 'en', '_json', 'You seem to be having no friends. Add some!', 'Parece que você não tem amigos. Adicione alguns!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(88, 0, 'en', '_json', 'No Friends!', 'Sem amigos!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(89, 0, 'en', '_json', 'Unfriend', 'Desfazer amizade', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(90, 0, 'en', '_json', 'Listen', 'Ouvir', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(91, 0, 'en', '_json', 'Chat', 'Bate-papo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(92, 0, 'en', '_json', 'Profile', 'Perfil', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(93, 0, 'en', '_json', 'Are you sure you wanna block', 'Tem certeza que quer bloquear', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(94, 0, 'en', '_json', 'Block', 'Quadra', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(95, 0, 'en', '_json', 'Cancel', 'Cancelar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(96, 0, 'en', '_json', 'Seen', 'Visto', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(97, 0, 'en', '_json', 'Unblock', 'Desbloquear', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(98, 0, 'en', '_json', 'You can no longer chat with this person.', 'Você não pode mais conversar com esta pessoa.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(99, 0, 'en', '_json', 'Just Now', 'Agora mesmo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(100, 0, 'en', '_json', 'Sign Up', 'Inscrever-se', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(101, 0, 'en', '_json', 'Name', 'Nome', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(102, 0, 'en', '_json', 'Password', 'Senha', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(103, 0, 'en', '_json', 'Reset your password', 'Reset your password', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(104, 0, 'en', '_json', 'Enter your login email', 'Digite seu e-mail de login', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(105, 0, 'en', '_json', 'Login to your account', 'Faça login na sua conta', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(106, 0, 'en', '_json', 'Remember you password?', 'Lembra da sua senha?', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(107, 0, 'en', '_json', 'Email', 'E-mail', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(108, 0, 'en', '_json', 'Logging in...', 'Fazendo login...', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(109, 0, 'en', '_json', 'Password does not match!', 'Senha não corresponde!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(110, 0, 'en', '_json', 'Please enter a valid email.', 'Por favor digite um email válido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(111, 0, 'en', '_json', 'Min 6 characters.', 'Mínimo 6 caracteres.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(112, 0, 'en', '_json', 'Required.', 'Requeridos.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(113, 0, 'en', '_json', 'Confirm Password', 'Confirme a Senha', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(114, 0, 'en', '_json', 'At least 6 characters', 'Pelo menos 6 caracteres', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(115, 0, 'en', '_json', 'Create An Account', 'Crie a sua conta aqui', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(116, 0, 'en', '_json', 'Forgot your password?', 'Esqueceu sua senha?', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(117, 0, 'en', '_json', 'Open New Account', 'Abrir nova conta', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(118, 0, 'en', '_json', 'Complete Sign Up', 'Concluir inscrição', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(119, 0, 'en', '_json', 'Or', 'Ou', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(120, 0, 'en', '_json', 'Account created successfully. You can login now.', 'Conta criada com sucesso. Você pode entrar agora.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(121, 0, 'en', '_json', 'Already have an account?', 'já tem uma conta?', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(122, 0, 'en', '_json', 'Sign In', 'Entrar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(123, 0, 'en', '_json', 'You do not have an account yet?', 'Você ainda não tem uma conta?', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(124, 0, 'en', '_json', 'Password reset successfully. Redirecting to login...', 'Redefinição de senha com sucesso. Redirecionando para login...', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(125, 0, 'en', '_json', 'Reset', 'Redefinir', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(126, 0, 'en', '_json', 'Private', 'Privado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(127, 0, 'en', '_json', 'Public', 'Público', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(128, 0, 'en', '_json', 'Playlist Name', 'Nome da lista de reprodução', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(129, 0, 'en', '_json', 'Edit Playlist', 'Editar lista de reprodução', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(130, 0, 'en', '_json', 'Pick', 'Escolher', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(131, 0, 'en', '_json', 'Crop Image', 'Cortar imagem', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(132, 0, 'en', '_json', 'Create Playlist', 'Criar lista de reprodução', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(133, 0, 'en', '_json', 'Create', 'Crio', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(134, 0, 'en', '_json', 'Start typing to search', 'Comece a digitar para pesquisar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(135, 0, 'en', '_json', 'Search Song', 'Pesquisar música', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(136, 0, 'en', '_json', 'No playlists!', 'Sem listas de reprodução!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(137, 0, 'en', '_json', 'New Playlist', 'Nova Playlist', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(138, 0, 'en', '_json', 'Choose Playlist', 'Escolha a lista de reprodução', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(139, 0, 'en', '_json', 'updated successfully!', 'Atualizado com sucesso!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(140, 0, 'en', '_json', 'Song Deleted!', 'Música excluída!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(141, 0, 'en', '_json', 'Are you sure you wanna delete this song?', 'Tem certeza de que deseja excluir esta música?', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(142, 0, 'en', '_json', 'Delete', 'Excluir', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(143, 0, 'en', '_json', 'Make Private', 'Tornar privado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(144, 0, 'en', '_json', 'Make Public', 'Tornar público', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(145, 0, 'en', '_json', 'Title', 'Título', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(146, 0, 'en', '_json', 'Are you sure you wanna make this song private? This means that it\'s gonna be visible only for you.', 'Tem certeza de que deseja tornar esta música privada? Isso significa que ele ficará visível apenas para você.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(147, 0, 'en', '_json', 'Are you sure you wanna make this song public? This means that it\'s gonna be visible on your profile.', 'Tem certeza de que quer tornar esta música pública? Isso significa que ele ficará visível em seu perfil.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(148, 0, 'en', '_json', 'has been removed from playlist successfully!', 'foi removido da playlist com sucesso!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(149, 0, 'en', '_json', 'Are you sure you wanna remove this song from this playlist?', 'Tem certeza de que deseja remover esta música desta playlist?', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(150, 0, 'en', '_json', 'Remove song from playlist', 'Remover música da lista de reprodução', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(151, 0, 'en', '_json', 'Song already exists on this playlist!', 'A música já existe nesta playlist!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(152, 0, 'en', '_json', 'Already There!', 'Já está lá!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(153, 0, 'en', '_json', 'New', 'Novo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(154, 0, 'en', '_json', 'There are no results found for this search keyword.', 'Não foram encontrados resultados para esta palavra-chave de pesquisa.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(155, 0, 'en', '_json', 'Logo Image', 'Imagem do logotipo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(156, 0, 'en', '_json', 'Please choose an image', 'Por favor, escolha uma imagem', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(157, 0, 'en', '_json', 'Image must be less then', 'A imagem deve ser menor que', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(158, 0, 'en', '_json', 'Choose Image', 'Escolha a imagem', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(159, 0, 'en', '_json', 'Latest Song', 'Música mais recente', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(160, 0, 'en', '_json', 'By', 'Por', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(161, 0, 'en', '_json', 'Empty!', 'Vazio!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(162, 0, 'en', '_json', 'This playlist has no songs.', 'Esta lista de reprodução não tem músicas.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(163, 0, 'en', '_json', 'You need to copy the URL manually.', 'Você precisa copiar o URL manualmente.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(164, 0, 'en', '_json', 'Oops!', 'Ops!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(165, 0, 'en', '_json', 'URL copied to clipboard.', 'URL copiado para a área de transferência.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(166, 0, 'en', '_json', 'Add To Playlist', 'Adicionar à Playlist', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(167, 0, 'en', '_json', 'Add To Queue', 'Adicionar à fila', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(168, 0, 'en', '_json', 'Go To Artist', 'Ir para o Compositor', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(169, 0, 'en', '_json', 'Share', 'Compartilhado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(170, 0, 'en', '_json', 'Copy URL', 'Copiar URL', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(171, 0, 'en', '_json', 'Copy to clipboard', 'Copiar para área de transferência', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(172, 0, 'en', '_json', 'Total Plays', 'Total de Reproduções', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(173, 0, 'en', '_json', 'Followers', 'Seguidores', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(174, 0, 'en', '_json', 'Cover', 'Cobrir', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(175, 0, 'en', '_json', 'Plays', 'Tocam', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(176, 0, 'en', '_json', 'Created At', 'Criado em', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(177, 0, 'en', '_json', 'Likes', 'Gostos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(178, 0, 'en', '_json', 'Updated', 'Atualizada', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(179, 0, 'en', '_json', 'Created', 'Criado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(180, 0, 'en', '_json', 'Saved', 'Salvou', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(181, 0, 'en', '_json', 'Deleted.', 'Excluído.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(182, 0, 'en', '_json', 'Are you sure you wanna delete this', 'Are you sure you wanna delete this', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(183, 0, 'en', '_json', 'Fetching data...', 'Fetching data...', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(184, 0, 'en', '_json', 'Error', 'Erro', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(185, 0, 'en', '_json', 'Success', 'Sucesso', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(186, 0, 'en', '_json', 'Artist account', 'Conta de Compositor', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(187, 0, 'en', '_json', 'This name will be displayed on your profile.', 'Este nome será exibido em seu perfil.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(188, 0, 'en', '_json', 'Displayname', 'Nome em Exibição', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(189, 0, 'en', '_json', 'Lastname', 'Último nome', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(190, 0, 'en', '_json', 'This is a private information.', 'Esta é uma informação privada.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(191, 0, 'en', '_json', 'Firstname', 'Primeiro nome', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(192, 0, 'en', '_json', 'Firstly, fill your information', 'Primeiramente, preencha seus dados', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(193, 0, 'en', '_json', 'Welcome to your artist account', 'Bem-vindo à sua conta de Compositor', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(194, 0, 'en', '_json', 'Rank', 'Classificação', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(195, 0, 'en', '_json', 'Empty Section', 'Seção vazia', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(196, 0, 'en', '_json', 'No Data!', 'Sem dados!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(197, 0, 'en', '_json', 'Use Default', 'Use o padrão', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(198, 0, 'en', '_json', 'Deleted', 'Excluído', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(199, 0, 'en', '_json', 'Operations', 'Operações', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(200, 0, 'en', '_json', 'Podcasts are disabled.', 'Os podcasts estão desativados.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(201, 0, 'en', '_json', 'Edit Personal Information', 'Editar informações pessoais', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(202, 0, 'en', '_json', 'Released At', 'Lançado em', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(203, 0, 'en', '_json', 'Personal Information', 'Informação pessoal', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(204, 0, 'en', '_json', 'Nothing New!', 'Nada de novo!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(205, 0, 'en', '_json', 'You do not have any new notifications.', 'Você não tem novas notificações.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(206, 0, 'en', '_json', 'Settings reset successfully!', 'As configurações foram redefinidas com sucesso!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(207, 0, 'en', '_json', 'Are you sure you wanna reset to the default settings?', 'Tem certeza de que deseja redefinir para as configurações padrão?', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(208, 0, 'en', '_json', 'You need to enter your Google OAuth client ID.', 'Você precisa inserir seu ID de cliente do Google OAuth.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(209, 0, 'en', '_json', 'You need to add your Pusher credentials if you enable chatting.', 'Você precisa adicionar suas credenciais do Pusher se ativar o bate-papo.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(210, 0, 'en', '_json', 'Are you sure you wanna change to the current settings?', 'Tem certeza de que deseja alterar para as configurações atuais?', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(211, 0, 'en', '_json', 'SEO', 'SEO', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(212, 0, 'en', '_json', 'Auth', 'Autenticação', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(213, 0, 'en', '_json', 'Storage', 'Armazenar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(214, 0, 'en', '_json', 'Billing', 'Cobrança', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(215, 0, 'en', '_json', 'General', 'Em geral', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(216, 0, 'en', '_json', 'Preview', 'Visualizar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(217, 0, 'en', '_json', 'Positions', 'Cargos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(218, 0, 'en', '_json', 'Outlined', 'Delineado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(219, 0, 'en', '_json', 'Must be a material design icon', 'Deve ser um ícone de design de materiais', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(220, 0, 'en', '_json', 'Subscription Button', 'Botão de assinatura', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(221, 0, 'en', '_json', 'Images & Icons', 'Imagens e ícones', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(222, 0, 'en', '_json', 'Dark', 'Escuro', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(223, 0, 'en', '_json', 'Light', 'Leve', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(224, 0, 'en', '_json', 'Default Theme', 'Tema Padrão', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(225, 0, 'en', '_json', 'Home Page', 'Pagina inicial', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(226, 0, 'en', '_json', 'Themes', 'Temas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(227, 0, 'en', '_json', 'Navigation', 'Navegação', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(228, 0, 'en', '_json', 'Landing', 'Aterrissagem', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(229, 0, 'en', '_json', 'Call to action button', 'Botão de chamada para ação', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(230, 0, 'en', '_json', 'Header Title', 'Título do cabeçalho', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(231, 0, 'en', '_json', 'Header Subtitle', 'Legenda do cabeçalho', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(232, 0, 'en', '_json', 'Background Image', 'Imagem de fundo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(233, 0, 'en', '_json', 'Change', 'Mudar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(234, 0, 'en', '_json', 'Image', 'Imagem', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(235, 0, 'en', '_json', 'Show Contact Us form', 'Mostrar formulário de contato', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(236, 0, 'en', '_json', 'Description', 'Descrição', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(237, 0, 'en', '_json', 'Footer Background', 'Fundo do rodapé', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(238, 0, 'en', '_json', 'Use a custom landing header', 'Use um cabeçalho de destino personalizado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(239, 0, 'en', '_json', 'Use Muzzie\'s default landing header', 'Use o cabeçalho de destino padrão do Muzzie', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(240, 0, 'en', '_json', 'Are you sure you wanna reset to default settings?', 'Tem certeza de que deseja redefinir as configurações padrão?', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(241, 0, 'en', '_json', 'Sections', 'Seções', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(242, 0, 'en', '_json', 'Header', 'Cabeçalho', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(243, 0, 'en', '_json', 'Footer', 'Rodapé', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(244, 0, 'en', '_json', 'Make sure to add your SMTP credentials in the Email settings.', 'Certifique-se de adicionar suas credenciais SMTP nas configurações de e-mail.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(245, 0, 'en', '_json', 'Background Layer Color', 'Cor da camada de fundo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(246, 0, 'en', '_json', 'Landing Page', 'Página de destino', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(247, 0, 'en', '_json', 'Enable Landing Page', 'Ativar página de destino', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(248, 0, 'en', '_json', 'The welcome page. Disable if you want the visitors to access the player directly.', 'A página de boas-vindas. Desative se quiser que os visitantes acessem o player diretamente.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(249, 0, 'en', '_json', 'New Item', 'Novo item', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(250, 0, 'en', '_json', 'This is the sidebar of the player. You can customize almost everything: Icon, text, and destination.', 'Esta é a barra lateral do player. Você pode personalizar quase tudo: ícone, texto e destino.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(251, 0, 'en', '_json', 'Sidebar', 'Barra Lateral', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(252, 0, 'en', '_json', 'Select Page', 'Selecionar página', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(253, 0, 'en', '_json', 'Navigates to', 'Navega para', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(254, 0, 'en', '_json', 'Text Color', 'Cor do texto', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(255, 0, 'en', '_json', 'Chat, Friendlist...etc', 'Bate-papo, lista de amigos... etc', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(256, 0, 'en', '_json', 'Panel Color', 'Cor do painel', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(257, 0, 'en', '_json', 'For gradients with Prim. Color( Ex: progress bar of the player)', 'Para gradientes com Prim. Cor(Ex: barra de progresso do player)', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(258, 0, 'en', '_json', 'Secondary Color', 'Cor Secundária', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(259, 0, 'en', '_json', 'For buttons,icons, nav items, active items...', 'Para botões, ícones, itens de navegação, itens ativos...', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(260, 0, 'en', '_json', 'Primary Color', 'Cor primária', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(261, 0, 'en', '_json', 'Colors', 'Cores', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(262, 0, 'en', '_json', 'Gateway', 'Porta de entrada', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(263, 0, 'en', '_json', 'Enable Billing', 'Ativar faturamento', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(264, 0, 'en', '_json', 'Authentication', 'Autenticação', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(265, 0, 'en', '_json', 'Require authentication will force visitors to authenticate.', 'Exigir autenticação forçará os visitantes a se autenticarem.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(266, 0, 'en', '_json', 'Last Update', 'Última atualização', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(267, 0, 'en', '_json', 'Plan', 'Plano', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(268, 0, 'en', '_json', 'Avatar', 'Avatar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(269, 0, 'en', '_json', 'User Account', 'Conta de usuário', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(270, 0, 'en', '_json', 'Saved successfully.', 'Salvo com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(271, 0, 'en', '_json', 'Bottom of right-sidebar', 'Parte inferior da barra lateral direita', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(272, 0, 'en', '_json', 'Top of the right-sidebar', 'Parte superior da barra lateral direita', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(273, 0, 'en', '_json', 'Top of content pages', 'Parte superior das páginas de conteúdo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(274, 0, 'en', '_json', 'Bottom of content pages', 'Parte inferior das páginas de conteúdo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(275, 0, 'en', '_json', 'Generated', 'Gerado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(276, 0, 'en', '_json', 'Generate', 'Gerar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(277, 0, 'en', '_json', 'Page', 'Página', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(278, 0, 'en', '_json', 'Site Description', 'Descrição do Site', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(279, 0, 'en', '_json', 'Site Title', 'titulo do site', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(280, 0, 'en', '_json', 'will be replaced with', 'será substituído por', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(281, 0, 'en', '_json', 'Quick Guide', 'Guia rápido', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(282, 0, 'en', '_json', 'reset successfully.', 'redefinir com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(283, 0, 'en', '_json', 'Please add a valid Google OAuth Client ID.', 'Adicione um ID de cliente válido do Google OAuth.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(284, 0, 'en', '_json', 'Please add your billing credentials.', 'Adicione suas credenciais de cobrança.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(285, 0, 'en', '_json', 'You need to add your SMTP information.', 'Você precisa adicionar suas informações de SMTP.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(286, 0, 'en', '_json', 'Mail From Name', 'Correio do nome', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(287, 0, 'en', '_json', 'Mail From Address', 'Endereço de correio', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(288, 0, 'en', '_json', 'Contact Email Address', 'Endereço de e-mail de contato', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(289, 0, 'en', '_json', 'Enable Emails', 'Ativar e-mails', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(290, 0, 'en', '_json', 'Max file size allowed', 'Tamanho máximo de arquivo permitido', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(291, 0, 'en', '_json', 'Max image size allowed', 'Tamanho máximo da imagem permitido', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(292, 0, 'en', '_json', 'Available disk space for users', 'Espaço em disco disponível para usuários', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(293, 0, 'en', '_json', 'Available disk space for artists', 'Espaço em disco disponível para Compositores', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(294, 0, 'en', '_json', 'Local Storage', 'Armazenamento local', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(295, 0, 'en', '_json', 'Default Artist Disk Space', 'Espaço em disco padrão do Compositor', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(296, 0, 'en', '_json', 'Max Image Size', 'Tamanho máximo da imagem', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(297, 0, 'en', '_json', 'Default User Disk Space', 'Espaço em disco do usuário padrão', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(298, 0, 'en', '_json', 'Credentials', 'Credenciais', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(299, 0, 'en', '_json', 'Storage Disk', 'Disco de armazenamento', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(300, 0, 'en', '_json', 'Key', 'Chave', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(301, 0, 'en', '_json', 'Translation', 'Tradução', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(302, 0, 'en', '_json', 'Select a similar language to fill the translations. You can leave it empty.', 'Selecione um idioma semelhante para preencher as traduções. Você pode deixá-lo vazio.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(303, 0, 'en', '_json', 'Select Similar Language', 'Selecionar idioma semelhante', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(304, 0, 'en', '_json', 'Add New Language', 'Adicionar novo idioma', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(305, 0, 'en', '_json', 'Edit Language', 'Editar idioma', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(306, 0, 'en', '_json', 'Update', 'Atualizar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(307, 0, 'en', '_json', 'Deactivated', 'Desativado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(308, 0, 'en', '_json', 'Activated', 'ativado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(309, 0, 'en', '_json', 'Default', 'Padrão', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(310, 0, 'en', '_json', 'New Language', 'Nova linguagem', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(311, 0, 'en', '_json', 'Subscription cancelled successfully.', 'Assinatura cancelada com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(312, 0, 'en', '_json', 'Cancelled', 'Cancelado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(313, 0, 'en', '_json', 'Subscription', 'Inscrição', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(314, 0, 'en', '_json', 'Owner', 'Proprietário', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(315, 0, 'en', '_json', 'Status', 'Status', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(316, 0, 'en', '_json', 'Renews At', 'Renova em', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(317, 0, 'en', '_json', 'Downloads', 'Transferências', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(318, 0, 'en', '_json', 'Are you sure you wanna save the current permissions?', 'Tem certeza de que deseja salvar as permissões atuais?', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(319, 0, 'en', '_json', 'Edit', 'Editar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(320, 0, 'en', '_json', 'Permission', 'Permissão', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(321, 0, 'en', '_json', 'Permissions', 'Permissões', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(322, 0, 'en', '_json', 'Roles reset successfully.', 'As funções foram redefinidas com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(323, 0, 'en', '_json', 'Podcast', 'Podcast', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(324, 0, 'en', '_json', 'Playlist', 'Lista de reprodução', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(325, 0, 'en', '_json', 'Chats', 'Bate-papo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(326, 0, 'en', '_json', 'Opening chat...Please wait!', 'Abrindo bate-papo...Aguarde!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(327, 0, 'en', '_json', 'No chats to show!', 'Nenhum bate-papo para mostrar!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(328, 0, 'en', '_json', 'Add some friends and start chatting!', 'Adicione alguns amigos e comece a conversar!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(329, 0, 'en', '_json', 'Discard', 'Descartar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(330, 0, 'en', '_json', 'Are you sure you wanna quit without saving the changes?', 'Tem certeza de que deseja sair sem salvar as alterações?', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(331, 0, 'en', '_json', 'used already.', 'já usado.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(332, 0, 'en', '_json', 'Amount', 'Montante', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(333, 0, 'en', '_json', 'Storage Space', 'Espaço de armazenamento', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(334, 0, 'en', '_json', 'Background Color', 'Cor de fundo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(335, 0, 'en', '_json', 'You do not have any new requests.', 'Você não tem novas solicitações.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(336, 0, 'en', '_json', 'Are you sure you wanna unfriend', 'Tem certeza de que quer desfazer amizade', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(337, 0, 'en', '_json', 'Are you sure you wanna make this playlist private? This means that it\'s gonna be visible only for you.', 'Tem certeza de que deseja tornar esta playlist privada? Isso significa que ele ficará visível apenas para você.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(338, 0, 'en', '_json', 'Are you sure you wanna make this playlist public? This means that it\'s gonna be visible on your profile.', 'Tem certeza de que deseja tornar esta playlist pública? Isso significa que ele ficará visível em seu perfil.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(339, 0, 'en', '_json', 'Are you sure you wanna delete this playlist?', 'Tem certeza de que deseja excluir esta playlist?', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(340, 0, 'en', '_json', 'My followed Playlists', 'Minhas listas de reprodução seguidas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(341, 0, 'en', '_json', 'My Playlists', 'Minhas listas de reprodução', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(342, 0, 'en', '_json', 'No Playlists!', 'Sem listas de reprodução!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(343, 0, 'en', '_json', 'This page is empty.', 'Esta página está vazia.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(344, 0, 'en', '_json', 'My Likes', 'Minhas curtidas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(345, 0, 'en', '_json', 'You did not follow any artist yet!', 'Você ainda não seguiu nenhum Compositor!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(346, 0, 'en', '_json', 'No artists!', 'Sem Compositores!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(347, 0, 'en', '_json', 'Followed Artists', 'Compositores seguidos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(348, 0, 'en', '_json', 'No likes yet!', 'Sem curtidas ainda!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(349, 0, 'en', '_json', 'Liked Albums', 'Álbuns de que gostou', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(350, 0, 'en', '_json', 'Explore and listen to various genres & moods.', 'Explore e ouça vários gêneros e humores.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(351, 0, 'en', '_json', 'Browse', 'Navegar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(352, 0, 'en', '_json', 'Looks like there is no content yet for this genre.', 'Parece que ainda não há conteúdo para este gênero.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(353, 0, 'en', '_json', 'Some server error has occurred. Try again later.', 'Ocorreu algum erro de servidor. Tente mais tarde.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(354, 0, 'en', '_json', 'Something wrong happened!', 'Algo de errado aconteceu!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(355, 0, 'en', '_json', 'Go Back', 'Volte', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(356, 0, 'en', '_json', 'Genre does not exist!', 'Gênero não existe!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(357, 0, 'en', '_json', 'Not available!', 'Não disponível!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(358, 0, 'en', '_json', 'Here you can explore all', 'Aqui você pode explorar todos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(359, 0, 'en', '_json', 'Music', 'Música', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(360, 0, 'en', '_json', 'There is content yet!', 'Ainda há conteúdo!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(361, 0, 'en', '_json', 'No Content!', 'Sem conteúdo!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(362, 0, 'en', '_json', 'Manage your music', 'Gerencie sua música', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(363, 0, 'en', '_json', 'My Songs', 'Minhas músicas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(364, 0, 'en', '_json', 'of space used', 'do espaço utilizado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(365, 0, 'en', '_json', 'Upload', 'Envio', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(366, 0, 'en', '_json', 'No songs yet!', 'Nenhuma música ainda!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(367, 0, 'en', '_json', 'Your history is empty.', 'Seu histórico está vazio.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(368, 0, 'en', '_json', 'Recently Played', 'Tocado recentemente', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(369, 0, 'en', '_json', 'You did not follow any podcasts yet!', 'Você ainda não seguiu nenhum podcast!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(370, 0, 'en', '_json', 'No Podcasts!', 'Nenhum podcast!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(371, 0, 'en', '_json', 'Followed Podcasts', 'Podcasts seguidos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(372, 0, 'en', '_json', 'updated successfully.', 'Atualizado com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(373, 0, 'en', '_json', 'Request submitted to admins successfully.', 'Solicitação enviada aos administradores com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(374, 0, 'en', '_json', 'Submitting...', 'Enviando...', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(375, 0, 'en', '_json', 'Confirm password does not match.', 'Confirmar senha não corresponde.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(376, 0, 'en', '_json', 'Are you sure you wanna cancel your subscription?', 'Tem certeza de que deseja cancelar sua assinatura?', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(377, 0, 'en', '_json', 'Submit', 'Enviar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(378, 0, 'en', '_json', 'Requested', 'Requeridos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(379, 0, 'en', '_json', 'This request can only be submitted ones.', 'Este pedido só pode ser submetido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(380, 0, 'en', '_json', 'Fill your information', 'Preencha suas informações', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(381, 0, 'en', '_json', 'Features', 'Recursos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(382, 0, 'en', '_json', 'Subscribed to', 'Inscrito em', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(383, 0, 'en', '_json', 'Request Artist Account', 'Solicitar conta de Compositor', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(384, 0, 'en', '_json', 'Artist Account Request sent', 'Solicitação de conta de Compositor enviada', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(385, 0, 'en', '_json', 'Do not show what I am currently playing to friends.', 'Não mostrar o que estou jogando atualmente para amigos.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(386, 0, 'en', '_json', 'Privacy', 'Privacidade', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(387, 0, 'en', '_json', 'New Password', 'Nova Senha', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(388, 0, 'en', '_json', 'Update Password', 'Atualizar senha', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(389, 0, 'en', '_json', 'Current password', 'Senha atual', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(390, 0, 'en', '_json', 'Language', 'Língua', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(391, 0, 'en', '_json', 'Account Settings', 'Configurações de Conta', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(392, 0, 'en', '_json', 'Start typing to search for a genre.', 'Comece a digitar para pesquisar um gênero.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(393, 0, 'en', '_json', 'No results found for', 'Nenhum resultado encontrado para', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(394, 0, 'en', '_json', 'Link To Artist', 'Link para o Compositor', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(395, 0, 'en', '_json', 'Attach this song to an existing artist', 'Anexar esta música a um Compositor existente', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(396, 0, 'en', '_json', 'Insert the name of the artist and press the Enter key.', 'Insira o nome do Compositor e pressione a tecla Enter.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(397, 0, 'en', '_json', 'Hide', 'Esconder', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(398, 0, 'en', '_json', 'Please add a valid source file.', 'Adicione um arquivo de origem válido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(399, 0, 'en', '_json', 'Please add a valid YouTube video ID or URL.', 'Adicione um ID ou URL de vídeo do YouTube válido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(400, 0, 'en', '_json', 'Attach', 'Anexar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(401, 0, 'en', '_json', 'Friend Request sent successfully.', 'Pedido de amizade enviado com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(402, 0, 'en', '_json', 'Friend removed successfully.', 'Amigo removido com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(403, 0, 'en', '_json', 'User does not exist.', 'Usuário não existe.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(404, 0, 'en', '_json', 'Not Available!', 'Não disponível!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(405, 0, 'en', '_json', 'Looks like this account is still new!', 'Parece que esta conta ainda é nova!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(406, 0, 'en', '_json', 'This album is empty.', 'Este álbum está vazio.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(407, 0, 'en', '_json', 'Reject', 'Rejeitar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(408, 0, 'en', '_json', 'artist account request has been rejected.', 'solicitação de conta de Compositor foi rejeitada.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(409, 0, 'en', '_json', 'has an artist account now.', 'tem uma conta de Compositor agora.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(410, 0, 'en', '_json', 'Approve', 'Aprovar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(411, 0, 'en', '_json', 'Friend request by', 'Pedido de amizade por', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(412, 0, 'en', '_json', 'was rejected.', 'foi rejeitado.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(413, 0, 'en', '_json', 'Request Rejected', 'Solicitação rejeitada', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(414, 0, 'en', '_json', 'Request Accepted', 'Pedido aceito', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(415, 0, 'en', '_json', 'has been added to your friend list', 'foi adicionado à sua lista de amigos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(416, 0, 'en', '_json', 'Artist Request', 'Solicitação de Compositor', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(417, 0, 'en', '_json', 'Click to see details', 'Clique para ver detalhess', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(418, 0, 'en', '_json', 'Subject is required', 'O assunto é obrigatório', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(419, 0, 'en', '_json', 'Subject must contain be at least 4 characters', 'O assunto deve conter pelo menos 4 caracteres', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(420, 0, 'en', '_json', 'E-mail must be valid', 'E-mail deve ser válido', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(421, 0, 'en', '_json', 'E-mail is required', 'O e-mail é obrigatório', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(422, 0, 'en', '_json', 'anytime', 'a qualquer momento', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(423, 0, 'en', '_json', 'anywhere', 'qualquer lugar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(424, 0, 'en', '_json', 'Email sent successfully.', 'E-mail enviado com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(425, 0, 'en', '_json', 'Send', 'Mandar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(426, 0, 'en', '_json', 'Choose', 'Escolher', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(427, 0, 'en', '_json', 'Free', 'Livre', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(428, 0, 'en', '_json', 'Recommended', 'Recomendado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(429, 0, 'en', '_json', 'Payment', 'Pagamento', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(430, 0, 'en', '_json', 'Complete', 'Completo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(431, 0, 'en', '_json', 'Choose your plan', 'Escolha seu plano', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(432, 0, 'en', '_json', 'Oops! Some error occurred. Try again later.', 'Ops! Ocorreu algum erro. Tente mais tarde.', '2022-01-14 20:09:03', '2022-02-08 11:50:28');
INSERT INTO `ltm_translations` (`id`, `status`, `locale`, `group`, `key`, `value`, `created_at`, `updated_at`) VALUES
(433, 0, 'en', '_json', 'Subscribe', 'Se inscrever', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(434, 0, 'en', '_json', 'Accepted Payment Methods', 'Métodos de pagamento aceitos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(435, 0, 'en', '_json', 'Reloading', 'Recarregando', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(436, 0, 'en', '_json', 'Congratulation! Subscription was successful.', 'Parabéns! A assinatura foi bem-sucedida.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(437, 0, 'en', '_json', 'Credit Card', 'Cartão de crédito', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(438, 0, 'en', '_json', 'Year', 'Ano', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(439, 0, 'en', '_json', 'Month', 'Mês', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(440, 0, 'en', '_json', 'Week', 'Semana', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(441, 0, 'en', '_json', 'Day', 'Dia', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(442, 0, 'en', '_json', 'You already have a subscription. Do you want to cancel the current one and switch to a new subscription?', 'Você já tem uma assinatura. Deseja cancelar a atual e mudar para uma nova assinatura?', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(443, 0, 'en', '_json', 'Your Library', 'Sua biblioteca', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(444, 0, 'en', '_json', 'Podcast genre does not exist.', 'O gênero podcast não existe.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(445, 0, 'en', '_json', 'This genre has no podcasts yet.', 'Este gênero ainda não tem podcasts.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(446, 0, 'en', '_json', 'Tracks', 'Faixas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(447, 0, 'en', '_json', 'This artist profile is empty.', 'Este perfil de Compositor está vazio.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(448, 0, 'en', '_json', 'Following', 'Segue', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(449, 0, 'en', '_json', 'Page Not Found', 'Página não encontrada', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(450, 0, 'en', '_json', 'There is no content to be displayed.', 'Não há conteúdo a ser exibido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(451, 0, 'en', '_json', 'has been deleted successfully.', 'foi deletado com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(452, 0, 'en', '_json', 'deleted successfully.', 'Apagado com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(453, 0, 'en', '_json', 'Something went wrong. Please try again.', 'Algo deu errado. Por favor, tente novamente.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(454, 0, 'en', '_json', 'Playlist does not exist or maybe it is not available for public access. who knows!', 'A lista de reprodução não existe ou talvez não esteja disponível para acesso público. quem sabe!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(455, 0, 'en', '_json', 'This playlist is empty.', 'Esta lista de reprodução está vazia.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(456, 0, 'en', '_json', 'No Songs!', 'Sem músicas!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(457, 0, 'en', '_json', 'Private playlist', 'Lista de reprodução privada', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(458, 0, 'en', '_json', 'does no exist.', 'não existe.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(459, 0, 'en', '_json', 'No Episodes!', 'Sem episódios!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(460, 0, 'en', '_json', 'Looks like this podcast has no episodes yet.', 'Parece que este podcast ainda não tem episódios.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(461, 0, 'en', '_json', 'From', 'A partir de', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(462, 0, 'en', '_json', 'Ft.', 'pés.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(463, 0, 'en', '_json', 'More from', 'Mais de', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(464, 0, 'en', '_json', 'Song does not exist or maybe it is not available for public access. Who knows!', 'A música não existe ou talvez não esteja disponível para acesso público. Quem sabe!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(465, 0, 'en', '_json', 'has been removed from playlist successfully.', 'foi removido da playlist com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(466, 0, 'en', '_json', 'Song Removed', 'Música removida', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(467, 0, 'en', '_json', 'There is content yet.', 'Ainda há conteúdo.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(468, 0, 'en', '_json', 'Small Window', 'Janela Pequena', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(469, 0, 'en', '_json', 'Radio Station', 'Estação de rádio', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(470, 0, 'en', '_json', 'Copied', 'Copiado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(471, 0, 'en', '_json', 'Song has been deleted successfully.', 'A música foi excluída com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(472, 0, 'en', '_json', 'No Results!', 'Sem resultados!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(473, 0, 'en', '_json', 'used', 'usava', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(474, 0, 'en', '_json', 'Space Used', 'Espaço usado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(475, 0, 'en', '_json', 'Song added to playlist successfully.', 'Música adicionada à playlist com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(476, 0, 'en', '_json', 'Added', 'Adicionado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(477, 0, 'en', '_json', 'Looks like you do not have any playlists yet.', 'Parece que você ainda não tem playlists.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(478, 0, 'en', '_json', 'validation.distinct', 'O campo :attribute tem um valor duplicado.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(479, 0, 'en', '_json', 'validation.email', 'O :attribute deve ser um endereço de e-mail válido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(480, 0, 'en', '_json', 'validation.ends_with', 'O :attribute deve terminar com um dos seguintes: :values.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(481, 0, 'en', '_json', 'validation.exists', 'O :attribute selecionado é inválido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(482, 0, 'en', '_json', 'validation.file', 'O :attribute deve ser um arquivo.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(483, 0, 'en', '_json', 'validation.filled', 'O campo :attribute deve ter um valor.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(484, 0, 'en', '_json', 'validation.gt.numeric', 'O :attribute deve ser maior que :value.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(485, 0, 'en', '_json', 'validation.accepted', 'O :attribute deve ser aceito.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(486, 0, 'en', '_json', 'validation.date', 'O :attribute não é uma data válida.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(487, 0, 'en', '_json', 'validation.date_equals', 'O :attribute deve ser uma data igual a :date.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(488, 0, 'en', '_json', 'validation.date_format', 'O :attribute não corresponde ao formato :format.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(489, 0, 'en', '_json', 'validation.different', 'O :attribute e :other devem ser diferentes.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(490, 0, 'en', '_json', 'validation.digits', 'O :attribute deve ser :digits dígitos.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(491, 0, 'en', '_json', 'validation.size.array', 'O :attribute deve conter :size itens.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(492, 0, 'en', '_json', 'validation.starts_with', 'O :attribute deve começar com um dos seguintes: :values.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(493, 0, 'en', '_json', 'validation.string', 'O :attribute deve ser uma string.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(494, 0, 'en', '_json', 'validation.timezone', 'O :attribute deve ser uma zona válida.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(495, 0, 'en', '_json', 'validation.unique', 'O :attribute já foi usado.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(496, 0, 'en', '_json', 'validation.uploaded', 'O :attribute falhou ao carregar.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(497, 0, 'en', '_json', 'validation.url', 'O formato :attribute é inválido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(498, 0, 'en', '_json', 'validation.uuid', 'O :attribute deve ser um UUID válido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(499, 0, 'en', '_json', 'validation.custom.attribute-name.rule-name', 'mensagem personalizada', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(500, 0, 'en', '_json', 'validation.max.file', 'O :attribute não pode ser maior que :max kilobytes.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(501, 0, 'en', '_json', 'validation.max.string', 'O :attribute não pode ser maior que :max caracteres.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(502, 0, 'en', '_json', 'validation.max.array', 'O :attribute não pode ter mais do que :max itens.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(503, 0, 'en', '_json', 'validation.mimes', 'O :attribute deve ser um arquivo do tipo: :values.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(504, 0, 'en', '_json', 'validation.mimetypes', 'O :attribute deve ser um arquivo do tipo: :values.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(505, 0, 'en', '_json', 'validation.min.numeric', 'O :attribute deve ser pelo menos :min.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(506, 0, 'en', '_json', 'validation.min.file', 'O :attribute deve ter pelo menos :min kilobytes.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(507, 0, 'en', '_json', 'validation.min.string', 'O :attribute deve ter pelo menos :min caracteres.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(508, 0, 'en', '_json', 'validation.min.array', 'O :attribute deve ter pelo menos :min itens.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(509, 0, 'en', '_json', 'validation.not_in', 'O :attribute selecionado é inválido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(510, 0, 'en', '_json', 'validation.not_regex', 'O formato :attribute é inválido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(511, 0, 'en', '_json', 'validation.numeric', 'O :attribute deve ser um número.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(512, 0, 'en', '_json', 'validation.password', 'A senha está incorreta.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(513, 0, 'en', '_json', 'validation.present', 'O campo :attribute deve estar presente.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(514, 0, 'en', '_json', 'validation.regex', 'O formato :attribute é inválido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(515, 0, 'en', '_json', 'validation.required', 'O campo :attribute é obrigatório.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(516, 0, 'en', '_json', 'validation.required_if', 'O campo :attribute é obrigatório quando :other é :value.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(517, 0, 'en', '_json', 'validation.required_unless', 'O campo :attribute é obrigatório, a menos que :other esteja em :values.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(518, 0, 'en', '_json', 'validation.required_with', 'O campo :attribute é obrigatório quando :values ​​está presente.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(519, 0, 'en', '_json', 'validation.required_with_all', 'O campo :attribute é obrigatório quando :values ​​estão presentes.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(520, 0, 'en', '_json', 'validation.required_without', 'O campo :attribute é obrigatório quando :values ​​não está presente.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(521, 0, 'en', '_json', 'validation.required_without_all', 'O campo :attribute é obrigatório quando nenhum dos :values ​​está presente.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(522, 0, 'en', '_json', 'validation.same', 'O :attribute e :other devem corresponder.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(523, 0, 'en', '_json', 'validation.size.numeric', 'O :attribute deve ser :size.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(524, 0, 'en', '_json', 'validation.size.file', 'O :attribute deve ser :size kilobytes.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(525, 0, 'en', '_json', 'validation.size.string', 'O :attribute deve ser :size caracteres.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(526, 0, 'en', '_json', 'validation.gte.numeric', 'O :attribute deve ser maior ou igual a :value.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(527, 0, 'en', '_json', 'validation.gte.file', 'O :attribute deve ser maior ou igual a :value kilobytes.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(528, 0, 'en', '_json', 'validation.gte.string', 'O :attribute deve ser maior ou igual a :value caracteres.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(529, 0, 'en', '_json', 'validation.gte.array', 'O :attribute deve ter :value itens ou mais.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(530, 0, 'en', '_json', 'validation.image', 'O :attribute deve ser uma imagem.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(531, 0, 'en', '_json', 'validation.in', 'O :attribute selecionado é inválido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(532, 0, 'en', '_json', 'validation.active_url', 'O :attribute não é um URL válido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(533, 0, 'en', '_json', 'validation.after', 'O :attribute deve ser uma data posterior a :date.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(534, 0, 'en', '_json', 'validation.after_or_equal', 'O :attribute deve ser uma data posterior ou igual a :date.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(535, 0, 'en', '_json', 'validation.boolean', 'O campo :attribute deve ser true ou false.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(536, 0, 'en', '_json', 'validation.confirmed', 'A confirmação de :attribute não corresponde.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(537, 0, 'en', '_json', 'validation.in_array', 'O campo :attribute não existe em :other.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(538, 0, 'en', '_json', 'validation.integer', 'O :attribute deve ser um número inteiro.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(539, 0, 'en', '_json', 'validation.ip', 'O :attribute deve ser um endereço IP válido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(540, 0, 'en', '_json', 'validation.ipv4', 'O :attribute deve ser um endereço IPv4 válido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(541, 0, 'en', '_json', 'validation.ipv6', 'O :attribute deve ser um endereço IPv6 válido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(542, 0, 'en', '_json', 'validation.json', 'O :attribute deve ser uma string JSON válida.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(543, 0, 'en', '_json', 'validation.lt.numeric', 'O :attribute deve ser menor que :value.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(544, 0, 'en', '_json', 'validation.lt.file', 'O :attribute deve ser menor que :value kilobytes.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(545, 0, 'en', '_json', 'validation.lt.string', 'O :attribute deve ser menor que :value caracteres.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(546, 0, 'en', '_json', 'validation.lt.array', 'O :attribute deve ter menos de :value itens.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(547, 0, 'en', '_json', 'validation.lte.numeric', 'O :attribute deve ser menor ou igual a :value.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(548, 0, 'en', '_json', 'validation.lte.file', 'O :attribute deve ser menor ou igual a :value kilobytes.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(549, 0, 'en', '_json', 'validation.lte.string', 'O :attribute deve ser menor ou igual a :value caracteres.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(550, 0, 'en', '_json', 'validation.lte.array', 'O :attribute não deve ter mais que :value itens.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(551, 0, 'en', '_json', 'validation.max.numeric', 'O :attribute não pode ser maior que :max.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(552, 0, 'en', '_json', 'validation.digits_between', 'O :attribute deve estar entre :min e :max dígitos.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(553, 0, 'en', '_json', 'validation.dimensions', 'O :attribute tem dimensões de imagem inválidas.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(554, 0, 'en', '_json', 'validation.alpha', 'O :attribute pode conter apenas letras.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(555, 0, 'en', '_json', 'validation.alpha_dash', 'O :attribute pode conter apenas letras, números, traços e sublinhados.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(556, 0, 'en', '_json', 'validation.alpha_num', 'O :attribute pode conter apenas letras e números.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(557, 0, 'en', '_json', 'validation.array', 'O :attribute deve ser um array.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(558, 0, 'en', '_json', 'validation.before', 'O :attribute deve ser uma data anterior a :date.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(559, 0, 'en', '_json', 'validation.before_or_equal', 'O :attribute deve ser uma data anterior ou igual a :date.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(560, 0, 'en', '_json', 'validation.between.numeric', 'O :attribute deve estar entre :min e :max.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(561, 0, 'en', '_json', 'validation.between.file', 'O :attribute deve estar entre :min e :max kilobytes.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(562, 0, 'en', '_json', 'validation.between.string', 'O :attribute deve estar entre os caracteres :min e :max.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(563, 0, 'en', '_json', 'validation.between.array', 'O :attribute deve ter entre :min e :max itens.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(564, 0, 'en', '_json', 'validation.gt.file', 'O :attribute deve ser maior que :value kilobytes.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(565, 0, 'en', '_json', 'validation.gt.string', 'O :attribute deve ser maior que :value caracteres.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(566, 0, 'en', '_json', 'validation.gt.array', 'O :attribute deve ter mais de :value itens.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(567, 0, 'en', '_json', 'Save', 'Salve ', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(568, 0, 'en', '_json', 'Register', 'Registro', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(569, 0, 'en', '_json', 'Upgrade Account', 'Atualizar conta', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(570, 0, 'en', '_json', 'File corrupted!', 'Arquivo corrompido!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(571, 0, 'en', '_json', 'The source file you are trying to upload is corrupted.', 'O arquivo de origem que você está tentando carregar está corrompido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(572, 0, 'en', '_json', 'Max file size is', 'O tamanho máximo do arquivo é', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(573, 0, 'en', '_json', 'TB', 'TB', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(574, 0, 'en', '_json', 'GB', 'GB', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(575, 0, 'en', '_json', 'MB', 'MB', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(576, 0, 'en', '_json', 'Radio Stations', 'Estações de radio', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(577, 0, 'en', '_json', 'YouTube Video', 'Vídeo do youtube', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(578, 0, 'en', '_json', 'Audio File', 'Arquivo de áudio', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(579, 0, 'en', '_json', 'Auto Duration', 'Duração automática', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(580, 0, 'en', '_json', 'Duration in seconds', 'Duração em segundos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(581, 0, 'en', '_json', 'Duration', 'Duração', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(582, 0, 'en', '_json', 'You can add the video ID, but It must be valid.', 'Você pode adicionar o ID do vídeo, mas ele deve ser válido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(583, 0, 'en', '_json', 'Attach Audio File', 'Anexar arquivo de áudio', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(584, 0, 'en', '_json', 'Artist Area', 'Área do Compositor', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(585, 0, 'en', '_json', 'Admin Area', 'Área de administração', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(586, 0, 'en', '_json', 'Song', 'Música', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(587, 0, 'en', '_json', 'Genres', 'Gêneros', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(588, 0, 'en', '_json', 'Player', 'Player', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(589, 0, 'en', '_json', 'Library', 'Biblioteca', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(590, 0, 'en', '_json', 'Plays Chart', 'Gráfico de reproduções', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(591, 0, 'en', '_json', 'Delete Song', 'Excluir música', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(592, 0, 'en', '_json', 'Detach song from this album', 'Separar música deste álbum', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(593, 0, 'en', '_json', 'Song attached to album.', 'Música anexada ao álbum.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(594, 0, 'en', '_json', 'Release Date', 'Data de lançamento', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(595, 0, 'en', '_json', 'Start typing to search to an artist.', 'Comece a digitar para pesquisar um Compositor.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(596, 0, 'en', '_json', 'saved successfully', 'Salvo com sucesso', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(597, 0, 'en', '_json', 'Badge', 'Distintivo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(598, 0, 'en', '_json', 'Show the upgrade button after subscription. Switch on if there is a better plan than this.', 'Mostre o botão de atualização após a assinatura. Ligue se houver um plano melhor do que este.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(599, 0, 'en', '_json', 'Interface', 'Interface', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(600, 0, 'en', '_json', 'Add displayed feature', 'Adicionar recurso exibido', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(601, 0, 'en', '_json', 'This does not affect the script', 'Isso não afeta o script', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(602, 0, 'en', '_json', 'Features that will display on the plan card', 'Recursos que serão exibidos no cartão do plano', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(603, 0, 'en', '_json', 'Card Features', 'Card Features', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(604, 0, 'en', '_json', 'Artist Permissions', 'Permissões do Compositor', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(605, 0, 'en', '_json', 'Permissions to grant for subscribed users', 'Permissões para conceder para usuários inscritos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(606, 0, 'en', '_json', 'Display order of the plans(lower first)', 'Ordem de exibição dos planos (abaixo primeiro)', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(607, 0, 'en', '_json', 'Position', 'Posição', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(608, 0, 'en', '_json', 'The frequency of the subscription billing', 'A frequência do faturamento da assinatura', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(609, 0, 'en', '_json', 'Amount in cents (can not be changed later)', 'Valor em centavos (não pode ser alterado posteriormente)', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(610, 0, 'en', '_json', 'Currency', 'Moeda', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(611, 0, 'en', '_json', 'Enable billing to create non-free plans', 'Ative o faturamento para criar planos não gratuitos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(612, 0, 'en', '_json', 'Some values can not be updated after the plan creation', 'Alguns valores não podem ser atualizados após a criação do plano', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(613, 0, 'en', '_json', 'Search Translation', 'Pesquisar tradução', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(614, 0, 'en', '_json', 'Price', 'Preço', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(615, 0, 'en', '_json', 'Inactive', 'Inativo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(616, 0, 'en', '_json', 'Active', 'Ativo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(617, 0, 'en', '_json', 'Upgradable', 'Atualizável', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(618, 0, 'en', '_json', 'week', 'semana', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(619, 0, 'en', '_json', 'day', 'dia', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(620, 0, 'en', '_json', 'month', 'mês', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(621, 0, 'en', '_json', 'year', 'ano', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(622, 0, 'en', '_json', 'Password reset successfully.', 'Redefinição de senha com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(623, 0, 'en', '_json', 'Email verification link sent on your Email.', 'Link de verificação de e-mail enviado em seu e-mail.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(624, 0, 'en', '_json', 'Invalid/Expired url provided.', 'URL inválido/expirado fornecido.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(625, 0, 'en', '_json', 'Current password does not match', 'A senha atual não corresponde', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(626, 0, 'en', '_json', 'Failed to delete subscription from PayPal.', 'Falha ao excluir assinatura do PayPal.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(627, 0, 'en', '_json', 'Failed to delete subscription from Stripe.', 'Falha ao excluir assinatura do Stripe.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(628, 0, 'en', '_json', 'Failed, Invalid Token', 'Falha, token inválido', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(629, 0, 'en', '_json', 'Email could not be sent to this email address', 'Não foi possível enviar o e-mail para este endereço de e-mail', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(630, 0, 'en', '_json', 'You have exceeded your space limit', 'Você excedeu seu limite de espaço', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(631, 0, 'en', '_json', 'No ads', 'Sem anúncios', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(632, 0, 'en', '_json', 'Publish playlists', 'Publicar listas de reprodução', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(633, 0, 'en', '_json', 'Publish songs', 'Publicar músicas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(634, 0, 'en', '_json', 'Listen with friends', 'Ouça com amigos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(635, 0, 'en', '_json', 'Chat with friends', 'Chat com amigos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(636, 0, 'en', '_json', 'Download songs', 'Baixar músicas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(637, 0, 'en', '_json', 'Upload songs', 'Carregar músicas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(638, 0, 'en', '_json', 'No data available', 'Nenhum dado disponível', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(639, 0, 'en', '_json', 'Home', 'Casa', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(640, 0, 'en', '_json', 'You can check your subscription on your account settings', 'Você pode verificar sua assinatura nas configurações da sua conta', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(641, 0, 'en', '_json', 'The name that the users will see when they receive an Email from you.', 'O nome que os usuários verão quando receberem um e-mail seu.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(642, 0, 'en', '_json', 'The address that the users will see when they receive an Email from you.', 'O endereço que os usuários verão quando receberem um e-mail seu.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(643, 0, 'en', '_json', 'Require Authentication', 'Exigir autenticação', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(644, 0, 'en', '_json', 'Does not see advertisements.', 'Não vê anúncios.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(645, 0, 'en', '_json', 'Ability to change playlists privacy to public.', 'Capacidade de alterar a privacidade das listas de reprodução para pública.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(646, 0, 'en', '_json', 'Ability to change songs privacy to public.', 'Capacidade de alterar a privacidade das músicas para público.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(647, 0, 'en', '_json', 'Listen with friends to the same song at the same time.', 'Ouça com amigos a mesma música ao mesmo tempo.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(648, 0, 'en', '_json', 'Live Radio', 'Rádio ao vivo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(649, 0, 'en', '_json', 'Episodes', 'Episódios', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(650, 0, 'en', '_json', 'Number of plays', 'Número de jogadas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(651, 0, 'en', '_json', 'Localization', 'Localização', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(652, 0, 'en', '_json', 'Platform Name', 'Nome da plataforma', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(653, 0, 'en', '_json', 'Disabling podcasts will remove anything related to podcasts on the application', 'A desativação de podcasts removerá qualquer coisa relacionada a podcasts no aplicativo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(654, 0, 'en', '_json', 'Community', 'Comunidade', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(655, 0, 'en', '_json', 'Friendship System', 'Sistema de amizade', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(656, 0, 'en', '_json', 'Disable this functionality if you do not want users to be friends with each other', 'Desative esta funcionalidade se você não quiser que os usuários sejam amigos uns dos outros', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(657, 0, 'en', '_json', 'This will allow live chat and what the users are currently playing', 'Isso permitirá o bate-papo ao vivo e o que os usuários estão jogando no momento', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(658, 0, 'en', '_json', 'Enable chat between friends', 'Ativar bate-papo entre amigos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(659, 0, 'en', '_json', 'Allow users to request an artist account by sending their information to the admins', 'Permitir que os usuários solicitem uma conta de Compositor enviando suas informações aos administradores', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(660, 0, 'en', '_json', 'Download Button', 'Botão de download', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(661, 0, 'en', '_json', 'Show the download button on the player(if the audio has a file)', 'Mostre o botão de download no player (se o áudio tiver um arquivo)', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(662, 0, 'en', '_json', 'Default Volume', 'volume padrão', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(663, 0, 'en', '_json', 'No Sections!', 'Sem Seções!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(664, 0, 'en', '_json', 'Page empty. Add some sections.', 'Página vazia. Adicione algumas seções.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(665, 0, 'en', '_json', 'Add Section', 'Adicionar seção', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(666, 0, 'en', '_json', 'Enable to receive Emails from users. Enable to verify users Email addresses.', 'Habilite para receber e-mails de usuários. Ativar para verificar os endereços de e-mail dos usuários.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(667, 0, 'en', '_json', 'Show on the live radio section on the right-sidebar', 'Mostrar na seção de rádio ao vivo na barra lateral direita', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(668, 0, 'en', '_json', 'Highlight', 'Realçar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(669, 0, 'en', '_json', 'Remove user registration on the application', 'Remover o registro do usuário no aplicativo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(670, 0, 'en', '_json', 'Select the landing page of your platform. You can create custom pages.', 'Selecione a página de destino da sua plataforma. Você pode criar páginas personalizadas.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(671, 0, 'en', '_json', 'Platform', 'Plataforma', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(672, 0, 'en', '_json', 'Locale', 'Localidade', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(673, 0, 'en', '_json', 'Enable Realtime', 'Ativar tempo real', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(674, 0, 'en', '_json', 'About Us', 'Sobre nós', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(675, 0, 'en', '_json', 'Disabling podcasts will remove anything related to podcasts on the application.', 'A desativação de podcasts removerá qualquer coisa relacionada a podcasts no aplicativo.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(676, 0, 'en', '_json', 'This will allow live chat and shows what the users are currently playing.', 'Isso permitirá o bate-papo ao vivo e mostrará o que os usuários estão jogando no momento.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(677, 0, 'en', '_json', 'Disable this functionality if you do not want users to be friends with each other.', 'Desative esta funcionalidade se você não quiser que os usuários sejam amigos uns dos outros.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(678, 0, 'en', '_json', 'Describe your platform', 'Descreva sua plataforma', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(679, 0, 'en', '_json', 'You can add HTML code', 'Você pode adicionar código HTML', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(680, 0, 'en', '_json', 'Enable Chat', 'Ativar bate-papo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(681, 0, 'en', '_json', 'Allow artist account requests', 'Permitir solicitações de conta de Compositor', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(682, 0, 'en', '_json', 'Choose Roles', 'Escolher funções', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(683, 0, 'en', '_json', 'Podcaster', 'Podcaster', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(684, 0, 'en', '_json', 'Sorry, you can not play YouTube videos.', 'Desculpe, você não pode reproduzir vídeos do YouTube.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(685, 0, 'en', '_json', 'Yearly', 'Anual', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(686, 0, 'en', '_json', 'Weekly', 'Semanalmente', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(687, 0, 'en', '_json', 'Monthly', 'Por mês', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(688, 0, 'en', '_json', 'Daily', 'Diário', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(689, 0, 'en', '_json', 'Please wait', 'Por favor, aguarde', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(690, 0, 'en', '_json', 'Activate', 'Ativar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(691, 0, 'en', '_json', 'Artist', 'Compositor', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(692, 0, 'en', '_json', 'Custom', 'Personalizado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(693, 0, 'en', '_json', 'Comedy', 'Comédia', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(694, 0, 'en', '_json', 'Arts', 'Artes', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(695, 0, 'en', '_json', 'Disable Registration', 'Desativar registro', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(696, 0, 'en', '_json', 'Max File Size', 'Tamanho máximo do arquivo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(697, 0, 'en', '_json', 'Number of labels', 'Número de rótulos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(698, 0, 'en', '_json', 'Select', 'Selecionar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(699, 0, 'en', '_json', 'Path', 'Caminho', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(700, 0, 'en', '_json', 'Icon', 'Ícone', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(701, 0, 'en', '_json', 'No streaming source found.', 'Nenhuma fonte de streaming encontrada.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(702, 0, 'en', '_json', 'Could not be played!', 'Não foi possível jogar!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(703, 0, 'en', '_json', 'Enable Ads', 'Habilitar anúncios', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(704, 0, 'en', '_json', 'Logo', 'Logotipo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(705, 0, 'en', '_json', 'Size', 'Tamanho', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(706, 0, 'en', '_json', 'Now Playing', 'Em reprodução', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(707, 0, 'en', '_json', 'Followed artists', 'Compositores seguidos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(708, 0, 'en', '_json', 'Followed playlists', 'Listas de reprodução seguidas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(709, 0, 'en', '_json', 'Contact Us', 'Entre em contato conosco', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(710, 0, 'en', '_json', 'Sent', 'Enviei', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(711, 0, 'en', '_json', 'User already has an active subscription.', 'O usuário já tem uma assinatura ativa.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(712, 0, 'en', '_json', 'Hide Right-sidebar', 'Ocultar barra lateral direita', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(713, 0, 'en', '_json', 'Content type', 'Tipo de conteúdo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(714, 0, 'en', '_json', 'Default Language', 'Idioma padrão', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(715, 0, 'en', '_json', 'Source Format', 'Formato de origem', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(716, 0, 'en', '_json', 'Icon file', 'Arquivo de ícone', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(717, 0, 'en', '_json', 'Show', 'Mostrar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(718, 0, 'en', '_json', 'Browse Page', 'Navegar na página', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(719, 0, 'en', '_json', 'Remove the browse page which includes music genres & charts.', 'Remova a página de navegação que inclui gêneros musicais e paradas.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(720, 0, 'en', '_json', 'All rights reserved.', 'Todos os direitos reservados.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(721, 0, 'en', '_json', 'Terms Of Service', 'Termos de serviço', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(722, 0, 'en', '_json', 'Privacy Policy', 'Política de Privacidade', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(723, 0, 'en', '_json', 'Store', 'Loja', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(724, 0, 'en', '_json', 'Shuffle songs automatically based on the settings you provide.', 'Embaralhar músicas automaticamente com base nas configurações que você fornece.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(725, 0, 'en', '_json', 'Auto Play', 'Reprodução automática', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(726, 0, 'en', '_json', 'Hide Video', 'Ocultar vídeo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(727, 0, 'en', '_json', 'Hide Download Button', 'Ocultar botão de download', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(728, 0, 'en', '_json', 'Providers', 'Provedores', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(729, 0, 'en', '_json', 'Share Options', 'Opções de compartilhamento', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(730, 0, 'en', '_json', 'for each', 'para cada', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(731, 0, 'en', '_json', 'Enable Artist Accounts', 'Ativar contas de Compositores', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(732, 0, 'en', '_json', 'How much should an artist earn per 100 play. Enter the amount in cents', 'Quanto um Compositor deve ganhar por 100 jogadas. Insira o valor em centavos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(733, 0, 'en', '_json', 'Contact', 'Notificações', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(734, 0, 'en', '_json', 'Transaction failed. Please try again or contact us.', 'Falha na transação. Por favor, tente novamente ou entre em contato conosco.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(735, 0, 'en', '_json', 'Purchase', 'Comprar', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(736, 0, 'en', '_json', 'Premium', 'Prêmio', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(737, 0, 'en', '_json', 'Total', 'Total', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(738, 0, 'en', '_json', 'Artist Sale Cut', 'Corte de venda do Compositor', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(739, 0, 'en', '_json', 'Artist Royalty', 'Realeza do Compositor', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(740, 0, 'en', '_json', 'Earned', 'Ganhou', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(741, 0, 'en', '_json', 'Account Funds', 'Fundos da conta', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(742, 0, 'en', '_json', 'License', 'Licença', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(743, 0, 'en', '_json', 'Royalties', 'Royalties', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(744, 0, 'en', '_json', 'Previous Payouts', 'Pagamentos anteriores', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(745, 0, 'en', '_json', 'Details', 'Detalhes', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(746, 0, 'en', '_json', 'Choose License', 'Escolha a licença', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(747, 0, 'en', '_json', 'Add License', 'Adicionar licença', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(748, 0, 'en', '_json', 'Provide as product', 'Fornecer como produto', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(749, 0, 'en', '_json', 'Exclusive', 'Exclusivo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(750, 0, 'en', '_json', 'Product', 'produtos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(751, 0, 'en', '_json', 'Explicit', 'Explícito', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(752, 0, 'en', '_json', 'Minimum', 'Mínimo', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(753, 0, 'en', '_json', 'Total Earnings', 'Ganhos totais', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(754, 0, 'en', '_json', 'Request Payout', 'Solicitar pagamento', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(755, 0, 'en', '_json', 'Payout N°', 'Pagamento Nº', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(756, 0, 'en', '_json', 'Funds', 'Fundos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(757, 0, 'en', '_json', 'Account', 'Conta', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(758, 0, 'en', '_json', 'Select payout method', 'Selecione a forma de pagamento', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(759, 0, 'en', '_json', 'Available', 'Disponível', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(760, 0, 'en', '_json', 'Fetching data', 'Buscando dados', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(761, 0, 'en', '_json', 'Pending', 'Pendente', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(762, 0, 'en', '_json', 'Rejected', 'Rejeitado', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(763, 0, 'en', '_json', 'Payed', 'Pago', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(764, 0, 'en', '_json', 'Phone Number', 'Número de telefone', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(765, 0, 'en', '_json', 'Read', 'Ler', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(766, 0, 'en', '_json', 'Message from', 'Mensagem de', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(767, 0, 'en', '_json', 'Mark as read', 'marcar como Lido', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(768, 0, 'en', '_json', 'Important', 'Importante', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(769, 0, 'en', '_json', 'Enter payout amount(in cents)', 'Insira o valor do pagamento (em centavos)', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(770, 0, 'en', '_json', 'Add To Cart', 'Adicionar ao carrinho', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(771, 0, 'en', '_json', 'Get License', 'Obter licença', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(772, 0, 'en', '_json', 'Empty Cart', 'Carrinho Vazio', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(773, 0, 'en', '_json', 'Proceed to checkout', 'Fazer o check-out', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(774, 0, 'en', '_json', 'Cart', 'Carrinho', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(775, 0, 'en', '_json', 'Asset added to card successfully.', 'Recurso adicionado ao cartão com sucesso.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(776, 0, 'en', '_json', 'No new notifications.', 'Sem novas notificações.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(777, 0, 'en', '_json', 'External Links', 'Links externos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(778, 0, 'en', '_json', 'Most Played Podcasts', 'Podcasts mais reproduzidos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(779, 0, 'en', '_json', 'Most Liked Songs', 'Músicas mais curtidas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(780, 0, 'en', '_json', 'Most Played Songs', 'Músicas mais tocadas', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(781, 0, 'en', '_json', 'Most Played Albums', 'Álbuns mais tocados', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(782, 0, 'en', '_json', 'Popular Albums', 'Álbum Populars', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(783, 0, 'en', '_json', 'Some error occurred. Please try again!', 'Ocorreu algum erro. Por favor, tente novamente!', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(784, 0, 'en', '_json', 'Specific Artists', 'Compositores Específicos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(785, 0, 'en', '_json', 'Specific Users', 'Usuários específicos', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(786, 0, 'en', '_json', 'All Artists', 'Todos os Compositores', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(787, 0, 'en', '_json', 'All Users', 'Todos os usuários', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(788, 0, 'en', '_json', 'Add your message here', 'Adicione sua mensagem aqui', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(789, 0, 'en', '_json', 'Mark As Important Message', 'Marcar como mensagem importante', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(790, 0, 'en', '_json', 'Message', 'Mensagem', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(791, 0, 'en', '_json', 'Send to', 'Enviar para', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(792, 0, 'en', '_json', 'User Upload', 'Carregamento do usuário', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(793, 0, 'en', '_json', 'Allow users to upload audio files locally.', 'Permitir que os usuários carreguem arquivos de áudio localmente.', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(794, 0, 'en', '_json', 'Copy', 'cópia de', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(795, 0, 'en', '_json', 'Link', 'Link', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(796, 0, 'en', '_json', 'More from the same aritsts', 'Mais dos mesmos Compositores', '2022-01-14 20:09:03', '2022-02-08 11:50:28'),
(797, 0, 'en', '_json', 'Allow guests to contact you', 'Permitir que os convidados entrem em contato com você', '2022-01-14 20:09:03', '2022-02-08 11:50:28');

-- --------------------------------------------------------

--
-- Estrutura para tabela `messages`
--

CREATE TABLE `messages` (
  `id` int(10) UNSIGNED NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_04_02_193005_create_translations_table', 1),
(2, '2014_10_12_000000_create_users_table', 1),
(3, '2014_10_12_100000_create_password_resets_table', 1),
(4, '2018_05_13_084701_create_session_table', 1),
(5, '2018_05_13_085121_create_messages_table', 1),
(6, '2018_05_13_085415_create_chats_table', 1),
(7, '2019_05_03_000001_create_customer_columns', 1),
(8, '2019_05_03_000002_create_subscriptions_table', 1),
(9, '2019_08_19_000000_create_failed_jobs_table', 1),
(10, '2020_05_13_145928_create_playlists_table', 1),
(11, '2020_05_13_184903_create_albums_table', 1),
(12, '2020_05_14_181224_create_genres_table', 1),
(13, '2020_05_17_074954_create_episodes_table', 1),
(14, '2020_05_17_081741_create_podcasts_table', 1),
(15, '2020_05_17_085409_create_podcast_genres_table', 1),
(16, '2020_06_12_125224_create_artists_table', 1),
(17, '2020_06_21_112902_create_song_playlist_table', 1),
(18, '2020_06_23_102926_create_notifications_table', 1),
(19, '2020_06_23_155743_create_roles_table', 1),
(20, '2020_06_23_181713_create_role_user_table', 1),
(21, '2020_07_20_203234_create_friendships_table', 1),
(22, '2020_07_27_105801_create_genre_song_table', 1),
(23, '2020_08_09_202913_create_genre_podcast_table', 1),
(24, '2020_08_18_160041_create_visiting_countries_table', 1),
(25, '2020_08_18_160415_create_visiting_browsers_table', 1),
(26, '2020_09_02_210451_create_settings_table', 1),
(27, '2020_09_21_145056_create_permissions_table', 1),
(28, '2020_09_21_214630_create_user_permission_table', 1),
(29, '2020_09_21_234427_create_role_permission_table', 1),
(30, '2020_11_05_125035_create_songs_table', 1),
(31, '2020_11_05_131453_create_sections_table', 1),
(32, '2020_11_06_143029_create_navigation_items_table', 1),
(33, '2020_12_18_135630_create_pages_table', 1),
(34, '2021_04_17_121458_create_plans_table', 1),
(35, '2021_04_17_151121_create_plan_permission', 1),
(36, '2021_04_21_222735_create_plan_role', 1),
(37, '2021_04_28_230048_create_plays_table', 1),
(38, '2021_05_01_214304_create_languages_table', 1),
(39, '2021_05_06_010614_create_radio_stations_table', 1),
(40, '2021_05_28_210900_create_artist_song_table', 1),
(41, '2021_05_30_103004_create_likes_table', 1),
(42, '2021_05_30_103216_create_follows_table', 1),
(43, '2021_05_30_180354_create_section_item_table', 1),
(44, '2021_06_12_162854_create_carts_table', 1),
(45, '2021_06_12_163523_create_products_table', 1),
(46, '2021_06_12_180903_create_prices_table', 1),
(47, '2021_06_12_190839_create_product_price_table', 1),
(48, '2021_06_16_094857_create_external_links_table', 1),
(49, '2021_06_23_163759_create_album_artist_table', 1),
(50, '2021_07_14_215841_create_sales_table', 1),
(51, '2021_07_14_221415_create_sale_product_table', 1),
(52, '2021_07_17_164004_create_payouts_table', 1),
(53, '2021_07_17_174437_create_payout_methods_table', 1),
(54, '2021_07_17_220412_create_payout_method_artist_table', 1),
(55, '2021_07_20_150223_create_royalties_table', 1),
(56, '2016_06_01_000001_create_oauth_auth_codes_table', 2),
(57, '2016_06_01_000002_create_oauth_access_tokens_table', 2),
(58, '2016_06_01_000003_create_oauth_refresh_tokens_table', 2),
(59, '2016_06_01_000004_create_oauth_clients_table', 2),
(60, '2016_06_01_000005_create_oauth_personal_access_clients_table', 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `navigation_items`
--

CREATE TABLE `navigation_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `navigatesTo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `page_id` bigint(20) DEFAULT NULL,
  `visibility` tinyint(1) NOT NULL,
  `custom` tinyint(1) NOT NULL DEFAULT 0,
  `rank` int(11) NOT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `navigation_items`
--

INSERT INTO `navigation_items` (`id`, `name`, `icon`, `navigatesTo`, `page_id`, `visibility`, `custom`, `rank`, `path`, `created_at`, `updated_at`) VALUES
(1, 'Inicio', 'home', 'Custom page', 1, 1, 1, 0, '/home', '2022-02-16 00:50:56', '2022-02-16 00:50:56'),
(2, 'Pesquisar', 'compass', NULL, NULL, 0, 0, 1, '/browse', '2022-02-16 00:50:56', '2022-02-16 00:50:56'),
(3, 'Podcasts', 'microphone', NULL, NULL, 1, 0, 2, '/podcasts', '2022-02-16 00:50:56', '2022-02-16 00:50:56'),
(4, 'Leilão', 'shopping', NULL, NULL, 0, 0, 3, '/store', '2022-02-16 00:50:56', '2022-02-16 00:50:56'),
(5, 'Biblioteca', 'music-box-multiple', NULL, NULL, 1, 0, 4, '/library/my-songs', '2022-02-16 00:50:56', '2022-02-16 00:50:56'),
(6, 'Subscription', 'star-circle', NULL, NULL, 0, 0, 5, '/subscription', '2022-02-16 00:50:56', '2022-02-16 00:50:56'),
(7, 'Compositor', 'pencil', 'Custom URL', NULL, 1, 1, 6, 'http://cadastro.comporplay.com.br', '2022-02-16 00:50:56', '2022-02-16 00:50:56');

-- --------------------------------------------------------

--
-- Estrutura para tabela `notifications`
--

CREATE TABLE `notifications` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_id` bigint(20) UNSIGNED NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('0598048e5b4736b8a47a522c96921ecaa272ce9078374ea0ef64a4847b3bc47deb2a8b531bf7db70', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 1, '2022-02-15 03:05:18', '2022-02-15 03:05:18', '2023-02-15 03:05:18'),
('0ba92bc8b53c7e814c7f58c67f4a5a1e50224b622b4484f617f26afb6e260d78f1d486a2ee4956f1', 2, 1, 'access_token', '[\"user_scope\"]', 1, '2022-02-08 04:32:45', '2022-02-08 04:32:45', '2023-02-08 04:32:45'),
('11b8c78cf6bfe1e153c33acbdcf476eca20db4df7c8e543e45dd0cdc9227f6493fefa6cb4d5b0ba1', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 1, '2022-02-08 01:22:29', '2022-02-08 01:22:29', '2023-02-08 01:22:29'),
('12d95c12cd16378d9ec06fb8779e1ea0f048b0a4d072f12a6e6d494f062bed79b65a00c03d5d435d', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 1, '2022-02-09 02:43:03', '2022-02-09 02:43:03', '2023-02-09 02:43:03'),
('1a806d9a6dfc5672953b4679f50b991a708fabbcb74e1d109ad44cee3daa4e31172ea0f203272b75', 2, 1, 'access_token', '[\"user_scope\"]', 1, '2022-02-08 03:57:11', '2022-02-08 03:57:11', '2023-02-08 03:57:11'),
('1f96c543141a1578fd613299e865453d107b4b360295c600263cf52cdd6258df614de0a223c2ac98', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 0, '2022-01-14 20:09:30', '2022-01-14 20:09:30', '2023-01-14 20:09:30'),
('316585ac34d923e83a16cb5530c752d08f54d53ae6b71c64f7b04c162664c899ec46621435863955', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 1, '2022-02-15 00:35:23', '2022-02-15 00:35:23', '2023-02-15 00:35:23'),
('34b23c9d7d479e4c7c48800f1f57e3bf304c765849a75e19c4395fdaf51ae6a8827040655f72f3c0', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 0, '2022-02-10 01:53:43', '2022-02-10 01:53:43', '2023-02-10 01:53:43'),
('389e0728c7453303331f68b62b8a8359d8455b54477ab4accf6aa4a9bbb8cc51a6a7d7d1ee61e8c4', 2, 1, 'access_token', '[\"user_scope\"]', 1, '2022-02-09 02:42:16', '2022-02-09 02:42:16', '2023-02-09 02:42:16'),
('40c6e6a00c8b6d8eb45e589ee3f73c867d08ffa93d833fb9e6be6a0e5722d5a2ad847b5438d18637', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 0, '2022-02-16 00:52:24', '2022-02-16 00:52:24', '2023-02-16 00:52:24'),
('423aee6ebcb87825a95d9e1daf5e9ee463e2b90d82092eaee6da75043dc191c5b7e28149a21af9ff', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 1, '2022-01-14 20:39:52', '2022-01-14 20:39:52', '2023-01-14 20:39:52'),
('4463ff5eb32693ac73fc5642fa1eed769198b6ce350e87ed54c282a8d58637ca4677978a419a082f', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 0, '2022-02-19 20:48:23', '2022-02-19 20:48:23', '2023-02-19 20:48:23'),
('4bf42022af24642472e7a294a72f2078ec7ffbb882527b2ea7c5f0560742faa78e2bf709e7df6606', 4, 1, 'access_token', '[\"user_scope\"]', 0, '2022-02-15 04:30:43', '2022-02-15 04:30:43', '2023-02-15 04:30:43'),
('5075a7ff7751c855a8a39c42eb23a58c7a8787d780fbb72a946bab4ebccc481e7c2e2bf017729d0c', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 1, '2022-02-15 22:34:19', '2022-02-15 22:34:19', '2023-02-15 22:34:19'),
('51789dc50377ffb5ac3affea4aa549a6cb00cb4d2218c3904b734e02b0f14a915d049bdf283e5e95', 3, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 0, '2022-02-08 12:13:18', '2022-02-08 12:13:18', '2023-02-08 12:13:18'),
('5190e4eb34bcee5f02659dc8d09c15e48a5c351ecb923cfdeaea33d6805ea7bdabbf7326ce221432', 3, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 0, '2022-03-02 13:49:44', '2022-03-02 13:49:44', '2023-03-02 13:49:44'),
('5292cf0874d0019c6fef967b9d702c160ffd1745a1d2af7ecbd5c2050cadab8fa0962c359bdc6469', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 1, '2022-02-05 20:20:06', '2022-02-05 20:20:06', '2023-02-05 20:20:06'),
('5fcc2621527698edd697ce59c0ee6732ab8193cbfd98c82d0e3be56eece260a8e14b9ecaea9420ac', 2, 1, 'access_token', '[\"user_scope\"]', 1, '2022-02-15 00:35:12', '2022-02-15 00:35:12', '2023-02-15 00:35:12'),
('6a244cb8cc83d589a5be64ae66dfce7ea0bf340356bb74fb710b035c8524e4e1dc2fa813b3a998e8', 2, 1, 'access_token', '[\"user_scope\"]', 1, '2022-02-08 04:45:57', '2022-02-08 04:45:57', '2023-02-08 04:45:57'),
('79d10e2404179adcd2da06e1caa1813ef5c4a240e9e544577171cc6b34717ec419e11a27df4f48df', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 1, '2022-02-08 11:53:52', '2022-02-08 11:53:52', '2023-02-08 11:53:52'),
('7b717b86ae3d7d356a0c8f5be525c5af81d928ca7cf7d4e61c8fd8e4096e32cbe479194da6e1cc2a', 2, 1, 'access_token', '[\"user_scope\"]', 1, '2022-02-15 03:27:14', '2022-02-15 03:27:14', '2023-02-15 03:27:14'),
('7f6a255e8b279323f3be282d1b3f4e88e1552c930e8c99bdecd9d2d8c813ada07fe0edf271357f83', 2, 1, 'access_token', '[\"user_scope\"]', 1, '2022-02-15 00:33:36', '2022-02-15 00:33:36', '2023-02-15 00:33:36'),
('8768da857fe429a6a66d5410d2a40be4c83f97d86597b72867b1eb648f7b635f48439420e2b371a0', 2, 1, 'access_token', '[\"user_scope\"]', 1, '2022-02-15 00:33:23', '2022-02-15 00:33:23', '2023-02-15 00:33:23'),
('93e71fff06e71e3463831413d809e589cb21b809bb0a942f01f9757a747ddf6bea66ffac933ef049', 5, 1, 'access_token', '[\"user_scope\"]', 0, '2022-02-21 15:24:06', '2022-02-21 15:24:06', '2023-02-21 15:24:06'),
('9f9da2ede5ee32760a0c12f7f2488620f27554fb2e7a09481d1516e9cfe9b0c106fa857e66c183bc', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 0, '2022-02-08 12:15:43', '2022-02-08 12:15:43', '2023-02-08 12:15:43'),
('aa8c6b07f467c90b94415460429329b3ad80e102a5d27994e00740d1996cea7bd97dc77167d9c8b0', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 1, '2022-02-10 01:53:46', '2022-02-10 01:53:46', '2023-02-10 01:53:46'),
('cab44c5fc3c6b9d13f7b220dd4c03a3e275e3516d586f6f3f3bfbb4b24d7e1158680861a86d1d1e6', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 1, '2022-02-08 04:15:14', '2022-02-08 04:15:14', '2023-02-08 04:15:14'),
('e063f570f01201840afaf76901b04aacf3721aef24ddacf0de56514f07e8e129be841e725e496cc9', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 1, '2022-02-15 22:35:45', '2022-02-15 22:35:45', '2023-02-15 22:35:45'),
('f826161d4ed754bebd8c3aac7bba9a5ed4f5224db93fa9e46ad52aeab8b52bd9920cbac9cba34f4e', 2, 1, 'access_token', '[\"user_scope\"]', 0, '2022-02-08 12:34:55', '2022-02-08 12:34:55', '2023-02-08 12:34:55'),
('ff6adce21208b311ba6d0a56bffb12baf01b360775b1ab32bd879deb2627105fee8f727206167ca8', 1, 1, 'access_token', '[\"user_scope\",\"manage_own_content\",\"manage_everything\"]', 1, '2022-02-14 20:41:13', '2022-02-14 20:41:13', '2023-02-14 20:41:13');

-- --------------------------------------------------------

--
-- Estrutura para tabela `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Compor Play Personal Access Client', 'CtlvGRLtLBms1QSD4hBWz4a8hb8jHUFfDRlC4Tlc', NULL, 'http://localhost', 1, 0, 0, '2022-01-14 20:09:02', '2022-01-14 20:09:02'),
(2, NULL, 'Compor Play Password Grant Client', 'kOcuaKtBfqLPtD3Ebm7iHT9aWtpanw9YSIE7Ut3e', 'users', 'http://localhost', 0, 1, 0, '2022-01-14 20:09:02', '2022-01-14 20:09:02');

-- --------------------------------------------------------

--
-- Estrutura para tabela `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2022-01-14 20:09:02', '2022-01-14 20:09:02');

-- --------------------------------------------------------

--
-- Estrutura para tabela `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pages`
--

CREATE TABLE `pages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blank` tinyint(1) DEFAULT 0,
  `isEditable` tinyint(1) NOT NULL DEFAULT 1,
  `showLinkOnTheRightSidebar` tinyint(1) DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `pages`
--

INSERT INTO `pages` (`id`, `name`, `icon`, `blank`, `isEditable`, `showLinkOnTheRightSidebar`, `title`, `content`, `path`, `description`, `created_at`, `updated_at`) VALUES
(1, 'charts', '', 0, 1, NULL, 'Charts', NULL, '/browse/charts', '', '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(2, 'Inicio', 'home', 0, 1, 0, 'Explore', NULL, '/home', 'Explore & enjoy listening to music', '2022-01-14 20:09:04', '2022-01-14 20:13:21'),
(7, 'Quero ser compositor', 'music-circle', 0, 1, 0, 'Quero ser compositor', NULL, '/page/custom', 'Quero ser compositor', '2022-02-08 02:57:31', '2022-02-08 02:57:31');

-- --------------------------------------------------------

--
-- Estrutura para tabela `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `payouts`
--

CREATE TABLE `payouts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `artist_id` int(11) NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `payout_methods`
--

CREATE TABLE `payout_methods` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `minimum` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `payout_methods`
--

INSERT INTO `payout_methods` (`id`, `name`, `minimum`, `description`) VALUES
(1, 'PayPal', 5000, 'Enter your PayPal address to receive your payout. Minimum payout amount is 50$.'),
(2, 'Perfect Money', 5000, 'Enter your Perfect Money address to receive your payout. Minimum payout amount is 50$.'),
(3, 'Bitcoin', 5000, 'Enter your BTC wallet to receive your payout. Minimum payout amount is equivalent to 50$.'),
(4, 'Bank Transfer', 10000, 'Enter your Bank Transfer details to receive your payout. Minimum payout amount is 100$.');

-- --------------------------------------------------------

--
-- Estrutura para tabela `payout_method_artist`
--

CREATE TABLE `payout_method_artist` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `artist_id` int(11) NOT NULL,
  `payout_method_id` int(11) NOT NULL,
  `payout_details` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `description`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 'Upload songs', '', 3, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(2, 'Download songs', 'download songs & podcast episodes.', 3, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(3, 'Chat with friends', '', 3, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(4, 'Listen with friends', 'Listen with friends to the same song at the same time.', 3, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(5, 'Publish songs', 'Ability to change songs privacy to public.', 3, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(6, 'Publish playlists', 'Ability to change playlists privacy to public.', 3, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(7, 'No ads', 'Does not see advertisements.', 3, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(8, 'CED songs(artist)', 'Create, edit and delete songs.', 2, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(9, 'CED albums(artist)', 'Create, edit and delete albums.', 2, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(10, 'CED podcasts(artist)', 'Create, edit and delete podcasts.', 2, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(11, 'CED translations', '', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(12, 'contact', '', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(13, 'View sales', '', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(14, 'View payouts', '', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(15, 'Edit appearance', 'Ability to change how the player interface appearance @admin/appearance.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(16, 'Edit settings', 'Change the settings of the application @admin/settings.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(17, 'Edit advertisements', 'Change the advertisements settings.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(18, 'CED pages', '', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(19, 'CED radio_stations', '', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(20, 'CED plans', '', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(21, 'CED subscriptions', '', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(22, 'Create users', '', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(23, 'Edit users', '', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(24, 'Read users', 'Can see the users data.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(25, 'Delete users', '', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(26, 'Create artists', '', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(27, 'Edit artists', '', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(28, 'Read artists', 'Can see the artists data.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(29, 'Delete artists', '', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(30, 'CED songs', 'Create, edit and delete songs.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(31, 'CED playlists', 'Create, edit and delete playlists.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(32, 'CED song_genres', 'Create, edit and delete song genres.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(33, 'CED podcast_genres', 'Create, edit and delete podcast genres.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(34, 'CED radio stations', 'Create, edit and delete radio stations.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(35, 'CED albums', 'Create, edit and delete albums.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(36, 'CED podcasts', 'Create, edit and delete podcasts.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(37, 'Read roles', 'Can see the roles and their permissions.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(38, 'Edit roles', 'Edit or Delete role permissions.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(39, 'Edit user roles', 'Edit or Delete roles for a user.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(40, 'Edit user permissions', 'Edit or Delete permissions for a user.', 1, '2022-01-14 20:09:04', '2022-01-14 20:09:04');

-- --------------------------------------------------------

--
-- Estrutura para tabela `plans`
--

CREATE TABLE `plans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `upgradable` tinyint(1) NOT NULL DEFAULT 1,
  `badge` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` int(11) NOT NULL DEFAULT 0,
  `position` int(11) NOT NULL,
  `free` tinyint(1) NOT NULL DEFAULT 1,
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency_symbol` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `interval` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paypal_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `interval_count` int(11) NOT NULL,
  `recommended` tinyint(1) NOT NULL,
  `displayed_features` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `storage_space` bigint(20) NOT NULL DEFAULT 100,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `plans`
--

INSERT INTO `plans` (`id`, `name`, `active`, `upgradable`, `badge`, `amount`, `position`, `free`, `currency`, `currency_symbol`, `interval`, `stripe_id`, `paypal_id`, `interval_count`, `recommended`, `displayed_features`, `storage_space`, `created_at`, `updated_at`) VALUES
(1, 'Basic', 0, 0, NULL, 0, 1, 1, 'USD', NULL, 'month', NULL, NULL, 1, 0, '[\"Up to 100MB of storage\",\"Create Playlists & Share\",\"Unlimited Downloads\"]', 100, '2022-01-14 20:09:04', '2022-02-08 04:01:18'),
(2, 'Credito', 1, 0, NULL, 25, 1, 0, 'BRL', NULL, 'month', NULL, 'P-31V63715YH1655612MIFSDOY', 1, 0, '[\"Pode Registrar 10 Músicas\",\"35 MB de Espaço\"]', 35, '2022-02-15 03:44:59', '2022-02-15 03:44:59'),
(3, 'credito2', 1, 0, NULL, 25, 2, 0, 'BRL', NULL, 'month', NULL, 'P-99T48623F86228407MIFSEZA', 1, 0, '[]', 100, '2022-02-15 03:47:48', '2022-02-15 03:47:48');

-- --------------------------------------------------------

--
-- Estrutura para tabela `plan_permission`
--

CREATE TABLE `plan_permission` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `plan_id` int(10) UNSIGNED NOT NULL,
  `permission_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `plan_permission`
--

INSERT INTO `plan_permission` (`id`, `plan_id`, `permission_id`) VALUES
(1, 2, 1),
(2, 2, 4),
(3, 3, 1),
(4, 3, 4),
(5, 3, 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `plan_role`
--

CREATE TABLE `plan_role` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  `plan_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `playlists`
--

CREATE TABLE `playlists` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `public` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `playlist_song`
--

CREATE TABLE `playlist_song` (
  `id` int(10) UNSIGNED NOT NULL,
  `song_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `song_origin` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `playlist_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `plays`
--

CREATE TABLE `plays` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `content_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_source` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end_play_expectation` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  `artist_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `podcasts`
--

CREATE TABLE `podcasts` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `artist_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genre_id` int(10) UNSIGNED DEFAULT NULL,
  `cover` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `spotify_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `soundcloud_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itunes_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deezer_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `podcast_genres`
--

CREATE TABLE `podcast_genres` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `listen_notes_genre_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `podcast_genres`
--

INSERT INTO `podcast_genres` (`id`, `name`, `listen_notes_genre_id`, `cover`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'NOVIDADES', '99', '{\"path\":\"\\/storage\\/defaults\\/images\\/podcast_genres\\/podcast-news.png\",\"disk\":\"public\",\"url\":null}', 'novidades', '2022-01-14 20:09:04', '2022-02-08 02:49:53'),
(2, 'TUTORIAIS', '100', '{\"path\":\"\\/storage\\/defaults\\/images\\/podcast_genres\\/podcast-art.png\",\"disk\":\"public\",\"url\":null}', 'tutoriais', '2022-01-14 20:09:04', '2022-02-08 02:50:14'),
(3, 'AGENDAS', NULL, '{\"path\":\"\\/storage\\/defaults\\/images\\/podcast_genres\\/podcast-gaming.png\",\"disk\":\"public\",\"url\":null}', 'agendas', '2022-01-14 20:09:04', '2022-02-08 02:50:23'),
(4, 'CURSOS', '111', '{\"path\":\"\\/storage\\/defaults\\/images\\/podcast_genres\\/podcast-education.png\",\"disk\":\"public\",\"url\":null}', 'cursos', '2022-01-14 20:09:04', '2022-02-08 02:50:43');

-- --------------------------------------------------------

--
-- Estrutura para tabela `prices`
--

CREATE TABLE `prices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 0,
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency_symbol` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `productable_id` int(11) NOT NULL,
  `productable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `product_price`
--

CREATE TABLE `product_price` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `price_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `radio_stations`
--

CREATE TABLE `radio_stations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `streamEndpoint` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `highlight` tinyint(1) NOT NULL DEFAULT 0,
  `proxy` tinyint(1) NOT NULL DEFAULT 0,
  `serverType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `statsSource` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serverURL` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `serverID` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `serverMount` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `serverUsername` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `serverPassword` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statsEndpoint` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `interval` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'admin', '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(2, 'artist', '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(3, 'user', '2022-01-14 20:09:04', '2022-01-14 20:09:04');

-- --------------------------------------------------------

--
-- Estrutura para tabela `role_permission`
--

CREATE TABLE `role_permission` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `permission_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `role_permission`
--

INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`) VALUES
(41, 11, 1),
(42, 12, 1),
(43, 13, 1),
(44, 14, 1),
(45, 15, 1),
(46, 16, 1),
(47, 17, 1),
(48, 18, 1),
(49, 19, 1),
(50, 20, 1),
(51, 21, 1),
(52, 22, 1),
(53, 23, 1),
(54, 24, 1),
(55, 25, 1),
(56, 26, 1),
(57, 27, 1),
(58, 28, 1),
(59, 29, 1),
(60, 30, 1),
(61, 31, 1),
(62, 32, 1),
(63, 33, 1),
(64, 34, 1),
(65, 35, 1),
(66, 36, 1),
(67, 37, 1),
(68, 38, 1),
(69, 39, 1),
(70, 40, 1),
(71, 8, 2),
(72, 9, 2),
(73, 10, 2),
(74, 3, 3),
(75, 4, 3),
(76, 7, 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `role_user`
--

CREATE TABLE `role_user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `role_user`
--

INSERT INTO `role_user` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 1, 3, NULL, NULL),
(2, 1, 1, NULL, NULL),
(3, 2, 3, NULL, NULL),
(4, 3, 3, NULL, NULL),
(5, 3, 1, NULL, NULL),
(6, 3, 2, NULL, NULL),
(7, 4, 3, NULL, NULL),
(8, 5, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `royalties`
--

CREATE TABLE `royalties` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `artist_id` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sales`
--

CREATE TABLE `sales` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `gateway` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_price` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sale_product`
--

CREATE TABLE `sale_product` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `artist_cut` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `sale_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sections`
--

CREATE TABLE `sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `page_id` bigint(20) NOT NULL,
  `endpoint` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '*',
  `layout` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'section',
  `rank` int(11) NOT NULL DEFAULT 0,
  `nb_labels` int(11) NOT NULL DEFAULT 10,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `sections`
--

INSERT INTO `sections` (`id`, `title`, `page_id`, `endpoint`, `source`, `layout`, `rank`, `nb_labels`, `created_at`, `updated_at`) VALUES
(1, 'New releases', 1, 'new-releases', '*', 'section', 0, 10, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(2, 'Most Played Songs', 1, 'popular-songs', '*', 'section', 1, 10, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(3, 'Most Liked Songs', 1, 'most-liked-songs', '*', 'section', 2, 10, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(4, 'Most Played Albums', 1, 'popular-albums', '*', 'section', 3, 10, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(5, 'Most Played Podcasts', 1, 'popular-podcasts', '*', 'section', 4, 10, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(6, 'Latest Podcasts', 1, 'latest-podcasts', '*', 'section', 5, 10, '2022-01-14 20:09:04', '2022-01-14 20:09:04'),
(7, 'New releases', 2, 'new-releases', '*', 'section', 0, 10, '2022-01-14 20:09:04', '2022-01-14 20:09:04');

-- --------------------------------------------------------

--
-- Estrutura para tabela `section_item`
--

CREATE TABLE `section_item` (
  `item_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `section_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sessions`
--

CREATE TABLE `sessions` (
  `id` int(10) UNSIGNED NOT NULL,
  `user1_id` int(10) UNSIGNED NOT NULL,
  `user2_id` int(10) UNSIGNED NOT NULL,
  `block` tinyint(1) NOT NULL DEFAULT 0,
  `blocked_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `settings`
--

CREATE TABLE `settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `public` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `public`) VALUES
(1, 'software_version', '3.3', 1),
(2, 'appName', 'Compor Play', 1),
(3, 'locale', 'en', 1),
(4, 'appUrl', 'http://comporplay.com.br/', 1),
(5, 'appLogo', 'http://comporplay.com.br/storage/301917221play-logo.png', 1),
(6, 'appFavicon', 'http://comporplay.com.br/storage/1161185750comporplay.png', 1),
(7, 'allowThemeChange', '1', 1),
(8, 'enableUserUpload', '0', 1),
(9, 'enableLandingPage', '0', 1),
(10, 'enableBrowse', '1', 1),
(11, 'enableAds', '0', 1),
(12, 'allowArtistAccountRequests', '0', 1),
(13, 'requireAuth', '0', 1),
(14, 'crossfade', '0', 1),
(15, 'disableRegistration', '0', 1),
(16, 'allowVideos', '1', 1),
(17, 'hideRightSidebar', '1', 1),
(18, 'playerVolume', '50', 1),
(19, 'aboutUs', '', 1),
(20, 'requireEmailConfirmation', '0', 1),
(21, 'enableGoogleLogin', '0', 1),
(22, 'hideDownloadButton', '1', 1),
(23, 'google_oauth_client_id', '943628769324-rit2pa5iohsuv67ivoe5s0vbch5mqfqh.apps.googleusercontent.com', 1),
(24, 'enableFacebookLogin', '0', 1),
(25, 'allowUserDownloads', '1', 1),
(26, 'account_agreement', '<a href=\"http://cadastro.comporplay.com.br\"><button style=\"background: #f9b000; border-radius: 6px; padding: 15px; cursor: pointer; color: #f9fafa; border: none; font-size: 16px;\">SOU COMPOSITOR</button></a>', 1),
(27, 'allowUserUploads', '1', 1),
(28, 'enableFriendshipSystem', '1', 1),
(29, 'enableRealtime', '0', 1),
(30, 'pusherAppId', '', 1),
(31, 'pusherKey', '', 1),
(32, 'pusherCluster', '', 1),
(33, 'pusherSecret', '', 1),
(34, 'enableChat', '0', 1),
(35, 'enableMail', '1', 1),
(36, 'mailEncryption', 'ssl', 0),
(37, 'enableCharts', '1', 1),
(38, 'defaultTheme', 'Dark', 1),
(39, 'square_ad', '{\"code\":null,\"position\":\"trs\"}', 1),
(40, 'rect_ad', '{\"code\":\"<a href=\\\"http:\\/\\/comporplay.com.br\\/cadastrar\\\"><button style=\\\"background: #f9b000; border-radius: 6px; padding: 15px; cursor: pointer; color: #14191c; border: none; font-size: 16px;\\\">Sou Compositor<\\/button><\\/a>\",\"position\":\"tcp\"}', 1),
(41, 'paypalSandboxMode', '1', 0),
(42, 'themes', '{\"primary\":\"#F8B500\",\"secondary\":\"#EEBD08\",\"dark\":{\"background\":\"#1C1C1D\",\"text\":\"#ebebeb\",\"panel\":\"#3F3F3F\"},\"light\":{\"background\":\"#ffffff\",\"text\":\"#09021d\",\"panel\":\"#f7f7f7\"}}', 1),
(43, 'landingPage', '{\"callToAction\":\"Registre agora\",\"showContactUs\":\"1\",\"headerTitle\":\"Bem-vindo ao Compor Play\",\"headerDescription\":\"Ou\\u00e7a Composi\\u00e7\\u00f5es a qualquer hora e em qualquer lugar\",\"headerBackground\":\"\\/images\\/landing-background.jpg\",\"headerBackgroundLayerColor\":\"#2A2A295E\",\"customLandingPageHeader\":\"1\",\"footerTitle\":\"Voc\\u00ea \\u00e9 um Compositor e quer compartilhar seu conte\\u00fado?\",\"footerDescription\":\"Inscreva-se no ComporPlay agora e solicite uma conta de Compositor, ganhe at\\u00e9 500 MB de espa\\u00e7o livre e muito mais!\",\"footerBackground\":\"\\/images\\/landing-background.jpg\",\"sections\":\"[]\",\"enableLandingPage\":\"1\"}', 1),
(44, 'subscriptionButtonColor', '#FF8F00', 1),
(45, 'subscriptionButtonText', 'upgrade', 1),
(46, 'subscriptionButtonOutlined', '1', 1),
(47, 'subscriptionButtonIcon', 'star', 1),
(48, 'enableBilling', '0', 1),
(49, 'stripeGateway', '0', 1),
(50, 'paypalGateway', '1', 1),
(51, 'storageDisk', '{\"disk\":\"public\",\"name\":\"Local Storage\"}', 1),
(52, 'playerLanding', '/home', 1),
(53, 'availableUserDiskSpace', '10', 1),
(54, 'availableArtistDiskSpace', '500', 1),
(55, 'maxFileSize', '15', 1),
(56, 'maxImageSize', '2', 1),
(57, 'show_external_link_spotify', '1', 1),
(58, 'analytics_play_event', '1', 1),
(59, 'analytics_like_event', '1', 1),
(60, 'analytics_download_event', '1', 1),
(61, 'analytics_adClick_event', '1', 1),
(62, 'analytics_fileUpload_event', '1', 1),
(63, 'analytics_chat_event', '1', 1),
(64, 'analytics_login_event', '1', 1),
(65, 'analytics_purchase_event', '1', 1),
(66, 'analytics_logout_event', '1', 1),
(67, 'analytics_subscription_event', '1', 1),
(68, 'provider_spotify', '0', 1),
(69, 'spotify_search', '1', 1),
(70, 'provider_listenNotes', '0', 1),
(71, 'listenNotes_search', '1', 1),
(72, 'shuffleOrder', '[{\"id\":1,\"value\":\"album\",\"text\":\"Same Album\"},{\"id\":1,\"value\":\"artists\",\"text\":\"Same Artists\"},{\"id\":1,\"value\":\"genres\",\"text\":\"Same Genres\"}]', 1),
(73, 'enable_share_facebook', '0', 1),
(74, 'enable_share_twitter', '0', 1),
(75, 'enable_share_whatsapp', '0', 1),
(76, 'enable_share_telegram', '0', 1),
(77, 'enableLangSwitcher', '0', 1),
(78, 'enableThemeSwitcher', '0', 1),
(79, 'siteTitle', '%site_name — Play Music Anywhere & Anytime', 1),
(80, 'siteDescription', '%site_name — Play Music Anywhere & Anytime', 1),
(81, 'homePageTitle', 'Explore & listen | %site_name', 1),
(82, 'homePageDescription', 'Explore & start listening to pure music on %site_name', 1),
(83, 'browsePageTitle', 'Browse & discover music | %site_name', 1),
(84, 'browsePageDescription', 'Discover & enjoy listening to pure music on %site_name', 1),
(85, 'podcastsPageTitle', 'Podcasts | %site_name', 1),
(86, 'podcastsPageDescription', 'Discover & enjoy listening to podcasts on %site_name', 1),
(87, 'artistPageDescription', 'Enjoy hearing %artist_name on %site_name for free', 1),
(88, 'artistPageTitle', '%artist_name | Play on %site_name', 1),
(89, 'songPageTitle', '%song_title — %artist_name | Play On %site_name', 1),
(90, 'songPageDescription', 'Play & enjoy to %song_title — Song by %artist_name on %site_name', 1),
(91, 'albumPageTitle', '%artist_name — %album_title | Play on %site_name', 1),
(92, 'albumPageDescription', 'Play & enjoy to %album_title — Album by %artist_name on %site_name', 1),
(93, 'podcastPageTitle', '%artist_name — %podcast_title | Play on %site_name', 1),
(94, 'podcastPageDescription', 'Play %podcast_title podcast — Podcast by %artist_name on %site_name', 1),
(95, 'playlistPageTitle', '%playlist_title | Play on %site_name', 1),
(96, 'playlistPageDescription', 'Play & enjoy to %playlist_title — Playlist by %user_name on %site_name', 1),
(97, 'genrePageTitle', 'Top %genre_name music | Play on %site_name', 1),
(98, 'genrePageDescription', 'Play & enjoy to %genre_name music on %site_name', 1),
(99, 'podcastGenrePageTitle', 'Top %podcast-genre_name podcasts | Play on %site_name', 1),
(100, 'podcastGenrePageDescription', 'Play & enjoy to %podcast-genre_name podcasts on %site_name', 1),
(101, 'userProfilePageTitle', '%user_name\'s profile | %site_name', 1),
(102, 'userProfilePageDescription', 'Check %user_name profile on %site_name', 1),
(103, 'enablePodcasts', '1', 1),
(104, 'enable_artist_account', '1', 1),
(105, 'saas', '1', 1),
(106, 'default_currency', '{\"value\":\"BRL\",\"text\":\"Brazilian Real(BRL)\"}', 1),
(107, 'enable_subscription', '1', 1),
(108, 'enable_selling', '1', 1),
(109, 'royalties', '0', 1),
(110, 'artist_royalty', '50', 1),
(111, 'artist_sale_cut', '90', 1),
(112, 'allowGuestsToContact', '1', 1),
(113, 'disableVideo', '1', 1),
(114, 'autoPlay', '0', 1),
(115, 'mailMailer', 'smtp', 0),
(116, 'mailHost', 'smtp.hostinger.com', 0),
(117, 'mailPort', '465', 0),
(118, 'mailUsername', 'contato@comporplay.com.br', 0),
(119, 'mailPassword', 'Lourdes080782@', 0),
(120, 'mailFromAddress', 'contato@comporplay.com.br', 0),
(121, 'mailFromName', 'Compor Play', 0),
(122, 'paypalClientID', 'AVd4IVopdHb74PPimTs4gTRNtxhNJR-Me2PXzlWp08zGoRBEC81lZnTDmZUn2uqEsw5ZBpS3hzhPpR77', 1),
(123, 'paypalSecret', 'ENgGUq_WoMMtphl1riWbTIvrMA2xlDKepPS9MswQKe-nqdCLaGzFIHXLa7i_iykFMw6QBJkd89csuMLv', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `songs`
--

CREATE TABLE `songs` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `download_count` bigint(20) NOT NULL DEFAULT 0,
  `source` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `source_format` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uploaded_by` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `artist_id` int(11) NOT NULL,
  `file_size` bigint(20) DEFAULT NULL,
  `file_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `public` tinyint(1) NOT NULL DEFAULT 0,
  `isProduct` tinyint(1) NOT NULL DEFAULT 0,
  `isExclusive` tinyint(1) NOT NULL DEFAULT 0,
  `isExplicit` tinyint(1) NOT NULL DEFAULT 0,
  `rank_on_album` tinyint(1) DEFAULT NULL,
  `album_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `spotify_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `soundcloud_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itunes_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deezer_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `plan_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default',
  `gateway_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gateway` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `renews_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `user_id`, `plan_id`, `name`, `gateway_id`, `gateway`, `status`, `renews_at`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'default', NULL, 'local', 'active', NULL, '2022-02-08 03:56:56', '2022-02-08 03:56:56'),
(2, 3, 1, 'default', NULL, 'local', 'active', NULL, '2022-02-08 12:12:23', '2022-02-08 12:12:23'),
(3, 4, 1, 'default', NULL, 'local', 'active', NULL, '2022-02-15 04:30:25', '2022-02-15 04:30:25'),
(4, 5, 1, 'default', NULL, 'local', 'active', NULL, '2022-02-21 15:19:53', '2022-02-21 15:19:53');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lang` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en',
  `payment_method` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook_id` int(11) DEFAULT NULL,
  `available_disk_space` double(8,2) NOT NULL DEFAULT 0.00,
  `is_playing` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requested_artist_account` tinyint(1) NOT NULL DEFAULT 0,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `hide_activity` tinyint(1) NOT NULL DEFAULT 0,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `stripe_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_brand` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_last_four` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `name`, `avatar`, `email`, `password`, `lang`, `payment_method`, `facebook_id`, `available_disk_space`, `is_playing`, `requested_artist_account`, `is_admin`, `hide_activity`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`, `stripe_id`, `card_brand`, `card_last_four`, `trial_ends_at`) VALUES
(1, 'Admin', '{\"path\":\"\\/storage\\/defaults\\/images\\/user_avatar.png\",\"disk\":\"public\",\"url\":null}', 'mauricio_dias06@hotmail.com', '$2y$10$vZ6TFyzIluHcCGZRj1.Rp.oC300J.ngbGSYAhcaWT9cs8mqlLt5zG', 'en', NULL, NULL, 100.00, NULL, 0, 1, 0, NULL, NULL, '2022-01-14 20:09:04', '2022-01-14 20:09:04', NULL, NULL, NULL, NULL),
(2, 'mauricioteste', '{\"path\":\"\\/storage\\/defaults\\/images\\/user_avatar.png\",\"disk\":\"public\",\"url\":null}', 'mauriciodias06@gmail.com', '$2y$10$TDaS4rEAPybQtHwWYHVn0uWRBjsKdVTOm/YSzMWBIF6y9ytCVJO3e', 'en', NULL, NULL, 10.00, NULL, 0, 0, 0, NULL, NULL, '2022-02-08 03:56:56', '2022-02-08 03:56:56', NULL, NULL, NULL, NULL),
(3, 'Eriton Bezerra', '{\"path\":\"\\/storage\\/defaults\\/images\\/user_avatar.png\",\"disk\":\"public\",\"url\":null}', 'diretoria@newmusic.digital', '$2y$10$UTIIFgiZvEv4fM9IwJ4oouFRclaW6oN03btmc2zlapVGWIbOgFowO', 'en', NULL, NULL, 10240.00, NULL, 0, 0, 0, NULL, NULL, '2022-02-08 12:12:23', '2022-02-08 12:12:23', NULL, NULL, NULL, NULL),
(4, 'Vinicius Vidal', '{\"path\":\"\\/storage\\/defaults\\/images\\/user_avatar.png\",\"disk\":\"public\",\"url\":null}', 'viniciusvidal452@gmail.com', '$2y$10$OaXxoAuC9k9Fkw2q5W6v0.douBa4PSQPpSpki9d1LAsvoOwPxsBVK', 'en', NULL, NULL, 10.00, NULL, 0, 0, 0, NULL, NULL, '2022-02-15 04:30:25', '2022-02-15 04:30:25', NULL, NULL, NULL, NULL),
(5, 'Vivaldo Negrão Júnior', '{\"path\":\"\\/storage\\/defaults\\/images\\/user_avatar.png\",\"disk\":\"public\",\"url\":null}', 'negraojuniordj@gmail.com', '$2y$10$ZDFkFjrVDtYs1ux/9zGD4ugxbrQFkVLHbkdSYFs7evOG86htlQpB.', 'en', NULL, NULL, 10.00, NULL, 0, 0, 0, NULL, NULL, '2022-02-21 15:19:52', '2022-02-21 15:19:52', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `user_permission`
--

CREATE TABLE `user_permission` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `permission_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `user_permission`
--

INSERT INTO `user_permission` (`id`, `permission_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 2, 1, NULL, NULL),
(3, 3, 1, NULL, NULL),
(4, 4, 1, NULL, NULL),
(5, 5, 1, NULL, NULL),
(6, 6, 1, NULL, NULL),
(7, 7, 1, NULL, NULL),
(8, 11, 1, NULL, NULL),
(9, 12, 1, NULL, NULL),
(10, 13, 1, NULL, NULL),
(11, 14, 1, NULL, NULL),
(12, 15, 1, NULL, NULL),
(13, 16, 1, NULL, NULL),
(14, 17, 1, NULL, NULL),
(15, 18, 1, NULL, NULL),
(16, 19, 1, NULL, NULL),
(17, 20, 1, NULL, NULL),
(18, 21, 1, NULL, NULL),
(19, 22, 1, NULL, NULL),
(20, 23, 1, NULL, NULL),
(21, 24, 1, NULL, NULL),
(22, 25, 1, NULL, NULL),
(23, 26, 1, NULL, NULL),
(24, 27, 1, NULL, NULL),
(25, 28, 1, NULL, NULL),
(26, 29, 1, NULL, NULL),
(27, 30, 1, NULL, NULL),
(28, 31, 1, NULL, NULL),
(29, 32, 1, NULL, NULL),
(30, 33, 1, NULL, NULL),
(31, 34, 1, NULL, NULL),
(32, 35, 1, NULL, NULL),
(33, 36, 1, NULL, NULL),
(34, 37, 1, NULL, NULL),
(35, 38, 1, NULL, NULL),
(36, 39, 1, NULL, NULL),
(37, 40, 1, NULL, NULL),
(38, 3, 2, NULL, NULL),
(39, 4, 2, NULL, NULL),
(40, 7, 2, NULL, NULL),
(44, 11, 3, NULL, NULL),
(45, 12, 3, NULL, NULL),
(46, 13, 3, NULL, NULL),
(47, 14, 3, NULL, NULL),
(48, 15, 3, NULL, NULL),
(49, 16, 3, NULL, NULL),
(50, 17, 3, NULL, NULL),
(51, 18, 3, NULL, NULL),
(52, 19, 3, NULL, NULL),
(53, 20, 3, NULL, NULL),
(54, 21, 3, NULL, NULL),
(55, 22, 3, NULL, NULL),
(56, 23, 3, NULL, NULL),
(57, 24, 3, NULL, NULL),
(58, 25, 3, NULL, NULL),
(59, 26, 3, NULL, NULL),
(60, 27, 3, NULL, NULL),
(61, 28, 3, NULL, NULL),
(62, 29, 3, NULL, NULL),
(63, 30, 3, NULL, NULL),
(64, 31, 3, NULL, NULL),
(65, 32, 3, NULL, NULL),
(66, 33, 3, NULL, NULL),
(67, 34, 3, NULL, NULL),
(68, 35, 3, NULL, NULL),
(69, 36, 3, NULL, NULL),
(70, 37, 3, NULL, NULL),
(71, 38, 3, NULL, NULL),
(72, 39, 3, NULL, NULL),
(73, 40, 3, NULL, NULL),
(74, 8, 3, NULL, NULL),
(75, 9, 3, NULL, NULL),
(76, 10, 3, NULL, NULL),
(77, 3, 3, NULL, NULL),
(78, 4, 3, NULL, NULL),
(79, 7, 3, NULL, NULL),
(80, 3, 4, NULL, NULL),
(81, 4, 4, NULL, NULL),
(82, 7, 4, NULL, NULL),
(83, 3, 5, NULL, NULL),
(84, 4, 5, NULL, NULL),
(85, 7, 5, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `visiting_browsers`
--

CREATE TABLE `visiting_browsers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visitors` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `visiting_countries`
--

CREATE TABLE `visiting_countries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visitors` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `album_artist`
--
ALTER TABLE `album_artist`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `artist_song`
--
ALTER TABLE `artist_song`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `episodes`
--
ALTER TABLE `episodes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `friendships`
--
ALTER TABLE `friendships`
  ADD PRIMARY KEY (`id`),
  ADD KEY `friendships_friend_id_index` (`friend_id`),
  ADD KEY `friendships_user_id_index` (`user_id`);

--
-- Índices de tabela `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `genre_podcast`
--
ALTER TABLE `genre_podcast`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `genre_song`
--
ALTER TABLE `genre_song`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `languages_locale_unique` (`locale`);

--
-- Índices de tabela `ltm_translations`
--
ALTER TABLE `ltm_translations`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `navigation_items`
--
ALTER TABLE `navigation_items`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Índices de tabela `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Índices de tabela `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Índices de tabela `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Índices de tabela `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Índices de tabela `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Índices de tabela `payouts`
--
ALTER TABLE `payouts`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `payout_methods`
--
ALTER TABLE `payout_methods`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `payout_method_artist`
--
ALTER TABLE `payout_method_artist`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `plan_permission`
--
ALTER TABLE `plan_permission`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `plan_role`
--
ALTER TABLE `plan_role`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `playlist_song`
--
ALTER TABLE `playlist_song`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `plays`
--
ALTER TABLE `plays`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `podcasts`
--
ALTER TABLE `podcasts`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `podcast_genres`
--
ALTER TABLE `podcast_genres`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `product_price`
--
ALTER TABLE `product_price`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `radio_stations`
--
ALTER TABLE `radio_stations`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `role_permission`
--
ALTER TABLE `role_permission`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `royalties`
--
ALTER TABLE `royalties`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `sale_product`
--
ALTER TABLE `sale_product`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sessions_user1_id_user2_id_unique` (`user1_id`,`user2_id`);

--
-- Índices de tabela `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscriptions_user_id_plan_id_index` (`user_id`,`plan_id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_stripe_id_index` (`stripe_id`);

--
-- Índices de tabela `user_permission`
--
ALTER TABLE `user_permission`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `visiting_browsers`
--
ALTER TABLE `visiting_browsers`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `visiting_countries`
--
ALTER TABLE `visiting_countries`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68789;

--
-- AUTO_INCREMENT de tabela `album_artist`
--
ALTER TABLE `album_artist`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `artists`
--
ALTER TABLE `artists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4797;

--
-- AUTO_INCREMENT de tabela `artist_song`
--
ALTER TABLE `artist_song`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `episodes`
--
ALTER TABLE `episodes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `friendships`
--
ALTER TABLE `friendships`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `genre_podcast`
--
ALTER TABLE `genre_podcast`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `genre_song`
--
ALTER TABLE `genre_song`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `languages`
--
ALTER TABLE `languages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `ltm_translations`
--
ALTER TABLE `ltm_translations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=798;

--
-- AUTO_INCREMENT de tabela `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de tabela `navigation_items`
--
ALTER TABLE `navigation_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `pages`
--
ALTER TABLE `pages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `payouts`
--
ALTER TABLE `payouts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `payout_methods`
--
ALTER TABLE `payout_methods`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `payout_method_artist`
--
ALTER TABLE `payout_method_artist`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de tabela `plans`
--
ALTER TABLE `plans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `plan_permission`
--
ALTER TABLE `plan_permission`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `plan_role`
--
ALTER TABLE `plan_role`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17415;

--
-- AUTO_INCREMENT de tabela `playlist_song`
--
ALTER TABLE `playlist_song`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `plays`
--
ALTER TABLE `plays`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `podcasts`
--
ALTER TABLE `podcasts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54564;

--
-- AUTO_INCREMENT de tabela `podcast_genres`
--
ALTER TABLE `podcast_genres`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `prices`
--
ALTER TABLE `prices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `product_price`
--
ALTER TABLE `product_price`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `radio_stations`
--
ALTER TABLE `radio_stations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `role_permission`
--
ALTER TABLE `role_permission`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de tabela `role_user`
--
ALTER TABLE `role_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `royalties`
--
ALTER TABLE `royalties`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `sales`
--
ALTER TABLE `sales`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `sale_product`
--
ALTER TABLE `sale_product`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `sections`
--
ALTER TABLE `sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT de tabela `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1687415;

--
-- AUTO_INCREMENT de tabela `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `user_permission`
--
ALTER TABLE `user_permission`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT de tabela `visiting_browsers`
--
ALTER TABLE `visiting_browsers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `visiting_countries`
--
ALTER TABLE `visiting_countries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `friendships`
--
ALTER TABLE `friendships`
  ADD CONSTRAINT `friendships_friend_id_foreign` FOREIGN KEY (`friend_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `friendships_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
