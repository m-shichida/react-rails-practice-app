# SET UP

```
$ docker-compose build
$ docker-compose up
$ docker-compose run --rm api rails webpacker:install
$ docker-compose run --rm api rails db:create
$ docker-compose run --rm front yarn
$ docker-compose up -d
$ open http://localhost:3000
$ open http://localhost:8000
```
