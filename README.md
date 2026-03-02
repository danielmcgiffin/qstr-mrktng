# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv create --template minimal --types ts --add prettier eslint tailwindcss="plugins:typography,forms" --install npm qstr-mrktng
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

## Deploying to Cloudflare Pages

This project builds as a static site (`build/`) and is ready for Cloudflare Pages.

```sh
# 1) authenticate once
npm run cf:whoami
# if unauthenticated:
npx wrangler login

# 2) deploy preview
npm run cf:pages:deploy

# 3) deploy production (main branch)
npm run cf:pages:deploy:prod
```

`wrangler.toml` is configured with:
- project name: `qstr-mrktng`
- output dir: `build`

## GitHub Actions auto-deploy (recommended)

Workflow file:
- `/srv/dev/qstr/.github/workflows/cloudflare-pages-qstr-mrktng.yml`

Set these GitHub repository secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID` (`038f386f26a1a9bef9eb2d50e7f8c218`)

Behavior:
- push to `master`/`main` with changes under `qstr-mrktng/**` → deploys production to `qstr-mrktng.pages.dev`
- pull request touching `qstr-mrktng/**` → deploys preview and comments URL on the PR

## Fastest temporary share link (no Pages setup)

For quick teammate demos, you can expose local dev with a temporary Cloudflare tunnel:

```sh
npm run dev
cloudflared tunnel --url http://127.0.0.1:5173
```

This gives a temporary `trycloudflare.com` URL.
