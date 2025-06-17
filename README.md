# AI-Vitamin-expert

Simple Next.js application that recommends vitamin products using OpenAI.

## Setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Set the `OPENAI_API_KEY` environment variable.
3. Run the development server with `npm run dev`.

## Parsing product feed

The script `scripts/parseFeed.ts` downloads the GymBeam product feed, filters vitamin related items and stores them into `public/vitamins.json`.
Run it with:
```bash
npm run parseFeed
```

## Deployment on Vercel

1. Create a new project on [Vercel](https://vercel.com/) and import this repository.
2. In the project settings, add an environment variable named `OPENAI_API_KEY` with your OpenAI key.
3. Trigger a new deployment. Vercel will automatically install dependencies and run `npm run build`.

After deployment finishes you can access the app using the provided Vercel URL.
