// libary import
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//Internal import
const { sequelize, Department } = require('./models');
const authRoute = require('./routes/authRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const departmentRoute = require('./routes/departnemtRoute');
const meetingRoute = require('./routes/meetingRoute');
const projectRoute = require('./routes/projectRoute');
const userRoute = require('./routes/userRoute');
const authenticate = require('./middleware/authenticateMiddelware');
// using module
const app = express();

// DB change use below this line
// sequelize.sync({ alter: true });
// Department.bulkCreate([
//   { departmentName: 'Administative' },
//   { departmentName: 'Treasurer' },
//   { departmentName: 'Marketing' },
//   { departmentName: 'Public Relation' },
//   { departmentName: 'Event Organizer' },
//   { departmentName: 'International Service' },
//   { departmentName: 'Human Resource' },
// ]);

// middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);
app.use('/department', departmentRoute);
app.use('/meeting', authenticate, meetingRoute);
app.use('/project', authenticate, projectRoute);
app.use('/user', authenticate, userRoute);

app.use(errorMiddleware);

// server run
app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);
