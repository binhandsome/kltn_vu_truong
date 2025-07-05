package com.kltnbe.cartservice.configs;

import com.kltnbe.cartservice.dtos.CartRedisDto;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, CartRedisDto> cartRedisDtoRedisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, CartRedisDto> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);

        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());

        template.setValueSerializer(new Jackson2JsonRedisSerializer<>(CartRedisDto.class));
        template.setHashValueSerializer(new Jackson2JsonRedisSerializer<>(CartRedisDto.class));

        template.afterPropertiesSet();

        return template;
    }

}
