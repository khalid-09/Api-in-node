import { protect } from './modules/auth';
import { createNewUser, signIn } from './handlers/user';

import express from 'express';
import router from './router';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  setTimeout(() => {
    next(new Error('Opps! Something went wrong'));
  }, 1);
}); // this is how you handle async errors in express by passing the error to next function and express will handle it for us

app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signIn);

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: 'Unauthorized' });
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'Invalid Input' });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).json({ message: err.message });
// }); // sync error handler which express catches for us and we can modify it and express dosen't know how to handle async errors

export default app;
