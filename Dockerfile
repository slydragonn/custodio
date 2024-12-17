FROM golang:1.23-alpine AS server

WORKDIR /server
COPY go.mod go.sum ./
RUN go mod download
COPY server .
RUN go build -o custodio-app .


FROM alpine:latest AS monolithic

WORKDIR /app
COPY --from=server /server/custodio-app .
CMD ["./custodio-app"]
