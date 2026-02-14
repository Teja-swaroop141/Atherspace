FROM docker:24-dind

# Install Portainer and basic tools
RUN apk add --no-cache wget ca-certificates bash curl

# Download and extract Portainer
WORKDIR /opt
RUN wget -q https://github.com/portainer/portainer/releases/download/2.19.4/portainer-2.19.4-linux-amd64.tar.gz && \
    tar xzf portainer-2.19.4-linux-amd64.tar.gz && \
    rm portainer-2.19.4-linux-amd64.tar.gz

# Install kubectl
RUN ARCH=$(uname -m | sed 's/aarch64/arm64/' | sed 's/x86_64/amd64/') && \
    wget -q "https://dl.k8s.io/release/$(wget -qO- https://dl.k8s.io/release/stable.txt)/bin/linux/${ARCH}/kubectl" -O /usr/local/bin/kubectl && \
    chmod +x /usr/local/bin/kubectl

# Configure kubectl for in-cluster access
RUN mkdir -p /root/.kube && \
    echo 'alias k=kubectl' >> /root/.bashrc

# Set KUBECONFIG environment variable globally
ENV KUBECONFIG=/root/.kube/config
ENV PATH="/usr/local/bin:${PATH}"

# Create startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 9000

CMD ["/start.sh"]
