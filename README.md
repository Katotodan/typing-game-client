# Typing Game — Client

This is the front-end client for the Typing Game project. It's a React application that connects to the `typing-game-backend` server via WebSockets (using socke.io) to run multiplayer typing races.

## Requirements

- Node.js >= 14 (recommended 16+)
- npm or yarn

## Quick start

1. Install dependencies

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn
   ```

2. Start the dev server

```bash
npm start
# or
yarn start
```

The app runs on http://localhost:3000 by default.

## Connecting to the backend

The client expects the WebSocket server to be available (see `typing-game-backend`). By default the app uses the `socket.js` helper in `src/` to connect. If your backend runs on a different host or port, update the connection URL in `src/socket.js`.

## Available scripts

- `npm start` — start the dev server (react-scripts)
- `npm test` — run tests
- `npm run build` — build production bundle
- `npm run eject` — eject from create-react-app (if present)

## Project structure (important files)

- `public/` — static assets and `index.html`
- `src/` — React source code
  - `src/Components/` — UI components (Navbar, Start, Welcomes, etc.)
  - `src/Pages/` — route pages (Start, Welcome, RequestPage)
  - `src/socket.js` — WebSocket client wrapper used across the app
  - `src/Context.jsx` — React context for app-wide state

## Environment variables

For the app to successfully run, please create an enviroment varible holding the url address of the backend.
For example
```
REACT_APP_API_URL=http://localhost:8080
```


## Troubleshooting

- If the app won't connect to the backend, verify the backend is running and `socket.js` has the correct URL.
- If ports are in use, change the port by setting `PORT` environment variable before starting:

```bash
PORT=3005 npm start
```

- If tests fail, run `npm test -- --watchAll=false` to see full output.

## Contributing

Feel free to open issues or PRs. When adding features, update this README with any new setup steps.

## License

MIT.

## Author
APIPAWE KATOTO DANIEL
