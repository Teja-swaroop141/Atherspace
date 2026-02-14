#!/bin/sh

# Add startup delay to prevent blank screens
echo "⏳ Initializing lab environment, please wait..."
sleep 10

# Start Docker daemon in the background
dockerd-entrypoint.sh &

# Wait for Docker daemon to be ready
echo "Waiting for Docker daemon to start..."
sleep 5

# Configure kubectl to use in-cluster service account
cat > /root/.kube/config <<EOF
apiVersion: v1
kind: Config
clusters:
- cluster:
    certificate-authority: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    server: https://kubernetes.default.svc
  name: local
contexts:
- context:
    cluster: local
    user: local
  name: local
current-context: local
users:
- name: local
  user:
    tokenFile: /var/run/secrets/kubernetes.io/serviceaccount/token
EOF

# Start Portainer (Docker management UI)
echo "Starting Portainer on port 9000..."
/opt/portainer/portainer --bind=:9000 --data=/data
