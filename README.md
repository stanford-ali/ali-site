# Contents

- [Setting Up the Database](#Setting-Up-the-Database)
  - [MongoDB Atlas](#MongoDB-Atlas)
  - [Environment Variables](#Environment-Variables)
- [Installing Dependencies](#Installing-Dependencies)
- [Running the Application](#Running-the-Application)

# Setting Up the Database

## MongoDB Atlas

The first thing you're going to want to do is set up a cluster in MongoDB. One way you can do this and easily visualize all of your databases, collections, and documents is through [MongoDB Atlas](http://cloud.mongodb.com/). It's free, doesn't require a download, and allows you to easily connect to your cluster. You can quickly follow the first 3 or so minutes of [this tutorial](https://youtu.be/7CqJlxBYj-M?t=293) if you want more specifics re creating a cluster in MongoDB Atlas.

Once you have your cluster setup, you can go to the "CONNECT" option under your cluster. This should display three connection methods: choose the one that says "Connect your application." Here, you can whitelist your own IP address and then copy the connection string (URI).

There are other ways to set up the MongoDB database, such as through [MongoDB Compass](https://www.mongodb.com/products/compass) or other desktop applications, but **the most important thing is that you have a URI for your database to connect to.**

## Environment Variables

To set environment variables, create a copy of <code>client/sample.env</code> and <code>server/sample.env</code>. You can paste your MongoDB URI from above into <code>server/sample.env</code>, and the remainder of the variables come from Firebase.

# Installing Dependencies

Install all dependencies with the following:

```
npm install
```

This will install packages for both the front end and back end.

# Running the Application

To run the entire application, use the following command:

```
npm start
```

from the root directory.