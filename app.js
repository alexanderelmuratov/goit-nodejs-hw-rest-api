const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
   res.status(status).json({ message });
});

module.exports = app;


// pg3PJc0JbjvkCbKY
// mongodb+srv://Alexander:pg3PJc0JbjvkCbKY@cluster0.imluu.mongodb.net/test
// const mongoose = require('mongoose');

// const DB_HOST = 'mongodb+srv://Alexander:pg3PJc0JbjvkCbKY@cluster0.imluu.mongodb.net/db-contacts?retryWrites=true&w=majority';

// mongoose.connect(DB_HOST)
//   .then(() => console.log('Database connection successful'))
//   .catch(error => {
//     console.log(error.message);
//     process.exit(1);
//   });