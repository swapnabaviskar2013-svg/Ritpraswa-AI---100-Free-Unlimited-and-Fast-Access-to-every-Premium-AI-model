# Ritpraswa AI Express server

Ritpraswa AI 1.0 is a free unlimited fast and legal platform where you can access all AI models in Text, Vision, Image, Video, Song Gen and more. It also features a y p o agent with over 220 + tools. This platform gives access to over 600 + models. It is a BYOK Platform. The link for the platform is:

https://019e6cbb-b017-73a4-be0d-d68c9da3808f.arena.site/

## Run the server

Requires Node.js 18 or newer.

```bash
npm install
npm start
```

The server listens on `http://localhost:3000` by default. Configure the port and bind address with environment variables:

```bash
PORT=8080 HOST=0.0.0.0 npm start
```

For development, use Node's watch mode:

```bash
npm run dev
```

## Routes

- `GET /` — returns a basic server status message
- `GET /health` — returns a JSON health check
- Unknown routes return a JSON `404` response

Run the test suite with:

```bash
npm test
```
