import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../firebase";

export function Home() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((data) => {
      if (data) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);
  const handleClick = () => {
    authService.signOut();
  };
  return (
    <div>
      <div>Home</div>
      {isLogin && <button onClick={handleClick}>로그아웃</button>}
      <Link to="/login">로그인</Link>
      <br />
      <Link to="signUp">회원가입</Link>
    </div>
  );
}
