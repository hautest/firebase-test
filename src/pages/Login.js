import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../firebase";
import { authService } from "../firebase";

export function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    authService.signInWithEmailAndPassword(email, password).then((data) => {
      console.log(data);
      dbService.collection("User").doc(email).update({
        login: true,
      });
    });
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    authService.onAuthStateChanged((data) => {
      if (data) {
        nav("/");
      }
    });
  }, [nav]);
  return (
    <main>
      <div>Login</div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleEmail} value={email} placeholder="이메일" />
        <input
          onChange={handlePassword}
          type="password"
          value={password}
          placeholder="비밀번호"
        />
        <button>로그인</button>
      </form>
      <div>
        계정이 없다면 ?
        <button
          onClick={() => {
            nav("/signUp");
          }}
        >
          회원가입하기
        </button>
      </div>
    </main>
  );
}
