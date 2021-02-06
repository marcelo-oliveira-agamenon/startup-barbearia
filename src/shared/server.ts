import express from 'express';
import Routes from '@shared/infra/routes/index';

import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(Routes);

app.listen(process.env.PORT, () => {
  console.log('Port', process.env.PORT);
});
