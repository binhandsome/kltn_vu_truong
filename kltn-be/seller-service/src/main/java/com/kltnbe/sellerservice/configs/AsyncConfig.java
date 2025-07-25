package com.kltnbe.sellerservice.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;

@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5); // Số luồng tối thiểu
        executor.setMaxPoolSize(10); // Số luồng tối đa
        executor.setQueueCapacity(100); // Dung lượng hàng đợi
        executor.setThreadNamePrefix("Async-Thread-"); // Tên luồng để debug
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy()); // Xử lý khi hàng đợi đầy
        executor.initialize();
        return executor;
    }
}