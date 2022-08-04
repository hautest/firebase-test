import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dbService } from "../firebase";

export function ChatList({ email }) {
  const [chattingRoomList, setChattingRoomList] = useState([]);

  useEffect(() => {
    dbService
      .collection("Chatting")
      .get()
      .then((arr) => {
        arr.forEach((data) => {
          const getData = data.data();
          const id = data.id;
          if (getData.participant.includes(email)) {
            setChattingRoomList((prev) => {
              const newArr = prev?.filter(
                (prevArr) => prevArr.chat.id !== getData.id
              );
              return [{ name: id, chat: getData }, ...newArr];
            });
          }
        });
      });
  }, [email]);
  return (
    <div>
      {chattingRoomList.map((item) => (
        <Link to={`${item.chat.id}`} key={item.chat.id}>
          <div>{item.name}</div>
        </Link>
      ))}
    </div>
  );
}
