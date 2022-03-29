import "./App.css";
// 생성한 4개의 page를 특정 주소에 연결해 page routing을 시킨다
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RouteTest from "./components/RouteTest";

// 현재경로에서/pages 폴더 디렉토리 아래/Home.js를 가져와
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

function App() {
  return (
    // BrowserRouter로 감싸져 있는 부분은 브라우저 URL과 mapping 되어 있다
    // Routes => 브라우저의 url이 바뀌게 되면 어떤 컴포넌트를 rendering 해서 그 컴포넌트가 페이지 역할을 하게 할 것인지 결정하기 위해서 바뀔 부분을 Routes라는 컴포넌트로 감싸줌
    // Route => 실질적으로 url 경로와 컴포넌트를 mapping 시켜주는 컴포넌트
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary" element={<Diary />} />
        </Routes>
        <RouteTest />
      </div>
    </BrowserRouter>
  );
}

export default App;
