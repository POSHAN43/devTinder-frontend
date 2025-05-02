import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async () => {
      try{
        const res = await axios.post(`${BASE_URL}/signup`,{
            firstName,
            lastName,
            emailId,
            password
        },{withCredentials:true});
        dispatch(addUser(res?.data?.data));
        return navigate("/profile")
      }catch(err){
        console.log()
        setError(err?.response?.data);
        
      }
    }
    const handleLogin = async () => {
        try{
            
        const res =  await axios.post(BASE_URL + "/login",{
            emailId,
            password
        },{withCredentials:true});
        dispatch(addUser(res?.data?.data));
        navigate("/")
     }catch(err){
      setError(err?.response?.data);
        console.error(err);
        }
    }
  return (
    <div className='flex justify-center items-center h-screen'>
    <div className="card bg-gray-700 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center text-3xl text-white">{isLoginForm?"Login":"SignUp"}</h2>
    <div>
   {!isLoginForm && ( <><div className='my-4'>
        <label className='form-control w-full max-w-xs'>
            <div className="label mb-2">
                <span className='label-text text-white'>First Name</span>
            </div>
            <input type="text" value={firstName} placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e)=>setFirstName(e.target.value)}/>
        </label>
        </div>
        <div className='my-4'>
        <label className='form-control w-full max-w-xs'>
            <div className="label mb-2">
                <span className='label-text text-white'>Last Name</span>
            </div>
            <input type="text" value={lastName} placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e)=>setLastName(e.target.value)}/>
        </label>
        </div></>)}
        <div className='my-4'>
        <label className='form-control w-full max-w-xs'>
            <div className="label mb-2">
                <span className='label-text text-white'>Email ID</span>
            </div>
            <input type="text" value={emailId} placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e)=>setEmailId(e.target.value)}/>
        </label>
        </div>
        <div className='mt-4'>
        <label className='form-control w-full max-w-xs'>
            <div className="label mb-2">
                <span className='label-text text-white'>Password</span>
            </div>
            <input type="text" value={password} placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e)=>setPassword(e.target.value)}/>
        </label>
        </div>
   
    </div>
    <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-outline  text-white w-28 h-11" onClick={isLoginForm?handleLogin:handleSignup}>{isLoginForm?"Login":"SignUp"}</button>
    </div>
    <p className='text-white cursor-pointer' onClick={()=>{setIsLoginForm((value)=>!value),setError(false)}}>{isLoginForm? "New User? Signup Here": "Existing User? Login Here"}</p>
  </div>
</div>
</div>
  )
}

export default Login
