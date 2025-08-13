import React, { useState, useRef, useEffect } from 'react';
import { authFetch } from "../../user/apiService/authFetch"

import axios from 'axios';
import { data } from 'jquery';
import { api } from '../utils/api';
function AdminHeader() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
     const logout = () => {
  localStorage.clear();
  window.dispatchEvent(new Event('loggedOut'));
};
   const getInfoSeller = async () => {
    try {
        const response = await api.get("/userProfileResponse");
        console.log(response.data.email);
        setEmail(response.data.email);
        setUsername(response.data.username);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
    } catch (error) {
        console.log(error);
    }
};


useEffect(() => {
    getInfoSeller();
}, []);

return (
    <>
       <header className="header-wrapper main-header">
            <div className="header-inner-wrapper">
                <div className="header-right">
                    <div className="serch-wrapper">
                        <form>
                            <input type="text" placeholder="Search Here..."/>
                        </form>
                        <a className="search-close" href="javascript:void(0);"><span className="icofont-close-line"></span></a>
                    </div>
                    <div className="header-left">
                        <div className="header-links">
                          <a href="#" className="toggle-btn" onClick={(e) => {
  e.preventDefault();
  document.body.classList.toggle('mini-sidebar');
}}>
  <span></span>
</a>

                        </div>
                        {/* <div className="header-links search-link">
                        <a className="search-toggle" href="javascript:void(0);">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            style={{ enableBackground: 'new 0 0 56.966 56.966' }}
          >
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
              s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
              c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
              s-17-7.626-17-17S14.61,6,23.984,6z"
            />
          </svg>
        </a>
                        </div> */}
                    </div>
                    {email ? (
<>
   <div className="header-controls">
                        <div className="notification-wrapper header-links">
                            <a href="javascript:void(0);" className="notification-info">
                                <span className="header-icon">
                                    <svg enableBackground="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m450.201 407.453c-1.505-.977-12.832-8.912-24.174-32.917-20.829-44.082-25.201-106.18-25.201-150.511 0-.193-.004-.384-.011-.576-.227-58.589-35.31-109.095-85.514-131.756v-34.657c0-31.45-25.544-57.036-56.942-57.036h-4.719c-31.398 0-56.942 25.586-56.942 57.036v34.655c-50.372 22.734-85.525 73.498-85.525 132.334 0 44.331-4.372 106.428-25.201 150.511-11.341 24.004-22.668 31.939-24.174 32.917-6.342 2.935-9.469 9.715-8.01 16.586 1.473 6.939 7.959 11.723 15.042 11.723h109.947c.614 42.141 35.008 76.238 77.223 76.238s76.609-34.097 77.223-76.238h109.947c7.082 0 13.569-4.784 15.042-11.723 1.457-6.871-1.669-13.652-8.011-16.586zm-223.502-350.417c0-14.881 12.086-26.987 26.942-26.987h4.719c14.856 0 26.942 12.106 26.942 26.987v24.917c-9.468-1.957-19.269-2.987-29.306-2.987-10.034 0-19.832 1.029-29.296 2.984v-24.914zm29.301 424.915c-25.673 0-46.614-20.617-47.223-46.188h94.445c-.608 25.57-21.549 46.188-47.222 46.188zm60.4-76.239c-.003 0-213.385 0-213.385 0 2.595-4.044 5.236-8.623 7.861-13.798 20.104-39.643 30.298-96.129 30.298-167.889 0-63.417 51.509-115.01 114.821-115.01s114.821 51.593 114.821 115.06c0 .185.003.369.01.553.057 71.472 10.25 127.755 30.298 167.286 2.625 5.176 5.267 9.754 7.861 13.798z"/></svg>
                                </span>
                                <span className="count-notification"></span>
                            </a>
                            <div className="recent-notification">
                                <div className="drop-down-header">
                                    {/* All Notification */}
                                    <h4>Tất cả thông báo</h4>
                                    {/* You have 6 new notifications */}
                                    <p>Bạn có 6 thông báo mới</p>
                                </div>
                                <ul>
                                    <li>
                                        <a href="javascript:void(0);">
                                            {/* Storage Full */}
                                            <h5><i className="fas fa-exclamation-circle mr-2"></i>Bộ nhớ đầy</h5>
                                            <p>Vui lòng xoá 1 số thông tin để giảm bộ nhớ</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            {/* New Membership */}
                                            <h5><i className="far fa-envelope mr-2"></i>Thành viên mới</h5>
                                            <p>Thêm thành viên abc thành công!</p>
                                        </a>
                                    </li>
                                </ul>
                                <div className="drop-down-footer">
                                    {/* View All */}
                                    <a href="javascript:void(0);" className="btn sm-btn">
                                        Xem tất cả
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="user-info-wrapper header-links">
                            <a href="javascript:void(0);" className="user-info">
                                <img src="../../assets/admin/images/user.jpg" alt="" className="user-img"/>
                                <div className="blink-animation">
                                    <span className="blink-circle"></span>
                                    <span className="main-circle"></span>
                                </div>
                            </a>
                            <div className="user-info-box">
                                <div className="drop-down-header">
                                    <h4>{firstName + " " + lastName}</h4>
                                    <p>{username}</p>
                                </div>
                                <ul>
                               
                               
                                    <li>
                                        <button  onClick={() => {
                                                  logout();
                                                  window.dispatchEvent(new Event('loggedOut'));
                                                  window.location.href = '/seller';
                                                }}>
                                        {/* Logout */}
                                            <i className="fas fa-sign-out-alt"></i> 
                                            Đăng xuất
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
</>
                    ):(
                        <>  <div className="header-controls">
                        <div className="notification-wrapper header-links">
                            <a href="javascript:void(0);" className="notification-info">
                                <span className="header-icon">
                                    <svg enableBackground="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m450.201 407.453c-1.505-.977-12.832-8.912-24.174-32.917-20.829-44.082-25.201-106.18-25.201-150.511 0-.193-.004-.384-.011-.576-.227-58.589-35.31-109.095-85.514-131.756v-34.657c0-31.45-25.544-57.036-56.942-57.036h-4.719c-31.398 0-56.942 25.586-56.942 57.036v34.655c-50.372 22.734-85.525 73.498-85.525 132.334 0 44.331-4.372 106.428-25.201 150.511-11.341 24.004-22.668 31.939-24.174 32.917-6.342 2.935-9.469 9.715-8.01 16.586 1.473 6.939 7.959 11.723 15.042 11.723h109.947c.614 42.141 35.008 76.238 77.223 76.238s76.609-34.097 77.223-76.238h109.947c7.082 0 13.569-4.784 15.042-11.723 1.457-6.871-1.669-13.652-8.011-16.586zm-223.502-350.417c0-14.881 12.086-26.987 26.942-26.987h4.719c14.856 0 26.942 12.106 26.942 26.987v24.917c-9.468-1.957-19.269-2.987-29.306-2.987-10.034 0-19.832 1.029-29.296 2.984v-24.914zm29.301 424.915c-25.673 0-46.614-20.617-47.223-46.188h94.445c-.608 25.57-21.549 46.188-47.222 46.188zm60.4-76.239c-.003 0-213.385 0-213.385 0 2.595-4.044 5.236-8.623 7.861-13.798 20.104-39.643 30.298-96.129 30.298-167.889 0-63.417 51.509-115.01 114.821-115.01s114.821 51.593 114.821 115.06c0 .185.003.369.01.553.057 71.472 10.25 127.755 30.298 167.286 2.625 5.176 5.267 9.754 7.861 13.798z"/></svg>
                                </span>
                                <span className="count-notification"></span>
                            </a>
                            <div className="recent-notification">
                                <div className="drop-down-header">
                                    {/* All Notification */}
                                    <h4>Tất cả thông báo</h4>
                                    {/* You have 6 new notifications */}
                                    <p>Bạn có 6 thông báo mới</p>
                                </div>
                                <ul>
                                    <li>
                                        <a href="javascript:void(0);">
                                            {/* Storage Full */}
                                            <h5><i className="fas fa-exclamation-circle mr-2"></i>Bộ nhớ đầy</h5>
                                            <p>Vui lòng xoá 1 số thông tin để giảm bộ nhớ</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            {/* New Membership */}
                                            <h5><i className="far fa-envelope mr-2"></i>Thành viên mới</h5>
                                            <p>Thêm thành viên abc thành công!</p>
                                        </a>
                                    </li>
                                </ul>
                                <div className="drop-down-footer">
                                    {/* View All */}
                                    <a href="javascript:void(0);" className="btn sm-btn">
                                        Xem tất cả
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="user-info-wrapper header-links">
                            <a href="javascript:void(0);" className="user-info">
                                <img src="../../assets/admin/images/user.jpg" alt="" className="user-img"/>
                                <div className="blink-animation">
                                    <span className="blink-circle"></span>
                                    <span className="main-circle"></span>
                                </div>
                            </a>
                            <div className="user-info-box">
                                <div className="drop-down-header">
                                    <h4>Chưa Đăng Nhập</h4>
                                </div>
                                <ul>
                                   
                                  
                                    <li>
                                        <a href="/seller/authentication/login">
                                        {/* Logout */}
                                            <i className="fas fa-sign-out-alt"></i> 
                                           Đăng Nhập
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div></>
                    )}
     
                </div>
            </div>
        </header></>
)
}
 

  
  export default AdminHeader;