.PHONY: help build up down test lint migrate ingest-cost analyze-carbon optimize-workloads

help:
	@echo "Sustainability & Cost Integration Platform - Management Commands"
	@echo "--------------------------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Integration)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "ingest-cost        : Trigger simulated multi-cloud cost ingestion"
	@echo "analyze-carbon     : Run carbon emission estimation pipeline"
	@echo "optimize-workloads : Generate cost vs sustainability recommendations"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/unit tests/integration
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker core
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

ingest-cost:
	docker-compose exec api python scripts/ingest/run.py

analyze-carbon:
	docker-compose exec api python scripts/analyze/run.py

optimize-workloads:
	docker-compose exec api python scripts/optimize/run.py
