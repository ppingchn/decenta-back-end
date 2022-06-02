require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');

const app = express();

sequelize.sync({ alter: true });
app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);
