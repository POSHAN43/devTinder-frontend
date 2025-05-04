import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log("Error in fetching connections: ", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections?.length === 0) return <h1 className="text-3xl text-center font-bold my-10">No connections Found</h1>;
  return (
    <div className="flex justify-center h-screen w-full"> 
    <div className=" mt-30">
      <h1 className="text-3xl text-center font-bold">My Connections</h1>
      
      {connections?.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          
            <div className=" bg-gray-700 shadow-sm flex justify-start item-center space-x-8 my-4 rounded-lg w-86 sm:w-lg md:w-xl pl-4 h-36">
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
              </div>
         
          
        );
      })}
    </div>
    </div>
  );
};

export default Connections;
