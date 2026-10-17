# City Life Online — multiplayer 3D roleplay starter

An original browser-based 3D roleplay prototype inspired by open-world mobile RP games. It is **not** a copy of GRAND RP and contains no proprietary GRAND RP assets.

## Included in this starter
- Three.js 3D city prototype with roads, block buildings, window bands, trees, streetlights, and a follow camera.
- Basic character movement and jump.
- One personal car per player, enter/exit, and simple driving.
- Socket.IO multiplayer: connected clients on the same server see each other's player positions and names.
- Touch joystick and action buttons for mobile Safari; keyboard controls for desktop testing.
- Node.js/Express server.

## Run locally
You need a computer with Node.js 18 or newer.

1. Extract this ZIP.
2. Open a terminal in the extracted `grand_rp_inspired_multiplayer` folder.
3. Run:
   ```bash
   npm install
   npm start
   ```
4. Open `http://localhost:3000` on that computer.

To test with two players on one Wi-Fi network, find the computer's local IP address and open `http://YOUR-COMPUTER-IP:3000` on the second device. Your firewall may need to allow port 3000.

## Deploy online
Deploy the project to a Node.js host that supports persistent WebSocket connections (for example, a Node-capable app service). Set the start command to `npm start`. Then open the host's HTTPS URL on iPhone Safari. **A static-only host such as basic drag-and-drop static hosting will not run this multiplayer server.**

## Current limitations
This is an early prototype, not a production game:
- The city and characters are procedural placeholder art, not ultra-realistic assets.
- Multiplayer sync is basic and not authoritative; no accounts, persistence, chat moderation, anti-cheat, or database yet.
- Vehicle physics, collisions, missions, jobs, economy, apartments, and inventory are not implemented yet.
- Three.js is loaded from jsDelivr, so the game needs internet access.
- Public deployment needs server hosting; costs and setup depend on the provider.
- Test on a computer first, then deploy. iPhone Safari performance depends on device, scene complexity, and network.

## Next development milestones
1. Server-authoritative movement and collision.
2. Proper vehicle physics and enter/exit interactions.
3. Player accounts, saved characters, and database.
4. Roleplay jobs, money, property, and mission systems.
5. Optimized art, lighting, baked textures, and mobile performance profiling.
