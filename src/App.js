import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Chatting } from "./pages/Chatting";
import { Home } from "./pages/Home";
import { ChattingRoom } from "./pages/ChattngRoom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/chatting" element={<Chatting />} />
          <Route path="/chatting/:id" element={<ChattingRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
