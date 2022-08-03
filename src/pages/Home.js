import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authService, dbService } from "../firebase";

export function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    dbService
      .collection("User")
      .get()
      .then((arr) => {
        arr.forEach((data) => {
          const getData = data.data();
          console.log(getData);
          setUserData((prev) => {
            const newArr = prev?.filter(
              (prevArr) => prevArr.uid !== getData.uid
            );
            return [getData, ...newArr];
          });
        });
      });
    authService.onAuthStateChanged((data) => {
      if (data) {
        setIsLogin(true);
        setCurrentUser(data);
      } else {
        setIsLogin(false);
      }
    });
    dbService.collection("User").onSnapshot((snapShot) => {
      const newArr = snapShot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setUserData(newArr);
    });
  }, []);

  const handleClick = () => {
    authService.signOut();
    dbService.collection("User").doc(currentUser.email).update({
      login: false,
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
      <ul>
        {userData?.map((arr) => (
          <li key={arr.uid}>
            <div>{arr.displayName}</div>
            <div>{arr.email}</div>
            {arr.login && <div>로그인중입니다</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
