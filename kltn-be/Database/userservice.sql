/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80043
 Source Host           : localhost:3306
 Source Schema         : userservice

 Target Server Type    : MySQL
 Target Server Version : 80043
 File Encoding         : 65001

 Date: 07/08/2025 21:21:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `address_id` bigint NOT NULL AUTO_INCREMENT,
  `address_details` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `created_at` datetime(6) NULL DEFAULT NULL,
  `delivery_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_primary_address` int NOT NULL,
  `recipient_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `recipient_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `recipient_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `updated_at` datetime(6) NULL DEFAULT NULL,
  `user_id` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`address_id`) USING BTREE,
  INDEX `FK6i66ijb8twgcqtetl8eeeed6v`(`user_id` ASC) USING BTREE,
  CONSTRAINT `FK6i66ijb8twgcqtetl8eeeed6v` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES (2, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:03:23.362544', 'fasfsafasfas, Xã Quảng Sơn, Huyện Hải Hà, Tỉnh Quảng Ninh / vu tran', 0, 'fasfsafsafas@gmail.com', 'fasfasfas fasfasfsa', '0379886918', '2025-08-02 08:36:02.654888', NULL);
INSERT INTO `address` VALUES (4, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:03:26.291144', 'fasfsafasfas, Xã Quảng Sơn, Huyện Hải Hà, Tỉnh Quảng Ninh', 0, 'fasfsafsafas@gmail.com', 'fasfasfas fasfasfsa', '0379886918', '2025-07-31 18:03:26.291144', NULL);
INSERT INTO `address` VALUES (5, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:03:43.829225', 'fasfsafasfas, Xã Quảng Sơn, Huyện Hải Hà, Tỉnh Quảng Ninh', 0, 'fasfsafsafas@gmail.com', 'fasfasfas fasfasfsa', '0379886918', '2025-07-31 18:03:43.829225', NULL);
INSERT INTO `address` VALUES (6, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:05:19.627945', 'fasfsafasfas, Xã Quảng Sơn, Huyện Hải Hà, Tỉnh Quảng Ninh', 0, 'fasfsafsafas@gmail.com', 'fasfasfas fasfasfsa', '0379886918', '2025-07-31 18:05:19.627945', NULL);
INSERT INTO `address` VALUES (7, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:05:23.563255', 'fasfsafasfas, Xã Quảng Sơn, Huyện Hải Hà, Tỉnh Quảng Ninh', 0, 'fasfsafsafas@gmail.com', 'fasfasfas fasfasfsa', '0379886918', '2025-07-31 18:05:23.563255', NULL);
INSERT INTO `address` VALUES (8, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:05:29.090258', 'fasfsafasfas, Xã Quảng Sơn, Huyện Hải Hà, Tỉnh Quảng Ninh', 0, 'fasfsafsafas@gmail.com', 'fasfasfas fasfasfsa', '0379886918', '2025-07-31 18:05:29.090258', NULL);
INSERT INTO `address` VALUES (9, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:05:35.086938', 'fasfsafasfas, Xã Quảng Sơn, Huyện Hải Hà, Tỉnh Quảng Ninh', 0, 'fasfsafsafas@gmail.com', 'fasfasfas fasfasfsa', '0379886918', '2025-07-31 18:05:35.086938', NULL);
INSERT INTO `address` VALUES (10, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:05:54.240464', 'fasfsafasfas, Xã Quảng Sơn, Huyện Hải Hà, Tỉnh Quảng Ninh', 0, 'fasfsafsafas@gmail.com', 'fasfasfas fasfasfsa', '0379886918', '2025-07-31 18:05:54.240464', NULL);
INSERT INTO `address` VALUES (11, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:05:55.415810', 'fasfsafasfas, Xã Quảng Sơn, Huyện Hải Hà, Tỉnh Quảng Ninh', 0, 'fasfsafsafas@gmail.com', 'fasfasfas fasfasfsa', '0379886918', '2025-07-31 18:05:55.415810', NULL);
INSERT INTO `address` VALUES (12, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:06:18.583175', 'fasfsafasfas, Xã Quảng Sơn, Huyện Hải Hà, Tỉnh Quảng Ninh', 0, 'fasfsafsafas@gmail.com', 'fasfasfas fasfasfsa', '0379886918', '2025-07-31 18:06:18.583175', NULL);
INSERT INTO `address` VALUES (13, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:09:32.328483', 'fasfsafasfas, Xã Nậm Ban, Huyện Mèo Vạc, Tỉnh Hà Giang', 0, 'vutranorhilsun@gmail.com', 'fsafasfas fasfasfasfasf', '0379886918', '2025-07-31 18:09:32.328483', NULL);
INSERT INTO `address` VALUES (14, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:10:01.736840', 'fasfsafasfas, Xã Nậm Ban, Huyện Mèo Vạc, Tỉnh Hà Giang', 0, 'vutranorhilsun@gmail.com', 'fsafasfas fasfasfasfasf', '0379886918', '2025-07-31 18:10:01.736840', NULL);
INSERT INTO `address` VALUES (15, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:13:26.552133', 'fasfsafasfas, Xã Bản Luốc, Huyện Hoàng Su Phì, Tỉnh Hà Giang', 0, 'vutranorhilsun@gmail.com', 'fsafasfas fasfasfasfasf', '0379886918', '2025-07-31 18:13:26.552133', NULL);
INSERT INTO `address` VALUES (16, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:14:48.495228', 'fasfsafasfas, Xã Vần Chải, Huyện Đồng Văn, Tỉnh Hà Giang', 0, 'vutranorhilsun@gmail.com', 'fsafasfas fasfasfasfasf', '0379886918', '2025-07-31 18:14:48.495228', NULL);
INSERT INTO `address` VALUES (17, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:15:31.776455', 'fasfsafasfas, Xã Vần Chải, Huyện Đồng Văn, Tỉnh Hà Giang', 0, 'vutranorhilsun@gmail.com', 'fsafasfas fasfasfasfasf', '0379886918', '2025-07-31 18:15:31.776455', NULL);
INSERT INTO `address` VALUES (18, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:15:34.240168', 'fasfsafasfas, Xã Vần Chải, Huyện Đồng Văn, Tỉnh Hà Giang', 0, 'vutranorhilsun@gmail.com', 'fsafasfas fasfasfasfasf', '0379886918', '2025-07-31 18:15:34.240168', NULL);
INSERT INTO `address` VALUES (19, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:16:02.603197', 'fasfsafasfas, Xã Vần Chải, Huyện Đồng Văn, Tỉnh Hà Giang', 0, 'vutranorhilsun@gmail.com', 'fsafasfas fasfasfasfasf', '0379886918', '2025-07-31 18:16:02.603197', NULL);
INSERT INTO `address` VALUES (20, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:17:14.100065', 'fasfsafasfas, Xã Vần Chải, Huyện Đồng Văn, Tỉnh Hà Giang', 0, 'vutranorhilsun@gmail.com', 'fsafasfas fasfasfasfasf', '0379886918', '2025-07-31 18:17:14.100065', NULL);
INSERT INTO `address` VALUES (21, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:19:45.344145', 'fasfsafasfas, Xã Vần Chải, Huyện Đồng Văn, Tỉnh Hà Giang', 0, 'vutranorhilsun@gmail.com', 'fsafasfas fasfasfasfasf', '0379886918', '2025-07-31 18:19:45.344145', NULL);
INSERT INTO `address` VALUES (22, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-07-31 18:20:54.884528', 'fasfasfsaf, Xã Quang Húc, Huyện Tam Nông, Tỉnh Phú Thọ', 0, 'fkjnsakfhbsakf!@gmail.com', 'fasfasf àasfas', '0379886918', '2025-07-31 18:20:54.884528', NULL);
INSERT INTO `address` VALUES (23, 'Thành phố Hà Nội, Quận Hà Đông, Phường Dương Nội', '2025-08-01 17:12:57.292165', 'thanh vu / 1442', 0, 'vutranorhilsun@gmail.com', 'tran vu', '0379886918', '2025-08-01 17:38:56.683891', 8);
INSERT INTO `address` VALUES (24, 'Thành phố Hà Nội, Quận Hà Đông, Phường Đồng Mai', '2025-08-01 17:38:56.692398', 'fasfasfasf / thanh vu', 1, 'thanh vu ngu si dan don', 'vu tran', '0379886918 ', '2025-08-02 08:01:37.348407', 8);
INSERT INTO `address` VALUES (25, 'Tỉnh Hà Giang, Huyện Đồng Văn, Xã Hố Quáng Phìn', '2025-08-04 16:32:45.483509', 'fasfasfasf / fasfasfas', 1, 'vutranorhilsun@gmail.com', 'tran vu', '0379886918', '2025-08-04 16:32:45.483509', 14);

-- ----------------------------
-- Table structure for auth
-- ----------------------------
DROP TABLE IF EXISTS `auth`;
CREATE TABLE `auth`  (
  `auth_id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_role` enum('USER','SELLER','ADMIN') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'USER',
  `is_banned` tinyint(1) NULL DEFAULT 0,
  `is_active` tinyint(1) NULL DEFAULT 0,
  `last_login` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login_ip` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `last_login_country` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `refresh_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`auth_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 55 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of auth
-- ----------------------------
INSERT INTO `auth` VALUES (16, 'vutranlethicuba', '$2a$10$sDyBZVTBpjOYnJCpb/NmtuSxKoxotsxSFHgbYHuXgczS25TzcJTg6', 'USER', 0, 0, '2025-06-18 18:57:07', '2025-06-18 18:57:07', '2025-06-18 18:57:07', NULL, NULL, 'lethicuba123@gmail.com', NULL);
INSERT INTO `auth` VALUES (17, 'vutranorhilsun@gmail.com', '$2a$10$dk9OpTLvpZ6UZX/.Hxq.yeFEW0jTouentHaD1BlFyWS57X0tJpSXG', 'USER', 0, 0, '2025-06-18 18:57:27', '2025-06-18 18:57:27', '2025-06-18 18:57:27', NULL, NULL, 'fasfasfasfsafas@gmail.com', NULL);
INSERT INTO `auth` VALUES (18, 'NanoCanvasGenAI', '$2a$10$kYMuUxwVV.kKv72WaNC1beKS1/kK/FCO3IqjGkK6CTr0T5zHX0Cv.', 'USER', 0, 0, '2025-06-18 18:57:46', '2025-06-18 18:57:46', '2025-06-18 18:57:46', NULL, NULL, 'fsafasfsaf@gmail.com', NULL);
INSERT INTO `auth` VALUES (19, 'NanoCanvasGenAIsss', '$2a$10$zF.BTBE1V5OijxnRtnb9DugjOfXrxd8HYcxxUPvjcY/7GHZ1rmG7W', 'USER', 0, 0, '2025-06-18 18:58:38', '2025-06-18 18:58:38', '2025-06-18 18:58:38', NULL, NULL, 'legofriefasfnd68@gmail.com', NULL);
INSERT INTO `auth` VALUES (20, 'vutranlfasfethicuba', '$2a$10$Auah2g2LnuxfOervo/uXoew5P8jM3Igos1JMmyNZ2Zt0a7cwOcx9O', 'USER', 0, 0, '2025-06-18 18:59:31', '2025-06-18 18:59:31', '2025-06-18 18:59:31', NULL, NULL, 'legofriend6fasfsa8@gmail.com', NULL);
INSERT INTO `auth` VALUES (21, 'vudeptrai', '$2a$10$kVWNqJ2Kb6iWbRfcSgGc..RTc4Tphwokx89fEHACUqCv4rI7nlWPq', 'USER', 0, 0, '2025-06-19 09:14:13', '2025-06-19 09:14:13', '2025-06-19 09:14:13', NULL, NULL, 'vuvu@gmail.com', NULL);
INSERT INTO `auth` VALUES (22, 'vudeptrai1', '$2a$10$vSe/eILWWCEyPp6Pff6kp.reWXHdQo36tEfivY9C5ScmrDd1pM3Ka', 'USER', 0, 0, '2025-06-19 09:14:52', '2025-06-19 09:14:52', '2025-06-19 09:14:52', NULL, NULL, 'vuvuvu@gmail.com', NULL);
INSERT INTO `auth` VALUES (23, 'cucu123', '$2a$10$ZF4Bv705BqTBv8umEU8YrOp2Fh.daEzo7/xZhYPg0EkmmgX9YXcN6', 'USER', 0, 0, '2025-07-01 16:11:50', '2025-07-01 16:11:50', '2025-07-01 16:11:50', NULL, NULL, 'lethicuba1004@gmail.com', NULL);
INSERT INTO `auth` VALUES (24, 'fjasnfj', '$2a$10$f62jSYquzyRt.09hXaxOp.A1Na5gCU15EAfdOXj7XV7HXEqCS/n8a', 'USER', 0, 0, '2025-06-22 15:29:08', '2025-06-22 15:29:08', '2025-06-22 15:29:08', NULL, NULL, 'fhasbfjhas@gmail.com', NULL);
INSERT INTO `auth` VALUES (25, '1412412', '$2a$10$9VHZZHhNiLvXLf3saMYDFOy9FbvkhYdNApbG7NN7kSQnsdSAUz.sS', 'USER', 0, 0, '2025-06-22 15:34:47', '2025-06-22 15:34:47', '2025-06-22 15:34:47', NULL, NULL, 'fasf124@gmail.com', NULL);
INSERT INTO `auth` VALUES (26, 'lethicubafasfasfasf', '$2a$10$CijrMqeX0q0FhHX/19JVqOjJyiJibYXdTAjdDOX47knW1Ol8O02hi', 'USER', 0, 0, '2025-07-01 15:43:18', '2025-07-01 15:43:18', '2025-07-01 15:43:18', NULL, NULL, 'fsafasfsa@gmail.com', NULL);
INSERT INTO `auth` VALUES (27, 'fasfa412fas', '$2a$10$Y.QMmR4dkH6NjVYH6UE1QeZgasIl5cKTBBr0.nzmbf7B6JGUnBEta', 'SELLER', 0, 0, '2025-07-21 19:06:39', '2025-07-21 19:06:39', '2025-07-21 19:06:39', NULL, NULL, 'fasfa412fas@gmail.com', NULL);
INSERT INTO `auth` VALUES (28, 'vutranlethicubasfsaf', '$2a$10$k8Yxtvi/RybrVJnPl8gz/.C6PRnDuoBbtocNhpyo8Hw/i0sFAZ5US', 'USER', 0, 0, '2025-07-12 19:52:50', '2025-07-12 19:52:50', '2025-07-12 19:52:50', NULL, NULL, '123@gmail.com', NULL);
INSERT INTO `auth` VALUES (29, 'thanhvu', '$2a$10$pwsKDmp1riuq2jtylQXLg.36bZQWLrtonjCYis357qQljkkuVCyDi', 'USER', 0, 0, '2025-07-12 23:45:52', '2025-07-12 23:45:52', '2025-07-12 23:45:52', NULL, NULL, '12345@gmail.com', NULL);
INSERT INTO `auth` VALUES (30, 'fsafasfsafsa', '$2a$10$DyfmXDWWxlAbLjD7Xc3POe0yiLnU1KI7oewMom4NLErNdvsyh19KW', 'SELLER', 0, 0, '2025-07-28 23:55:36', '2025-07-28 23:55:36', '2025-07-28 23:55:36', NULL, NULL, 'legofriend68@gmail.com', NULL);
INSERT INTO `auth` VALUES (31, 'fsafasfsafsafsafasfsa', '$2a$10$Mc974uGKcng.1JM3Ea6iduJAwUfrfHilkKNv5Tqsgyz6pqWyALdNy', 'USER', 0, 0, '2025-07-19 17:08:21', '2025-07-19 17:08:21', '2025-07-19 17:08:21', NULL, NULL, 'fasfasfsssasfasf@gmail.com', NULL);
INSERT INTO `auth` VALUES (32, 'fsafasfsafsafsafasasfsfsa', '$2a$10$BAjoCKEKAG4qgR3NreDq4eJ591j.hNTSlevpMaUD98Im8MErvbX0.', 'USER', 0, 0, '2025-07-19 17:10:21', '2025-07-19 17:10:21', '2025-07-19 17:10:21', NULL, NULL, 'fasfasfsssasfasfsafasf@gmail.com', NULL);
INSERT INTO `auth` VALUES (33, 'fsafasfsafsafsafasafsafasfsfsfsa', '$2a$10$iRqEDk50/mBJQCW8hxB7QORSbupDzSNixhXfKBFZJefmfWvNNyoAW', 'USER', 0, 0, '2025-07-19 17:26:07', '2025-07-19 17:26:07', '2025-07-19 17:26:07', NULL, NULL, 'fasfasfsssasfasffasfasfasfafasf@gmail.com', NULL);
INSERT INTO `auth` VALUES (34, 'fsafasfsafsaffsafassafasafsafasfsfsfsa', '$2a$10$tRMZ6RY9qzACP5jszSWRtO4Q1NvP35CJ7Ya/TRf/Kokufxx6FxbpG', 'USER', 0, 0, '2025-07-19 17:48:33', '2025-07-19 17:48:33', '2025-07-19 17:48:33', NULL, NULL, 'fasfasfsssasfasffassfasffasfasfafasf@gmail.com', NULL);
INSERT INTO `auth` VALUES (35, 'thanhvu1234', '$2a$10$9gSpev1GktU6Kl3QW2bnVeto8SiuzMXEkzgnLxxcxQi1IO7wuu3ra', 'SELLER', 0, 0, '2025-07-21 19:06:16', '2025-07-21 19:06:16', '2025-07-21 19:06:16', NULL, NULL, 'legofriensd68@gmail.com', NULL);
INSERT INTO `auth` VALUES (36, 'thanhvu13', '$2a$10$vJdIK2.XUzo9bJf2E6WwdOrM7UeNgarGLDPDZ4XJ2jm2jzj4D0O6e', 'USER', 0, 0, '2025-07-21 12:54:16', '2025-07-21 12:54:16', '2025-07-21 12:54:16', NULL, NULL, 'legofriendsss68@gmail.com', NULL);
INSERT INTO `auth` VALUES (37, 'fas14', '$2a$10$FrOMPuwvX3rlyuYTjihuxel90Dn5StmR5yli0167CTm6ayjSaMWWS', 'USER', 0, 0, '2025-07-21 13:19:34', '2025-07-21 13:19:34', '2025-07-21 13:19:34', NULL, NULL, 'legofriend68ss@gmail.com', NULL);
INSERT INTO `auth` VALUES (38, 'fasfasfas', '$2a$10$hDsZetUSLoZYuc69Dx6DWOpLgjUrPk5bIrNDXXChlTN0HE/pKjzrq', 'USER', 0, 0, '2025-07-21 13:39:33', '2025-07-21 13:39:33', '2025-07-21 13:39:33', NULL, NULL, 'legofriend68s@gmail.com', NULL);
INSERT INTO `auth` VALUES (39, 'fsafasfas143', '$2a$10$RNbnSvVaXgvImiDfd3DwZukiISdhl.5Meu.hHwq5eoeQfkppI3wdq', 'USER', 0, 0, '2025-07-21 13:41:21', '2025-07-21 13:41:21', '2025-07-21 13:41:21', NULL, NULL, 'legofrienssssd68@gmail.com', NULL);
INSERT INTO `auth` VALUES (40, 'vutranlethicubas', '$2a$10$.OjjLynV4e0k5FewtFtz2.YwknIEWaG16OIRnA2fR91IFXpPIC1SK', 'SELLER', 0, 0, '2025-08-05 23:53:21', '2025-08-05 23:53:21', '2025-08-05 23:53:21', NULL, NULL, 'legofrie2nd68@gmail.com', NULL);
INSERT INTO `auth` VALUES (41, 'sfasfsafasf', '$2a$10$fjrMgZKdN8izWFcj4Ok4z.qlSLr78.ShEaqmoX35ApPjnPuGWyB0m', 'USER', 0, 0, '2025-07-21 13:46:30', '2025-07-21 13:46:30', '2025-07-21 13:46:30', NULL, NULL, 'fasfsa@gmail.com', NULL);
INSERT INTO `auth` VALUES (42, 'fsafasfasfasf', '$2a$10$UlvI5ZvukT3Mo7ssXyUPmOy2NIE3PbwSJmZ1snlQNoTyLIFOhkNQS', 'USER', 0, 0, '2025-07-21 13:47:22', '2025-07-21 13:47:22', '2025-07-21 13:47:22', NULL, NULL, 'fasfsafas@gmail.com', NULL);
INSERT INTO `auth` VALUES (43, 'fsafasfasfsa', '$2a$10$sT1SEG31xN8N3aZuLXoFSud/u3KV9UUCsqKXoJlw7ZeRbyAdsjYTO', 'USER', 0, 0, '2025-07-21 13:49:18', '2025-07-21 13:49:18', '2025-07-21 13:49:18', NULL, NULL, 'fasfq4124512@gmail.com', NULL);
INSERT INTO `auth` VALUES (44, 'fasfasfass', '$2a$10$3gjXON82BYDNL4lV6zp0D.Go08DfE3H0fzHOFRDYnyKaLGo8.LXIS', 'USER', 0, 0, '2025-07-21 20:14:43', '2025-07-21 20:14:43', '2025-07-21 20:14:43', NULL, NULL, 'legofriends68s@gmail.com', NULL);
INSERT INTO `auth` VALUES (45, 'fjbsakhfb', '$2a$10$iqifEX.TpA45JkdfzW6WBOSnqHUCXMLqoGDj83t8Ab1IuiRvGxnyC', 'USER', 0, 0, '2025-07-22 00:02:56', '2025-07-22 00:02:56', '2025-07-22 00:02:56', NULL, NULL, 'concat@gmail.com', NULL);
INSERT INTO `auth` VALUES (46, 'fjbsakhfbs', '$2a$10$TxzWNYVtSnwbkqWVP0jPb.8u5ARAU2egb.i99sJEvY1WVLEO8DBBq', 'USER', 0, 0, '2025-07-22 00:08:24', '2025-07-22 00:08:24', '2025-07-22 00:08:24', NULL, NULL, 'concsat@gmail.com', NULL);
INSERT INTO `auth` VALUES (47, 'fasfkasbfi', '$2a$10$msRMu9cvp9qc33cdb7k4Y.QIHgVB9RKmmjNT7U4S3yhHLwGZbcRni', 'USER', 0, 0, '2025-07-24 16:49:17', '2025-07-24 16:49:17', '2025-07-24 16:49:17', NULL, NULL, 'fasfsassss@gmail.com', NULL);
INSERT INTO `auth` VALUES (48, 'fasfkasbfis', '$2a$10$frnRKZBvnIUFPgK6TUW1Xua2KwyUXfyT7FOW.UDpnXwsEDT.q5g.u', 'USER', 0, 0, '2025-07-24 16:51:55', '2025-07-24 16:51:55', '2025-07-24 16:51:55', NULL, NULL, 'fasfsaxssss@gmail.com', NULL);
INSERT INTO `auth` VALUES (49, 'fas124', '$2a$10$MlLKQuNjnTCFcmrlC0fmA.sugCQJNlcy8Th6tOC6SgADgl31EgfVy', 'USER', 0, 0, '2025-07-24 16:56:09', '2025-07-24 16:56:09', '2025-07-24 16:56:09', NULL, NULL, 'fasfasfasfas3@gmail.com', NULL);
INSERT INTO `auth` VALUES (50, 'fas1244', '$2a$10$sEoZodIcskJFUp4zmNyRjepNuRjQl809ZpLWMgX60BiIzzf5y67vC', 'USER', 0, 0, '2025-07-24 17:01:14', '2025-07-24 17:01:14', '2025-07-24 17:01:14', NULL, NULL, 'fas2fasfasfas3@gmail.com', NULL);
INSERT INTO `auth` VALUES (51, '412412a', '$2a$10$L8Sg1J3YhYwN/BET6v.Ome1oqaoqTqu36ch9Fc9H3rBmT8r94yd1e', 'ADMIN', 0, 0, '2025-08-03 15:11:54', '2025-08-03 15:11:54', '2025-08-03 15:11:54', NULL, NULL, 'fasfasfa@gmail.com', NULL);
INSERT INTO `auth` VALUES (52, 'fbsakfasf', '$2a$10$vzh8UYlbtKzDK7EeFPOIZeOH9Q7RkZl1GNJmm1vMW7/2UjL1uR282', 'SELLER', 0, 0, '2025-08-05 14:11:37', '2025-08-05 14:11:37', '2025-08-05 14:11:37', NULL, NULL, 'legofriend6822@gmail.com', NULL);
INSERT INTO `auth` VALUES (53, 'tranthivu', '$2a$10$3ffeDs3ufnzCVxEXTUFbPep.490t1GBRrqhzp7wF4HGoX9k/FB0vW', 'SELLER', 0, 0, '2025-08-05 14:06:12', '2025-08-05 14:06:12', '2025-08-05 14:06:12', NULL, NULL, 'vutranorhilsun@gmail.com', NULL);
INSERT INTO `auth` VALUES (54, 'FNASFKHBASHKFBASKH', '$2a$10$ccxDvqWmjrJNFomljIenD.Fu4xQE5qsGwx4Nl3N6MXjp6xkUdP14i', 'SELLER', 0, 0, '2025-08-05 14:13:56', '2025-08-05 14:13:56', '2025-08-05 14:13:56', NULL, NULL, 'legofriend62228@gmail.com', NULL);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `auth_id` bigint NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `date_of_birth` date NULL DEFAULT NULL,
  `user_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `gender` enum('FEMALE','MALE','OTHER') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `profile_picture` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_preferences` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  INDEX `FK8ov01l1dp2couggvj8iw75dit`(`auth_id` ASC) USING BTREE,
  CONSTRAINT `FK8ov01l1dp2couggvj8iw75dit` FOREIGN KEY (`auth_id`) REFERENCES `auth` (`auth_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `users_chk_1` CHECK (json_valid(`user_preferences`))
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 40, NULL, NULL, '2003-04-10', NULL, NULL, NULL, 'legofrie2nd68@gmail.com', NULL, '2025-07-21 06:45:10', '2025-07-21 06:45:10', NULL);
INSERT INTO `users` VALUES (2, 41, NULL, NULL, '2003-10-04', NULL, NULL, NULL, 'fasfsa@gmail.com', NULL, '2025-07-21 06:46:31', '2025-07-21 06:46:31', NULL);
INSERT INTO `users` VALUES (3, 42, NULL, NULL, '2003-10-04', NULL, NULL, NULL, 'fasfsafas@gmail.com', NULL, '2025-07-21 06:47:23', '2025-07-21 06:47:23', NULL);
INSERT INTO `users` VALUES (4, 43, NULL, NULL, '2003-10-04', NULL, NULL, NULL, 'fasfq4124512@gmail.com', NULL, '2025-07-21 06:49:18', '2025-07-21 06:49:18', NULL);
INSERT INTO `users` VALUES (5, 44, 'fdszfsdgsa', 'gadsfasfas', NULL, NULL, NULL, '0379886918', 'legofriends68s@gmail.com', NULL, '2025-07-21 07:36:06', '2025-07-21 07:36:06', NULL);
INSERT INTO `users` VALUES (6, 45, 'fasjofasjk', 'fjasfjas', NULL, NULL, NULL, '0379886918', 'concat@gmail.com', NULL, '2025-07-21 17:02:57', '2025-07-21 17:02:57', NULL);
INSERT INTO `users` VALUES (7, 46, 'fasjofasjk', 'fjasfjas', NULL, NULL, NULL, '0379886918', 'concsat@gmail.com', NULL, '2025-07-21 17:08:25', '2025-07-21 17:08:25', NULL);
INSERT INTO `users` VALUES (8, 30, NULL, NULL, NULL, NULL, NULL, NULL, 'legofriend68@gmail.com', NULL, '2025-07-24 01:04:46', '2025-07-24 01:04:46', NULL);
INSERT INTO `users` VALUES (9, 47, 'fasfas', 'fasfsaf', NULL, NULL, NULL, '0379886918', 'fasfsassss@gmail.com', NULL, '2025-07-24 09:49:17', '2025-07-24 09:49:17', NULL);
INSERT INTO `users` VALUES (10, 48, 'fasfas', 'fasfsaf', NULL, NULL, NULL, '0379886918', 'fasfsaxssss@gmail.com', NULL, '2025-07-24 09:51:56', '2025-07-24 09:51:56', NULL);
INSERT INTO `users` VALUES (11, 49, 'fasfsafas', 'fasfasf', NULL, NULL, NULL, '0379886918', 'fasfasfasfas3@gmail.com', NULL, '2025-07-24 09:56:09', '2025-07-24 09:56:09', NULL);
INSERT INTO `users` VALUES (12, 50, 'fasfsafas', 'fasfasf', NULL, NULL, NULL, '0379886918', 'fas2fasfasfas3@gmail.com', NULL, '2025-07-24 10:01:14', '2025-07-24 10:01:14', NULL);
INSERT INTO `users` VALUES (13, 51, 'fasfasfasf', 'safsafsaf', NULL, NULL, NULL, '0379886918', 'fasfasfa@gmail.com', NULL, '2025-07-24 10:02:23', '2025-07-24 10:02:23', NULL);
INSERT INTO `users` VALUES (14, 52, 'fasfasf', 'àas', NULL, NULL, NULL, NULL, 'legofriend6822@gmail.com', NULL, '2025-08-03 11:43:22', '2025-08-03 11:43:22', NULL);
INSERT INTO `users` VALUES (15, 53, 'tran', 'vu', NULL, NULL, NULL, '0379886918', 'vutranorhilsun@gmail.com', NULL, '2025-08-05 06:43:34', '2025-08-05 06:43:34', NULL);
INSERT INTO `users` VALUES (16, 54, 'tran', 'vu', NULL, NULL, NULL, 'fasfasfasfasf', 'legofriend62228@gmail.com', NULL, '2025-08-05 07:13:27', '2025-08-05 07:13:27', NULL);

SET FOREIGN_KEY_CHECKS = 1;
