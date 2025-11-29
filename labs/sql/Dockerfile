FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# 1. Install MariaDB (MySQL), PHP, and Adminer
RUN apt-get update && apt-get install -y \
    mariadb-server \
    php \
    php-mysql \
    wget \
    && rm -rf /var/lib/apt/lists/*

# 2. Setup Adminer (The Web GUI)
RUN mkdir -p /var/www/html
RUN wget "https://github.com/vrana/adminer/releases/download/v4.8.1/adminer-4.8.1.php" -O /var/www/html/index.php

# 3. Copy SQL Data
COPY init.sql /tmp/init.sql

# 4. Configure MySQL to listen on all interfaces
RUN sed -i 's/bind-address            = 127.0.0.1/bind-address = 0.0.0.0/' /etc/mysql/mariadb.conf.d/50-server.cnf

# 5. CREATE THE STARTUP SCRIPT INSIDE LINUX
# We set the password to 'pass' so Adminer accepts the login.
RUN echo "#!/bin/bash" > /start.sh && \
    echo "echo '🚀 Starting MySQL...'" >> /start.sh && \
    echo "service mariadb start" >> /start.sh && \
    echo "sleep 5" >> /start.sh && \
    echo "echo '🛠️ Setting up User...'" >> /start.sh && \
    echo "mariadb -e \"CREATE USER 'student'@'%' IDENTIFIED BY 'pass';\"" >> /start.sh && \
    echo "mariadb -e \"GRANT ALL PRIVILEGES ON *.* TO 'student'@'%';\"" >> /start.sh && \
    echo "mariadb -e \"FLUSH PRIVILEGES;\"" >> /start.sh && \
    echo "echo '📥 Importing Data...'" >> /start.sh && \
    echo "mariadb < /tmp/init.sql" >> /start.sh && \
    echo "echo '✅ Starting Adminer GUI on port 8080...'" >> /start.sh && \
    echo "php -S 0.0.0.0:8080 -t /var/www/html" >> /start.sh

# 6. Make it executable
RUN chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]