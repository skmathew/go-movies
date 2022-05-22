# Go App

# Install Go extension and Install/Update Tools(cmd + shift + R)

### go mod init backend
### go run cmd/api/main.go
### go get -u github.com/julienschmidt/httprouter
### go get -u github.com/lib/pq@v1.10.0
### psql -d go_movies -f go_movies.sql
### export POSTGRES_HOST="localhost"
### export POSTGRES_USER="user"
### export POSTGRES_PASSWORD="password"
### export POSTGRES_PORT="5432"
### export POSTGRES_DB="db"
### export POSTGRES_SSL_MODE="disable"
### export SERVER_PORT="4000"
### go run cmd/api/*.go or go run ./cmd/api/
### go build ./cmd/api/ and run ./api

### docker: 
### docker build -t go-movies .
### docker run -p 4000:4000 --env-file ../.env go-movies
