CREATE TABLE auth (
    auth_id BIGINT PRIMARY KEY AUTO_INCREMENT,         -- Thay 'id' thành 'auth_id' để phân biệt
    username VARCHAR(50) UNIQUE NOT NULL,              -- Giữ nguyên
    password_hash VARCHAR(255) NOT NULL,               -- Giữ nguyên
    user_role VARCHAR(20) NOT NULL,                    -- Thay 'role' thành 'user_role' cho rõ ràng
    is_banned BOOLEAN DEFAULT FALSE,                   -- Thay 'ban' thành 'is_banned' cho dễ hiểu
    is_active BOOLEAN DEFAULT TRUE,                    -- Giữ nguyên
    last_login TIMESTAMP,                              -- Giữ nguyên
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Giữ nguyên
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Giữ nguyên
    last_login_ip VARCHAR(45),                         -- Thay 'last_ip_login' thành 'last_login_ip'
    last_login_country VARCHAR(100),                   -- Thay 'country_login_by_ip' thành 'last_login_country'
    email VARCHAR(255) UNIQUE,                         -- Giữ nguyên
    refresh_token VARCHAR(255)                         -- Giữ nguyên
);
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,         -- Thay 'id' thành 'user_id' để phân biệt
    auth_id BIGINT NOT NULL UNIQUE,                    -- Thay 'id_auth' thành 'auth_id' để đồng bộ
    first_name VARCHAR(100),                           -- Giữ nguyên
    last_name VARCHAR(100),                            -- Giữ nguyên
    date_of_birth DATE,                                -- Thay 'birth' thành 'date_of_birth'
    user_address TEXT,                                 -- Thay 'address' thành 'user_address'
    gender ENUM('male', 'female', 'other'),            -- Giữ nguyên
    phone_number VARCHAR(20),                          -- Thay 'phone' thành 'phone_number'
    email VARCHAR(255) UNIQUE,                         -- Giữ nguyên
    profile_picture VARCHAR(255),                      -- Thay 'thumbnail' thành 'profile_picture'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Giữ nguyên
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Giữ nguyên
    user_preferences JSON,                             -- Thay 'preferences' thành 'user_preferences'
    FOREIGN KEY (auth_id) REFERENCES auth(auth_id) ON DELETE CASCADE -- Điều chỉnh tham chiếu
);
CREATE TABLE products (
    product_id BIGINT PRIMARY KEY AUTO_INCREMENT,      -- Thay 'id' thành 'product_id'
    asin VARCHAR(10) UNIQUE NOT NULL,                  -- Giữ nguyên
    product_title VARCHAR(255) NOT NULL,               -- Thay 'title' thành 'product_title'
    product_price DECIMAL(10, 2),                      -- Thay 'price' thành 'product_price'
    average_rating DECIMAL(3, 2),                      -- Giữ nguyên
    number_of_ratings INT DEFAULT 0,                   -- Thay 'rating_number' thành 'number_of_ratings'
    product_thumbnail VARCHAR(255),                    -- Thay 'thumbnail' thành 'product_thumbnail'
    brand_name VARCHAR(100),                           -- Thay 'brand' thành 'brand_name'
    stock_quantity INT DEFAULT 0,                      -- Thay 'stock' thành 'stock_quantity'
    product_status ENUM('active', 'inactive', 'discontinued') DEFAULT 'active', -- Thay 'status' thành 'product_status'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Giữ nguyên
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Giữ nguyên
);
CREATE TABLE categories (
    category_id BIGINT PRIMARY KEY AUTO_INCREMENT,     -- Thay 'id' thành 'category_id'
    product_asin VARCHAR(10) NOT NULL,                 -- Thay 'asin' thành 'product_asin'
    category_name VARCHAR(100) NOT NULL,               -- Thay 'category' thành 'category_name'
    category_description TEXT,                         -- Thay 'description' thành 'category_description'
    category_features JSON,                            -- Thay 'features' thành 'category_features'
    store_id BIGINT,                                   -- Giữ nguyên
    FOREIGN KEY (product_asin) REFERENCES products(asin) ON DELETE CASCADE -- Điều chỉnh tham chiếu
);
CREATE TABLE product_variants (
    variant_id BIGINT PRIMARY KEY AUTO_INCREMENT,      -- Thay 'id' thành 'variant_id'
    product_asin VARCHAR(10) NOT NULL,                 -- Thay 'asin' thành 'product_asin'
    variant_price DECIMAL(10, 2),                      -- Thay 'price' thành 'variant_price'
    variant_color VARCHAR(50),                         -- Thay 'color' thành 'variant_color'
    variant_sku VARCHAR(50) UNIQUE,                    -- Thay 'sku' thành 'variant_sku'
    variant_thumbnail VARCHAR(255),                    -- Thay 'thumbnail' thành 'variant_thumbnail'
    FOREIGN KEY (product_asin) REFERENCES products(asin) ON DELETE CASCADE -- Điều chỉnh tham chiếu
);
CREATE TABLE product_images (
    image_id BIGINT PRIMARY KEY AUTO_INCREMENT,        -- Thay 'id' thành 'image_id'
    product_asin VARCHAR(10) NOT NULL,                 -- Thay 'asin' thành 'product_asin'
    image_data JSON NOT NULL,                          -- Giữ nguyên
    is_main_image BOOLEAN DEFAULT FALSE,               -- Thay 'is_main' thành 'is_main_image'
    FOREIGN KEY (product_asin) REFERENCES products(asin) ON DELETE CASCADE -- Điều chỉnh tham chiếu
);
CREATE TABLE product_videos (
    video_id BIGINT PRIMARY KEY AUTO_INCREMENT,        -- Thay 'id' thành 'video_id'
    product_asin VARCHAR(10) NOT NULL,                 -- Thay 'asin' thành 'product_asin'
    video_data JSON NOT NULL,                          -- Giữ nguyên
    video_duration INT,                                -- Thay 'duration' thành 'video_duration'
    FOREIGN KEY (product_asin) REFERENCES products(asin) ON DELETE CASCADE -- Điều chỉnh tham chiếu
);
CREATE TABLE product_sizes (
    size_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    variant_id BIGINT NOT NULL,
    size_name VARCHAR(20),
    size_sku VARCHAR(50) UNIQUE,
    FOREIGN KEY (variant_id) REFERENCES product_variants(variant_id) ON DELETE CASCADE
);
CREATE TABLE stores (
    store_id BIGINT PRIMARY KEY AUTO_INCREMENT,        -- Thay 'id' thành 'store_id'
    owner_id BIGINT NOT NULL,                          -- Giữ nguyên
    store_name VARCHAR(100) NOT NULL,                  -- Thay 'name' thành 'store_name'
    store_description TEXT,                            -- Thay 'description' thành 'store_description'
    store_address VARCHAR(255),                        -- Thay 'address' thành 'store_address'
    store_phone VARCHAR(20),                           -- Thay 'phone' thành 'store_phone'
    store_email VARCHAR(255),                          -- Thay 'email' thành 'store_email'
    store_thumbnail VARCHAR(255),                      -- Thay 'thumbnail' thành 'store_thumbnail'
    store_status ENUM('pending', 'active', 'suspended') DEFAULT 'pending', -- Thay 'status' thành 'store_status'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Giữ nguyên
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Giữ nguyên
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE RESTRICT -- Điều chỉnh tham chiếu
);

CREATE TABLE inventory (
    inventory_id BIGINT PRIMARY KEY AUTO_INCREMENT,    -- Thay 'id' thành 'inventory_id'
    warehouse_id BIGINT NOT NULL,                      -- Thay 'warehouseID' thành 'warehouse_id'
    variant_id BIGINT NOT NULL,                        -- Thay 'productVariantID' thành 'variant_id'
    size_id BIGINT,                                    -- Thay 'productSizeID' thành 'size_id'
    remaining_quantity INT NOT NULL,                   -- Thay 'remainingQuantity' thành 'remaining_quantity'
    quantity_sold INT NOT NULL,                        -- Thay 'quantitySold' thành 'quantity_sold'
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Giữ nguyên
    inventory_status ENUM('available', 'out_of_stock') DEFAULT 'available' -- Thay 'status' thành 'inventory_status'
);

CREATE TABLE warehouses (
    warehouse_id BIGINT PRIMARY KEY AUTO_INCREMENT,    -- Thay 'id' thành 'warehouse_id'
    store_id BIGINT NOT NULL,                          -- Giữ nguyên
    warehouse_address TEXT NOT NULL,                   -- Thay 'address' thành 'warehouse_address'
    latitude DECIMAL(10, 8),                           -- Giữ nguyên
    longitude DECIMAL(11, 8),                          -- Giữ nguyên
    warehouse_capacity INT,                            -- Thay 'capacity' thành 'warehouse_capacity'
    is_active_warehouse BOOLEAN DEFAULT TRUE,          -- Thay 'is_active' thành 'is_active_warehouse'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Giữ nguyên
    FOREIGN KEY (store_id) REFERENCES stores(store_id) -- Điều chỉnh tham chiếu
);
CREATE TABLE addresses (
    address_id BIGINT PRIMARY KEY AUTO_INCREMENT,      -- Thay 'id' thành 'address_id'
    user_id BIGINT NOT NULL,                           -- Giữ nguyên
    recipient_name VARCHAR(100) NOT NULL,              -- Thay 'name' thành 'recipient_name'
    recipient_phone VARCHAR(20) NOT NULL,              -- Thay 'phone' thành 'recipient_phone'
    delivery_address TEXT NOT NULL,                    -- Thay 'address' thành 'delivery_address'
    address_details TEXT,                              -- Thay 'details' thành 'address_details'
    is_primary_address BOOLEAN DEFAULT FALSE,          -- Thay 'is_main' thành 'is_primary_address'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Giữ nguyên
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Giữ nguyên
    FOREIGN KEY (user_id) REFERENCES users(user_id)    -- Điều chỉnh tham chiếu
);

CREATE TABLE shipping_methods (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    method_name VARCHAR(100) NOT NULL,
    description TEXT,
    estimated_days INT,
    cost DECIMAL(10, 2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE promotions (
    promotion_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    promotion_name VARCHAR(100) NOT NULL,           -- Tên chương trình (VD: "Sale 11.11")
    discount_type ENUM('percentage', 'fixed', 'free_shipping') NOT NULL, -- Loại giảm giá: %, cố định, miễn phí ship
    discount_value DECIMAL(10, 2) NOT NULL,         -- Giá trị giảm (VD: 20% hoặc 50,000 VNĐ)
    start_date TIMESTAMP NOT NULL,                  -- Thời gian bắt đầu
    end_date TIMESTAMP NOT NULL,                    -- Thời gian kết thúc
    store_id BIGINT,                                -- Áp dụng cho cửa hàng cụ thể (NULL nếu toàn hệ thống)
    product_id BIGINT,                              -- Áp dụng cho sản phẩm cụ thể (NULL nếu toàn hệ thống)
    variant_id BIGINT,                              -- Áp dụng cho biến thể cụ thể (NULL nếu không)
    min_order_value DECIMAL(10, 2),                 -- Giá trị đơn hàng tối thiểu để áp dụng (VD: 100,000 VNĐ)
    max_discount_value DECIMAL(10, 2),              -- Giới hạn giảm tối đa (VD: tối đa 50,000 VNĐ)
    is_active BOOLEAN DEFAULT TRUE,                 -- Trạng thái hoạt động
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(store_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (variant_id) REFERENCES product_variants(variant_id)
);

CREATE TABLE coupons (
    coupon_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    coupon_code VARCHAR(50) UNIQUE NOT NULL,
    discount_type ENUM('percentage', 'fixed') NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    max_uses INT DEFAULT 1,
    times_used INT DEFAULT 0,
    expiration_date TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    delivery_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,            -- Tổng tiền (sản phẩm + phí ship - khuyến mãi)
    order_status ENUM('pending', 'processing', 'shipped', 'completed', 'cancelled') DEFAULT 'pending', -- Thay status bằng ENUM
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Sửa create_at thành created_at
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    promotion_id BIGINT,                             -- Liên kết với promotions (Sale Service)
    coupon_id BIGINT,                                -- Liên kết với coupons (Sale Service)
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (promotion_id) REFERENCES promotions(promotion_id),
    FOREIGN KEY (coupon_id) REFERENCES coupons(coupon_id)
);

CREATE TABLE order_items (
    order_item_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_variant_id BIGINT NOT NULL,
    store_id BIGINT NOT NULL,                        -- Thêm store_id để hỗ trợ đa cửa hàng
    quantity INT NOT NULL,
    size_id BIGINT,                                  -- Giữ nhưng cần kiểm tra nếu dư thừa
    unit_price DECIMAL(10, 2) NOT NULL,              -- Giá đơn vị tại thời điểm đặt
    total_price DECIMAL(10, 2) NOT NULL,             -- Tổng giá của mục (unit_price × quantity - khuyến mãi)
    promotion_id BIGINT,                             -- Thay sale_id thành promotion_id
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_variant_id) REFERENCES product_variants(variant_id),
    FOREIGN KEY (store_id) REFERENCES stores(store_id),
    FOREIGN KEY (size_id) REFERENCES product_sizes(size_id),
    FOREIGN KEY (promotion_id) REFERENCES promotions(promotion_id)
);

CREATE TABLE analytics (
    analytics_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,                        -- Thay id_product thành product_id
    user_id BIGINT,                                    -- Thêm để cá nhân hóa gợi ý
    recommendation_data JSON NOT NULL,                 -- Thay jsonRecommend thành recommendation_data
    training_method ENUM('content_based', 'collaborative_filtering', 'deep_learning') NOT NULL, -- Thay function_train
    trained_at TIMESTAMP NOT NULL,                     -- Thời gian train kết quả
    expires_at TIMESTAMP,                              -- Thời gian hết hạn (nếu cần)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE transactions (
    transaction_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    payment_method ENUM('bank', 'momo', 'crypto','paypal','cod') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,                        -- Tổng tiền thanh toán
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
CREATE TABLE bank_transactions (
    bank_transactions_id BIGINT PRIMARY KEY,
    transaction_id BIGINT,
    card_number VARCHAR(20) NOT NULL,                     -- Số thẻ (mã hóa nếu cần)
    cardholder_name VARCHAR(100) NOT NULL,                -- Tên chủ thẻ
    bank_name VARCHAR(50),                                -- Tên ngân hàng (VD: Vietcombank)
    bank_transaction_code VARCHAR(50),                    -- Mã giao dịch từ ngân hàng
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);

CREATE TABLE momo_transactions (
    transaction_id BIGINT PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL,
    momo_transaction_id VARCHAR(50),
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);


CREATE TABLE crypto_transactions (
    crypto_transactions_id BIGINT PRIMARY KEY,
    transaction_id BIGINT,
    user_wallet_address VARCHAR(100) NOT NULL,
    system_wallet_address VARCHAR(100) NOT NULL,
    crypto_type VARCHAR(20) NOT NULL,
    transaction_hash VARCHAR(100),
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);

CREATE TABLE paypal_transactions (
    transaction_id BIGINT PRIMARY KEY,
    paypal_email VARCHAR(255) NOT NULL,            -- Email tài khoản PayPal của người dùng
    paypal_payment_id VARCHAR(50) NOT NULL,        -- ID yêu cầu thanh toán từ PayPal
    paypal_transaction_id VARCHAR(50),             -- ID giao dịch từ PayPal (sau khi hoàn tất)
    paypal_redirect_url VARCHAR(255),              -- URL redirect để người dùng thanh toán
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);

CREATE TABLE cod_transactions (
    cod_transactions_id BIGINT PRIMARY KEY,
    transaction_id BIGINT,
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);


CREATE TABLE reviews (
    review_id BIGINT PRIMARY KEY AUTO_INCREMENT,       -- Thay reviews_id
    order_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,                        -- Thêm để liên kết với sản phẩm
    variant_id BIGINT,                                 -- Thêm để liên kết với biến thể (nếu có)
    rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5), -- Điểm số 1-5 sao
    is_reviewed BOOLEAN DEFAULT FALSE,                 -- Thay isReviews
    review_title VARCHAR(255) NOT NULL,                -- Thay title
    review_content TEXT NOT NULL,                      -- Thay content
    review_images JSON,                                -- Thay imageJson
    review_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending', -- Thêm để kiểm duyệt
    helpful_votes INT DEFAULT 0,                       -- Số lượt "hữu ích"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Thay createAT
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (variant_id) REFERENCES product_variants(variant_id)
);
CREATE TABLE messages (
    message_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sender_id BIGINT,
    sender_session_id VARCHAR(50),
    receiver_id BIGINT,
    message_type ENUM('chat', 'notification', 'support') DEFAULT 'chat',
    message_content TEXT NOT NULL,
    approval_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    approved_by BIGINT,
    message_status ENUM('sent', 'delivered', 'read') DEFAULT 'sent',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id),
    FOREIGN KEY (approved_by) REFERENCES users(user_id)
);
CREATE TABLE store_messages (
    message_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sender_id BIGINT,                               -- Người gửi (NULL nếu chưa đăng nhập)
    sender_session_id VARCHAR(50),                  -- Định danh tạm cho người chưa đăng nhập
    store_id BIGINT NOT NULL,                       -- Cửa hàng nhận hoặc gửi tin nhắn
    message_type ENUM('user_to_store', 'store_to_user') NOT NULL, -- Loại tin nhắn
    message_content TEXT NOT NULL,                  -- Nội dung tin nhắn
    order_id BIGINT,                                -- Đơn hàng liên quan (nếu có)
    message_status ENUM('sent', 'delivered', 'read') DEFAULT 'sent', -- Trạng thái gửi
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (store_id) REFERENCES stores(store_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);



-- Delivery Info table moved to bottom to fix foreign key error

CREATE TABLE delivery_info (
    delivery_id BIGINT PRIMARY KEY AUTO_INCREMENT,     -- Thay 'id' thành 'delivery_id'
    order_id BIGINT NOT NULL,                          -- Giữ nguyên
    address_id BIGINT NOT NULL,                        -- Giữ nguyên
    shipping_method_id BIGINT NOT NULL,                -- Giữ nguyên
    delivery_status ENUM('pending', 'packed', 'shipped', 'delivered', 'failed') 
DEFAULT 'pending', -- Thay 'status' thành 'delivery_status'
    shipping_fee DECIMAL(10, 2) NOT NULL,              -- Giữ nguyên
    tracking_number VARCHAR(50),                       -- Giữ nguyên
    estimated_delivery_date TIMESTAMP,                 -- Giữ nguyên
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Giữ nguyên
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Giữ nguyên
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (address_id) REFERENCES addresses(address_id),
    FOREIGN KEY (shipping_method_id) REFERENCES shipping_methods(id)
);