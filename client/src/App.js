import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Visit from "./components/Visit";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={Main}/>
          <Route path="/login" exact Component={Login} />
          <Route path="/signup" exact Component={Signup}/>
          <Route path="/visit" exact Component={Visit}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
