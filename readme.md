# Introduction

This is what happens when octopuses are left by themselves alone in space - they start throwing astroid at each other!!

# Building

The project is built using webpack and npm. Make sure that you have npm installed. Navigate into the `client` folder. Then run `npm install` in the root folder. After this run `npm run compile`

# Starting

First `build` the project (see the Building section).

To run the project you simply open `client/drone.html` in a browser. There are images and a background image that tries to be loaded. For copyright reasons these images are not part of the repository, but they could be added to a `resources` folder.

# Future plans

The next step is to combine the game with a node back-end server, which enables people to play online across multiple browsers.

1. Divide the logic into server, common, client folders.
2. Make the client log on to a game on the server, have the server render positions etc. Sync over web browser.
3. Make it possible for multiple users to join the same game.
