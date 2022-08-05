import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatList } from "../component/ChatList";
import { UserList } from "../component/UserList";
import { authService, dbService } from "../firebase";

export function Chatting() {
  const nav = useNavigate();
  const [makeChatting, setMakeChatting] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [state, setState] = useState([]);
  const [chatName, setChatName] = useState("");

  const handleToggle = () => {
    setMakeChatting((prev) => !prev);
    setChatName("");
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setChatName(value);
  };

  const handleMakeChat = () => {
    const id = Math.round(Math.random() * 10000001) + 1;
    dbService.collection("Chatting").doc(chatName).set({
      participant: state,
      id,
      message: [],
      chatName,
    });
    setMakeChatting(false);
    nav(String(id));
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
      setState([currentUser.email]);
    }
  }, [makeChatting, currentUser]);
  return (
    <div>
      <header>Chatting</header>
      {makeChatting && (
        <div>
          <input value={chatName} onChange={handleChange} />
          <button onClick={handleToggle}>X</button>
        </div>
      )}
      <div>
        {makeChatting && (
          <div>
            <UserList
              setState={setState}
              fixedCheck={currentUser.email}
              check
            />
            <button disabled={!chatName} onClick={handleMakeChat}>
              만들기
            </button>
          </div>
        )}
      </div>
      {!makeChatting && <button onClick={handleToggle}>채팅방 만들기</button>}
      <ChatList email={currentUser?.email} />
    </div>
  );
}
