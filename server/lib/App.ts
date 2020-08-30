import * as express from "express";
import * as Routes from "./routes";
import * as cors from "cors";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as admin from "firebase-admin";
import serviceAccount from "./serviceAccount";

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
  public questionsRouter: Routes.QuestionsRouter = new Routes.QuestionsRouter();

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
    this.questionsRouter.routes(this.app);
  }

  private config(): void {
    const params = {
      type: serviceAccount.type,
      projectId: serviceAccount.project_id,
      privateKeyId: serviceAccount.private_key_id,
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      clientId: serviceAccount.client_id,
      authUri: serviceAccount.auth_uri,
      tokenUri: serviceAccount.token_uri,
      authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
      clientC509CertUrl: serviceAccount.client_x509_cert_url,
    };

    // Initialize Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.cert(params),
      databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    });

    this.app.use(cors()); // TODO: check security details with CORS
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    // Middleware for authenticating REST requests
    this.app.use((req, res, next) => {
      const { token } = req.headers;
      admin
        .auth()
        .verifyIdToken(token as string)
        .then((decodedToken) => {
          // Check if user is authenticated in Firebase authentication
          admin
            .auth()
            .getUser(decodedToken.uid)
            .then((user) => {
              console.log(user);
            })
            .catch(() => {
              res
                .status(400)
                .send(
                  "[oauth] the user with the ID does not exist in firebase"
                );
            });
        })
        .catch((error) => {
          res.status(401).send("authentication failed");
        });
    });
  }

  private setupMongo(): void {
    mongoose.connect(this.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("Connection to MongoDB database established successfully.");
    });
  }
}

export default new App().app;
