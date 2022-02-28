require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const { isLoggedIn, isNotLoggedIn } = require('./routes/middlewares');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

// app.post('/auth/hello', (req, res) => {
//   const body = req.body;
//   console.log(body);
//   res.json({ email: 'hi' });
// });

app.use('/', indexRouter);
app.use('/auth', authRouter);

// middleware test pages
app.get('/admin', isLoggedIn, (req, res) => {
  res.send('page for logined user');
});
app.get('/welcome', isNotLoggedIn, (req, res) => {
  res.send('page for not logged in guys');
});

app.listen(port, () => console.log('> Server is up and running on port : ' + port));
