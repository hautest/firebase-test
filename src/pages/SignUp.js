import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "../firebase";

export function SignUp() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    authService.onAuthStateChanged((data) => {
      if (data) {
        nav("/");
      }
    });
  }, [nav]);
  const handleSubmit = (e) => {
    e.preventDefault();
    authService
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div>
      <div>signUp</div>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={handleEmail} placeholder="이메일" />
        <input
          value={password}
          onChange={handlePassword}
          placeholder="비밀번호"
          type="password"
        />
        <button>회원가입</button>
      </form>
    </div>
  );
}
