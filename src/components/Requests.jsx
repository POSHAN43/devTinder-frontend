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
    <div className="flex justify-center h-screen w-full"> 
    <div className=" mt-30">
      <h1 className="text-xl sm:text-2xl text-center font-bold">My Conections Request</h1>
      
      {requests?.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          
            <div className="bg-gray-700 shadow-sm flex justify-start item-center space-x-6 my-4 rounded-lg w-86 sm:w-lg md:w-xl  p-4 h-28">
                <div className = "flex flex-col justify-center">
                <img
                  src={photoUrl || "https://media-hosting.imagekit.io/521aca5f74724def/user.webp?Expires=1840375877&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=uAzOHxOx4xGDnxT--ojhp~kNXdesTOpiI359rPeycEx6OsQyhzRiJaUC~Tcpe2yfzLzWfVwMUhIWdLxVUduDp-g~n7LGvPNSfoN7aUh2BXEyghqSFYAOrwkCyIIFIlVRQXrgWUQikh5Gg8iFz9YAUqapYow5nUAJKp9eZFYsRYgnDOfdtrRgOinmGhln-MRlAvxvbABXXJ56zQIm4EcZKkdlagBCoKREIwoesgYn7U2hSYKMJJolH8PrnSgHIB8XL3iqbSDBYxKpyO2PIAckR~bNP8BEw6RJ4mq9KOancpYn4SmSdAS4R5EmXbqfu0PTQX6A4N~lDGsOUyjF5VuP3g__"}
                  alt="user"
                  className="rounded-xl w-24 h-24"
                />
              </div> 
              <div className="flex flex-col justify-center w-66">
                <h2 className="text-sm font-bold text-white">{firstName + " "+ lastName}</h2>
                <p className="text-white text-sm">{age && gender && (age + ", "+ gender)}</p>
                <p className="text-white text-sm">{about}</p>
               
              </div>
              <div className="flex justify-end w-52">
              <div className="flex flex-col">
              <button className="btn btn-warning mb-4 w-16 h-8 text-sm px-4" onClick={()=>reviewRequest("rejected", request?._id)}>Reject</button>
              <button className="btn btn-success w-16 h-8 text-sm px-4" onClick={()=>reviewRequest("accepted", request?._id)}>Accept</button>
              </div>
              </div>
            </div>
          
        );
      })}
    </div>
    </div>
  );
};

export default Requests;
