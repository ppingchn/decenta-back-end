// libary import
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//Internal import
const { sequelize, Department } = require('./models');
const authRoute = require('./routes/authRoute');
const errorMiddleware = require('./middleware/errorMiddleware');

// using module
const app = express();

// DB change use below this line
// sequelize.sync({ force: true });

// middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);

app.use(errorMiddleware);

// server run
app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);
