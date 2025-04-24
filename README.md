# Work Solutions CRM
## Описание
Система управления ресурсами для ООО "Рабочие решения" (Work Solutions) с функциональностью управления клиентскими проектами и ведением документооборота компании.

## Развертывание проекта
Для развертывания необходимо установить `Docker`, склонировать репозиторий и перейти в корневую папку проекта.

### 1. Конфигурация
#### 1.1 Backend (packages/backend/config.yaml):
```sh
cp packages/backend/config.example.yaml packages/backend/config.example.yaml packages/backend/config.example.yaml packages/backend/config.yaml
```
##### Файл `config.yaml` после копирования:
```yaml
database:
  host: database
  port: 5432 # Optional
  username: postgres
  password: postgres

corsEnabled: true # Optional, default: false

authentication:
  secret: secret # Optional, default: secret
  algorithm: HS256 # Optional, default: HS256

uploadsDir: uploads # Optional, default: ./uploads
```

#### 1.2 `.env`:
```sh
cp .env.example .env
```
##### Файл `.env` после копирования:
```
# Порт хоста, на котором будет доступен сервер разработки frontend (по умолчанию 4000)
FE_PORT=4002

# Порт хоста, на котором будет доступен сервер разработки backend (по умолчанию 3000)
BE_PORT=3001

# Хост бэкенда (по умолчанию http://localhost:3000)
VITE_APP_BACKEND=https://crm.worksolutions.ru/api

# Данные для первой авторизации администратора (значения по умолчанию представлены ниже)
ADMIN_EMAIL=admin@worksolutions.ru
ADMIN_PASSWORD=worksolutions
```

### 2. Сборка
#### 2.1 Разработка:
```sh
docker compose up -d
```
#### 2.2 Продакшен:
```sh
docker compose -f docker-compose.prod.yaml up --build -d
```
