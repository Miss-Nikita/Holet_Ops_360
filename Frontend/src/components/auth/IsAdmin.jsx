import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const IsAdmin = ({children}) => {
const navigate = useNavigate();
const isAdmin = useSelector(store => store.user?.user?.isAdmin);
console.log(isAdmin);

useEffect(()=>{
    if(!isAdmin){
        toast.error("You are not an admin");
        return navigate('/');
    }
},[isAdmin,navigate])


return isAdmin && children
}

export default IsAdmin
