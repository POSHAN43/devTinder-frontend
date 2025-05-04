import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    setShowToast(false);
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col md:flex-row">
        <div className="flex ">
          <div className="rounded-l-lg bg-gray-700 w-68 sm:w-72 md:w-92 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl text-white">
                Edit Profile
              </h2>
              <div>
                <div className="my-4">
                  <label className="form-control w-full max-w-xs">
                    <div className="label mb-2">
                      <span className="label-text text-white">First Name</span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="my-4">
                  <label className="form-control w-full max-w-xs">
                    <div className="label mb-2">
                      <span className="label-text text-white">Last Name</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="my-4">
                  <label className="form-control w-full max-w-xs">
                    <div className="label mb-2">
                      <span className="label-text text-white">Photo URL:</span>
                    </div>
                    <input
                      type="text"
                      value={photoUrl}
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </label>
                </div>
                <div className="my-4">
                  <label className="form-control w-full max-w-xs">
                    <div className="label mb-2">
                      <span className="label-text text-white">Age</span>
                    </div>
                    <input
                      type="text"
                      value={age}
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                </div>
                <div className="my-4">
                  <label className="form-control w-full max-w-xs">
                    <div className="label mb-2">
                      <span className="label-text text-white">Gender</span>
                    </div>
                    <input
                      type="text"
                      className="input"
                      placeholder="Choose your gender"
                      list="browsers"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <datalist id="browsers">
                      <option value="male"></option>
                      <option value="female"></option>
                    </datalist>
                  </label>
                </div>
                <div className="mt-4">
                  <label className="form-control w-full max-w-xs">
                    <div className="label mb-2">
                      <span className="label-text text-white">About</span>
                    </div>
                    <input
                      type="text"
                      value={about}
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-success" onClick={saveProfile}>
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="">
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
        </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Profile Updated successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
