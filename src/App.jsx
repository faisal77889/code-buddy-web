import Body from "./components/Body";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {


  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element = {<Body />}>
            <Route path="/login" element = {<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
