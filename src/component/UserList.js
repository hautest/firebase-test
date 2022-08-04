import { useEffect, useState } from "react";
import { dbService } from "../firebase";
import { CheckBox } from "./CheckBox";

export function UserList({ check, setState, fixedCheck }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    dbService
      .collection("User")
      .get()
      .then((arr) => {
        arr.forEach((data) => {
          const getData = data.data();
          setUserData((prev) => {
            const newArr = prev?.filter(
              (prevArr) => prevArr.uid !== getData.uid
            );
            return [getData, ...newArr];
          });
        });
      });
    dbService.collection("User").onSnapshot((snapShot) => {
      const newArr = snapShot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setUserData(newArr);
    });
  }, []);
  return (
    <ul>
      {userData?.map((arr) => (
        <li key={arr.uid}>
          <div>{arr.displayName}</div>
          <div>{arr.email}</div>
          {check &&
            (fixedCheck !== arr.email ? (
              <CheckBox setState={setState} value={arr.email} />
            ) : (
              <div
                style={{
                  height: "20px",
                  width: "20px",
                  border: "solid 1px black",
                }}
              >
                ㅇ
              </div>
            ))}
          {arr.login && <div>로그인중입니다</div>}
        </li>
      ))}
    </ul>
  );
}
