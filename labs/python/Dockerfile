FROM codercom/code-server:latest

USER root

# 1. Install System Tools (htop for monitoring, tree for file view)
RUN apt-get update && apt-get install -y \
    python3 python3-pip \
    htop tree curl \
    && rm -rf /var/lib/apt/lists/*

# 2. Fix 'python' command linkage
RUN ln -s /usr/bin/python3 /usr/bin/python

# 3. Install "WOW" Libraries
# Rich: For hacker-style terminal output
# Streamlit: For instant dashboards
# Plotly: For interactive graphs
RUN pip3 install numpy pandas matplotlib seaborn rich streamlit plotly --break-system-packages

# 4. Install VS Code Extensions
RUN code-server --install-extension ms-python.python
RUN code-server --install-extension ms-toolsai.jupyter

# 5. Add "Welcome" Scripts
COPY welcome.py /home/coder/project/welcome.py
COPY dashboard.py /home/coder/project/dashboard.py
COPY marks.csv /home/coder/project/marks.csv

# 6. Make a custom command "hello" that runs the welcome script
RUN echo 'alias hello="python3 /home/coder/project/welcome.py"' >> /home/coder/.bashrc

# 7. Fix Permissions
RUN chown -R coder:coder /home/coder/project/
WORKDIR /home/coder/project

USER coder