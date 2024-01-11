## Getting Started

This project could run without docker-compose, but it's recommended to use it.

### Pre-requisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Create the `.env` files

```sh
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

2. Update the `.env` files

```sh
# backend/.env
...

# frontend/.env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

3. Build the images

At the root of the project:
```sh
docker compose build
```

4. Run the containers

```sh
docker compose up
```

### Usage

Once the server started, you can access to the API server at `http://localhost:8080` and the web client at `http://localhost:3000`.