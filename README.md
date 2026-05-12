# Development mode

docker-compose up

# Production build

docker build -t teacher-dashboard .
docker run -p 3000:3000 teacher-dashboard
