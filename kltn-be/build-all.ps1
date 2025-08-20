# build-all.ps1
[CmdletBinding()]
param(
  [switch]$PauseOnExit = $true
)

$ErrorActionPreference = 'Stop'

# (Tùy chọn) Ép UTF-8 cho tất cả application-*.properties để tránh MalformedInputException
Get-ChildItem -Path . -Recurse -Filter "application-*.properties" | ForEach-Object {
  $p = $_.FullName
  (Get-Content -Raw -LiteralPath $p) | Set-Content -Encoding UTF8 -LiteralPath $p
}

# Cài lib và POM gốc (nếu cần)
Write-Host "=== Installing parent POM & common-security ===" -ForegroundColor Cyan
docker run --rm -v "${PWD}:/work" -v m2_cache:/root/.m2 -w /work `
  maven:3.9-eclipse-temurin-21 mvn -q -N -f pom.xml install
docker run --rm -v "${PWD}:/work" -v m2_cache:/root/.m2 -w /work `
  maven:3.9-eclipse-temurin-21 mvn -q -DskipTests -pl common-security -am clean install

$services = @(
  @{ module = "user-service";       image = "user-service:latest"       },
  @{ module = "email-service";      image = "email-service:latest"      },
  @{ module = "product-service";    image = "product-service:latest"    },
  @{ module = "cart-service";       image = "cart-service:latest"       },
  @{ module = "search-service";     image = "search-service:latest"     },
  @{ module = "order-service";      image = "order-service:latest"      },
  @{ module = "payment-service";    image = "payment-service:latest"    },
  @{ module = "recommend-service";  image = "recommend-service:latest"  },
  @{ module = "seller-service";     image = "seller-service:latest"     },
  @{ module = "upload-service";     image = "upload-service:latest"     },
  @{ module = "admin-service";      image = "admin-service:latest"      }
)

# Ghi log toàn bộ build
Start-Transcript -Path ".\build-all.log" -Append | Out-Null

$failed = @()
foreach ($s in $services) {
  $modulePath = "$($s.module)/pom.xml"
  $imageName  = $s.image
  Write-Host "`n=== Building $($s.module) -> $imageName ===" -ForegroundColor Cyan

  $mvn = "mvn -q -DskipTests -f $modulePath clean package org.springframework.boot:spring-boot-maven-plugin:3.5.0:build-image -Dspring-boot.build-image.imageName=$imageName"

  # Build bên trong container Maven (dùng Docker socket để packeto build image)
  docker run --rm `
    -v "${PWD}:/work" `
    -v m2_cache:/root/.m2 `
    -v //var/run/docker.sock:/var/run/docker.sock `
    -w /work `
    maven:3.9-eclipse-temurin-21 bash -lc $mvn

  if ($LASTEXITCODE -ne 0) {
    Write-Host "Build FAILED for $($s.module)" -ForegroundColor Red
    $failed += $s.module
    # KHÔNG exit; tiếp tục build service khác để bạn có full danh sách
  } else {
    Write-Host "Build OK: $($s.module)" -ForegroundColor Green
  }
}

Stop-Transcript | Out-Null

if ($failed.Count -gt 0) {
  Write-Host "`nMột số service build FAIL:" -ForegroundColor Yellow
  $failed | ForEach-Object { Write-Host " - $_" -ForegroundColor Yellow }
  Write-Host "Xem chi tiết log: $(Resolve-Path .\build-all.log)" -ForegroundColor Yellow
} else {
  Write-Host "`n=== ALL IMAGES BUILT OK ===" -ForegroundColor Green
}

if ($PauseOnExit) { Read-Host "`nNhấn Enter để đóng" | Out-Null }
