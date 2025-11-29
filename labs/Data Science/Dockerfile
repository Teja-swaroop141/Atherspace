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

# Start JupyterLab without authentication
CMD ["start-notebook.sh", "--NotebookApp.token=''", "--NotebookApp.password=''"]
