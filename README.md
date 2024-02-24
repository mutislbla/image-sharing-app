
# Image Sharing App

website to share image

## Backend

To deploy this project run

```bash
  cd backend
```
```bash
  npm install
```
```bash
  docker build -t backend .
```
```bash
  docker compose up
```
then deploy this in docker

```bash
  npx prisma generate
```
```bash
  npx prisma db push
```
```bash
  npx prisma db seed
```

## Frontend

To deploy this project run

```bash
  cd frontend
```
```bash
  npm install
```
```bash
  npm run dev
```

