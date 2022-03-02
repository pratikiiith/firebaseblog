import React from "react";
import { useState } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup , createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
  
  let navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };
  

  return (
    <div>
        <h3> Register User </h3>

        <div className="form-group">
          <label>Email address</label>
          <input
          placeholder="Email..." className="form-control" onChange={(event) => {
            setRegisterEmail(event.target.value);}}
          />
          <label> Password </label>
          <input
          placeholder="Password..." className="form-control" onChange={(event) => {
            setRegisterPassword(event.target.value);}}
          />
          <button type="submit" className="btn btn-darkk btn-lg btn-block"onClick={register}> Register </button>
        </div>
        <br/>

        <h3> Login </h3>
        <div className="form-group">
          <label>Email address</label>
          <input
          placeholder="Email..." className="form-control" onChange={(event) => {
            setRegisterEmail(event.target.value);}}
          />
          <label> Password </label>
          <input
          placeholder="Password..." className="form-control" onChange={(event) => {
            setRegisterPassword(event.target.value);}}
          />
          <button type="submit" className="btn btn-darkk btn-lg btn-block" onClick={login}> Login </button>
        </div>
        <br/>

      <div>
          <button type="submit" className="btn btn-darkk btn-lg btn-block" onClick={signInWithGoogle}> Sign in with Google</button>
      </div>
   </div>
  );
}

export default Login;