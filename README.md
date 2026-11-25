# Flicksy — React + Vite

## Run the project

1. Install Node.js (LTS recommended).
2. Open this folder in VS Code.
3. Open the terminal in this folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the localhost URL printed by Vite.

## Redux Toolkit implementation (Front End Engineering-II viva)

The watchlist is managed by Redux Toolkit. The user profile and toast messages remain in React Context API so the project demonstrates both state-management approaches without maintaining duplicate watchlists.

- `src/store/store.js` — configures the Redux store and loads/saves watchlist data to localStorage.
- `src/store/watchlistSlice.js` — defines the watchlist state and reducers (`addMovie`, `removeMovie`, `toggleMovie`, `clearWatchlist`).
- `src/hooks/useWatchlist.js` — custom hook using `useSelector` to read state and `useDispatch` to update it.
- `src/main.jsx` — wraps the app with React Redux's `<Provider store={store}>`.
- `src/components/MovieCard.jsx`, `src/components/Navbar.jsx`, `src/pages/Watchlist.jsx`, `src/pages/MovieDetails.jsx`, and `src/components/Chatbot.jsx` — read/update the Redux watchlist through `useWatchlist`.
- `src/context/AppContext.jsx` — still manages user profile and toast notification state using Context API.

## Viva explanation

“When a user clicks the heart button, the component calls `toggleWatchlist`. That function dispatches the `toggleMovie` Redux action. The reducer updates the watchlist in the Redux store, and components subscribed with `useSelector` re-render with the new state. The store subscription saves the updated list to localStorage, so it persists after a refresh. We use Context API for the demo user profile and toast notifications, while Redux Toolkit owns the watchlist to avoid duplicate sources of truth.”

Note: Login is a frontend demo and is not real server-side authentication. The project discovers movies; it does not stream films.
