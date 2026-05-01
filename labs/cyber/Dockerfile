FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV USER=root

# 1. Install Desktop Environment (XFCE) & VNC
RUN apt-get update && apt-get install -y --fix-missing \
    xfce4 \
    xfce4-goodies \
    tigervnc-standalone-server \
    novnc \
    python3-websockify \
    python3-numpy \
    && rm -rf /var/lib/apt/lists/*

# 2. Install Hacker Tools
RUN apt-get update && apt-get install -y --fix-missing \
    nmap \
    netcat \
    wireshark \
    terminator \
    firefox \
    curl \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# 3. Create Vulnerable Target
RUN mkdir -p /target
RUN echo "🚩 FLAG: {GHOST_IN_THE_SHELL_V2}" > /target/secret.txt

# 4. Disable VNC Password (no auth)
RUN mkdir -p ~/.vnc

# --- THE FIX IS HERE 👇 ---
# We create a link named 'index.html' that points to 'vnc.html'.
# This makes the browser load it automatically!
RUN ln -s /usr/share/novnc/vnc.html /usr/share/novnc/index.html

# 5. Create Startup Script
RUN echo "#!/bin/bash" > /start.sh && \
    echo "echo '⏳ Initializing lab environment, please wait...'" >> /start.sh && \
    echo "sleep 10" >> /start.sh && \
    echo "echo '🎯 Starting Vulnerable Target...'" >> /start.sh && \
    echo "cd /target && python3 -m http.server 9000 &" >> /start.sh && \
    echo "echo '🖥️ Starting VNC Server...'" >> /start.sh && \
    echo "vncserver :1 -geometry 1280x720 -depth 24 -SecurityTypes None" >> /start.sh && \
    echo "echo '🌐 Starting NoVNC Web Interface...'" >> /start.sh && \
    echo "/usr/share/novnc/utils/launch.sh --vnc localhost:5901 --listen 6080" >> /start.sh

RUN chmod +x /start.sh

EXPOSE 6080

CMD ["/start.sh"]