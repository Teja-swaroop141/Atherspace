# Lightweight Jupyter base ( ~800MB )
FROM jupyter/base-notebook:python-3.10

USER root

# Install only required Python libraries
RUN pip install --no-cache-dir \
    pandas \
    numpy \
    matplotlib \
    scikit-learn

# Copy sample lab files
COPY titanic.csv /home/jovyan/
COPY sample_analysis.ipynb /home/jovyan/

# Ensure files owned by correct user
RUN chown -R jovyan:users /home/jovyan/

USER jovyan

# Expose JupyterLab port
EXPOSE 8888

# Create startup script with delay (as root, in home directory)
USER root
RUN echo "#!/bin/bash" > /home/jovyan/start.sh && \
    echo "echo '⏳ Initializing lab environment, please wait...'" >> /home/jovyan/start.sh && \
    echo "sleep 10" >> /home/jovyan/start.sh && \
    echo "start-notebook.sh --NotebookApp.token='' --NotebookApp.password=''" >> /home/jovyan/start.sh && \
    chmod +x /home/jovyan/start.sh && \
    chown jovyan:users /home/jovyan/start.sh

USER jovyan

# Start JupyterLab with delay
CMD ["/home/jovyan/start.sh"]
