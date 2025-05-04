import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constant'
import { removeUser } from '../utils/userSlice'

const NavBar = () => {
    const user = useSelector((store)=>store.user)
    console.log("user in navbar: ", user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () =>{
      try{
        await axios.post(`${BASE_URL}/logout`,{},{withCredentials:true});
        dispatch(removeUser())
        navigate("/login");
      }catch(err){
        console.log("Error in logout: ", err);
      }
    }

  return (
    <div className="navbar bg-gray-700 shadow-sm h-20 fixed z-10">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-white text-3xl whitespace-nowrap">👨‍💻 DevTinder</Link>
    </div>
    <div className="flex gap-2 items-center">
      {user && (<p className='text-white text-xl hidden sm:block'>Welcome, {user.firstName}</p>)}
      {user && (
      <div className="dropdown dropdown-end mx-5 ">
        
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">
          <div className="w-10 rounded-full">
            <img
              alt="User photo"
              src={user.photoUrl || "https://media-hosting.imagekit.io/521aca5f74724def/user.webp?Expires=1840375877&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=uAzOHxOx4xGDnxT--ojhp~kNXdesTOpiI359rPeycEx6OsQyhzRiJaUC~Tcpe2yfzLzWfVwMUhIWdLxVUduDp-g~n7LGvPNSfoN7aUh2BXEyghqSFYAOrwkCyIIFIlVRQXrgWUQikh5Gg8iFz9YAUqapYow5nUAJKp9eZFYsRYgnDOfdtrRgOinmGhln-MRlAvxvbABXXJ56zQIm4EcZKkdlagBCoKREIwoesgYn7U2hSYKMJJolH8PrnSgHIB8XL3iqbSDBYxKpyO2PIAckR~bNP8BEw6RJ4mq9KOancpYn4SmSdAS4R5EmXbqfu0PTQX6A4N~lDGsOUyjF5VuP3g__"} />
          </div>
        </div>
        <ul
          tabIndex={1}
          className="menu menu-sm dropdown-content bg-gray-700 rounded-box z-1 mt-3 w-56 p-2 shadow text-white ">
          <li>
            <Link to ="/profile" className="text-xl">
              Profile
            </Link>
          </li>
          <li><Link to="/connections" className="text-xl">Connections</Link></li>
          <li><Link to="/requests" className="text-xl">Requests</Link></li>
          <li><a onClick={handleLogout} className="text-xl">Logout</a></li>
        </ul>
      </div>
)}
    </div>
  </div>
  )
}

export default NavBar
