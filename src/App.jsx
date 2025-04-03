import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import appStore from "./utils/appStore";
import Profile from "./components/Profile";


function App() {


  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/profile/view" element = {<Profile />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
