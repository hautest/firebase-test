import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserList } from "../component/UserList";
import { authService } from "../firebase";

export function Chatting() {
  const nav = useNavigate();
  const [makeChatting, setMakeChatting] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [state, setState] = useState([]);
  console.log(state);
  console.log(currentUser);
  const handleToggle = () => {
    setMakeChatting((prev) => !prev);
  };
  useEffect(() => {
    authService.onAuthStateChanged((data) => {
      if (!data) {
        nav("/");
      } else {
        setCurrentUser(data);
      }
    });
  }, [nav]);
  useEffect(() => {
    if (makeChatting && currentUser) {
      setState([currentUser.uid]);
    }
  }, [makeChatting, currentUser]);
  return (
    <div>
      <header>Chatting</header>
      {makeChatting && <button onClick={handleToggle}>X</button>}
      <div>
        {makeChatting && (
          <div>
            <UserList
              setState={setState}
              state={state}
              fixedCheck={currentUser.uid}
              check
            />
            <button>만들기</button>
          </div>
        )}
      </div>
      {!makeChatting && <button onClick={handleToggle}>채팅방 만들기</button>}
    </div>
  );
}
