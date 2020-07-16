import * as express from 'express';
import * as Routes from './routes';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

class App {
  public app: express.Application;
  public MONGODB_URI: string = process.env.MONGODB_URI;

  // routers 
  public studentRouter: Routes.StudentRouter = new Routes.StudentRouter();
  public facultyRouter: Routes.FacultyRouter = new Routes.FacultyRouter();
  public projectRouter: Routes.ProjectRouter = new Routes.ProjectRouter();
  public applicationRouter: Routes.ApplicationRouter = new Routes.ApplicationRouter();
  public categoryRouter: Routes.CategoryRouter = new Routes.CategoryRouter();
  public tagRouter: Routes.TagRouter = new Routes.TagRouter();

  constructor() {
    this.app = express();
    this.config();
    this.setupMongo();

    // add all router routes to express app
    this.studentRouter.routes(this.app);
    this.facultyRouter.routes(this.app);
    this.projectRouter.routes(this.app);
    this.applicationRouter.routes(this.app);
    this.categoryRouter.routes(this.app);
    this.tagRouter.routes(this.app);
  }

  private config(): void {
    this.app.use(cors()) // TODO: check security details with CORS
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
  }

  private setupMongo(): void {
    mongoose.connect(this.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log('Connection to MongoDB database established successfully.')
    });
  }
}

export default new App().app;