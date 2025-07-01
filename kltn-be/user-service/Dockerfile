FROM eclipse-temurin:21-jdk-jammy

# Cài netcat để chờ MySQL
RUN apt-get update && apt-get install -y netcat

# Sao chép script wait-for-mysql.sh
COPY wait-for-mysql.sh /wait-for-mysql.sh
RUN chmod +x /wait-for-mysql.sh

# Sao chép file JAR
COPY target/user-service-0.0.1-SNAPSHOT.jar /app.jar

# Dùng ENTRYPOINT gọi script
ENTRYPOINT ["/wait-for-mysql.sh", "kltn-mysql", "3306", "java", "-jar", "/app.jar"]
