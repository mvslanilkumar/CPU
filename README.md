# CPU Compatibility Database

A simple, efficient website to search and filter CPUs by their specifications.

## Features

- Search CPUs by name, brand, or socket.
- Filter by brand (Intel/AMD) and socket type.
- Displays detailed specs: cores, threads, clocks, TDP, integrated graphics, release year.
- Responsive design for mobile and desktop.

## How to Update the Database

1. Edit `cpus.json` to add, remove, or modify CPU entries.
2. Each CPU entry should follow this structure:
   ```json
   {
       "name": "CPU Name",
       "brand": "Intel" or "AMD",
       "socket": "Socket Type",
       "cores": number,
       "threads": number,
       "baseClock": "X.X GHz",
       "boostClock": "Y.Y GHz",
       "tdp": number,
       "integratedGraphics": true/false,
       "releaseYear": number
   }
   ```
3. Update the `lastUpdated` field in `cpus.json` to the current date (YYYY-MM-DD).
4. The site will automatically reflect changes when reloaded.

## Running the Site

1. Ensure all files are in the same directory: `index.html`, `styles.css`, `script.js`, `cpus.json`.
2. Serve the files via HTTP (to avoid CORS issues):
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000/index.html` in your browser.

## Project Structure

- `index.html`: Main HTML structure.
- `styles.css`: Styling for the site.
- `script.js`: JavaScript for search, filtering, and displaying data.
- `cpus.json`: Database of CPU specifications.
- `README.md`: This file.

## Notes

- The site is static and loads data from `cpus.json`.
- For production, consider hosting on a web server.
- Add more CPUs by expanding `cpus.json`.
