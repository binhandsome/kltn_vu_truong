@echo off
setlocal EnableDelayedExpansion

echo ============================
echo 🚀 KLTN - Backend Starter
echo ============================

:: Build ứng dụng Spring Boot
echo 🧱 Building user-service JAR...
cd user-service
call mvnw clean package -DskipTests
cd ..

:: Xoá Docker containers và volumes cũ
echo 🧹 Cleaning up Docker...
docker compose down -v

:: Xoá Docker network nếu còn
docker network rm kltn-be_kong-net >nul 2>&1

:: Khởi động database cho Kong
echo 🐘 Starting kong-database for migrations...
docker compose up -d kong-database

echo ⏳ Waiting 5s for kong-database to be ready...
timeout /t 5 >nul

:: Khởi động Eureka Server
echo 🛰️ Starting eureka-server...
docker compose up -d eureka-server

:: Đợi Eureka Server sẵn sàng
set MAX_EUREKA_WAIT=60
set EUREKA_WAIT_COUNT=0
:wait_eureka
curl --silent --fail http://localhost:8761 >nul 2>&1
if errorlevel 1 (
    echo 🕒 Waiting for eureka-server... [%time%]
    timeout /t 2 >nul
    set /a EUREKA_WAIT_COUNT+=2
    if !EUREKA_WAIT_COUNT! GEQ !MAX_EUREKA_WAIT! (
        echo ❌ Timeout waiting for eureka-server!
        exit /b 1
    )
    goto wait_eureka
)
echo ✅ Eureka is ready!

:: Bootstrap database cho Kong
echo 🧱 Bootstrapping Kong database...
docker run --rm --network=kltn-be_kong-net ^
  -e "KONG_DATABASE=postgres" ^
  -e "KONG_PG_HOST=kong-database" ^
  -e "KONG_PG_USER=kong" ^
  -e "KONG_PG_PASSWORD=kong" ^
  kong/kong-gateway:3.3.0.0 kong migrations bootstrap

:: Build Docker services lại hoàn toàn (không dùng cache)
echo 🔨 Building Docker services...
docker compose build --no-cache

:: Khởi động tất cả container
echo 🐳 Starting Docker containers...
docker compose up -d

:: Chờ các service chính sẵn sàng
echo ⏳ Waiting for services to be ready...
timeout /t 30 >nul

:: Chờ user-service
set WAIT_COUNT=0
:wait_user
docker inspect --format="{{.State.Running}}" user-service | findstr true >nul
if errorlevel 1 (
    echo ❌ user-service not running [%time%]
    exit /b 1
)
curl --silent --fail http://localhost:8081/actuator/health >nul 2>&1
if errorlevel 1 (
    echo ⏳ Waiting for user-service... [%time%]
    timeout /t 2 >nul
    set /a WAIT_COUNT+=2
    if !WAIT_COUNT! GEQ 120 (
        echo ❌ Timeout waiting for user-service
        exit /b 1
    )
    goto wait_user
)
echo ✅ user-service is ready!

:: Chờ email-service
set WAIT_COUNT=0
:wait_email
docker inspect --format="{{.State.Running}}" email-service | findstr true >nul
if errorlevel 1 (
    echo ❌ email-service not running [%time%]
    exit /b 1
)
curl --silent --fail http://localhost:8082/actuator/health >nul 2>&1
if errorlevel 1 (
    echo ⏳ Waiting for email-service... [%time%]
    timeout /t 2 >nul
    set /a WAIT_COUNT+=2
    if !WAIT_COUNT! GEQ 120 (
        echo ❌ Timeout waiting for email-service
        exit /b 1
    )
    goto wait_email
)
echo ✅ email-service is ready!

:: Chờ Kong admin API sẵn sàng
echo ⏳ Waiting for Kong to be ready...
set KONG_WAIT_COUNT=0
:wait_kong
curl --silent --fail http://localhost:8001/status >nul 2>&1
if errorlevel 1 (
    echo 🕒 Waiting for Kong... [%time%]
    timeout /t 3 >nul
    set /a KONG_WAIT_COUNT+=3
    if !KONG_WAIT_COUNT! GEQ 60 (
        echo ❌ Timeout waiting for Kong
        exit /b 1
    )
    goto wait_kong
)
echo ✅ Kong is ready!

:: Đăng ký services và routes trong Kong
echo 🔗 Registering Kong services and routes...

:: user-service
curl --silent -X POST http://localhost:8001/services ^
  --data "name=user-service" ^
  --data "url=http://user-service:8081" >nul

curl --silent -X POST http://localhost:8001/services/user-service/routes ^
  --data "paths[]=/api/auth" ^
  --data "strip_path=false" >nul

curl --silent -X POST http://localhost:8001/services/user-service/routes ^
  --data "paths[]=/actuator" ^
  --data "strip_path=false" >nul

:: email-service
curl --silent -X POST http://localhost:8001/services ^
  --data "name=email-service" ^
  --data "url=http://email-service:8082" >nul

curl --silent -X POST http://localhost:8001/services/email-service/routes ^
  --data "paths[]=/api/email" ^
  --data "strip_path=false" >nul

echo ✅ Setup completed!
pause
