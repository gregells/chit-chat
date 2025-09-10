# Chit-Chat
This project is a Twitter-like app where users can make posts, comment on posts, and thumbs-up/thumbs-down posts and comments.

Visitors to the site may browse posts and comments without signing in.

To create, edit, delete, or vote on posts and comments, users must sign-in using a Google account.

## Screenshots:
| ![Home Page](screenshots/1_home.png) | ![Navbar - Visitors](screenshots/2_nav_visitor.png) | ![Navbar - Users](screenshots/2_nav_user.png) |
|:---:|:---:|:---:|
| Home Page&nbsp;&nbsp;&nbsp;&nbsp; | Navbar - Visitors | Navbar - Users&nbsp;&nbsp;&nbsp; |

| ![Post - Visitors](screenshots/3_post_visitor.png) | ![Post - Users](screenshots/3_post_user.png) | ![New Post](screenshots/4_new_post.png) |
|:---:|:---:|:---:|
| Post - Visitors | Post - Users&nbsp;&nbsp;&nbsp; | New Post&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |

| ![My Posts](screenshots/5_my_posts.png) | ![All Users](screenshots/6_all_users.png) | ![Search](screenshots/7_search.png) |
|:---:|:---:|:---:|
| My Posts&nbsp;&nbsp; | All Users&nbsp;&nbsp; | Search |

## Technologies Used:
* __Node.js__: the app is built using a Node.js server.
* __Express__: the server uses the Express framework.
* __MongoDB__: data is persisted to a MongoDB database.
* __Mongoose__: the database is interacted with using the Mongoose library.
* __OAuth__: authentication is provided by Google's OAuth API via the Passport library.
* __CSS__: the styling is achieved using the Bootstrap CSS framework.
* __Heroku__: the live website is hosted on Heroku.
* __Atlas__: the database is hosted on MongoDB's Atlas service.

## Getting Started:
[Try the live website here.](https://chit-chat-5142bec3ce1d.herokuapp.com/)

The project was planned out in a Trello board, view it on Trello [here.](https://trello.com/b/4HMmkMu4/chit-chat-project-planning)

The Entity Relationship Diagram (ERD) was made using Lucid Chart and can be seen in the Trello board.

Wireframes of the different pages were made using [wireframe|cc](https://wireframe.cc/) and can be seen in the Trello board.

## Future Development Plans:
* Expand search functionality to include comments and user names.
* Add ability to sort posts by thumbs-up, thumbs-down, newest, oldest.
* Add ability to see edit history of posts & comments.

## Known Bugs:
No known bugs at this time.