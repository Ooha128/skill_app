import React from 'react';
function Header(){
    return(
        <div className="header">
            <div className="header__left">
            <img className="logo h-1/10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPtMBPwl1iY_dBR-4s9hx30cAAy1FiARfFT7mz6dxm&s"/>
            </div>
             <div className="header__center">
                <ul>
                    <li><a href="#">Problems</a></li>
                    <li><a href="#">Contests</a></li>
                </ul>
            </div>
             <div className="header__right">
            </div>
        </div>
    );
}

export default Header;