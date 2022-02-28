const router = require('express').Router();

router.get('/', (req, res) => {
  const html = `
  <h3>hi there</h3>
  ${req.isAuthenticated() ? '' : '<a href="/auth/login">login</a>'}
  ${req.isAuthenticated() ? '' : '<a href="/auth/register">register</a>'}
  ${req.isAuthenticated() ? '<a href="/auth/logout">logout</a>' : ''}`;

  console.log('req.user: ', req.user);
  console.log(req.isAuthenticated());

  res.send(html);
});

module.exports = router;
