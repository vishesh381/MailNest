/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { FaCaretDown, FaUserFriends } from "react-icons/fa"
import { IoMdMore, IoMdRefresh } from 'react-icons/io'
import { GoTag } from "react-icons/go";
import Emails from './Emails';
import { useSelector } from 'react-redux'; // Import useSelector

const mailType = [
    {
        icon: <MdInbox size={'20px'} />,
        text: "Primary"
    },
    {
        icon: <GoTag size={'20px'} />,
        text: "Promotions"
    },
    {
        icon: <FaUserFriends size={'20px'} />,
        text: "Social"
    },
]

const Inbox = () => {
    const [selected, setSelected] = useState(0);
    const { theme } = useSelector(store => store.app); // Access the theme from the Redux store

    const textColor = theme === 'dark' ? 'text-white' : 'text-gray-600'; // Conditional text color
    const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white'; // Conditional background color for dark and light themes
    const hoverBgColor = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'; // Hover color for dark and light themes

    return (
        <div className={`flex-1 rounded-xl mx-5 ${bgColor}`}>
            <div className='flex items-center justify-between px-4 my-2'>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-1'>
                        <MdCropSquare size={'20px'} />
                        <FaCaretDown size={'20px'} />
                    </div>
                    <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                        <IoMdRefresh size={'20px'} />
                    </div>
                    <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                        <IoMdMore size={'20px'} />
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <span>1 to 50</span>
                    <MdKeyboardArrowLeft size="24px" />
                    <MdKeyboardArrowRight size="24px" />
                </div>
            </div>
            <div className='h-90vh overflow-y-auto'>
                <div className='flex items-center gap-1'>
                    {
                        mailType.map((item, index) => {
                            return (
                                <button
                                    onClick={() => setSelected(index)}
                                    className={` ${selected === index ? "border-b-4 border-b-blue-600 text-blue-600" : "border-b-4 border-b-transparent"} flex items-center gap-5 p-4 w-52 ${textColor} ${hoverBgColor}`}
                                >
                                    {item.icon}
                                    <span>{item.text}</span>
                                </button>
                            )
                        })
                    }
                </div>
                <Emails />
            </div>
        </div>
    )
}

export default Inbox;
