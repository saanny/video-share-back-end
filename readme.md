# Video share api  

A simple video share api like youtube.


## Deploy on your Computer

### Setup

Follow these steps if you want to run this application on your computer, either
in a Docker container.

```bash
git clone https://github.com/saanny/video-share-back-end
cd video-share-back-end 
cp .env.example .env
```

Open the new `.env` file and enter values for the configuration variables.

### Run with Docker

To start:

```bash
docker-compose up -d
```

The application gateway runs on port 5000 on your Docker host. You can access the API
on the `/api/v1/doc` URL (i.e. `http://localhost:5000/api/v1/doc` if you are
running Docker locally).

To stop the application:

```bash
docker-compose down
```
