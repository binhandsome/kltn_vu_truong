-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 13, 2025 lúc 07:42 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `kltn_fashion_shop`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `addresses`
--

CREATE TABLE `addresses` (
  `address_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `recipient_name` varchar(100) NOT NULL,
  `recipient_phone` varchar(20) NOT NULL,
  `delivery_address` text NOT NULL,
  `address_details` text DEFAULT NULL,
  `is_primary_address` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `analytics`
--

CREATE TABLE `analytics` (
  `analytics_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `recommendation_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`recommendation_data`)),
  `training_method` enum('content_based','collaborative_filtering','deep_learning') NOT NULL,
  `trained_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `expires_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `auth`
--

CREATE TABLE `auth` (
  `auth_id` bigint(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `user_role` enum('USER','SELLER') NOT NULL,
  `is_banned` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_login_ip` varchar(45) DEFAULT NULL,
  `last_login_country` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `auth`
--

INSERT INTO `auth` (`auth_id`, `username`, `password_hash`, `user_role`, `is_banned`, `is_active`, `last_login`, `created_at`, `updated_at`, `last_login_ip`, `last_login_country`, `email`, `refresh_token`) VALUES
(4, 'testuser9', '$2a$10$kQZusaZInCru3H3GSulnxe7IBSY8up04kaas2aCByVP2w0tuO4VUu', 'USER', 0, 1, '2025-06-09 19:53:44', '2025-06-02 03:14:35', '2025-06-09 19:53:44', '127.0.0.1', 'Vietnam', 'test9@example.com', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmYzM3MTZiZi04NjMzLTQwNWItODVhYy0xYjdjN2IwNTI0N2YiLCJpYXQiOjE3NDk1MjQwMjQsImV4cCI6MTc1MDEyODgyNH0.Pdbe24d2YOcaxOvu2yc3TQkPRpgT83CgyXxDQPnCHLsZVKCVqpejYjC-TyobmDf6wyKD36rydiQTZ8Ow5-0OeA'),
(5, 'testuser1', '$2a$10$CX9h9AGjV9X0n7SpandLGuXimYCzBEccavAyvZflPasdwzhNszPUC', 'USER', 0, 1, '2025-06-09 19:55:18', '2025-06-09 19:55:18', '2025-06-09 19:55:18', NULL, NULL, 'test1@example.com', NULL),
(6, 'seller1', '$2a$10$kQZusaZInCru3H3GSulnxe7IBSY8up04kaas2aCByVP2w0tuO4VUu', 'SELLER', 0, 1, '2025-06-09 19:53:44', '2025-06-02 03:14:35', '2025-06-09 19:53:44', '127.0.0.1', 'Vietnam', 'seller1@example.com', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmYzM3MTZiZi04NjMzLTQwNWItODVhYy0xYjdjN2IwNTI0N2YiLCJpYXQiOjE3NDk1MjQwMjQsImV4cCI6MTc1MDEyODgyNH0.Pdbe24d2YOcaxOvu2yc3TQkPRpgT83CgyXxDQPnCHLsZVKCVqpejYjC-TyobmDf6wyKD36rydiQTZ8Ow5-0OeA');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bank_transactions`
--

CREATE TABLE `bank_transactions` (
  `bank_transactions_id` bigint(20) NOT NULL,
  `transaction_id` bigint(20) DEFAULT NULL,
  `card_number` varchar(20) NOT NULL,
  `cardholder_name` varchar(100) NOT NULL,
  `bank_name` varchar(50) DEFAULT NULL,
  `bank_transaction_code` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `cart_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`) VALUES
(1, 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` bigint(20) NOT NULL,
  `cart_id` bigint(20) NOT NULL,
  `product_asin` varchar(10) NOT NULL,
  `variant_id` bigint(20) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cart_items`
--

INSERT INTO `cart_items` (`cart_item_id`, `cart_id`, `product_asin`, `variant_id`, `quantity`, `unit_price`) VALUES
(1, 1, 'ASIN001', 1, 5, 85.00),
(4, 1, 'ASIN001', 2, 3, 90.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `category_id` bigint(20) NOT NULL,
  `product_asin` varchar(10) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_description` text DEFAULT NULL,
  `category_features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`category_features`)),
  `store_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cod_transactions`
--

CREATE TABLE `cod_transactions` (
  `cod_transactions_id` bigint(20) NOT NULL,
  `transaction_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `coupons`
--

CREATE TABLE `coupons` (
  `coupon_id` bigint(20) NOT NULL,
  `coupon_code` varchar(50) NOT NULL,
  `discount_type` enum('percentage','fixed') NOT NULL,
  `discount_value` decimal(10,2) NOT NULL,
  `max_uses` int(11) DEFAULT 1,
  `times_used` int(11) DEFAULT 0,
  `expiration_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `crypto_transactions`
--

CREATE TABLE `crypto_transactions` (
  `crypto_transactions_id` bigint(20) NOT NULL,
  `transaction_id` bigint(20) DEFAULT NULL,
  `user_wallet_address` varchar(100) NOT NULL,
  `system_wallet_address` varchar(100) NOT NULL,
  `crypto_type` varchar(20) NOT NULL,
  `transaction_hash` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `delivery_info`
--

CREATE TABLE `delivery_info` (
  `delivery_id` bigint(20) NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `address_id` bigint(20) NOT NULL,
  `shipping_method_id` bigint(20) NOT NULL,
  `delivery_status` enum('pending','packed','shipped','delivered','failed') DEFAULT 'pending',
  `shipping_fee` decimal(10,2) NOT NULL,
  `tracking_number` varchar(50) DEFAULT NULL,
  `estimated_delivery_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` bigint(20) NOT NULL,
  `warehouse_id` bigint(20) NOT NULL,
  `variant_id` bigint(20) NOT NULL,
  `size_id` bigint(20) DEFAULT NULL,
  `remaining_quantity` int(11) NOT NULL,
  `quantity_sold` int(11) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `inventory_status` enum('available','out_of_stock') DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messages`
--

CREATE TABLE `messages` (
  `message_id` bigint(20) NOT NULL,
  `sender_id` bigint(20) DEFAULT NULL,
  `sender_session_id` varchar(50) DEFAULT NULL,
  `receiver_id` bigint(20) DEFAULT NULL,
  `message_type` enum('chat','notification','support') DEFAULT 'chat',
  `message_content` text NOT NULL,
  `approval_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `approved_by` bigint(20) DEFAULT NULL,
  `message_status` enum('sent','delivered','read') DEFAULT 'sent',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `momo_transactions`
--

CREATE TABLE `momo_transactions` (
  `transaction_id` bigint(20) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `momo_transaction_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `order_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `delivery_id` bigint(20) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `order_status` enum('pending','processing','shipped','completed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `promotion_id` bigint(20) DEFAULT NULL,
  `coupon_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` bigint(20) NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `product_variant_id` bigint(20) NOT NULL,
  `store_id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `size_id` bigint(20) DEFAULT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `promotion_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `paypal_transactions`
--

CREATE TABLE `paypal_transactions` (
  `transaction_id` bigint(20) NOT NULL,
  `paypal_email` varchar(255) NOT NULL,
  `paypal_payment_id` varchar(50) NOT NULL,
  `paypal_transaction_id` varchar(50) DEFAULT NULL,
  `paypal_redirect_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `product_id` bigint(20) NOT NULL,
  `asin` varchar(10) NOT NULL,
  `product_title` varchar(255) NOT NULL,
  `product_price` decimal(10,2) DEFAULT NULL,
  `average_rating` decimal(3,2) DEFAULT NULL,
  `number_of_ratings` int(11) DEFAULT 0,
  `product_thumbnail` varchar(255) DEFAULT NULL,
  `brand_name` varchar(100) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT 0,
  `product_status` enum('active','inactive','discontinued') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`product_id`, `asin`, `product_title`, `product_price`, `average_rating`, `number_of_ratings`, `product_thumbnail`, `brand_name`, `stock_quantity`, `product_status`, `created_at`, `updated_at`) VALUES
(1, 'ASIN001', 'Cozy Knit Cardigan Sweater', 80.00, NULL, 0, NULL, 'Zara', 0, 'active', '2025-04-22 03:25:21', '2025-04-22 03:25:21'),
(2, 'ASIN002', 'Sophisticated Swagger Suit', 80.00, NULL, 0, NULL, 'H&M', 0, 'active', '2025-04-22 03:25:21', '2025-04-22 03:25:21'),
(3, 'ASIN003', 'ClassNameic Denim Skinny Jeans', 80.00, NULL, 0, NULL, 'Levi\'s', 0, 'active', '2025-04-22 03:25:21', '2025-04-22 03:25:21'),
(4, 'ASIN004', 'Athletic Mesh Sports Leggings', 80.00, NULL, 0, NULL, 'Nike', 0, 'active', '2025-04-22 03:25:21', '2025-04-22 03:25:21'),
(5, 'ASIN123', 'Nike Shirt', 100.00, 4.50, 10, 'http://example.com/nike_shirt.jpg', 'Nike', 50, 'active', '2025-06-12 03:29:32', '2025-06-12 03:29:53'),
(6, 'ASIN124', 'Adidas Jacket', 150.00, 4.20, 15, 'http://example.com/adidas_jacket.jpg', 'Adidas', 30, 'active', '2025-06-12 03:29:32', '2025-06-12 03:29:57'),
(7, 'ASIN125', 'Puma Shoes', 80.00, 4.00, 20, 'http://example.com/puma_shoes.jpg', 'Puma', 40, 'active', '2025-06-12 03:29:32', '2025-06-12 03:30:01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_images`
--

CREATE TABLE `product_images` (
  `image_id` bigint(20) NOT NULL,
  `product_asin` varchar(10) NOT NULL,
  `image_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`image_data`)),
  `is_main_image` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_images`
--

INSERT INTO `product_images` (`image_id`, `product_asin`, `image_data`, `is_main_image`) VALUES
(1, 'ASIN001', '\"https://example.com/images/cardigan.jpg\"', 1),
(2, 'ASIN002', '\"https://example.com/images/suit.jpg\"', 1),
(3, 'ASIN003', '\"https://example.com/images/jeans.jpg\"', 1),
(4, 'ASIN004', '\"https://example.com/images/leggings.jpg\"', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_sizes`
--

CREATE TABLE `product_sizes` (
  `size_id` bigint(20) NOT NULL,
  `variant_id` bigint(20) NOT NULL,
  `size_name` varchar(20) DEFAULT NULL,
  `size_sku` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_variants`
--

CREATE TABLE `product_variants` (
  `variant_id` bigint(20) NOT NULL,
  `product_asin` varchar(10) NOT NULL,
  `variant_price` decimal(10,2) DEFAULT NULL,
  `variant_color` varchar(50) DEFAULT NULL,
  `variant_sku` varchar(50) DEFAULT NULL,
  `variant_thumbnail` varchar(255) DEFAULT NULL,
  `store_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_variants`
--

INSERT INTO `product_variants` (`variant_id`, `product_asin`, `variant_price`, `variant_color`, `variant_sku`, `variant_thumbnail`, `store_id`) VALUES
(1, 'ASIN001', 85.00, 'Red', 'SKU001-RED', 'https://example.com/thumbnail1.jpg', 1),
(2, 'ASIN001', 90.00, 'Blue', 'SKU001-BLUE', 'https://example.com/thumbnail2.jpg', 1),
(3, 'ASIN123', 120.00, 'Blue', 'SKU123-BLUE', 'http://example.com/nike_shirt_blue.jpg', 1),
(4, 'ASIN123', 130.00, 'Red', 'SKU123-RED', 'http://example.com/nike_shirt_red.jpg', 1),
(5, 'ASIN124', 170.00, 'Black', 'SKU124-BLACK', 'http://example.com/adidas_jacket_black.jpg', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_videos`
--

CREATE TABLE `product_videos` (
  `video_id` bigint(20) NOT NULL,
  `product_asin` varchar(10) NOT NULL,
  `video_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`video_data`)),
  `video_duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotions`
--

CREATE TABLE `promotions` (
  `promotion_id` bigint(20) NOT NULL,
  `promotion_name` varchar(100) NOT NULL,
  `discount_type` enum('percentage','fixed','free_shipping') NOT NULL,
  `discount_value` decimal(10,2) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `end_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `store_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `variant_id` bigint(20) DEFAULT NULL,
  `min_order_value` decimal(10,2) DEFAULT NULL,
  `max_discount_value` decimal(10,2) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `promotions`
--

INSERT INTO `promotions` (`promotion_id`, `promotion_name`, `discount_type`, `discount_value`, `start_date`, `end_date`, `store_id`, `product_id`, `variant_id`, `min_order_value`, `max_discount_value`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Winter Sale', 'percentage', 20.00, '2025-04-22 03:26:21', '0000-00-00 00:00:00', NULL, 1, NULL, NULL, NULL, 1, '2025-04-22 03:26:21', '2025-04-22 03:26:21'),
(2, 'Holiday Deal', 'percentage', 20.00, '2025-04-22 03:26:21', '0000-00-00 00:00:00', NULL, 2, NULL, NULL, NULL, 1, '2025-04-22 03:26:21', '2025-04-22 03:26:21'),
(3, 'Summer Sale', 'percentage', 20.00, '2025-04-22 03:26:21', '0000-00-00 00:00:00', NULL, 3, NULL, NULL, NULL, 1, '2025-04-22 03:26:21', '2025-04-22 03:26:21'),
(4, 'Spring Promo', 'percentage', 20.00, '2025-04-22 03:26:21', '0000-00-00 00:00:00', NULL, 4, NULL, NULL, NULL, 1, '2025-04-22 03:26:21', '2025-04-22 03:26:21');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `review_id` bigint(20) NOT NULL,
  `product_asin` varchar(50) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `rating` decimal(10,2) NOT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_verified` tinyint(1) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `star_vote` decimal(10,2) DEFAULT NULL,
  `seller_response` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shipping_methods`
--

CREATE TABLE `shipping_methods` (
  `id` bigint(20) NOT NULL,
  `method_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `estimated_days` int(11) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT 0.00,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `stores`
--

CREATE TABLE `stores` (
  `store_id` bigint(20) NOT NULL,
  `store_name` varchar(100) NOT NULL,
  `store_description` varchar(500) DEFAULT NULL,
  `store_address` varchar(255) DEFAULT NULL,
  `store_phone` varchar(20) DEFAULT NULL,
  `store_email` varchar(255) DEFAULT NULL,
  `store_thumbnail` varchar(255) DEFAULT NULL,
  `store_status` enum('active','pending','suspended') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `auth_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `stores`
--

INSERT INTO `stores` (`store_id`, `store_name`, `store_description`, `store_address`, `store_phone`, `store_email`, `store_thumbnail`, `store_status`, `created_at`, `updated_at`, `auth_id`) VALUES
(1, 'Fashion Store 1', 'Chuyên bán thời trang', '123 Fashion St', '0912345678', 'seller1@example.com', 'http://example.com/store1.jpg', 'active', '2025-06-12 23:49:13', '2025-06-12 23:51:46', 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `store_messages`
--

CREATE TABLE `store_messages` (
  `message_id` bigint(20) NOT NULL,
  `sender_id` bigint(20) DEFAULT NULL,
  `sender_session_id` varchar(50) DEFAULT NULL,
  `store_id` bigint(20) NOT NULL,
  `message_type` enum('user_to_store','store_to_user') NOT NULL,
  `message_content` text NOT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `message_status` enum('sent','delivered','read') DEFAULT 'sent',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` bigint(20) NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `payment_method` enum('bank','momo','crypto','paypal','cod') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('pending','completed','failed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `auth_id` bigint(20) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `user_address` text DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_preferences` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`user_preferences`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `auth_id`, `first_name`, `last_name`, `date_of_birth`, `user_address`, `gender`, `phone_number`, `email`, `profile_picture`, `created_at`, `updated_at`, `user_preferences`) VALUES
(4, 4, NULL, NULL, NULL, NULL, NULL, NULL, 'test9@example.com', NULL, '2025-06-02 03:14:35', '2025-06-02 03:14:35', NULL),
(5, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-09 19:55:18', '2025-06-09 19:55:18', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `warehouses`
--

CREATE TABLE `warehouses` (
  `warehouse_id` bigint(20) NOT NULL,
  `store_id` bigint(20) NOT NULL,
  `warehouse_address` text NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `warehouse_capacity` int(11) DEFAULT NULL,
  `is_active_warehouse` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `analytics`
--
ALTER TABLE `analytics`
  ADD PRIMARY KEY (`analytics_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`auth_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `bank_transactions`
--
ALTER TABLE `bank_transactions`
  ADD PRIMARY KEY (`bank_transactions_id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD UNIQUE KEY `uk_cart_user_id` (`user_id`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD UNIQUE KEY `uk_cart_item_cart_id_product_asin_variant_id` (`cart_id`,`product_asin`,`variant_id`),
  ADD KEY `fk_cart_items_product_asin` (`product_asin`),
  ADD KEY `fk_cart_items_variant_id` (`variant_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `product_asin` (`product_asin`);

--
-- Chỉ mục cho bảng `cod_transactions`
--
ALTER TABLE `cod_transactions`
  ADD PRIMARY KEY (`cod_transactions_id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Chỉ mục cho bảng `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`coupon_id`),
  ADD UNIQUE KEY `coupon_code` (`coupon_code`);

--
-- Chỉ mục cho bảng `crypto_transactions`
--
ALTER TABLE `crypto_transactions`
  ADD PRIMARY KEY (`crypto_transactions_id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Chỉ mục cho bảng `delivery_info`
--
ALTER TABLE `delivery_info`
  ADD PRIMARY KEY (`delivery_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `address_id` (`address_id`),
  ADD KEY `shipping_method_id` (`shipping_method_id`);

--
-- Chỉ mục cho bảng `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`);

--
-- Chỉ mục cho bảng `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`),
  ADD KEY `approved_by` (`approved_by`);

--
-- Chỉ mục cho bảng `momo_transactions`
--
ALTER TABLE `momo_transactions`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `promotion_id` (`promotion_id`),
  ADD KEY `coupon_id` (`coupon_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_variant_id` (`product_variant_id`),
  ADD KEY `store_id` (`store_id`),
  ADD KEY `size_id` (`size_id`),
  ADD KEY `promotion_id` (`promotion_id`);

--
-- Chỉ mục cho bảng `paypal_transactions`
--
ALTER TABLE `paypal_transactions`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `asin` (`asin`);

--
-- Chỉ mục cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `product_asin` (`product_asin`);

--
-- Chỉ mục cho bảng `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD PRIMARY KEY (`size_id`),
  ADD UNIQUE KEY `size_sku` (`size_sku`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Chỉ mục cho bảng `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`variant_id`),
  ADD UNIQUE KEY `uk_variant_sku_store` (`variant_sku`,`store_id`),
  ADD KEY `product_asin` (`product_asin`),
  ADD KEY `fk_product_variants_store_id` (`store_id`);

--
-- Chỉ mục cho bảng `product_videos`
--
ALTER TABLE `product_videos`
  ADD PRIMARY KEY (`video_id`),
  ADD KEY `product_asin` (`product_asin`);

--
-- Chỉ mục cho bảng `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`promotion_id`),
  ADD KEY `store_id` (`store_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `product_asin` (`product_asin`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `shipping_methods`
--
ALTER TABLE `shipping_methods`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`store_id`),
  ADD KEY `fk_stores_auth_id` (`auth_id`);

--
-- Chỉ mục cho bảng `store_messages`
--
ALTER TABLE `store_messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `store_id` (`store_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `auth_id` (`auth_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `warehouses`
--
ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`warehouse_id`),
  ADD KEY `store_id` (`store_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `addresses`
--
ALTER TABLE `addresses`
  MODIFY `address_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `analytics`
--
ALTER TABLE `analytics`
  MODIFY `analytics_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `auth`
--
ALTER TABLE `auth`
  MODIFY `auth_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `coupons`
--
ALTER TABLE `coupons`
  MODIFY `coupon_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `delivery_info`
--
ALTER TABLE `delivery_info`
  MODIFY `delivery_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `product_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `product_images`
--
ALTER TABLE `product_images`
  MODIFY `image_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `size_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `variant_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `product_videos`
--
ALTER TABLE `product_videos`
  MODIFY `video_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `promotions`
--
ALTER TABLE `promotions`
  MODIFY `promotion_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `shipping_methods`
--
ALTER TABLE `shipping_methods`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `stores`
--
ALTER TABLE `stores`
  MODIFY `store_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `store_messages`
--
ALTER TABLE `store_messages`
  MODIFY `message_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `warehouses`
--
ALTER TABLE `warehouses`
  MODIFY `warehouse_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `analytics`
--
ALTER TABLE `analytics`
  ADD CONSTRAINT `analytics_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `analytics_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `bank_transactions`
--
ALTER TABLE `bank_transactions`
  ADD CONSTRAINT `bank_transactions_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`);

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `fk_cart_items_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_cart_items_product_asin` FOREIGN KEY (`product_asin`) REFERENCES `products` (`asin`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_cart_items_variant_id` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`variant_id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`product_asin`) REFERENCES `products` (`asin`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `cod_transactions`
--
ALTER TABLE `cod_transactions`
  ADD CONSTRAINT `cod_transactions_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`);

--
-- Các ràng buộc cho bảng `crypto_transactions`
--
ALTER TABLE `crypto_transactions`
  ADD CONSTRAINT `crypto_transactions_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`);

--
-- Các ràng buộc cho bảng `delivery_info`
--
ALTER TABLE `delivery_info`
  ADD CONSTRAINT `delivery_info_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `delivery_info_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`address_id`),
  ADD CONSTRAINT `delivery_info_ibfk_3` FOREIGN KEY (`shipping_method_id`) REFERENCES `shipping_methods` (`id`);

--
-- Các ràng buộc cho bảng `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`approved_by`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `momo_transactions`
--
ALTER TABLE `momo_transactions`
  ADD CONSTRAINT `momo_transactions_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`promotion_id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`coupon_id`);

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`variant_id`),
  ADD CONSTRAINT `order_items_ibfk_3` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`),
  ADD CONSTRAINT `order_items_ibfk_4` FOREIGN KEY (`size_id`) REFERENCES `product_sizes` (`size_id`),
  ADD CONSTRAINT `order_items_ibfk_5` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`promotion_id`);

--
-- Các ràng buộc cho bảng `paypal_transactions`
--
ALTER TABLE `paypal_transactions`
  ADD CONSTRAINT `paypal_transactions_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`);

--
-- Các ràng buộc cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_asin`) REFERENCES `products` (`asin`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD CONSTRAINT `product_sizes_ibfk_1` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`variant_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `fk_product_variants_store_id` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_asin`) REFERENCES `products` (`asin`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_videos`
--
ALTER TABLE `product_videos`
  ADD CONSTRAINT `product_videos_ibfk_1` FOREIGN KEY (`product_asin`) REFERENCES `products` (`asin`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `promotions`
--
ALTER TABLE `promotions`
  ADD CONSTRAINT `promotions_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`),
  ADD CONSTRAINT `promotions_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `promotions_ibfk_3` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`variant_id`);

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_asin`) REFERENCES `products` (`asin`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `fk_stores_auth_id` FOREIGN KEY (`auth_id`) REFERENCES `auth` (`auth_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `store_messages`
--
ALTER TABLE `store_messages`
  ADD CONSTRAINT `store_messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `store_messages_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`),
  ADD CONSTRAINT `store_messages_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Các ràng buộc cho bảng `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`auth_id`) REFERENCES `auth` (`auth_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `warehouses`
--
ALTER TABLE `warehouses`
  ADD CONSTRAINT `warehouses_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
