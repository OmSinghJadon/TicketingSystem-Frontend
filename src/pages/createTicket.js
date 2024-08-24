import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiURL } from '../env';
import { BackButton } from '../Assets/svg';
import { useSelector } from 'react-redux';

const CreateTicket = () => {
  const navigate = useNavigate()
  const userData = useSelector(state => state.user.userData)
  console.log("userData")
  console.log(userData)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [origin, setOrigin] = useState("Metaverse");
  const [applicationId, setApplicationId] = useState("1");
  const [priority, setPriority] = useState("");
  const [screenShots , setScreenShots] = useState("")
  const token = localStorage.getItem('token')
  const headers = useMemo(()=>({
      Authorization : `Bearer ${token}`,
      'Content-Type' : 'multipart/form-data'
  }
  ),[token])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    Array.from(screenShots).forEach((file, index) => {
      formData.append('screenshot', file);
  });
    formData.append("name", name);
    formData.append("uuid", userData.uuid);
    formData.append("email", email);
    formData.append("isAdmin", Boolean(isAdmin));
    formData.append("phone", phone);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("origin", origin);
    formData.append("applicationId", applicationId);
    formData.append("priority", priority.toUpperCase());
    console.log(screenShots)


        try{
            await axios.post(`${apiURL}/api/ticket/create`, formData ,{
                headers
            })
            console.log(formData)
        }catch(error){
            console.log(error)
        }

  };








  return (
    <>
        <div className='rounded-3 p-3' style={{backgroundColor:"rgb(234,243,252)", minHeight:"84vh", nWidth:"100%"}}>
            <div className='d-flex '>
            <div className='mx-2' ><button className=' bg-transparent border-0 ' onClick={()=>{navigate(-1)}}><BackButton/></button></div>
            <div><h4>Generate Ticket</h4></div>
            </div>
            <div className='d-flex m-3 p-5 w-100 '>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="form-group w-100 d-flex flex-column ">
          <label htmlFor="name" className=''>Name</label>
          <input
          className='my-2'
          size={150}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
       
        <div className="form-group d-flex flex-column ">
          <label htmlFor="email">Email</label>
          <input
          className='my-2'
          size={150}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group d-flex flex-column ">
          <label htmlFor="phone">Phone</label>
          <input
          className='my-2'
          size={150}
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group d-flex flex-column ">
          <label htmlFor="title">Title</label>
          <input
          className='my-2'
          size={150}
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group d-flex flex-column ">
          <label htmlFor="description">Description</label>
          <textarea
          className='my-2'
          size={150}
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="form-group d-flex flex-column ">
          <label htmlFor="priority">Priority</label>
          <input
          className='my-2'
          size={150}
            type="text"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
        <div>
        <label htmlFor="image">ScreenShot</label>
          <input
          className='my-2'
          size={150}
            type="file"
            multiple
            id="image"
            onChange={(e) => setScreenShots(e.target.files)}
          />
        </div>
        <button type="submit">Submit</button>
        <img src={screenShots}/>
      </form>
            </div>

        </div>
    </>
  )
}

export default CreateTicket