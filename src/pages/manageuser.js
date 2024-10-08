import React, { useEffect, useMemo, useState } from 'react'
import TicketTable from '../components/tickettable';
import { Link, useNavigate } from 'react-router-dom';
import { apiURL } from '../env';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {allUsers} from '../store/slice/userSlice'
import moment from 'moment';
import Switch from '@mui/material/Switch';



const ManageUser = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showLoading, setShowLoading] = useState(true);
  const [usersDetails , setUsersDetails] = useState([])
  const userData = useSelector(state=>state.user.users)
  const token   = localStorage.getItem('token')
  const headers = useMemo(()=>({
    Authorization : `Bearer ${token}`
  }

  ),[token])

  const fetchUserDetails = async() =>{
    try{
     
        console.log("fetched details")
        let { data } = await axios.get(`${apiURL}/api/admin/get/all/admins`, {
          headers,
        });
        const userDataArray = Array.isArray(data.data) ? data.data : [data.data];

    setUsersDetails(userDataArray);
    dispatch(allUsers(userDataArray));
        setShowLoading(false)
      
    }catch(error){
      console.log(error)
    }
  }

    const handleClick = (item) =>{

      navigate('/user/details' , {state:item})

    }


  useEffect(()=>{
    // console.log(data)
    fetchUserDetails()
  },[])

  return showLoading ? (
    <div>Fetching data</div>
  ) : (
    <div className=" main-div rounded-3">
      <div className="m-3">
        <div className="d-flex justify-content-between mx-4 fs-5">
          
          <div>
            Total Users:{" "}
            <strong>{`${
              usersDetails.length
            }`}</strong>
          </div>
          <div>
          <Link to={"/users/create"}>
            <button className="rounded-2 bg-light border-0 ">
              Create Admin
            </button>
          </Link>

          </div>
        </div>

        <div className="divisor z-1 ">
          <hr className=" z-n1 "/>
        </div>
      </div>
      <div className="m-3">
      <table class="table table-hover ">
                <thead>
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">uuid</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    {/* <th scope="col">Group</th> */}
                    <th scope="col">Contact No.</th>
                    <th scope="col">Notifications</th>
                    <th scope="col">Created At</th>
                  </tr>
                </thead>
                <tbody>

                  {usersDetails.map((item, index) => {
                    console.log("usersDetails")
                    console.log(usersDetails)
                    console.log("item")
                    console.log(item)

                    return (
                      <tr >
                        <th>{ (index + 1)}</th>
                        <td>{item.uuid}</td>
                        <td className=" text-capitalize ">
                          {item.name.toLowerCase()}
                        </td>
                        <td >
                          {item.email.toLowerCase()}
                        </td>
                        
                        <td >
                          {item.phone}
                        </td>
                        <td >

                          {item.notification ? <Switch  disabled defaultChecked /> : <Switch  disabled defaultChecked />}
                        </td>
                        <td>
                          {moment(item.createdAt).format("DD MMM YYYY h:mm a")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
      </div>



    </div>
  );
}

export default ManageUser