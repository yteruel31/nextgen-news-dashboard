# Nextgen News Dashboard

<div align="center"><img src="./public/overview.png" width=300 alt="image of desktop preview of coffee list"></div>

## Stack used

- Authentication (Lucia)
- Tailwind CSS
- Next.js
- TypeScript
- Playwright
- Prisma

## How to Get Started

### Prerequisites

This app does uses Docker and Docker Compose to run a postgres database, so you will need to either have those installed, or modify the project to point to a hosted database solution.

## How to Run

1. `cp .env.sample .env`
2. `yarn install`
3. `docker compose up`
4. `prisma migrate dev`
5. `yarn run dev`

## Env Setup

You'll need to following the steps below and make sure everything is setup and copy the necesssary values into your .env file:

### Database

This app uses postgres. Setup a database by running `docker compose up` and get your **DATABASE_URL**.
