import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
import router from './routes/index.js';
import compression from 'compression';
import helmet from 'helmet';

// Set up the express app
const app = express();
app.use(compression);
app.use(helmet);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
