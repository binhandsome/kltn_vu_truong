#!/bin/sh
set -e

host="$1"
port="$2"
shift 2

# Đợi MySQL sẵn sàng
until nc -z "$host" "$port"; do
  echo "Waiting for $host:$port..."
  sleep 1
done

# Nếu có dấu -- thì bỏ đi
[ "$1" = "--" ] && shift

# Chạy tiếp câu lệnh (java -jar ...)
exec "$@"
