/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80043
 Source Host           : localhost:3306
 Source Schema         : orderservice

 Target Server Type    : MySQL
 Target Server Version : 80043
 File Encoding         : 65001

 Date: 07/08/2025 21:20:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for delivery_info
-- ----------------------------
DROP TABLE IF EXISTS `delivery_info`;
CREATE TABLE `delivery_info`  (
  `delivery_id` bigint NOT NULL AUTO_INCREMENT,
  `address_id` bigint NOT NULL,
  `created_at` datetime(6) NULL DEFAULT NULL,
  `delivery_status` enum('delivered','failed','packed','pending','shipped') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `estimated_delivery_date` datetime(6) NULL DEFAULT NULL,
  `order_id` bigint NOT NULL,
  `shipping_fee` double NULL DEFAULT NULL,
  `tracking_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `updated_at` datetime(6) NULL DEFAULT NULL,
  `shipping_method_id` bigint NOT NULL,
  PRIMARY KEY (`delivery_id`) USING BTREE,
  INDEX `FKl5bs11ln64t2n3baqr4xie60j`(`shipping_method_id` ASC) USING BTREE,
  CONSTRAINT `FKl5bs11ln64t2n3baqr4xie60j` FOREIGN KEY (`shipping_method_id`) REFERENCES `shipping_methods` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of delivery_info
-- ----------------------------
INSERT INTO `delivery_info` VALUES (1, 2, '2025-07-31 17:50:59.903681', 'delivered', '2025-08-07 17:50:59.903681', 1, 2.25, NULL, '2025-07-31 17:50:59.903681', 3);
INSERT INTO `delivery_info` VALUES (2, 2, '2025-07-31 17:50:59.903681', 'delivered', '2025-08-07 17:50:59.903681', 2, 2.25, NULL, '2025-07-31 17:50:59.903681', 3);
INSERT INTO `delivery_info` VALUES (3, 2, '2025-07-31 17:50:59.903681', 'delivered', '2025-08-07 17:50:59.903681', 3, 2.25, NULL, '2025-07-31 17:50:59.903681', 3);
INSERT INTO `delivery_info` VALUES (4, 2, '2025-07-31 17:50:59.903681', 'delivered', '2025-08-07 17:50:59.903681', 4, 2.25, NULL, '2025-07-31 17:50:59.903681', 3);
INSERT INTO `delivery_info` VALUES (5, 2, '2025-07-31 17:50:59.903681', 'delivered', '2025-08-07 17:50:59.903681', 5, 2.25, NULL, '2025-07-31 17:50:59.903681', 3);
INSERT INTO `delivery_info` VALUES (6, 2, '2025-07-31 17:50:59.903681', 'delivered', '2025-08-07 17:50:59.903681', 6, 2.25, NULL, '2025-07-31 17:50:59.903681', 3);
INSERT INTO `delivery_info` VALUES (7, 2, '2025-07-31 17:50:59.903681', 'delivered', '2025-08-07 17:50:59.903681', 7, 2.25, NULL, '2025-07-31 17:50:59.903681', 3);
INSERT INTO `delivery_info` VALUES (8, 2, '2025-07-31 17:50:59.903681', 'delivered', '2025-08-07 17:50:59.903681', 8, 2.25, NULL, '2025-07-31 17:50:59.903681', 3);
INSERT INTO `delivery_info` VALUES (9, 21, '2025-07-31 18:19:45.380003', 'delivered', '2025-08-05 18:19:45.380003', 24, 25, NULL, '2025-07-31 18:19:45.380003', 1);
INSERT INTO `delivery_info` VALUES (10, 22, '2025-07-31 18:20:54.896394', 'delivered', '2025-08-02 18:20:54.896394', 25, 45, NULL, '2025-07-31 18:20:54.896394', 2);
INSERT INTO `delivery_info` VALUES (11, 2, '2025-08-01 05:47:56.993790', 'delivered', '2025-08-06 05:47:56.993790', 26, 6.25, NULL, '2025-08-01 05:47:56.993790', 1);
INSERT INTO `delivery_info` VALUES (12, 2, '2025-08-01 05:47:56.993790', 'delivered', '2025-08-06 05:47:56.993790', 27, 6.25, NULL, '2025-08-01 05:47:56.993790', 1);
INSERT INTO `delivery_info` VALUES (13, 2, '2025-08-01 05:47:56.993790', 'delivered', '2025-08-06 05:47:56.993790', 28, 6.25, NULL, '2025-08-01 05:47:56.993790', 1);
INSERT INTO `delivery_info` VALUES (14, 2, '2025-08-01 05:47:56.993790', 'delivered', '2025-08-06 05:47:56.993790', 29, 6.25, NULL, '2025-08-01 05:47:56.993790', 1);
INSERT INTO `delivery_info` VALUES (15, 24, '2025-08-01 17:49:49.686633', 'delivered', '2025-08-03 17:49:49.686633', 30, 45, NULL, '2025-08-01 17:49:49.686633', 2);
INSERT INTO `delivery_info` VALUES (16, 25, '2025-08-04 23:32:55.332043', 'delivered', '2025-08-06 23:32:55.332043', 31, 45, NULL, '2025-08-04 23:34:25.160420', 2);
INSERT INTO `delivery_info` VALUES (17, 25, '2025-08-04 23:34:42.933422', 'delivered', '2025-08-05 23:34:42.933422', 32, 60, NULL, '2025-08-04 23:34:42.933422', 4);
INSERT INTO `delivery_info` VALUES (18, 25, '2025-08-04 23:35:24.140592', 'delivered', '2025-08-11 23:35:24.140592', 33, 18, NULL, '2025-08-04 23:35:24.140592', 3);
INSERT INTO `delivery_info` VALUES (19, 24, '2025-08-05 12:51:38.893910', 'delivered', '2025-08-10 12:51:38.893910', 34, 25, NULL, '2025-08-05 12:51:38.893910', 1);
INSERT INTO `delivery_info` VALUES (20, 24, '2025-08-05 12:55:25.810511', 'delivered', '2025-08-12 12:55:25.810511', 35, 18, NULL, '2025-08-05 12:55:25.810511', 3);
INSERT INTO `delivery_info` VALUES (21, 24, '2025-08-05 12:56:08.895338', 'delivered', '2025-08-10 12:56:08.895338', 36, 25, NULL, '2025-08-05 12:56:08.895338', 1);
INSERT INTO `delivery_info` VALUES (22, 24, '2025-08-05 13:00:13.342459', 'delivered', '2025-08-10 13:00:13.342459', 37, 25, NULL, '2025-08-05 13:00:13.342459', 1);
INSERT INTO `delivery_info` VALUES (23, 24, '2025-08-05 13:09:55.353780', 'delivered', '2025-08-10 13:09:55.353780', 38, 25, NULL, '2025-08-05 13:09:55.353780', 1);
INSERT INTO `delivery_info` VALUES (24, 24, '2025-08-05 13:16:48.411134', 'delivered', '2025-08-06 13:16:48.411134', 39, 60, NULL, '2025-08-05 13:16:48.411134', 4);
INSERT INTO `delivery_info` VALUES (25, 24, '2025-08-05 13:19:11.451628', 'delivered', '2025-08-10 13:19:11.451628', 40, 25, NULL, '2025-08-05 13:19:11.451628', 1);
INSERT INTO `delivery_info` VALUES (26, 24, '2025-08-06 18:25:54.514890', 'delivered', '2025-08-08 18:25:54.514890', 41, 45, NULL, '2025-08-06 18:25:54.514890', 2);
INSERT INTO `delivery_info` VALUES (27, 24, '2025-08-07 19:25:42.571227', 'delivered', '2025-08-09 19:25:42.571227', 42, 45, NULL, '2025-08-07 19:25:42.571227', 2);

-- ----------------------------
-- Table structure for master_orders
-- ----------------------------
DROP TABLE IF EXISTS `master_orders`;
CREATE TABLE `master_orders`  (
  `master_order_id` bigint NOT NULL AUTO_INCREMENT,
  `address_id` bigint NOT NULL,
  `created_at` datetime(6) NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'pending,paid,completed,cancelled',
  `total_price` decimal(10, 2) NOT NULL,
  `updated_at` datetime(6) NULL DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`master_order_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of master_orders
-- ----------------------------
INSERT INTO `master_orders` VALUES (1, 2, '2025-07-31 17:32:43.093738', 'completed', 449.89, '2025-07-31 17:32:43.093738', 8);
INSERT INTO `master_orders` VALUES (2, 2, '2025-07-31 17:34:36.217711', 'completed', 449.89, '2025-07-31 17:34:36.217711', 8);
INSERT INTO `master_orders` VALUES (3, 2, '2025-07-31 17:36:30.078008', 'completed', 449.89, '2025-07-31 17:36:30.078008', 8);
INSERT INTO `master_orders` VALUES (4, 2, '2025-07-31 17:38:03.170895', 'completed', 449.89, '2025-07-31 17:38:03.170895', 8);
INSERT INTO `master_orders` VALUES (5, 2, '2025-07-31 17:50:59.903681', 'completed', 603.47, '2025-07-31 17:50:59.903681', 8);
INSERT INTO `master_orders` VALUES (6, 6, '2025-07-31 18:05:19.656134', 'completed', 255.99, '2025-07-31 18:05:19.656134', 0);
INSERT INTO `master_orders` VALUES (7, 7, '2025-07-31 18:05:23.580470', 'completed', 255.99, '2025-07-31 18:05:23.580470', 0);
INSERT INTO `master_orders` VALUES (8, 8, '2025-07-31 18:05:29.103709', 'completed', 255.99, '2025-07-31 18:05:29.103709', 0);
INSERT INTO `master_orders` VALUES (9, 9, '2025-07-31 18:05:35.099662', 'completed', 275.99, '2025-07-31 18:05:35.099662', 0);
INSERT INTO `master_orders` VALUES (10, 10, '2025-07-31 18:05:54.251657', 'completed', 275.99, '2025-07-31 18:05:54.251657', 0);
INSERT INTO `master_orders` VALUES (11, 11, '2025-07-31 18:05:55.426310', 'completed', 275.99, '2025-07-31 18:05:55.426310', 0);
INSERT INTO `master_orders` VALUES (12, 12, '2025-07-31 18:06:18.596190', 'completed', 275.99, '2025-07-31 18:06:18.596190', 0);
INSERT INTO `master_orders` VALUES (14, 14, '2025-07-31 18:10:01.761045', 'completed', 275.99, '2025-07-31 18:10:01.761045', 0);
INSERT INTO `master_orders` VALUES (15, 15, '2025-07-31 18:13:26.563354', 'completed', 275.99, '2025-07-31 18:13:26.563354', 0);
INSERT INTO `master_orders` VALUES (17, 17, '2025-07-31 18:15:31.799407', 'completed', 255.99, '2025-07-31 18:15:31.799407', 0);
INSERT INTO `master_orders` VALUES (18, 18, '2025-07-31 18:15:34.252226', 'completed', 255.99, '2025-07-31 18:15:34.252226', 0);
INSERT INTO `master_orders` VALUES (19, 19, '2025-07-31 18:16:02.616328', 'completed', 255.99, '2025-07-31 18:16:02.616328', 0);
INSERT INTO `master_orders` VALUES (20, 20, '2025-07-31 18:17:14.124986', 'completed', 255.99, '2025-07-31 18:17:14.124986', 0);
INSERT INTO `master_orders` VALUES (21, 21, '2025-07-31 18:19:45.380003', 'completed', 255.99, '2025-07-31 18:19:45.380003', 0);
INSERT INTO `master_orders` VALUES (22, 22, '2025-07-31 18:20:54.896394', 'completed', 240.75, '2025-07-31 18:20:54.896394', 0);
INSERT INTO `master_orders` VALUES (23, 2, '2025-08-01 05:47:56.993790', 'completed', 788.13, '2025-08-01 05:47:56.993790', 8);
INSERT INTO `master_orders` VALUES (24, 24, '2025-08-01 17:49:49.686633', 'completed', 107.31, '2025-08-01 17:49:49.686633', 8);
INSERT INTO `master_orders` VALUES (25, 25, '2025-08-04 23:32:55.332043', 'completed', 76.16, '2025-08-04 23:32:55.332043', 14);
INSERT INTO `master_orders` VALUES (26, 25, '2025-08-04 23:34:42.933422', 'completed', 127.11, '2025-08-04 23:34:42.933422', 14);
INSERT INTO `master_orders` VALUES (27, 25, '2025-08-04 23:35:24.140592', 'completed', 85.11, '2025-08-04 23:35:24.140592', 14);
INSERT INTO `master_orders` VALUES (28, 24, '2025-08-05 12:51:38.893910', 'pending', 157.04, '2025-08-05 12:51:38.893910', 8);
INSERT INTO `master_orders` VALUES (29, 24, '2025-08-05 12:55:25.810511', 'pending', 49.16, '2025-08-05 12:55:25.810511', 8);
INSERT INTO `master_orders` VALUES (30, 24, '2025-08-05 12:56:08.895338', 'pending', 87.08, '2025-08-05 12:56:08.895338', 8);
INSERT INTO `master_orders` VALUES (31, 24, '2025-08-05 13:00:13.342459', 'pending', 92.11, '2025-08-05 13:00:13.342459', 8);
INSERT INTO `master_orders` VALUES (32, 24, '2025-08-05 13:09:55.353780', 'pending', 92.11, '2025-08-05 13:09:55.353780', 8);
INSERT INTO `master_orders` VALUES (33, 24, '2025-08-05 13:16:48.411134', 'pending', 127.11, '2025-08-05 13:16:48.411134', 8);
INSERT INTO `master_orders` VALUES (34, 24, '2025-08-05 13:19:11.451628', 'pending', 92.11, '2025-08-05 13:19:11.451628', 8);
INSERT INTO `master_orders` VALUES (35, 24, '2025-08-06 18:25:54.514890', 'pending', 210.38, '2025-08-06 18:25:54.514890', 8);
INSERT INTO `master_orders` VALUES (36, 24, '2025-08-07 19:25:42.571227', 'pending', 76.16, '2025-08-07 19:25:42.571227', 8);

-- ----------------------------
-- Table structure for order_items
-- ----------------------------
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items`  (
  `order_item_id` bigint NOT NULL AUTO_INCREMENT,
  `color` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `product_id` bigint NOT NULL,
  `quantity` int NOT NULL,
  `size` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `unit_price` decimal(10, 2) NOT NULL,
  `order_id` bigint NOT NULL,
  `is_evaluate` int NOT NULL,
  PRIMARY KEY (`order_item_id`) USING BTREE,
  INDEX `FKbioxgbv59vetrxe0ejfubep1w`(`order_id` ASC) USING BTREE,
  CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 100 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_items
-- ----------------------------
INSERT INTO `order_items` VALUES (96, 'Green', 12, 1, NULL, 67.11, 40, 1);
INSERT INTO `order_items` VALUES (97, 'Pink', 11, 1, '36', 31.16, 41, 1);
INSERT INTO `order_items` VALUES (98, 'Light Green', 12, 2, NULL, 134.22, 41, 1);
INSERT INTO `order_items` VALUES (99, 'Lavender', 11, 1, '36', 31.16, 42, 1);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NULL DEFAULT NULL,
  `discounted_subtotal` decimal(10, 2) NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'pending,packed,shipped,delivered,failed',
  `store_id` bigint NOT NULL,
  `subtotal` decimal(10, 2) NOT NULL,
  `updated_at` timestamp(6) NULL DEFAULT NULL,
  `master_order_id` bigint NOT NULL,
  `selected_discount_shop` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`) USING BTREE,
  INDEX `FKbjnbgnypkrjglqmwp5bu00xrh`(`master_order_id` ASC) USING BTREE,
  CONSTRAINT `FKbjnbgnypkrjglqmwp5bu00xrh` FOREIGN KEY (`master_order_id`) REFERENCES `master_orders` (`master_order_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, '2025-07-31 17:50:59.903681', 256.92, 'completed', 20, 262.16, '2025-07-31 17:50:59.903681', 5, NULL);
INSERT INTO `orders` VALUES (2, '2025-07-31 17:50:59.903681', 10.28, 'completed', 100, 10.28, '2025-07-31 17:50:59.903681', 5, NULL);
INSERT INTO `orders` VALUES (3, '2025-07-31 17:50:59.903681', 41.94, 'completed', 23, 41.94, '2025-07-31 17:50:59.903681', 5, NULL);
INSERT INTO `orders` VALUES (4, '2025-07-31 17:50:59.903681', 9.20, 'completed', 71, 9.20, '2025-07-31 17:50:59.903681', 5, NULL);
INSERT INTO `orders` VALUES (5, '2025-07-31 17:50:59.903681', 88.93, 'completed', 11, 88.93, '2025-07-31 17:50:59.903681', 5, NULL);
INSERT INTO `orders` VALUES (6, '2025-07-31 17:50:59.903681', 17.63, 'completed', 28, 17.63, '2025-07-31 17:50:59.903681', 5, NULL);
INSERT INTO `orders` VALUES (7, '2025-07-31 17:50:59.903681', 25.12, 'completed', 62, 25.12, '2025-07-31 17:50:59.903681', 5, NULL);
INSERT INTO `orders` VALUES (8, '2025-07-31 17:50:59.903681', 9.45, 'completed', 30, 9.45, '2025-07-31 17:50:59.903681', 5, NULL);
INSERT INTO `orders` VALUES (9, '2025-07-31 18:05:19.656134', 235.70, 'completed', 20, 235.70, '2025-07-31 18:05:19.656134', 6, NULL);
INSERT INTO `orders` VALUES (10, '2025-07-31 18:05:23.580470', 235.70, 'completed', 20, 235.70, '2025-07-31 18:05:23.580470', 7, NULL);
INSERT INTO `orders` VALUES (11, '2025-07-31 18:05:29.103709', 235.70, 'completed', 20, 235.70, '2025-07-31 18:05:29.103709', 8, NULL);
INSERT INTO `orders` VALUES (12, '2025-07-31 18:05:35.099662', 235.70, 'completed', 20, 235.70, '2025-07-31 18:05:35.099662', 9, NULL);
INSERT INTO `orders` VALUES (13, '2025-07-31 18:05:54.251657', 235.70, 'completed', 20, 235.70, '2025-07-31 18:05:54.251657', 10, NULL);
INSERT INTO `orders` VALUES (14, '2025-07-31 18:05:55.426310', 235.70, 'completed', 20, 235.70, '2025-07-31 18:05:55.426310', 11, NULL);
INSERT INTO `orders` VALUES (15, '2025-07-31 18:06:18.596190', 235.70, 'completed', 20, 235.70, '2025-07-31 18:06:18.596190', 12, NULL);
INSERT INTO `orders` VALUES (17, '2025-07-31 18:10:01.761045', 235.70, 'completed', 20, 235.70, '2025-07-31 18:10:01.761045', 14, NULL);
INSERT INTO `orders` VALUES (18, '2025-07-31 18:13:26.563354', 235.70, 'completed', 20, 235.70, '2025-07-31 18:13:26.563354', 15, NULL);
INSERT INTO `orders` VALUES (20, '2025-07-31 18:15:31.799407', 235.70, 'completed', 20, 235.70, '2025-07-31 18:15:31.799407', 17, NULL);
INSERT INTO `orders` VALUES (21, '2025-07-31 18:15:34.252226', 235.70, 'completed', 20, 235.70, '2025-07-31 18:15:34.252226', 18, NULL);
INSERT INTO `orders` VALUES (22, '2025-07-31 18:16:02.616328', 235.70, 'completed', 20, 235.70, '2025-07-31 18:16:02.616328', 19, NULL);
INSERT INTO `orders` VALUES (23, '2025-07-31 18:17:14.124986', 235.70, 'completed', 20, 235.70, '2025-07-31 18:17:14.124986', 20, NULL);
INSERT INTO `orders` VALUES (24, '2025-07-31 18:19:45.380003', 235.70, 'completed', 20, 235.70, '2025-07-31 18:19:45.380003', 21, NULL);
INSERT INTO `orders` VALUES (25, '2025-07-31 18:20:54.896394', 199.74, 'completed', 20, 199.74, '2025-07-31 18:20:54.896394', 22, NULL);
INSERT INTO `orders` VALUES (26, '2025-08-01 05:47:56.993790', 564.88, 'completed', 20, 576.41, '2025-08-01 05:47:56.993790', 23, 17);
INSERT INTO `orders` VALUES (27, '2025-08-01 05:47:56.993790', 9.20, 'completed', 71, 9.20, '2025-08-01 05:47:56.993790', 23, NULL);
INSERT INTO `orders` VALUES (28, '2025-08-01 05:47:56.993790', 88.93, 'completed', 11, 88.93, '2025-08-01 05:47:56.993790', 23, NULL);
INSERT INTO `orders` VALUES (29, '2025-08-01 05:47:56.993790', 25.12, 'completed', 62, 25.12, '2025-08-01 05:47:56.993790', 23, NULL);
INSERT INTO `orders` VALUES (30, '2025-08-01 17:49:49.686633', 62.31, 'completed', 20, 62.31, '2025-08-01 17:49:49.686633', 24, NULL);
INSERT INTO `orders` VALUES (31, '2025-08-04 23:32:55.332043', 31.16, 'completed', 20, 31.16, '2025-08-04 23:32:55.332043', 25, NULL);
INSERT INTO `orders` VALUES (32, '2025-08-04 23:34:42.933422', 67.11, 'completed', 20, 67.11, '2025-08-04 23:34:42.933422', 26, NULL);
INSERT INTO `orders` VALUES (33, '2025-08-04 23:35:24.140592', 67.11, 'completed', 20, 67.11, '2025-08-04 23:35:24.140592', 27, NULL);
INSERT INTO `orders` VALUES (34, '2025-08-05 12:51:38.893910', 132.04, 'completed', 20, 132.04, '2025-08-05 12:51:38.893910', 28, NULL);
INSERT INTO `orders` VALUES (35, '2025-08-05 12:55:25.810511', 31.16, 'completed', 20, 31.16, '2025-08-05 12:55:25.810511', 29, NULL);
INSERT INTO `orders` VALUES (36, '2025-08-05 12:56:08.895338', 62.08, 'completed', 20, 62.08, '2025-08-05 12:56:08.895338', 30, NULL);
INSERT INTO `orders` VALUES (37, '2025-08-05 13:00:13.342459', 67.11, 'completed', 20, 67.11, '2025-08-05 13:00:13.342459', 31, NULL);
INSERT INTO `orders` VALUES (38, '2025-08-05 13:09:55.353780', 67.11, 'completed', 20, 67.11, '2025-08-05 13:09:55.353780', 32, NULL);
INSERT INTO `orders` VALUES (39, '2025-08-05 13:16:48.411134', 67.11, 'completed', 20, 67.11, '2025-08-05 13:16:48.411134', 33, NULL);
INSERT INTO `orders` VALUES (40, '2025-08-05 13:19:11.451628', 67.11, 'completed', 20, 67.11, '2025-08-05 13:19:11.451628', 34, NULL);
INSERT INTO `orders` VALUES (41, '2025-08-06 18:25:54.514890', 165.38, 'completed', 20, 165.38, '2025-08-06 18:25:54.514890', 35, NULL);
INSERT INTO `orders` VALUES (42, '2025-08-07 19:25:42.571227', 31.16, 'pending', 20, 31.16, '2025-08-07 19:25:42.571227', 36, NULL);

-- ----------------------------
-- Table structure for shipping_methods
-- ----------------------------
DROP TABLE IF EXISTS `shipping_methods`;
CREATE TABLE `shipping_methods`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `method_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `estimated_days` int NULL DEFAULT NULL,
  `cost` double NULL DEFAULT NULL,
  `is_active` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of shipping_methods
-- ----------------------------
INSERT INTO `shipping_methods` VALUES (1, 'Giao hàng tiêu chuẩn', 'Giao hàng trong vòng 3–5 ngày làm việc', 5, 25, 1);
INSERT INTO `shipping_methods` VALUES (2, 'Giao hàng nhanh', 'Giao trong 1–2 ngày làm việc', 2, 45, 1);
INSERT INTO `shipping_methods` VALUES (3, 'Giao hàng tiết kiệm', 'Giao trong 5–7 ngày làm việc', 7, 18, 1);
INSERT INTO `shipping_methods` VALUES (4, 'Giao trong ngày', 'Áp dụng nội thành, giao trong ngày', 1, 60, 1);
INSERT INTO `shipping_methods` VALUES (5, 'Tự đến lấy hàng', 'Khách tự đến kho lấy hàng', NULL, 0, 1);

SET FOREIGN_KEY_CHECKS = 1;
