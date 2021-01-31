import * as dotenv from "dotenv";
dotenv.config();

import app from "./App";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
