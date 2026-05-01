FROM ubuntu:20.04

# Avoid prompts
ENV DEBIAN_FRONTEND=noninteractive
ENV USER=root

# 1. Install Desktop, VNC, and CRITICAL UTILS
# Added 'xfce4-terminal' explicitly to fix the button error
RUN apt-get update && apt-get install -y --fix-missing \
    xfce4 \
    xfce4-goodies \
    xfce4-terminal \
    tigervnc-standalone-server \
    novnc \
    python3-websockify \
    python3-numpy \
    net-tools \
    dbus-x11 \
    && rm -rf /var/lib/apt/lists/*

# 2. Install Network Simulator 2 (NS2) & NAM
RUN apt-get update && apt-get install -y \
    build-essential \
    autoconf \
    automake \
    libxmu-dev \
    gcc \
    g++ \
    make \
    wget \
    perl \
    tk \
    tcl \
    ns2 \
    nam \
    && rm -rf /var/lib/apt/lists/*

# 3. Create a Demo Project (To show judges)
RUN mkdir -p /root/projects
# Create a simple 2-node network simulation script
RUN echo 'set ns [new Simulator]' > /root/projects/demo.tcl && \
    echo 'set nf [open out.nam w]' >> /root/projects/demo.tcl && \
    echo '$ns namtrace-all $nf' >> /root/projects/demo.tcl && \
    echo 'proc finish {} {' >> /root/projects/demo.tcl && \
    echo '    global ns nf' >> /root/projects/demo.tcl && \
    echo '    $ns flush-trace' >> /root/projects/demo.tcl && \
    echo '    close $nf' >> /root/projects/demo.tcl && \
    echo '    exec nam out.nam &' >> /root/projects/demo.tcl && \
    echo '    exit 0' >> /root/projects/demo.tcl && \
    echo '}' >> /root/projects/demo.tcl && \
    echo 'set n0 [$ns node]' >> /root/projects/demo.tcl && \
    echo 'set n1 [$ns node]' >> /root/projects/demo.tcl && \
    echo '$ns duplex-link $n0 $n1 1Mb 10ms DropTail' >> /root/projects/demo.tcl && \
    echo '$ns at 5.0 "finish"' >> /root/projects/demo.tcl && \
    echo '$ns run' >> /root/projects/demo.tcl

# 4. Disable VNC Password (no auth)
RUN mkdir -p ~/.vnc

# 5. Fix VNC Startup (Prevent Crashes)
RUN echo "#!/bin/sh" > ~/.vnc/xstartup && \
    echo "unset SESSION_MANAGER" >> ~/.vnc/xstartup && \
    echo "unset DBUS_SESSION_BUS_ADDRESS" >> ~/.vnc/xstartup && \
    echo "startxfce4 &" >> ~/.vnc/xstartup && \
    chmod +x ~/.vnc/xstartup

# 6. Browser Shortcut
RUN ln -s /usr/share/novnc/vnc.html /usr/share/novnc/index.html

# 7. Create Main Startup Script
RUN echo "#!/bin/bash" > /start.sh && \
    echo "echo '⏳ Initializing lab environment, please wait...'" >> /start.sh && \
    echo "sleep 10" >> /start.sh && \
    echo "echo '🖥️ Starting VNC Server...'" >> /start.sh && \
    echo "vncserver :1 -geometry 1280x720 -depth 24 -SecurityTypes None" >> /start.sh && \
    echo "echo '🌐 Starting NoVNC Web Interface...'" >> /start.sh && \
    echo "/usr/share/novnc/utils/launch.sh --vnc localhost:5901 --listen 6080" >> /start.sh

RUN chmod +x /start.sh

EXPOSE 6080

CMD ["/start.sh"]