# BBSNAPI# **Billy.Bones.Social.Network.A.P.I**

## An api framework with some working componenets.  
- BBSNAPI is the result of a first foray into working with MongoDb and Mongoose.
- Built from the ground up, BBSNAPI's function is nearly where I want it.
- MongoDb has been both challenging and rewarding.
- I will continue to improve this app as I learn more.

## Table of Contents
- [Installation](#installation)
- [Usage](#how-to-use)
- [Credits](#credits)

## Installation
Step one.
Go to the BBSNAPI Repo and copy the app.
[BBSNAPI](https://github.com/Protomancer/BBSNAPI)

Step two.
Once installed open your terminal and run npm install.

Step three.
Run NPM watch to start the server.

Step four.
Head to the [How-to-use](#how-to-use) section to learn what the app does.

## How to use
After following step three your mongoDb server should start and you will have access to the routes. As of now, August,2,2022 only Users/Thoughts/Reactions function.

Create a User.
To create a user make a post route to http://localhost:3001/api/User/, post {"email": "theslayerking@dwarfmail.com","username": "Ungrim"}.

Get all Users.
Get route - http://localhost:3001/api/User/.

Post a Thought.
Post route - http://localhost:3001/api/Thoughts
JSON - {
"thoughtTexts": "For the book of grudges!",
"username": "Ungrim",
"userId": "62e9934e2f826828aa3dd7d9"
}

Get all Thoughts.
Get route - http://localhost:3001/api/Thoughts

Post a Reaction.
To post a reaction we must first have a thought. If you followed the steps above
you may now have one from which you can grab the thoughtId Example("_id": "62e993792f826828aa3dd7dc")
We must place the Id number for the thought into our post such as this example.
Post Route - http://localhost:3001/api/Thoughts/62e993792f826828aa3dd7dc/reaction
Now the created reaction will show when we look at the attached thoughts.

[Usage Video](https://drive.google.com/file/d/1onxR3-MQ-hTwF7HswJ8PJUEIRnLWNp0I/view)

## Credits
- Scott "Billy" Pinkerton
- UofA Coding Bootcamp
## MIT License
