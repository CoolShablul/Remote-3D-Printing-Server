# Remote 3D Printing Server

![GitHub last commit](https://img.shields.io/github/last-commit/CoolShablul/Remote-3D-Printing-Server)  
![Docker](https://img.shields.io/badge/Docker-Supported-blue)  
![Node.js](https://img.shields.io/badge/Node.js-TypeScript-green)  

A **Node.js & TypeScript-based 3D printing server** that enables remote management of basic 3D printers lacking built-in network connectivity. This server provides a **REST API** for file uploads, slicing, and job monitoring, facilitating **containerized deployment with Docker**.

## Features

✅ Remote file upload & storage  
✅ STL file slicing using external slicing tools  
✅ Job management & monitoring  
✅ REST API for easy integration  
✅ Docker support for seamless deployment  

## Table of Contents

- [Installation](#installation)
- [Docker Deployment](#docker-deployment)
- [Configuration](#configuration)

---

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 16.x recommended)  
- [Docker](https://www.docker.com/) (for containerized deployment)  
- A supported **3D printer** (via USB or serial interface)  
- A slicing tool such as **PrusaSlicer** or **Cura** (if slicing is needed)

### Clone the Repository

```sh
git clone https://github.com/CoolShablul/Remote-3D-Printing-Server.git
cd Remote-3D-Printing-Server
```

### Install Dependencies

```sh
npm install
```

### Run the Server

```sh
npm start
```

By default, the server runs on **http://localhost:4000**.

---


---

## Docker Deployment

To run the server in a Docker container:

1. **Build the image:**
   ```sh
   docker build -t remote-3d-printing-server .
   ```

2. **Run the container:**
   ```sh
   docker run -d -p 4000:4000 --name printer-server remote-3d-printing-server
   ```

The server will now be accessible at `http://localhost:4000`.

---

## Configuration

| Environment Variable | Default | Description                        |
| -------------------- | ------- | ---------------------------------- |
| `PORT`              |  4000    | Server listening port             |
| `PRINTER_PORT`      | `/dev/ttyUSB0` | Serial port for 3D printer |
| `SLICER`            | `cura`  | Default slicing tool              |

You can customize these values in a `.env` file.


