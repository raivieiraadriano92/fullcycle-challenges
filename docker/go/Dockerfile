FROM golang:alpine

WORKDIR /usr/src/app

COPY ./main.go ./

RUN go build ./main.go

FROM scratch

WORKDIR /usr/src/app

COPY --from=0 /usr/src/app/main ./

CMD [ "./main" ]