import { useEffect, useState } from "react";

const today = new Date();
const month = today.getMonth() + 1;
const date = today.getDate();
const hour = today.getHours();
const minute = today.getMinutes();
const year = today.getFullYear();
const second = today.getSeconds();

export function useCreateAtId() {
  const [whenCreate, setWhenCreate] = useState("");
  const id = Math.round(Math.random() * 10000001) + 1;
  useEffect(() => {
    const stringId =
      String(year) +
      String(month) +
      String(date) +
      String(hour) +
      String(minute) +
      String(second);
    setWhenCreate(stringId);
  }, []);
  return [Number(whenCreate), id];
}
