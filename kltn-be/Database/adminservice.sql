/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80043
 Source Host           : localhost:3306
 Source Schema         : adminservice

 Target Server Type    : MySQL
 Target Server Version : 80043
 File Encoding         : 65001

 Date: 07/08/2025 21:20:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for system_feedback
-- ----------------------------
DROP TABLE IF EXISTS `system_feedback`;
CREATE TABLE `system_feedback`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `admin_reply` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `admin_reply_at` datetime(6) NULL DEFAULT NULL,
  `created_at` datetime(6) NULL DEFAULT NULL,
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `replied` bit(1) NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_id` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_feedback
-- ----------------------------
INSERT INTO `system_feedback` VALUES (1, ' s', '2025-08-05 15:09:10.935747', '2025-08-05 15:06:43.586374', 'fasfasfasfasfas', b'0', 'Góp ý', 8);

SET FOREIGN_KEY_CHECKS = 1;
