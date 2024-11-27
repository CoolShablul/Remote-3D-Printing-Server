# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set environment variables to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive
ENV OCTOPRINT_VERSION=1.8.7

# Set the working directory to /app
WORKDIR /app

# Install dependencies and OctoPrint
RUN apt-get update && \
    apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    build-essential \
    && pip install --no-cache-dir octoprint==${OCTOPRINT_VERSION} \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Expose the port OctoPrint will run on
EXPOSE 5000

# Set the command to run OctoPrint when the container starts
CMD ["octoprint", "serve", "--host", "0.0.0.0", "--port", "5000"]
