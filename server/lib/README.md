*Note: all of the files in* <code>lib/</code> *are written in Typescript for better type-checking and to avoid simple bugs. Once you run the back end server, TSC will convert each of these files to Javascript (ES6 by default, but you can configure it to ES3/ES4/ES5 to support more browsers if you want by changing the "target" property in* <code>../tsconfig.json</code>).

# Model-Controller-Router Back End

The back end currently uses [Mongoose](https://mongoosejs.com/) to simplify configuring the database, and Mongoose lends itself towards a model-controller-router framework. This should hopefully make it easy to interpret and edit the database schema and the API routing.

## Models

Models are the basic setup of each collection in the database. Each model contains different features (you can think of them as corresponding to "columns" in the database) that are included in each document. You can use these models to structure exactly how you want the database to look, as well as how you want each document in each collection to look.

## Controllers

Controllers exist between the routers and the models, and they are meant to be classes that use their corresponding model to handle specific requests. For example, a controller would use the structure of the model to implement tasks such as inserting new documents into a collection, finding documents of a collection that match a specific feature, and so on. Each controller correlates with a specific model.

## Routers

Routers direct HTTP requests to specific controllers, and suggest which method the controller should use to handle the request. The routers are useful to help structure what kidns of requests you want each controller to be able to handle, such as making sure the API is a RESTful API. Each router correlates with a specific controller/model.

# Editing the Database Schema

The model-controller-router framework makes it fairly simple to make changes to the database schema. Here are just some of the procedural steps you can take to safely make changes.

## Adding/Removing a Model

If you want to add a model from the database schema, you can simply create a new model similar to the other models in the <code>models</code> directory. Once you have added a model, just make sure that you also add a controller class and a router as appropriate. From there, the final step to adding a model would be to include its router in the constructor of the App class in <code>./app.ts</code>.

If you remove a model from the database schema, you would follow a similar procedure as when adding a model, but deleting the controllers and routers, and removing the router from the App class constructor. If you don't want to delete the files, but just don't want to include them, removing the routes from the App constructor should be sufficient to do so.

## Editing a Model

If, instead of adding or removing a model in its entirety, you just want to add or remove specific features from a model, you can do so in the model file without making changes to either its corresponding controller or router. 

An important thing to note would be that, if you had run your back end server beforehand with the old model setup, you may need to clear your database in order for it to avoid issues before running the back end server with the new model. **This may also influence the JSON arrays in one or more of the files in** <code>ali-site/server/data</code>, **especially if you are *removing* a feature of a model,** so just be aware of that.