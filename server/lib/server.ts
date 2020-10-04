import app from "./App";

/* ADDING SECURITY (would need to generate key and cert files)
import * as https from 'https';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync('./config/key.pem),
  cert: fs.readFileSync('./config/cert.pem)
}

// use https.createServer(httpsOptions, app).listen() instead of app.listen
*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
