const passport = require('passport');
const localStrategy = require('./localStrategy');
const db = require('../config/db');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('serializeUser', user);

    done(null, user.email);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserializeuser', id);

    db.query(`SELECT * FROM users WHERE email = ?`, [id], (err, rows) => {
      if (err) throw err;

      done(null, rows[0]);
    });
  });

  localStrategy();
};
