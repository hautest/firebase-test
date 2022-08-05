import { useEffect, useState } from "react";
import { dbService } from "../firebase";

export function Message({ chatName, currentUser }) {
  const [message, setMessage] = useState([]);
  console.log(currentUser);
  useEffect(() => {
    dbService
      .collection("Chatting")
      .doc(chatName)
      .onSnapshot((snapShot) => {
        if (!snapShot.data()) return;
        setMessage(snapShot.data().message);
      });
  }, [chatName]);

  return (
    <div style={{ width: "500px" }}>
      {message?.map((item) => {
        if (item.sender === currentUser.displayName) {
          return (
            <div
              key={item.id}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <span>{item.content}</span>
              <span>{item.sender}</span>
            </div>
          );
        } else {
          return (
            <div key={item.id}>
              <span>{item.sender}</span>
              <span>{item.content}</span>
            </div>
          );
        }
      })}
    </div>
  );
}
