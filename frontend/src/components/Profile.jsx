import React from 'react'
import { useSelector } from 'react-redux'
import {Button} from './index';
import { useNavigate } from 'react-router-dom';
function Profile() {
  const userData= useSelector(state=> state.auth.userData)
  const navigate=useNavigate()
  const handleEditProfile= ()=>{
    navigate("/update-profile")
  }
  const handleChangePassword= ()=>{
    navigate("/change-password")
  }
  
  return (
     <div className="min-h-screen bg-gray-0 dark:bg-gray-700 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl border border-gray-400 dark:border-gray-700">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Profile
          </h2>

          <div className="flex gap-2">
            <Button onClick={handleEditProfile} className="px-3 py-1.5 text-sm rounded-md border dark:bg-white border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-200 transition">
              Edit Profile
            </Button>
            <Button onClick={handleChangePassword} className="px-3 py-1.5 text-sm rounded-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition">
              Change Password
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex gap-10">

          {/* Avatar box */}
          <div className="shrink-0">
            <div className="w-28 h-28 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-1">
              <img
                src={userData?.avatar}
                alt="Avatar"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Full name :
              </p>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {userData?.fullname}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Username :
              </p>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                @{userData?.username}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Email :
              </p>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {userData?.email}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>


  )
}

export default Profile