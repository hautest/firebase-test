import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { authService, dbService } from "../firebase";

export function SignUp() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");

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
        updateProfile(authService.currentUser, {
          displayName: nickName,
        });
        dbService.collection("User").doc(email).set({
          email: email,
          password: password,
          displayName: nickName,
          uid: data.user.uid,
          login: true,
        });
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
  const handleNickName = (e) => {
    setNickName(e.target.value);
  };
  return (
    <div>
      <div>signUp</div>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={handleEmail} placeholder="이메일" />
        <input
          value={nickName}
          onChange={handleNickName}
          placeholder="닉네임"
        />
        <input
          value={password}
          onChange={handlePassword}
          placeholder="비밀번호"
          type="password"
        />
        <button>회원가입</button>
      </form>
      <div>
        계정이 있으시면
        <Link to="/login">로그인</Link>
      </div>
    </div>
  );
}
