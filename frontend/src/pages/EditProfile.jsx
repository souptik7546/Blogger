import React from 'react'
import { EditProfile as EditProfileComponent } from '../components/index'
import { useSelector } from 'react-redux'
function EditProfile() {
    const userData= useSelector(state=>state.auth.userData)
    
    
  return (
    <div className='py-8'>
        <EditProfileComponent userData={userData}/>
    </div>
  )
}

export default EditProfile