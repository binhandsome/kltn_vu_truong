FROM eclipse-temurin:21-jdk-jammy

# Cài netcat để đợi MySQL
RUN apt-get update && apt-get install -y netcat

# Sao chép script chờ MySQL
COPY wait-for-mysql.sh /wait-for-mysql.sh
RUN chmod +x /wait-for-mysql.sh

# Sao chép toàn bộ source code và Maven wrapper
COPY . /app
WORKDIR /app

# Dùng ENTRYPOINT gọi spring-boot:run sau khi MySQL sẵn sàng
ENTRYPOINT ["/wait-for-mysql.sh", "kltn-mysql", "3306", "./mvnw", "spring-boot:run"]
