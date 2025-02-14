import React from 'react'
import { IoMdStar } from 'react-icons/io';
import { LuPencil } from "react-icons/lu";
import { MdInbox, MdMore, MdOutlineDrafts, MdOutlineKeyboardArrowDown, MdOutlineWatchLater } from "react-icons/md";
import { TbSend2 } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../redux/appSlice';

const sidebarItems = [
    { icon: <MdInbox size={'20px'} />, text: "Inbox" },
    { icon: <IoMdStar size={'20px'} />, text: "Starred" },
    { icon: <MdOutlineWatchLater size={'20px'} />, text: "Snoozed" },
    { icon: <TbSend2 size={'20px'} />, text: "Sent" },
    { icon: <MdOutlineDrafts size={'20px'} />, text: "Drafts" },
    { icon: <MdOutlineKeyboardArrowDown size={'20px'} />, text: "More" }
];

const Sidebar = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector(store => store.app); // Access the current theme from Redux store

    const textColor = theme === 'dark' ? 'text-white' : 'text-gray-600'; // Conditional text color based on theme

    return (
        <div className={`w-[15%] transition-all duration-300`}>
            <div className='p-3'>
                <button 
                    onClick={() => dispatch(setOpen(true))} 
                    className='flex items-center gap-2 bg-[#C2E7FF] p-4 rounded-2xl hover:shadow-md'
                >
                    <LuPencil size="24px" />
                    Compose
                </button>
            </div>
            <div className={textColor}>
                {sidebarItems.map((item, index) => (
                    <div key={index} className='flex items-center pl-6 py-1 rounded-r-full gap-4 my-2 hover:cursor-pointer hover:bg-gray-200'>
                        {item.icon}
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
