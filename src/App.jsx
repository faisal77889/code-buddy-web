import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import appStore from "./utils/appStore";
import Profile from "./components/Profile";
import Connections from "./components/Connection";
import Request from "./components/Request";
import Feed from "./components/Feed";

function App() {


  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/" element={<Feed />} ></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/profile/view" element={<Profile />}></Route>
                <Route path="/connections" element={<Connections />}></Route>
                <Route path="/requests" element={<Request />}></Route>
              </Route>
            </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
