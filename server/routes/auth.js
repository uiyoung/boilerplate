const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

router.post('/register', (req, res) => {
  const { email, password, nickname } = req.body;

  db.query('select * from users where email = ?', [email], async (err, rows) => {
    if (err) {
      throw err;
    }

    if (rows.length) {
      res.send({ result: 'error', message: 'email already exists' });
    } else {
      const saltRounds = 12;
      const hash = await bcrypt.hash(password, saltRounds);

      db.query(
        'INSERT INTO users(email, password, nickname, created_at) values (?, ?, ?, now())',
        [email, hash, nickname],
        (err, result) => {
          if (err) {
            throw err;
          }

          res.send({ result: 'success', message: 'welcome' });
        }
      );
    }
  });
});

router.get('/login', (req, res) => {
  const form = `
  <form action='/auth/login' method='post'>
    <p><input type='email' name='email' placeholder='email'></p>
    <p><input type='password' name='password' placeholder='password'></p>
    <input type='submit' value='login'>
  </form>
  <a href='/auth/logout'>logout</a>`;

  res.send(form);
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    return req.login(user, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      //  console.log('req.user : ' + JSON.stringify(user));
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.json({ result: 'success' });
});

module.exports = router;
