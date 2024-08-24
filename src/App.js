import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { store } from "./store/store";
import { apiURL ,token} from "./env";
import { useEffect, useState } from "react";
import axios from "axios"
import AppRoutes from "./pages/appRoutes";
import LoginPage from "./pages/loginpage";
import {useDispatch , useSelector} from 'react-redux'
import { userData, userToken } from "./store/slice/userSlice";
import ForgetPassword from "./pages/forgetpassword";
import Register from "./pages/registerUser";
// import CreateAdmin from "./pages/createAdmin";
// import ResetPassword from "./pages/resetpassword";
// import ReopenTicket from "./pages/reopenTicket";
const App =() => {

  const user = useSelector(state=>state.user)
  const dispatch = useDispatch();
  const [isLoggedin , setIsLoggedin] = useState(false)

  let token = localStorage.getItem("token")
  console.log(token)

  const getUserDetails = async() =>{
      try {
        let {data} = await axios.get(`${apiURL}/api/admin/details`, {
          headers :{
            "Authorization" : `Bearer ${token}`
          }
        });

        dispatch(userData( data.data ));
        dispatch(userToken( token ));
        setIsLoggedin(true);
      } catch (error) {
        console.log(error)
      }

  }

    // localStorage.removeItem('token')
  useEffect(()=>{
    token && getUserDetails()
  },[token])

  useEffect(()=>{

  },[user.loading])


  return (
    <>


      <div className="d-flex m-0 p-0">
        <Router>
          { isLoggedin ?
            <AppRoutes/>
              :
              <>

              <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path='*' element={<Navigate to={`/login`} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgetpassword" element={<ForgetPassword />} />
                {/* <Route path='/createAdmin' element={<CreateAdmin/>} /> */}
                {/* <Route path="/resetpassword" element={<ResetPassword />} /> */}
                {/* <Route path="/reopen" element={<ReopenTicket />} /> */}
              </Routes>
              </>
          }

        </Router>
      </div>

</>
  );
}

export default App;
