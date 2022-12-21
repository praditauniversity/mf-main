build:
	docker compose up --build -d
logs:
	docker compose logs
term:
	docker compose exec frontend_main /bin/sh
down:
	docker compose down
up:
	docker compose up -d
stop:
	docker compose stop