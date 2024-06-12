/** @format */

import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleDemo = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <form id='demo' onSubmit={handleDemo}></form>
      <form className='modalForm' onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <div className='input-container'>
          <label>Username or Email</label>
          <input
            type='text'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>

        <div className='input-container'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errors.credential && <p>{errors.credential}</p>}
        <button
          disabled={credential.length < 4 || password.length < 6}
          className='primary-btn'
          type='submit'
        >
          Log In
        </button>

        <button className='primary-btn' form='demo'>
          Log In as Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
