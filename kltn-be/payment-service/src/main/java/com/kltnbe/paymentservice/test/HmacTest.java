package com.kltnbe.paymentservice.test;// File: HmacTest.java
// File: HmacTest.java
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

public class HmacTest {

    // Hàm hash này lấy 100% từ code mẫu của VNPAY
    public static String hmacSHA512(final String key, final String data) {
        try {
            if (key == null || data == null) {
                throw new NullPointerException();
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            // Dùng encoding mặc định của hệ thống cho key, giống hệt VNPAY
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();
        } catch (Exception ex) {
            throw new RuntimeException("Hashing failed", ex);
        }
    }

    public static void main(String[] args) {
        // --- DỮ LIỆU CỐ ĐỊNH LẤY TỪ LOG LỖI CỦA BẠN ---
        String key = "GGVKM5NE4NUME7F29SYX0OITKKXN0LNC";
        String data = "vnp_Amount=117550000&vnp_Command=pay&vnp_CreateDate=20250717020647&vnp_CurrCode=VND&vnp_IpAddr=14.191.88.141&vnp_Locale=vn&vnp_OrderInfo=Thanh toan don hang 33&vnp_OrderType=other&vnp_ReturnUrl=http://localhost:3000/user/shoppages/paymentReturn&vnp_TmnCode=MRPD3VN7&vnp_TxnRef=28_1752692807676&vnp_Version=2.1.0";

        // --- HASH ĐÚNG (KẾT QUẢ MÀ VNPAY MONG MUỐN) ---
        String expectedHash = "a2d17321cad2ad55bd9204dc17d25694d9c687642599596c0287a410ac31c77abb1da438d7a9249afd561c9cc5046b54af272612030691a6fa214dbc9542be59";

        // --- THỰC HIỆN BĂM ---
        System.out.println("--- BẮT ĐẦU KIỂM TRA HÀM BĂM TRÊN MÔI TRƯỜNG ZULU JDK 17 ---");
        String generatedHash = hmacSHA512(key, data);

        // --- IN KẾT QUẢ ĐỂ SO SÁNH ---
        System.out.println("   Generated Hash: " + generatedHash);
        System.out.println("   Expected Hash:  " + expectedHash);
        System.out.println("----------------------------------------------------------");

        if (generatedHash.equals(expectedHash)) {
            System.out.println("KẾT QUẢ: THÀNH CÔNG! Môi trường Java của bạn đã hoạt động ĐÚNG. Giờ bạn có thể chạy project Spring Boot.");
        } else {
            System.out.println("KẾT QUẢ: THẤT BẠI! Lỗi vẫn tồn tại ở tầng hệ thống, có thể do chính sách bảo mật hoặc phần mềm khác.");
        }
    }
}