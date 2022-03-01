import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPasswod] = useState('');
  const [data, setData] = useState(null);

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

    fetch('/auth/login/', {
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
        setData(data);
      });
  };

  const onClickLogout = () => {
    fetch('/auth/logout')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.result === 'success') {
          setData(null);
        }
      });
  };

  const onClickGetUser = () => {
    fetch('/auth/user')
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  return (
    <>
      <h3>LoginPage</h3>
      <h4>{data ? data.username : ''}</h4>
      <input type="text" value={email} onChange={onChangeEmail} />
      <br />
      <input type="password" value={password} onChange={onChangePassword} />
      <br />
      {data ? '' : <button onClick={onClickLogin}>login</button>}
      {data ? <button onClick={onClickLogout}>logout</button> : ''}
      <br />
      <div>
        <h3>Get User</h3>
        <button onClick={onClickGetUser}>get user</button>
        {data ? <h4>Welcome Back {data.username}</h4> : null}
      </div>
    </>
  );
}

export default LoginPage;
