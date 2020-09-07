# Navigation

* [Setting Up the Database](#Setting-Up-the-Database)
  * [MongoDB Atlas](#MongoDB-Atlas)
  * [Environment Variables](#Environment-Variables)
* [Installing Node Dependencies](#Installing-Node-Dependencies)
* [Running the Application](#Running-the-Application)
  * [Run Back End Server](#Run-Back-End-Server)
  * [Run Front End](#Run-Front-End)

# Setting Up the Database

## MongoDB Atlas

The first thing you're going to want to do is set up a cluster in MongoDB. One way you can do this and easily visualize all of your databases, collections, and documents is through [MongoDB Atlas](http://cloud.mongodb.com/). It's free, doesn't require a download, and allows you to easily connect to your cluster. You can quickly follow the first 3 or so minutes of [this tutorial](https://youtu.be/7CqJlxBYj-M?t=293) if you want more specifics re creating a cluster in MongoDB Atlas. 

Once you have your cluster setup, you can go to the "CONNECT" option under your cluster. This should display three connection methods: choose the one that says "Connect your application." Here, you can whitelist your own IP address and then copy the connection string (URI).

There are other ways to set up the MongoDB database, such as through [MongoDB Compass](https://www.mongodb.com/products/compass) or other desktop applications, but **the most important thing is that you have a URI for your database to connect to.** 

## Environment Variables

Once you have the URI, the last step is to create a file called <code>server/.env</code>. (This type of file generally contains sensitive information, e.g. the username and password to the database in your URI). Place the two following lines of code in the file to create environment variable for the program to read:

~~~
PORT=5000
MONGODB_URI=<insert_your_uri_here>
~~~

Now, the code (specifically the <code>dotenv</code> package as used in <code>server/lib/App.ts</code>) will read your environment variables and connect to the MongoDB Atlas cluster.

# Installing Node Dependencies

Both the front end and the back end require specific node modules that are listed in the "dependencies" attribute in <code>package.json</code>. Before running the project, you can install all of the front end dependencies by running the following commands from the main project directory:

~~~
cd client
npm install
~~~

Similary, you can install all of the back end dependencies by running the following commands from the main project directory:

~~~
cd server
npm install
~~~

As long as you have NPM installed, this should properly configure all of the node modules in both the front end and the back end.

# Running the Application

To run the application, use the commands listed below to first run the back end server and then run the front end.

## Run Back End Server

To run the back end, you can use the following commands from the main project directory: 

~~~
cd server
npm run prod
~~~

This will translate all of the Typescript files into Javascript files and make the connection to the database.

## Run Front End

To run the front end, you can use the following commands from the main project directory: 

~~~
cd client
npm start
~~~

This should automatically open a browser tab with the application running.