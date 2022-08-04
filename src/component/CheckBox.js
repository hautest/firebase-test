import { useState } from "react";

export function CheckBox({ state, setState, value }) {
  const [checked, setChecked] = useState(false);
  const handleOnClick = () => {
    setChecked((prev) => !prev);
    setState((prev) => {
      if (!checked) {
        return [value, ...prev];
      } else {
        const newArr = prev.filter((arr) => arr !== value);
        return newArr;
      }
    });
  };
  return (
    <div
      onClick={handleOnClick}
      style={{ height: "20px", width: "20px", border: "solid 1px black" }}
    >
      {checked && <div>ㅇ</div>}
    </div>
  );
}
