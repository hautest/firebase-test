import { useEffect, useState } from "react";
import { dbService, authService } from "../firebase";
import { Message } from "../component/Message";
import { useCreateAtId } from "../hooks/useCreateAtId";
import { useNavigate, useParams } from "react-router-dom";

export function ChattingRoom() {
  const nav = useNavigate();
  const { id: roomId } = useParams();
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [inputValue, setInputValue] = useState("");
  const [createAt, id] = useCreateAtId();

  const handleSubmit = (e) => {
    e.preventDefault();
    dbService
      .collection("Chatting")
      .doc(currentChat.chatName)
      .update({
        message: [
          ...currentChat.message,
          {
            content: inputValue,
            sender: currentUser.displayName,
            createAt,
            id,
          },
        ],
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    setInputValue("");
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setInputValue(value);
  };

  useEffect(() => {
    authService.onAuthStateChanged((data) => {
      if (data) {
        setCurrentUser(data);
      } else {
        nav("/");
      }
    }, []);
    dbService
      .collection("Chatting")
      .get()
      .then((arr) => {
        arr.forEach((data) => {
          const getData = data.data();
          if (getData.id === Number(roomId)) {
            setCurrentChat(getData);
          }
        });
      });
  }, [nav, roomId]);
  useEffect(() => {
    if (currentChat?.chatName) {
      dbService
        .collection("Chatting")
        .doc(currentChat.chatName)
        .onSnapshot((snapShot) => {
          console.log(snapShot.data());
          setCurrentChat(snapShot.data());
        });
    }
  }, [currentChat?.chatName]);
  useEffect(() => {
    if (
      currentUser &&
      currentChat &&
      !currentChat.participant.includes(currentUser.email)
    ) {
      nav("/");
    }
  }, [currentUser, currentChat, nav]);
  return (
    <div>
      <div>{currentChat?.chatName}</div>
      <div>
        <Message currentUser={currentUser} chatName={currentChat?.chatName} />
      </div>
      <form onSubmit={handleSubmit}>
        <input value={inputValue} onChange={handleChange} />
        <button>⬆</button>
      </form>
    </div>
  );
}
