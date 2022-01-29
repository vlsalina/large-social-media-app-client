Project name: Large
description: Large is an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic.
author: vincent salinas

**\*\*** Requirements **\*\***
User requirements:
(1) users should be able to register for an account
(2) users can log into account
(3) users can open and read articles
(4) users can like articles
(5) users can leave comments or replies to an article
(6) users can save articles to a reading list
(7) users can change their username
(8) users can change their password
(9) users can change their email
(10) users can create an article
(11) users can upload and attach an image to an article they authored
(12) users can subscribe to an author they like
(13) when subscribed to an author(s), user should be able to see the latest 10 articles by an author(s) in their main feed
(14) users can see the 10 latest articles written to Large
(15) each article is tagged with ONE of the following topics: (a) technology, (b) money, (c) business, (d) productivity, (e) psychology, (f) mindfulness, (g) art
(16) users can see a filtered list of articles by topic
(17) users can direct message an author
(18) user should not be able to favorite their own articles

Conventional requirements:
(1) users should be able to view the most optimized layout on any device
(2) buttons should be interactive, having a static and a hover state

**\*\*** Implementation **\*\***
(1) There should be a user collection
(2) there should be an articles collection
(3) there should be a replies collection

**\*\*** Screens **\*\***
done (1) login screen
done (2) register screen
95% (3) main feed screen
95% (4) article screen
done (5) profile screen
cncl (6) account screen
cncl (7) author screen
done (8) topic screen
done (9) reading list
done (10) create new article screen

**\*\*** Features **\*\***
(1) Action Menu
(2) Direct Messanger

**\*\*** Models **\*\***
(1) User
(2) Article
(3) Replies

**\*\*** Model Contents **\*\***
(1.1) User:
(1.1.0) id
(1.1.1) first name
(1.1.2) last name
(1.1.3) email
(1.1.4) password
(1.1.5) profile picture
(1.1.6) favorited articles

(2.1) Article:
(2.1.0) id
(2.1.1) title
(2.1.2) author
(2.1.3) author avatar
(2.1.4) date created
(2.1.5) description
(2.1.6) content
(2.1.7) likes
(2.1.8) replies
(2.1.9) snippet

(3.1) Replies:
(3.1.0) id
(3.1.1) author
(3.1.2) author avatar
(3.1.3) content
(3.1.4) likes

**\*\*** routes **\*\***
(1.2) Users:
done - (1.2.0) get a single user's data
done - (1.2.1) get all users data
done - (1.2.2) add a new user
done - (1.2.3) edit a user's data
done - (1.2.4) delete a user **\*\*** DISABLED **\*\***
done - (1.2.5) follow another user
done - (1.2.6) add an article to users favorites
done - (1.2.7) unfollow another user
done - (1.2.8) remove an article from user's favorites

(2.2) Articles:
done - (2.2.0) get a single article
done - (2.2.1) get all articles
done - (2.2.2) add an article
done - (2.2.3) get articles by category
moved - (2.2.4) add reply to an article
done - (2.2.5) like an article
done - (2.2.6) unlike an article

(3.2) Replies:
done - (3.2.0) get all replies
done - (3.2.1) get a reply
done - (3.2.2) add reply to an article
done - (3.2.3) like a reply
done - (3.2.4) unlike a reply

(4.2) Auth:
(4.2.0) login

**\*\*** client side todos **\*\***
done (1) set up React Redux store
done (2) add likes and replies indicator for main feed articles
(3) main feed should be sectioned into Latest articles and subscribed articles
done (4) personal avatars
done (5) add hero section for Main Feed screen
done (6) bottom replies indicator should open Replies side bar
done (7) Reading List should only show 3 articles. If user has favorited more than 3, provide link to Bookmarks screen.
(8) Optimization - Remember to DRY. All reusable functions should be stored in a seperate js file to be exported when needed.
done (9) Fix Article image on Main Feed screen.
done (10) Added new properties to user Model in backend: (a) user story, (b) user followers list
done (11) Update the /api/users/follow api to also added user's own \_id to author's "followers" list
(12) Too much sphagetti code in Profile screen. Need to do optimization.
(13) drop down menu (for mobile devices) to allow users to pick a topic or go to favorites
(14) fix cancel button in reply's editor

**\*\*** components **\*\***
(1) Replies modal

**\*\*** redux states **\*\***
(1) user
(2) articles

**\*\*** fixes **\*\***
(1) must fix addReply api to: - create a new Reply - add new reply to designated article

**\*\*** technologies **\*\***
(1) Reactjs
(2) Nodejs

**\*\*** Problems **\*\***
(1) Must remember NOT to "close" connection to MongoDB when running app.
(2) Error: Can't set headers after they are sent to the client.
(3) Dependency errors when trying to use same code for Topic screen from Main Feed screen. Simple fix by adding some logic depending on which screen user is currently in. A 'type' paramter was added to MainFeedArticleCard to help determine which: type={true} --> Main Feed, type={false} --> Topic

**\*\*** Learned **\*\***
(1) use "req.query" to get values stored in url for backend
(2) how to set CORS headers to allow access from designated sites
(3) how to return promise after using dispatch (useDispatch) hook
(4) how to leverage api chaining
(5) how to use Promise.all() to make several api calls
(6) to have page reflect changes (like number of likes after liking an article) WITHOUT refreshing page, fetch and store data into useState var, then when change occurs with function api call, simply update the state.
(7) how to maintain aspect ratio
(8) implementing fade-in and fade-out functionality using IntersectionObserver

**\*\*** Resources **\*\***
(3) https://stackoverflow.com/questions/56694102/how-to-return-a-promise-from-an-action-using-thunk-and-usedispatch-react-redux
(5) https://gomakethings.com/waiting-for-multiple-all-api-responses-to-complete-with-the-vanilla-js-promise.all-method/
(7) https://www.w3schools.com/howto/howto_css_aspect_ratio.asp
(8) https://dev.to/selbekk/how-to-fade-in-content-as-it-scrolls-into-view-10j4
