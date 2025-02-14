import React, { useState, useEffect } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setSearchText, setTheme } from '../redux/appSlice';  // Ensure setTheme action is added
import axios from 'axios';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
    const [text, setText] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false); // New state for theme modal
    const { user, theme } = useSelector(store => store.app); // Access theme from Redux store
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/user/logout', { withCredentials: true });
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const toggleThemeModal = () => {
        setIsThemeModalOpen(prevState => !prevState); // Toggle theme modal visibility
    };

    const handleThemeChange = (selectedTheme) => {
        dispatch(setTheme(selectedTheme)); // Dispatch the selected theme
        setIsThemeModalOpen(false); // Close the modal after selecting a theme
    };

    const goToHelp = () => {
        window.open("https://support.google.com/mail/community?hl=en&sjid=17638739320423745917-NA", "_blank");
        setIsDropdownOpen(false);
    };

    const goToTraining = () => {
        window.open("https://support.google.com/a/users/answer/9259748?visit_id=01739563116181-4884766070484708910&p=gmail_training&rd=1", "_blank");
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        dispatch(setSearchText(text));
    }, [text]);

    return (
        <div className={`flex items-center justify-between mx-3 h-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className='flex items-center gap-10'>
                <div className='flex items-center gap-2'>
                    <div 
                        className='p-3 hover:bg-gray-200 rounded-full cursor-pointer' 
                        onClick={toggleSidebar}
                    >
                        <RxHamburgerMenu />
                    </div>
                    <img className='w-14' src="https://img.freepik.com/free-vector/yellow-envelope-with-red-circle-notification-3d-illustration-cartoon-drawing-business-e-mail-letter-3d-style-white-background-business-communication-mail-concept_778687-1674.jpg" alt="logo" />
                    <h1 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-500'} font-medium`}>MailNest</h1>
                </div>
            </div>
            {
                user && (
                    <>
                        <div className={`w-[50%] mr-60 ${theme === 'dark' ? 'bg-gray-700' : 'bg-[#EAF1FB]'}`}>
                            <div className={`flex items-center px-2 py-3 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-[#EAF1FB]'}`}>
                                <IoIosSearch size={'24px'} className={theme === 'dark' ? 'text-white' : 'text-gray-700'} />
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder='Search Mail'
                                    className={`rounded-full w-full bg-transparent outline-none px-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                />
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='relative'>
                                <div 
                                    className={`p-2 rounded-full hover:bg-gray-200 cursor-pointer ${theme === 'dark' ? 'text-white' : 'text-black'}`} 
                                    onClick={toggleDropdown}
                                >
                                    <CiCircleQuestion size={'24px'} />
                                </div>
                                {isDropdownOpen && (
                                    <div className='absolute top-8 right-0 bg-white shadow-lg rounded-md w-48'>
                                        <ul>
                                            <li 
                                                onClick={goToHelp} 
                                                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                                            >
                                                Help
                                            </li>
                                            <li 
                                                onClick={goToTraining} 
                                                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                                            >
                                                Training
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer' onClick={toggleThemeModal}>
                                <IoIosSettings size={'24px'} className={theme === 'dark' ? 'text-white' : 'text-black'} />
                            </div>
                            <div className="flex flex-col items-center">
                                <Avatar src={user.profilePhoto} size="40" round={true} />
                                <span 
                                    onClick={logoutHandler} 
                                    className={`underline cursor-pointer mt-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                >
                                    Logout
                                </span>
                            </div>
                        </div>

                        {/* Theme Modal */}
                        {isThemeModalOpen && (
                            <div className={`absolute top-16 right-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-4 rounded-lg shadow-lg`}>
                                <h2 className="font-bold">Choose Theme</h2>
                                <div className="flex flex-col gap-2 mt-3">
                                    <button
                                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                                        onClick={() => handleThemeChange('light')}
                                    >
                                        Light Theme
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded"
                                        onClick={() => handleThemeChange('dark')}
                                    >
                                        Dark Theme
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )
            }
        </div>
    );
};

export default Navbar;
