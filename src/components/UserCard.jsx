import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { useLocation } from 'react-router-dom';

const UserCard = ({user}) => {
    const {_id,firstName, lastName, photoUrl, age, gender, about} = user;
    const dispatch = useDispatch();
    const location = useLocation();
    console.log("location: ", location);
    const handleSendRequest = async (status, _id)=>{
      try{
        const res = await axios.post(`${BASE_URL}/request/send/${status}/${_id}`,{},{withCredentials:true});
        dispatch(removeUserFromFeed(_id))
      }catch(err){
        console.log("Error in sending request: ", err);
      }
    }
  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-gray-700 w-96 shadow-sm">
  
    <img
    width={400}
    height={400}
      src={photoUrl || "https://media-hosting.imagekit.io/521aca5f74724def/user.webp?Expires=1840375877&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=uAzOHxOx4xGDnxT--ojhp~kNXdesTOpiI359rPeycEx6OsQyhzRiJaUC~Tcpe2yfzLzWfVwMUhIWdLxVUduDp-g~n7LGvPNSfoN7aUh2BXEyghqSFYAOrwkCyIIFIlVRQXrgWUQikh5Gg8iFz9YAUqapYow5nUAJKp9eZFYsRYgnDOfdtrRgOinmGhln-MRlAvxvbABXXJ56zQIm4EcZKkdlagBCoKREIwoesgYn7U2hSYKMJJolH8PrnSgHIB8XL3iqbSDBYxKpyO2PIAckR~bNP8BEw6RJ4mq9KOancpYn4SmSdAS4R5EmXbqfu0PTQX6A4N~lDGsOUyjF5VuP3g__"}
      alt="User" />

  <div className="card-body">
    <h2 className="card-title text-white text-2xl">{firstName + " " + lastName}</h2>
    {age && gender && <span className='text-white'>{age + ", "+ gender}</span>}
    <p className='text-white'>{about}</p>
   {location?.pathname !== "/profile" && ( <div className="card-actions justify-center my-4">
    <button className="btn btn-info" onClick={()=>handleSendRequest("ignored", _id)}>Ignore</button>
      <button className="btn btn-success" onClick={()=>handleSendRequest("interested",_id)}>Send Request</button>
    </div>)}
  </div>
      </div>
    </div>
  )
}

export default UserCard
