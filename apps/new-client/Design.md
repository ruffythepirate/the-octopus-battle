# Introduction

There's a redesign of the project happening. It's going away from the old model where I quite easily could access any code or function from anywhere. Now I want to design the project in such a way that I can both support play on one machine as well as play remotely. To do this I need to start separating logic, state and rendering from one another.

What's a bit special with this project is the rope. That's what makes the game fun to play, but it's unfortunately also something that has quite a big amount of state and that's quite compute intent to find the next state.

But let's see. I have already started my separation, now I'll take a look at the old design of the new-client. There the game design was as follows:

# Old Design

## GameRunner.ts

This was the outer most logic container of the game. It took care of setting up the Game Loop (trying to sync so that we get the right amount of renderings per second. It also took care of finding the canvas, and rendering the HUD (heads-up display) with health bars.

## player.js

This is the player. It contains the rope that has the rope logic. It also takes care of the controls of the player, applying appropriate acceleration depending on what controls the player has activated. It contains the state and the needed resources to render a player.

## rope.js

This does all of the computations of the rope. It performs necessary calculations on the rope to make it move in a desired fashion.

## crate.js

This contains the logic for the astroid. It's called `crate.js` because in the beginning they were crates that could be picked up and used.

# New design.

## GameStateDto

This should contain a complete descriptive view of the current game state. I don't expect to send this every time, but i intend to send this state with even intervals to sync up the current state.

I then want to do interpolation where the controls are known at each iteration of the game and hence the new state can be calculated locally with pretty good precision. Because we're dealing with floating point numbers here, we'd expect the states to drift apart on different machines, but because we're also syncing the state in even intervals this shouldn't cause us to much of a problem.

## Logic...

This is the hard thing. I want to prevent our state from getting unnecessary information that I don't want to send with it. That's why I'd like to separate it as much as I can from other things. Still it's natural that the logic would live close to the state, because the logic is constantly operating on the state. 

This is also an interesting property of this problem namely that in the longer run it will be preferable to keep a copy of the recent states that has been available to us. This way we'd be able to adjust the current state by retro-fitting actions that happened in the past. That's a great idea, but it means that we'll need to create new copies of the state all the time, which seems like a big waste of resources.

## Rendering

Perhaps this is really best done through interfaces when I think about it. My spontanous idea has been to render based on the state items, but when i think about it now it might make sense to have one set of "DTO" classes, and another one where you actually allow objects to know about one another and to perform logic. These logic classes you'd allow send to renderer implementations where they can be rendered.

One way is to have a Renderer implementation, another one is to have a wrapper around the logic one that also contains the render logic. Either way would work just fine since our game isn't very complex.

