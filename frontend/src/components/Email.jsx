/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { MdCropSquare, MdOutlineStarBorder } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedEmail } from '../redux/appSlice';
import { formatDistanceToNow, isToday, parseISO } from 'date-fns'; // Import necessary functions

// eslint-disable-next-line react/prop-types
const Email = ({ email }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openMail = () => {
        dispatch(setSelectedEmail(email));
        // eslint-disable-next-line react/prop-types
        navigate(`/mail/${email._id}`);
    }

    // Parse the createdAt date
    const createdAt = parseISO(email?.createdAt); 

    // Format the time display
    const formattedTime = isToday(createdAt) ? 'Today' : `${formatDistanceToNow(createdAt)} ago`;

    return (
        <div onClick={openMail} className='flex items-center justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md'>
            <div className='flex items-center gap-3'>
                <div className='text-gray-400'>
                    <MdCropSquare size={'20px'} />
                </div>
                <div className='text-gray-400'>
                    <MdOutlineStarBorder size={'20px'} />
                </div>
                <div>
                    <h1 className='font-semibold'>{email?.subject}</h1>
                </div>
            </div>
            <div className='flex-1 ml-4' >
                <p>{email?.message}</p>
            </div>
            <div className='flex-none text-gray text-sm'>
                <p>{formattedTime}</p> {/* Display formatted time */}
            </div>
        </div>
    )
}

export default Email;
