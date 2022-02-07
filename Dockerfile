FROM golang

WORKDIR /app

ENV GOPATH=

COPY . .

EXPOSE 80

CMD [ "go", "run", "/app/server.go" ]
