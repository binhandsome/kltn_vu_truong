package com.kltnbe.sellerservice.configs;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import feign.FeignException;
import feign.Response;
import feign.Util;
import feign.codec.ErrorDecoder;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

@Component
public class CustomFeignErrorDecoder implements ErrorDecoder {

    private final ErrorDecoder defaultDecoder = new Default();

    @Override
    public Exception decode(String methodKey, Response response) {
        String message = "Unknown error";

        try {
            if (response.body() != null) {
                String body = Util.toString(response.body().asReader(StandardCharsets.UTF_8));

                // ✅ Nếu body là JSON thì parse message từ JSON
                ObjectMapper mapper = new ObjectMapper();
                JsonNode node = mapper.readTree(body);
                if (node.has("message")) {
                    message = node.get("message").asText();
                } else {
                    message = body;
                }
            }
        } catch (Exception e) {
            // fallback giữ message mặc định
        }

        return new FeignException.FeignClientException(
                response.status(),
                methodKey + " failed with status " + response.status() + " and body: " + message,
                response.request(),
                message.getBytes(StandardCharsets.UTF_8),
                response.headers()
        );
    }
}
