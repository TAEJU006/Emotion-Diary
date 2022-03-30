import React, { useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      // targetId를 필터링한 나머지 요소들을 배열로 만들어서 newState로 바꾼다
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        // action.data.id가 일치하는 요소를 찾아낸 다음, 일치하는 요소에는 action.data를 전달함
        it.id === action.data.id
          ? {
              ...action.data,
            }
          : it
      );
      break;
    }
    default:
      return state;
  }
  // 변화한 newState를 반환해 상태 적절히 바뀐다
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);
  //CREATE
  // data,content,emotion을 받아서 새로운 일기 아이템을 객체로 만들어 data로 전달
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      // Id는 유지를 하면서 나머지 파라미터를 바꾼다
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    //context.provider가 컴포넌트 트리를 전역으로 감싸고 있다
    <DiaryStateContext.Provider value={data}>
      {/* dispatch 함수들도 context를 이용해 공급 */}
      <DiaryDispatchContext.Provider value={(onCreate, onRemove, onEdit)}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
