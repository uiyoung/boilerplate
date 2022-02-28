const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../config/db');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, done) => {
        db.query(`SELECT * FROM users WHERE email= ?`, [email], async (err, user) => {
          if (err) {
            return done(err);
          }
          if (user.length === 0) {
            return done(null, false, { message: 'Incorrect username' });
          }

          const result = await bcrypt.compare(password, user[0].password);
          if (!result) {
            return done(null, false, { message: 'Incorrect password' });
          }

          return done(null, user[0], { message: 'Welcome' });
        });
      }
    )
  );
};
