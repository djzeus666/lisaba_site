# ЛИСАБА — Premium Website

Сайт центра когнитивного и сенсорно-поведенческого развития «ЛИСАБА».

## Stack

- **Next.js 15** (App Router) + **Payload CMS 3**
- **React 19** + TypeScript
- **SQLite** + загрузка медиа
- **Tailwind CSS 4**, Framer Motion, Montserrat

## Getting Started

```bash
cp .env.example .env
npm install
npm run seed
npm run dev
```

- Сайт: http://localhost:3000
- Админка: http://localhost:3000/admin  
  Логин из `.env`: `ADMIN_EMAIL` / `ADMIN_PASSWORD` (создаётся при `npm run seed`)

## Админка

В `/admin` можно править:

- настройки сайта, организацию, навигацию;
- блоки главной страницы (порядок секций, галерея, CTA);
- услуги, специалистов, цены, оборудование, маткапитал;
- отзывы (модерация: черновик → опубликован);
- сведения `/svedeniya` и документы;
- страницы `/specialistam`, `/blagotvoritelyam` и новые `/p/[slug]`;
- медиатеку (фото, PDF).

## Docker

```bash
cp .env.docker.example .env
docker compose up -d --build
```

Volumes: `lisaba-data` (БД), `lisaba-media` (файлы).

## Build

```bash
npm run build
npm start
```
