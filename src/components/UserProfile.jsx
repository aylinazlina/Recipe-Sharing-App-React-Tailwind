import React from 'react'
import { MdCloudUpload } from "react-icons/md";
const UserProfile = () => {

  const  uploadImage=()=>{
    alert("hi mern!")

    }

  return (
    <div>
      <div className="w-[50px] h-[50px] bg-green-500 rounded-full mt-5 ml-[92%] relative cursor-pointer group">
        <img src='https://images.pexels.com/photos/32168086/pexels-photo-32168086/free-photo-of-scenic-mediterranean-village-with-sea-view.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' className='w-full h-full object-fit-cover rounded-full ' 
         
        />
        <span  onClick={uploadImage} className="hidden group-hover:block text-[32px] text-white absolute bottom-4 left-2"><MdCloudUpload/></span>
       </div>
    </div>
  )
}

export default UserProfile
