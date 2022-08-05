import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dbService } from "../firebase";

export function ChatList({ email }) {
  const [chattingRoomList, setChattingRoomList] = useState([]);
  useEffect(() => {
    dbService.collection("Chatting").onSnapshot((snapShot) => {
      const newArr = snapShot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setChattingRoomList(newArr);
    });
  }, [email]);
  return (
    <div>
      {chattingRoomList.map((item) => {
        console.log(item);
        return (
          <Link to={`${item.id}`} key={item.id}>
            <div>{item.chatName}</div>
          </Link>
        );
      })}
    </div>
  );
}
