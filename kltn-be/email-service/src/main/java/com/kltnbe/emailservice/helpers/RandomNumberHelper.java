package com.kltnbe.emailservice.helpers;

import com.kltnbe.emailservice.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Random;
@Component
public class RandomNumberHelper {

    public static String generate6DigitString() {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 6; i++) {
            int digit = random.nextInt(10); // từ 0 đến 9
            sb.append(digit);
        }

        return sb.toString();
    }

    public static void main(String[] args) {
//        String randomString = generate6DigitString();
//        System.out.println("6-digit random string: " + randomString);

    }
}