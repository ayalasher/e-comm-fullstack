import React  from "react"
import {Routes,Route} from 'react-router-dom'
import Login from "./components/Login"
import Home from "./components/Home"
import Signup from "./components/Signup"
import Landingpage from "./components/Landingpage"
import Cart from "./components/Cart"

function App() {
 

  return <div>
    <Routes>
      <Route exact path="" element={<Home/>}  />
      <Route path="/login" element={<Login/>}  />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/landingpage" element={<Landingpage/>}  />
      <Route path="/cart" element={<Cart/>}  />
    </Routes>
  </div>
}

export default App
