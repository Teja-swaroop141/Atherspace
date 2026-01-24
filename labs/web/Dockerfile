# Use Node.js 18 as the base image
FROM node:18-bullseye

# 1. Install Code-Server (VS Code in Browser)
RUN curl -fsSL https://code-server.dev/install.sh | sh

# 2. INSTALL MONGODB (The Fix)
# We install 'gnupg' and 'wget' to fetch the official Mongo Repo keys
RUN apt-get update && apt-get install -y gnupg wget git

# Import the MongoDB public GPG key and add the repository
RUN wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
RUN echo "deb http://repo.mongodb.org/apt/debian bullseye/mongodb-org/6.0 main" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Now we can install the official 'mongodb-org' package
RUN apt-get update && apt-get install -y mongodb-org

# 3. Create the Database Directory (Required by Mongo)
RUN mkdir -p /data/db

# 4. Set up the Project Directory
WORKDIR /home/project

# 5. CREATE A SAMPLE "HELLO WORLD" PROJECT
RUN mkdir -p /home/project/server && \
    echo "const express = require('express');\n\
const app = express();\n\
const port = 3000;\n\
app.get('/', (req, res) => res.send('<h1>🚀 ZeroSetup MERN Lab is Live!</h1>'));\n\
app.listen(port, '0.0.0.0', () => console.log('Server running on port '+port));" > /home/project/server/server.js

# Initialize the project
RUN cd /home/project/server && npm init -y && npm install express

# 6. Expose Ports (8080=VS Code, 3000=Student App)
EXPOSE 8080 3000

# 7. Start MongoDB and VS Code together
# We use 'mongod' (the server) instead of the old service command
CMD mongod --fork --logpath /var/log/mongod.log --bind_ip 0.0.0.0 && \
    code-server --bind-addr 0.0.0.0:8080 --auth none /home/project