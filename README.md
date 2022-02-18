# Large Social Media App

_Large_ is an open platform where readers and writers can find engaging thoughts and articles on the most important topics of our world today.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [Setup](#setup)
- [How to use](#how-to-use)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- users should be able to register for an account
- users can log into account
- users can open and read articles
- users can like articles
- users can leave comments or replies to an article
- users can link images to comments or replies
- users can save articles to a reading list
- users can create an article
- users can link an image to an article they authored
- users can follow/unfollow to an author they like
- users can see the latest articles when they successfully log in
- each article is tagged with one of the following topics: (a) technology, (b) money, (c) business, (d) productivity, (e) psychology, (f) mindfulness, (g) art
- users can see a filtered list of articles by topic
- user should not be able to favorite their own articles

### Screenshot

![screenshot1](https://res.cloudinary.com/do6crtyly/image/upload/v1645094530/large/demo1_wf9c2v.png)

### Links

- [Live Site URL](https://large-social-media.netlify.app/)

## Setup

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone the following repositories
$ git clone https://github.com/vlsalina/large-social-media-app-client.git
$ git clone https://github.com/vlsalina/large-social-media-app-server.git

# Go into the repository for the backend
$ cd large-social-media-app-server

# Install dependencies
$ npm install

# Run the server
$ node app.js

# Now, go into the repository for the frontend
$ cd large-social-media-app-client

# Install dependencies
$ npm install

# Run the app
$ npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## How To Use

Register a new account
![register](https://res.cloudinary.com/do6crtyly/image/upload/v1645146049/large/register_kq3abb.png)

Sign In
![signin](https://res.cloudinary.com/do6crtyly/image/upload/v1645146050/large/signin_hktb2d.png)

Main Feed
![mainfeed](https://res.cloudinary.com/do6crtyly/image/upload/v1645094530/large/demo1_wf9c2v.png)

Create an article
![create](https://res.cloudinary.com/do6crtyly/image/upload/v1645094530/large/demo2_eafgc9.png)

Read, Reply, and Favorite
![readAndReply](https://res.cloudinary.com/do6crtyly/image/upload/v1645146414/large/reply_vkaykz.png)

Follow
![follow](https://res.cloudinary.com/do6crtyly/image/upload/v1645146583/large/follow_hgpncj.png)

Like
![like](https://res.cloudinary.com/do6crtyly/image/upload/v1645146049/large/like_huswat.png)

Filter by topic
![topic](https://res.cloudinary.com/do6crtyly/image/upload/v1645146050/large/category_nvceqf.png)

See your own articles, favorites, replies, and follows
![profile](https://res.cloudinary.com/do6crtyly/image/upload/v1645146049/large/favorite_evvq8o.png)

## My process

### Built with

Frontend:

- [React](https://reactjs.org/) - JS library
- [Redux](https://redux.js.org/) - Predictable state container for JS apps
- [React Draft WYSIWYG](https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp) - text editor
- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow

Backend

- [MongoDB](https://docs.atlas.mongodb.com/?_ga=2.232882589.280966400.1645011051-1449492850.1643781029&_gac=1.85307883.1645011051.Cj0KCQiA3rKQBhCNARIsACUEW_aKKbGxWOFIwI7gHR4p4H_IpqU8Grinl0oF42j731_qkWfAU5s4BE8aAhneEALw_wcB) - cloud database
- [ExpressJS](https://expressjs.com/) - Node.js framework
- [Mongoose](https://mongoosejs.com/docs/guide.html) - MongoDB object modeling library
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - a library to help you hash passwords
- [JSON web token](https://www.npmjs.com/package/jsonwebtoken) - session authenticator

### What I learned

#### Cross-Origin Resource Sharing (CORS)

Like most junior developers who first encounter the infamous "No Access-Control-Allow-Origin-Header is present on the requesting resource", I was completely lost as to what might have gone wrong. But after reading an incredibly insightful [article](https://medium.com/bigcommerce-developer-blog/lets-talk-about-cors-84800c726919) written by Karen White, it finally started to make sense.

Essentially, a CORS policy error is thrown any time the requesting domain, or "origin", is not listed on the responding domain's "whitelist". This is done to prevent any malicious scripts being run on the server. Succinctly put, if domain "A" makes a request to domain "B" for a designated resource, but A is not authorized to do so, then the request is blocked.

How to actually whitelist a domain on the server though depends on the platform. For a Node app running ExpressJS, this can be done using [CORS middleware package](https://www.npmjs.com/package/cors).

For this project, I opted not to use the CORS middleware and instead, simply added the correct options in the response header like so:

```javascript
var express = require("express");
var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  next();
});
```

Notice here that "_" was used under the "Access-Control-Allow-Origin header. The _ acts as a wildcard, so that any requesting origin is allowed to make a request to the server. Although for this project, it probably would have been a better idea to restrict access to certain domains.

#### API chaining

One important thing I learned about making HTTP requests is that it depends highly on the way models are designed for MongoDB. For requests where the desired resource (key) is readily available on the document, a simple request can be done like so using Mongoose:

```javascript
await Employee.find({ firstname: 'jane', lastname: 'doe' },
	// callback);
```

A more complex request where the resource is not readily available on the document requires a bit more work. For this project, a requirement I listed was that users could re-open an article they previously "favorited" from their favorites list. A key in the user model called "favorites" stored all the article ids that a user favorited, but ONLY the id and not the article's details. This meant I needed a more intricate query to get the desired resource.

Through the power of "api chaining" I was able to acheive this effect. Simply put, api chaining is a technique where using the results returned from a previous api call are used in subsequent api calls. The query to return an article's details in a users "favorites" could now be obtained like so:

```javascript
const User = require("../models/userModel");
const Article = require("../models/articleModel");

usersRouter.get('/getFavorite', authenticateToken, function (req, res) {
	Users.findById(req.user._id, function(error, user) {
		if (error) {
			res.sendStatus(404);
		}

		let result = user.favorites.find(x => x.articleId === req.query.articleId);

		if (result) {
			Article.findById(result, // callback);
		} else {
			res.sendStatus(404);
		}

	});
});
```

#### Multiple Asynchronous Requests using Promise.all

Depending on the size, quality, and number of images to be displayed on the page, it can take quite awhile to load them all. I needed multiple promises in this case, but resolving multiple promises one by one was too cumbersome. Using Promise.all was a more efficient way of handling multiple async operations by aggregating a group of promises.

Promise.all is actually a function that takes an array of promises as an input (an iterable) and returns a Promise. Then it gets resolved when all the promises get resolved or any one of them gets rejected.

Assuming Promise1, Promise2, and Promise3 are all async operations, the following exemplifies how to use the .all method:

```javascript
Promise.all([Promise1, Promise2, Promise3])
.then(result) => {
console.log(result)
})
.catch(error => console.log(`Error in promises ${error}`))
```

### Continued development

- Create unit and integration tests with Jest/React-Testing-Library.
- Implement "search" functionality that allows users to find particular articles

## Author

- Frontend Mentor - [@vlsalina](https://www.frontendmentor.io/profile/vlsalina)
