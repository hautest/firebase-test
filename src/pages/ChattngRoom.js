import { useEffect, useState } from "react";
import { dbService, authService } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

export function ChattingRoom() {
  const nav = useNavigate();
  const { id: roomId } = useParams();
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChat] = useState();

  useEffect(() => {
    authService.onAuthStateChanged((data) => {
      if (data) {
        setCurrentUser(data);
      } else {
        nav("/");
      }
    });
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
    if (
      currentUser &&
      currentChat &&
      !currentChat.participant.includes(currentUser.email)
    ) {
      nav("/");
    }
  }, [currentUser, currentChat, nav]);
  return <div>chattingRoom</div>;
}
