# Snake

A small browser game with no dependencies.

Open `index.html` in a browser. Use the arrow keys or the on-screen direction
buttons to start and steer. Eat orange dots to grow and score; hitting a wall
or yourself ends the game. Click **Restart** to play again.

For a local web server, run `python3 -m http.server 8000` from this directory
and open <http://localhost:8000>. This is optional; opening the HTML file works.

Checks: `node --check game.js` and `node scripts/check-lines.mjs`.
