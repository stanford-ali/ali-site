# Navigation

* [Setting Up the Database](#Setting-Up-the-Database)
  * [MongoDB Atlas](#MongoDB-Atlas)
  * [Environment Variables](#Environment-Variables)
* [Installing Node Dependencies](#Installing-Node-Dependencies)
* [Running the Front End and/or Back End](#Running-the-Front-End-and/or-Back-End)
  * [Run Both Servers Simultaneously](#Run-Both-Servers-Simultaneously)
  * [Run Front End Server Only](#Run-Front-End-Server-Only)
  * [Run Back End Server Only](#Run-Back-End-Server-Only)
* [Automatically Populating the Database](#Automatically-Populating-the-Database)
* [Setting Up Google Authorization](#Setting-Up-Google-Authorization)

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

Now, the code (specifically the <code>dotenv</code> package as used in <code>server/app.ts</code>) will read your environment variables and connect to the MongoDB Atlas cluster.

# Installing Node Dependencies

Both the front end and the back end require specific node modules that are listed in the "dependencies" attribute in <code>package.json</code>. Before running the project, you can install all of these dependencies by running the following in your CLI **from the main project directory:**

~~~ 
chmod +x ./scripts/*.sh
./scripts/install-dependencies.sh
~~~

As long as you have NPM installed, this should properly configure all of the node modules in both the front end and the back end.

# Running the Front End and/or Back End

## Run Both Servers Simultaneously

More often than not, you're going to want to run both the front end and back end servers at the same time. You can do this in one simple command by running the following command in your CLI **from the main project directory:**

~~~
./scripts/run-servers.sh
~~~

This script will open a new terminal session; this extra session is just for maintaining open connections to both servers.

## Run Front End Server Only

If for any reason you want only to run the front end (though, many of the front end elements are displayed through requests to the back end, so if the back end is not running, there may be elements that aren't present...), then you can use the following commands from the main project directory: 

~~~
cd client
npm start
~~~

This should automatically open a browser tab with the application running sans back end.

## Run Back End Server Only

If you want to run only the back end (for example, if you were making HTTP requests while adding/testing API routes), you can use the following commands from the main project directory: 

~~~
cd server
npm run prod
~~~

This will translate all of the Typescript files into Javascript files and make the connection to the database.

# Automatically Populating the Database

The controllers in the routing are configured to accept both JSON objects and JSON arrays, so you can quickly import information to the database by sending a POST request to the appropriate route with the JSON array. There are JSON arrays included in the <code>server/data</code> folder so that you can quickly populate your database with examples. You can send the post requests individually, through a program such as [Insomnia (Core)](https://insomnia.rest/download/) or [Postman](https://www.postman.com/) (which are helpful to download if you're going to continue sending requests), or you can use the following command **from the main project directory:**

~~~
./scripts/setup-db.sh
~~~

You must make sure that [your back end server is running](#Run-Back-End-Server-Only) before running the script or sending requests. This script will automatically send the post requests to the database. 

*Important to note: if you run this specific script more than once, you may run into uniqueness issues unless you clear the database beforehand.*

# Setting Up Google Authorization

The final step in ensuring that the web app works is to set up the Google sign in and authorization. You will need to use the Google Developers Console to create a project and get a client ID to use for the authorization. You can use the first few minutes of [this tutorial](https://youtu.be/KwOmVpd1DUA?t=231) to get your own client ID. 

Once you have your client ID, make sure that your front end server is whitelisted as an authorized JavaScript origin, and then replace the "client_id" field in <code>initializeGoogleSiginIn()</code> in <code>/client/src/App.js</code> to be your own client ID. And that's it!