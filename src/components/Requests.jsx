import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
const Requests = () => {
  const requests = useSelector((store)=>store.requests)
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try{
          const res = await axios.post(`${BASE_URL}/request/review/${status}/${_id}`,{}, {withCredentials: true});
          dispatch(removeRequest(_id));
    }catch(err){
      console.log("Error in accepting or rejecting request: ", err);
    }
  }
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log("Error in fetching connections: ", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!requests) return;
  if (requests?.length === 0) return <h1 className="flex justify-center my-10 text-3xl font-bold">No Connections Requests Found</h1>;
  return (
    <div className="flex justify-center align-center w-full my-10"> 
    <div className=" my-10">
      <h1 className="text-3xl text-center text-bold">My Conections Request</h1>
      
      {requests?.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          
            <div className="bg-gray-700 shadow-sm flex justify-start item-center space-x-8 my-4 rounded-lg w-xl pl-4 h-36">
                <div className = "flex flex-col justify-center">
                <img
                  src={photoUrl || "https://media-hosting.imagekit.io/521aca5f74724def/user.webp?Expires=1840375877&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=uAzOHxOx4xGDnxT--ojhp~kNXdesTOpiI359rPeycEx6OsQyhzRiJaUC~Tcpe2yfzLzWfVwMUhIWdLxVUduDp-g~n7LGvPNSfoN7aUh2BXEyghqSFYAOrwkCyIIFIlVRQXrgWUQikh5Gg8iFz9YAUqapYow5nUAJKp9eZFYsRYgnDOfdtrRgOinmGhln-MRlAvxvbABXXJ56zQIm4EcZKkdlagBCoKREIwoesgYn7U2hSYKMJJolH8PrnSgHIB8XL3iqbSDBYxKpyO2PIAckR~bNP8BEw6RJ4mq9KOancpYn4SmSdAS4R5EmXbqfu0PTQX6A4N~lDGsOUyjF5VuP3g__"}
                  alt="user"
                  className="rounded-xl w-24 h-24"
                />
              </div> 
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl text-white">{firstName + " "+ lastName}</h2>
                <p className="text-white">{age && gender && (age + ", "+ gender)}</p>
                <p className="text-white">{about}</p>
               
              </div>
              <div className="flex flex-col justify-center">
              <button className="btn btn-warning mb-4" onClick={()=>reviewRequest("rejected", request?._id)}>Reject</button>
              <button className="btn btn-success" onClick={()=>reviewRequest("accepted", request?._id)}>Accept</button>
              </div>
            </div>
          
        );
      })}
    </div>
    </div>
  );
};

export default Requests;
