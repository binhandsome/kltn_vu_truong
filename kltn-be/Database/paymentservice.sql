/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80043
 Source Host           : localhost:3306
 Source Schema         : paymentservice

 Target Server Type    : MySQL
 Target Server Version : 80043
 File Encoding         : 65001

 Date: 07/08/2025 21:20:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bank_transactions
-- ----------------------------
DROP TABLE IF EXISTS `bank_transactions`;
CREATE TABLE `bank_transactions`  (
  `bank_id` bigint NOT NULL AUTO_INCREMENT,
  `transaction_id` bigint NULL DEFAULT NULL,
  `card_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `cardholder_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `bank_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `bank_transaction_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`bank_id`) USING BTREE,
  INDEX `fk_bank_transaction`(`transaction_id` ASC) USING BTREE,
  CONSTRAINT `fk_bank_transaction` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 71 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of bank_transactions
-- ----------------------------
INSERT INTO `bank_transactions` VALUES (67, 97, NULL, NULL, NULL, 'BANK_1754373368960');
INSERT INTO `bank_transactions` VALUES (68, 98, NULL, NULL, NULL, 'BANK_1754373613553');
INSERT INTO `bank_transactions` VALUES (69, 99, NULL, NULL, NULL, 'BANK_1754374195579');
INSERT INTO `bank_transactions` VALUES (70, 100, NULL, NULL, NULL, 'BANK_1754374608644');
INSERT INTO `bank_transactions` VALUES (71, 101, NULL, NULL, NULL, 'BANK_1754374751684');

-- ----------------------------
-- Table structure for cod_transactions
-- ----------------------------
DROP TABLE IF EXISTS `cod_transactions`;
CREATE TABLE `cod_transactions`  (
  `cod_id` bigint NOT NULL AUTO_INCREMENT,
  `transaction_id` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`cod_id`) USING BTREE,
  INDEX `fk_cod_transaction`(`transaction_id` ASC) USING BTREE,
  CONSTRAINT `fk_cod_transaction` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cod_transactions
-- ----------------------------
INSERT INTO `cod_transactions` VALUES (17, 102);
INSERT INTO `cod_transactions` VALUES (18, 103);

-- ----------------------------
-- Table structure for paypal_transactions
-- ----------------------------
DROP TABLE IF EXISTS `paypal_transactions`;
CREATE TABLE `paypal_transactions`  (
  `paypal_id` bigint NOT NULL AUTO_INCREMENT,
  `transaction_id` bigint NULL DEFAULT NULL,
  `paypal_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `paypal_redirect_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`paypal_id`) USING BTREE,
  INDEX `fk_paypal_transaction`(`transaction_id` ASC) USING BTREE,
  CONSTRAINT `fk_paypal_transaction` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of paypal_transactions
-- ----------------------------
INSERT INTO `paypal_transactions` VALUES (9, 96, 'legofriend68@gmail.com', 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-20K595738J127733A');

-- ----------------------------
-- Table structure for transactions
-- ----------------------------
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions`  (
  `transaction_id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `payment_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `amount` decimal(10, 2) NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `update_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`transaction_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 104 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of transactions
-- ----------------------------
INSERT INTO `transactions` VALUES (96, 29, 'PAYPAL', 49.16, 'PAID', '2025-08-05 05:55:26', '2025-08-05 05:55:37');
INSERT INTO `transactions` VALUES (97, 30, 'BANK', 87.08, 'PAID', '2025-08-05 05:56:09', '2025-08-05 05:56:09');
INSERT INTO `transactions` VALUES (98, 31, 'BANK', 92.11, 'PAID', '2025-08-05 06:00:14', '2025-08-05 06:00:14');
INSERT INTO `transactions` VALUES (99, 32, 'BANK', 92.11, 'PAID', '2025-08-05 06:09:56', '2025-08-05 06:09:56');
INSERT INTO `transactions` VALUES (100, 33, 'BANK', 127.11, 'PAID', '2025-08-05 06:16:49', '2025-08-05 06:17:07');
INSERT INTO `transactions` VALUES (101, 34, 'BANK', 92.11, 'PAID', '2025-08-05 06:19:12', '2025-08-05 06:19:26');
INSERT INTO `transactions` VALUES (102, 35, 'COD', 210.38, 'SUCCESS', '2025-08-06 11:25:55', '2025-08-06 11:25:55');
INSERT INTO `transactions` VALUES (103, 36, 'COD', 76.16, 'SUCCESS', '2025-08-07 19:25:43', '2025-08-07 19:25:43');

SET FOREIGN_KEY_CHECKS = 1;
