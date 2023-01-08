import { useReducer } from "react";

type Action = "DECREMENT" | "INCREMENT";
// reducerの第一引数には現在の値が渡させる。dispatchで渡す必要はなく、自動で渡させる
const reducer = (currentCount: number, action: Action) => {
  if (action === "DECREMENT") {
    return currentCount - 1;
  } else if (action === "INCREMENT") {
    return currentCount + 1;
  } else {
    return currentCount;
  }
};

const Reducer = () => {
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      count: {count}
      {/* 引数にはactionの部分だけでいい。 */}
      <button onClick={() => dispatch("INCREMENT")}>+</button>
      <button onClick={() => dispatch("DECREMENT")}>-</button>
    </div>
  );
};

export default Reducer;
