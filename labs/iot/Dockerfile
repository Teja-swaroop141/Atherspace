# We use the LinuxServer Webtop base (KasmVNC technology)
# It is faster, smoother, and has built-in clipboard support
FROM lscr.io/linuxserver/webtop:ubuntu-xfce

# Set the Title
ENV TITLE="ZeroSetup IoT Lab"
ENV PUID=1000
ENV PGID=1000

# 1. Install Dependencies (Crucial for SimulIDE Drag-and-Drop)
RUN apt-get update && apt-get install -y \
    wget \
    xz-utils \
    openjdk-11-jre \
    libxtst6 \
    libxi6 \
    libusb-1.0-0 \
    libqt5widgets5 \
    libqt5gui5 \
    libqt5core5a \
    libqt5serialport5 \
    libqt5xml5 \
    libqt5multimedia5 \
    python3-numpy \
    && apt-get clean

# 2. Install Arduino IDE
WORKDIR /opt
RUN echo "Downloading Arduino..." && \
    wget --progress=bar:force https://downloads.arduino.cc/arduino-1.8.19-linux64.tar.xz && \
    tar -xvf arduino-1.8.19-linux64.tar.xz && \
    rm arduino-1.8.19-linux64.tar.xz

# 3. Install SimulIDE (Circuit Simulator)
RUN echo "Downloading SimulIDE..." && \
    wget --progress=bar:force https://launchpad.net/simulide/0.4.15/0.4.15-stable/+download/SimulIDE_0.4.15-SR10_Lin64.tar.gz && \
    tar -xvf SimulIDE_0.4.15-SR10_Lin64.tar.gz && \
    rm SimulIDE_0.4.15-SR10_Lin64.tar.gz

# 4. Create Desktop Shortcuts
# KasmVNC looks at /defaults/Desktop for initial shortcuts
RUN mkdir -p /defaults/Desktop && \
    echo '[Desktop Entry]\nVersion=1.0\nType=Application\nName=Arduino IDE\nExec=/opt/arduino-1.8.19/arduino\nIcon=/opt/arduino-1.8.19/lib/arduino.png\nTerminal=false\nStartupNotify=false' > /defaults/Desktop/Arduino.desktop && \
    echo '[Desktop Entry]\nVersion=1.0\nType=Application\nName=SimulIDE\nExec=/opt/SimulIDE_0.4.15-SR10_Linux64/SimulIDE\nIcon=utilities-terminal\nTerminal=false\nStartupNotify=false' > /defaults/Desktop/SimulIDE.desktop && \
    chmod +x /defaults/Desktop/*.desktop

# Port 3000 is the standard for Webtop
EXPOSE 3000