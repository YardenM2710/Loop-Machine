import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { userService } from '../services/userService';
import { useHistory } from 'react-router-dom';

export function Login(props) {
  const form = useRef();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const moveToLogin = () => {
    setIsLogin((s) => !s);
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const user = {
        username: username,
        password: password,
        email: email,
      };

      const loggedUser = isLogin
        ? await userService.login(user)
        : await userService.signup(user);
      if (loggedUser) history.push('/');
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  };
  return (
    <section className="login-page">
      <h1>Welcome !</h1>
      <form onSubmit={handleLogin}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
          }}
        >
          <TextField
            helperText="Please enter your name"
            id="demo-helper-text-misaligned"
            label="Name"
            type="text"
            name="name"
            value={username}
            onChange={onChangeUsername}
          />
          {!isLogin && (
            <TextField
              helperText="Please enter your Email"
              id="demo-helper-text-misaligned"
              label="Email"
              type="text"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          )}
          <TextField
            helperText="Please enter your password"
            id="demo-helper-text-misaligned"
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
        </Box>
        <button variant="contained">{isLogin ? 'Login' : 'Sign in'}</button>
        {isLogin && (
          <p>
            Dont have an account?
            <a onClick={moveToLogin}> Click to sign in!</a>
          </p>
        )}
      </form>
    </section>
  );
}
