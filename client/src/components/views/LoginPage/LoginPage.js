import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPasswod] = useState('');
  const [user, setUser] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPasswod(e.target.value);
  };
  const onClickLogin = () => {
    const req = {
      email,
      password,
    };

    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('App.js login .then ', data);
        if (data.email === undefined) {
          alert('login fail!');
        }
        setUser(data.nickname);
      });
  };

  const onClickLogout = () => {
    fetch('/auth/logout')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.result === 'success') {
          setUser('');
        }
      });
  };

  return (
    <>
      <h3>LoginPage</h3>
      <h4>{user}</h4>
      <input type="text" value={email} onChange={onChangeEmail} />
      <br />
      <input type="password" value={password} onChange={onChangePassword} />
      <br />
      {user ? '' : <button onClick={onClickLogin}>login</button>}
      {user ? <button onClick={onClickLogout}>logout</button> : ''}
    </>
  );
}

export default LoginPage;
