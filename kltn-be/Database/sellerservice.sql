/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80043
 Source Host           : localhost:3306
 Source Schema         : sellerservice

 Target Server Type    : MySQL
 Target Server Version : 80043
 File Encoding         : 65001

 Date: 07/08/2025 21:21:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop`  (
  `shop_id` bigint NOT NULL AUTO_INCREMENT,
  `auth_id` bigint NOT NULL,
  `created_at` datetime(6) NULL DEFAULT NULL,
  `description_shop` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `evaluate_shop` double NULL DEFAULT NULL,
  `followers_shop` bigint NULL DEFAULT NULL,
  `name_shop` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `thumbnail_shop` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `updated_at` datetime(6) NULL DEFAULT NULL,
  `shop_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `shop_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `shop_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `shop_status` enum('active','pending','suspended') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`shop_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES (20, 30, '2025-07-25 07:12:39.393877', 'di an binh duong', 0, 0, 'thanh vu shop', 'https://res.cloudinary.com/dj3tvavmp/image/upload/v1753427558/Thumbnail/mtqxj3yabzisiffkkdmz.png', '2025-08-05 07:08:06.352194', '0379886918', 'lethicuba@gmail.com', '0379886918', 'active');
INSERT INTO `shop` VALUES (21, 54, '2025-08-05 07:53:41.011704', 'safsafasfsafsa', 0, 0, 'fsafasfasf', 'https://res.cloudinary.com/dj3tvavmp/image/upload/v1754380420/Thumbnail/lxc9q2zrmtciomfpbc7g.png', '2025-08-05 07:53:41.011704', 'fasfasfsaf', 'jfbaskhfaskh@gmail.com', '0379886918', 'active');

-- ----------------------------
-- Table structure for shop_discount
-- ----------------------------
DROP TABLE IF EXISTS `shop_discount`;
CREATE TABLE `shop_discount`  (
  `discount_shop_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NULL DEFAULT NULL,
  `day_end` datetime(6) NULL DEFAULT NULL,
  `day_start` datetime(6) NULL DEFAULT NULL,
  `min_price` double NOT NULL,
  `name_discount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `percent_value` int NOT NULL,
  `updated_at` datetime(6) NULL DEFAULT NULL,
  `shop_id` bigint NOT NULL,
  `status` bigint NULL DEFAULT NULL COMMENT '0: Hoạt động, 1: Không hoạt động',
  PRIMARY KEY (`discount_shop_id`) USING BTREE,
  INDEX `FK1b2igrqsy8e7gjwbs6i091nuj`(`shop_id` ASC) USING BTREE,
  CONSTRAINT `FK1b2igrqsy8e7gjwbs6i091nuj` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop_discount
-- ----------------------------
INSERT INTO `shop_discount` VALUES (16, '2025-07-31 12:22:48.500459', '2025-07-11 12:22:00.000000', '2025-07-11 12:22:00.000000', 1222, 'fsafasfas', 12, '2025-07-31 12:22:48.500459', 20, 0);
INSERT INTO `shop_discount` VALUES (17, '2025-07-31 12:23:00.797317', '2025-07-03 12:22:00.000000', '2025-07-10 15:22:00.000000', 122, 'fsafsafsaf', 2, '2025-07-31 12:23:00.797317', 20, 0);

-- ----------------------------
-- Table structure for shop_edit
-- ----------------------------
DROP TABLE IF EXISTS `shop_edit`;
CREATE TABLE `shop_edit`  (
  `shop_edit_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NULL DEFAULT NULL,
  `description_shop` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name_shop` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `shop_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `shop_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `shop_id` bigint NULL DEFAULT NULL,
  `shop_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` bigint NULL DEFAULT NULL COMMENT '0: đang đợi duyệt, 1: đã duyệt, 2: đã chỉnh sửa',
  `thumbnail_shop` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `updated_at` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`shop_edit_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop_edit
-- ----------------------------

-- ----------------------------
-- Table structure for stores
-- ----------------------------
DROP TABLE IF EXISTS `stores`;
CREATE TABLE `stores`  (
  `store_id` bigint NOT NULL AUTO_INCREMENT,
  `auth_id` bigint NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `store_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `store_description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `store_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `store_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `store_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `store_status` enum('active','pending','suspended') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `store_thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`store_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of stores
-- ----------------------------

-- ----------------------------
-- Table structure for stores_authentic
-- ----------------------------
DROP TABLE IF EXISTS `stores_authentic`;
CREATE TABLE `stores_authentic`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `auth_id` bigint NULL DEFAULT NULL,
  `address_delivery` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address_house` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `back_cccd_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `font_cccd_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `real_face_image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of stores_authentic
-- ----------------------------
INSERT INTO `stores_authentic` VALUES (1, 30, 'Bình Dương', 'Dĩ An', 'CCCD/brkmfmfr1mh6rddbdqvv', 'CCCD/krhjv048oo2g1z4s4hyo', 'CCCD/zuolf7tudlepnekymatn');
INSERT INTO `stores_authentic` VALUES (2, 32, 'Bình Dương', 'Dĩ An', 'CCCD/n4jonrn0llema85hxl22', 'https://res.cloudinary.com/dj3tvavmp/image/upload/v1752919824/CCCD/nzgjklh0wuodhzyhj89e.jpg', 'https://res.cloudinary.com/dj3tvavmp/image/upload/v1752919827/CCCD/sdldnun6afm6dmlfogha.jpg');
INSERT INTO `stores_authentic` VALUES (3, 33, 'Bình Dương', 'Dĩ An', 'CCCD/eccysuz2upfshqegrehe', 'https://res.cloudinary.com/dj3tvavmp/image/upload/s--22UVLsOa--/v1752920770/CCCD/ibo94oevfmoacmhaq8zg.jpg', 'https://res.cloudinary.com/dj3tvavmp/image/upload/s--XLx6gE63--/v1752920774/CCCD/dyebzlttf8kw8rrdmzmr.jpg');
INSERT INTO `stores_authentic` VALUES (4, 33, 'Bình Dương', 'Dĩ An', 'https://res.cloudinary.com/dj3tvavmp/image/upload/s--Tou98zBQ--/v1/CCCD/y826gbrlmqmylezlx9je', 'https://res.cloudinary.com/dj3tvavmp/image/upload/s--YIAmBrri--/v1/CCCD/dxutylxzstepq2pmlufh', 'https://res.cloudinary.com/dj3tvavmp/image/upload/s--C7bAGEhy--/v1/CCCD/wwtqimg2lwgvtkq1cwml');
INSERT INTO `stores_authentic` VALUES (5, 34, 'Bình Dương', 'Dĩ An', 'CCCD/hi380sbdqqyf3tcjmind', 'CCCD/wgww454szz0c9qch8vlp', 'CCCD/yqm9ulgxjzndstbiaspt');
INSERT INTO `stores_authentic` VALUES (6, 35, 'Bình Dương', 'Dĩ An', 'CCCD/con1fjxpoja6i1zmfwj8', 'CCCD/j9y6wvvklvqjc95rjdxo', 'CCCD/lxnz7kzdfpsb7p42t94y');
INSERT INTO `stores_authentic` VALUES (7, 36, 'di an', 'Binh duong', 'CCCD/ppqnmtnbpulhgu6am5nd', 'CCCD/com3he37alkzxcpot1zj', 'CCCD/fnjk2oxy1bku4lsnjmit');
INSERT INTO `stores_authentic` VALUES (8, 36, 'di an binh duong', 'di an binh duong', 'CCCD/ukvyzjzhsolzdhng1v4e', 'CCCD/opab4dmauvdhljbrm0ay', 'CCCD/gp4ogpvjxx734ukduggw');
INSERT INTO `stores_authentic` VALUES (9, 37, 'di an binh duong', 'di an', 'CCCD/qjjbc77eepbfztmjn5dl', 'CCCD/zcuxl23mffrrglqjbugc', 'CCCD/heuz8g37pwyw8twck1cf');
INSERT INTO `stores_authentic` VALUES (10, 37, 'di an binh duong', 'di an', 'CCCD/lzmtx3jnyuaj10cn0yhb', 'CCCD/qowpicaetzrkajougdzf', 'CCCD/lyzfambcnmjvnpjj1squ');
INSERT INTO `stores_authentic` VALUES (11, 37, 'di an binh duong', 'di an', 'CCCD/xj778w1rqpxr1fb9cmmz', 'CCCD/oqidcytykrckzblkuxn4', 'CCCD/mmvtqaeu6aifb9m73eox');
INSERT INTO `stores_authentic` VALUES (12, 37, 'di an binh duong', 'di an', 'CCCD/rqwdkymbwhava5vfrjkl', 'CCCD/bujl5zlk9knvc0kelisu', 'CCCD/vh1rteetaicybzbwtven');
INSERT INTO `stores_authentic` VALUES (13, 38, 'finasifbas', 'ufonasihfbasih', 'CCCD/d31q690sefczji9er87o', 'CCCD/scrtt1rz2yue25bnimop', 'CCCD/k7e2moceepohgxibcwi9');
INSERT INTO `stores_authentic` VALUES (14, 38, 'finasifbas', 'ufonasihfbasih', 'CCCD/uvpsurcmq5pxtnnvhxfm', 'CCCD/yilz20mruomlkj8b18f4', 'CCCD/l7ywbegwny3l2qrwlgvv');
INSERT INTO `stores_authentic` VALUES (15, 44, 'finasifbas', 'ufonasihfbasih', 'CCCD/iulvotaeuul9pqeq8cpv', 'CCCD/gga1r5yb6ippori38u4z', 'CCCD/ngi9oktmkmqdjubtxgar');
INSERT INTO `stores_authentic` VALUES (16, 45, 'FASFSAFA', 'BJBFSAS', 'PROCESSING', 'PROCESSING', 'PROCESSING');
INSERT INTO `stores_authentic` VALUES (17, 46, 'FASFSAFA', 'BJBFSAS', 'PROCESSING', 'PROCESSING', 'PROCESSING');
INSERT INTO `stores_authentic` VALUES (18, 47, 'le thi cu ba', 'le thi cu ba', 'CCCD/erjkle1rcxta531k0v65', 'CCCD/mwfffzjv4tqviyvauptf', 'CCCD/p0nsv4iolgmzilca6x4z');
INSERT INTO `stores_authentic` VALUES (19, 48, 'le thi cu ba', 'le thi cu ba', 'CCCD/wsvekip4qgsjl51lwbrb', 'CCCD/hiigcznl2bt1ebuaqdk3', 'CCCD/gpk7zdjawpddotwbrrcr');
INSERT INTO `stores_authentic` VALUES (20, 49, 'fafasfsafasfas', 'fasfafasfafas', 'CCCD/brkmfmfr1mh6rddbdqvv', 'CCCD/tzltswbiwtwjo2pcueiz', 'CCCD/ab9ps4u8l8zdf9nkkdug');
INSERT INTO `stores_authentic` VALUES (21, 50, 'fafasfsafasfas', 'fasfafasfafas', 'CCCD/n4jonrn0llema85hxl22', 'CCCD/xiwibnpky0wvhjoyiicd', 'CCCD/sksc4u7i82zpf0zfes6g');
INSERT INTO `stores_authentic` VALUES (22, 51, 'asfasfasfasfas', 'fasfasfasfasf', 'CCCD/eccysuz2upfshqegrehe', 'CCCD/krhjv048oo2g1z4s4hyo', 'CCCD/zuolf7tudlepnekymatn');
INSERT INTO `stores_authentic` VALUES (23, 54, 'fasfasfasfasfasf', 'fasfasfasfas', 'CCCD/yphct7bmulvwolrzzak4', 'CCCD/mwdcmpmdlcmj8pqpsbya', 'CCCD/snhxrtf7wdhtz01wtgbo');

-- ----------------------------
-- Table structure for user_use_discount
-- ----------------------------
DROP TABLE IF EXISTS `user_use_discount`;
CREATE TABLE `user_use_discount`  (
  `use_discount_id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NULL DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `discount_shop_id` bigint NOT NULL,
  PRIMARY KEY (`use_discount_id`) USING BTREE,
  INDEX `FKtnsjx7d5ole0aqcbn9o1ow3ec`(`discount_shop_id` ASC) USING BTREE,
  CONSTRAINT `FKtnsjx7d5ole0aqcbn9o1ow3ec` FOREIGN KEY (`discount_shop_id`) REFERENCES `shop_discount` (`discount_shop_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_use_discount
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
