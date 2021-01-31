import * as express from "express";
import * as cors from "cors";
import * as mongoose from "mongoose";
import * as path from "path";
import backendRouter from "./routers";
import serviceAccount from "./serviceAccount";
import * as admin from "firebase-admin";

class App {
  public app: express.Application;
  public MONGODB_URI: string = process.env.MONGODB_URI;

  constructor() {
    this.app = express();
    this.config();
    this.setupMongo();

    this.app.use('/api', backendRouter);
    if (process.env.NODE_ENV === 'production') {
      // __dirname == /server/dist/
      this.app.use(express.static(path.join(__dirname, '../../client/build/')));
      this.app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/build/'))
      })
    }
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
