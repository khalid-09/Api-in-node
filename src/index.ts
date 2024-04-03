import app from './server';
import * as dotenv from 'dotenv';
dotenv.config();

app.listen(3000, () => {
  console.log('hello on http://localhost:3000/');
});
