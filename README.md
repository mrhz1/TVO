
# Sample App

This is a sample JavaScript application demonstrating the use of the `This` and `That`.

## Prerequisites

- Node.js `v23.6.0` or higher installed on your machine.

## Setup

1. Add a `.env` file to the server folder.

```bash
touch .env
```

2. Open the `.env` file and add the following environment variables:

```
PORT=7000
API_KEY={Add Your API Key Here}
```

4. Install the dependencies
```bash
yarn
```

5. Run the following command to start the server.
```bash
yarn serve
```

6. Oen the browser and navigate to:
```
http://localhost:7000/
```


## Code Structure

- **Root/**
    - *client/*
        - public/
            - favicon.ico
        - src/
            - other files                
        - main.tsx (Entry file)
        - The rest of necessary files
    - server/
        - .env (Environment variables)        
        - index.ts (Main script)
        - server.ts (Server class)
        - The rest of necessary files
    - README.md (this file)

## Test the docker image locally

### Build image


```bash
docker build -t weather-app .
```

### Run image

First, run the following command:

```bash
docker run --env-file .env -p 7000:7000 -d weather-app
```

Then, open the browser at `http://localhost:7000/`

### View logs

```bash
# Get container ID
docker ps

# Print logs
docker logs <container id>
```

### Stop image

Once you are done with testing, you need to stop the container

```bash
# Get container ID
docker ps

# Stop containter
docker stop <container id>
```