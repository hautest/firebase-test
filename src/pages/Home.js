import { useEffect, useState } from "react";
import { UserList } from "../component/UserList";
import { Link } from "react-router-dom";
import { authService, dbService } from "../firebase";

export function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    authService.onAuthStateChanged((data) => {
      if (data) {
        setIsLogin(true);
        setCurrentUser(data);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  const handleClick = () => {
    dbService
      .collection("User")
      .doc(currentUser.email)
      .update({
        login: false,
      })
      .then((data) => {
        authService.signOut();
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div>Home</div>
      {isLogin && <button onClick={handleClick}>로그아웃</button>}
      <br />
      <Link to="/login">로그인</Link>
      <br />
      <Link to="signUp">회원가입</Link>
      <UserList />
      {isLogin && <Link to="/chatting">채팅방으로</Link>}
    </div>
  );
}
