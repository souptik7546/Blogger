import React, { useState } from 'react'
import authService from '../service/auth.service'
import {Input,Button} from "./index"
import { useNavigate } from 'react-router-dom'
function PasswordForm() {
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [oldPassword,setOldPassword]=useState("")
    const navigate=useNavigate()


    const changePasswordHandler= (e)=>{
        e.preventDefault()
        if(newPassword!==confirmPassword){
            throw Error("both the fields should be same")
        }
        authService
        .changePassword(oldPassword,newPassword)
        .then((data)=>{
            console.log(data)    
        })
        .catch((error)=>{
            console.log(error) 
        })
        .finally(()=>{
            navigate("/")
        })
    }
  return (
     <div className="min-h-screen bg-gray-50 dark:bg-gray-700 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Change Password :
          </h2>
        </div>

        
        <form className="p-6 space-y-8" onSubmit={changePasswordHandler}>
          <Input
            label="New Password:"
            type="password"
            value={newPassword}
            onChange={(e)=>{setNewPassword(e.target.value)}}
          />

          <Input
            label="Confirm Password:"
            type="password"
            value={confirmPassword}
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
          />

          <Input
            label="Current Password :"
            type="password"
            value={oldPassword}
            onChange={(e)=>{setOldPassword(e.target.value)}}
          />

          <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="submit"
              className="px-5 py-2 text-sm rounded-md bg-gray-900 dark:bg-white
                         text-white dark:text-gray-900 hover:opacity-90"
            >
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordForm