This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Running movie-platform locally: 

You have to make sure that you have Node.js version larger than v18.17.0 since Node.js version >= v18.17.0 is required to run the Next.js 14.

```bash
git clone https://github.com/Leonardo-Videc/movie-platform.git
# clone the repository
cd movie-platform
# go into a directory where the project is located
npm install
# install all the neccessary dependencies
```

Now create a .env file in the movie-platform directory containing:

```js
TMDB_API_KEY="your-the-movie-database-api-key"
TMDB_BEARER="your-bearer-token"
```

Both of them can be found in the [https://www.themoviedb.org/](https://www.themoviedb.org/) where you first have to login.

```bash
npm run build
# build the project
npm run start
# run it on port 3001
```

Now you can successfully navigate to the address: [http://localhost:3001](http://localhost:3001)

### Build with docker-compose:

Install [Docker](https://docs.docker.com/engine/install/) if you don't have it already, and run it

Open terminal

Go to the directory where you have movie-platform project saved

Run command:
```bash
docker-compose build

docker-compose up
```

Now you can successfully navigate to the address we have a running container on: [http://localhost:3001](http://localhost:3001)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
