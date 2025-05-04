import React, { useEffect } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import {BASE_URL} from '../utils/constant';
import UserCard from './UserCard';
// import { useSelector ,useDispatch} from 'react-redux'

const Feed = () => {
  const feed = useSelector((state)=>state.feed);
  const dispatch = useDispatch();

  const getFeed = async () =>{
    if(feed) return
    try{
      const res = await axios.get(`${BASE_URL}/feed`,{withCredentials:true});
      dispatch(addFeed(res?.data?.data))
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getFeed();
  },[])

  if(!feed)
    return;

  if(feed.length==0)
    return <h1 className='flex justify-center my-10 text-3xl text-bold'>No User Found</h1>
  return (
    <div className='flex justify-center items-center h-screen'>
      {
    feed && (
    <UserCard user = {feed[0]}/>
    )}
    </div>
  )
}

export default Feed
