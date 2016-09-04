import React from 'react';
import {observer} from 'mobx-react';

const NavBar = observer((props) =>

    <div className="nav-bar">

        <div className="left">
            <img className="unaki" src="UNAKI.png"/>
        </div>

        {/*<div className="center">*/}

            {/*<ul className="top">*/}
                {/*<li className="language"><img src="language.png"/>Language</li>*/}
                {/*<li className="lock"><img src="lock.png"/>Log In/Register</li>*/}
                {/*<li className="twitter"><img src="twitter.png"/></li>*/}
                {/*<li className="facebook"><img src="facebook.png" alt=""/></li>*/}
            {/*</ul>*/}

            {/*<ul className="bottom">*/}
                {/*<li>*/}
                    {/*<hr/>*/}
                    {/*HOME*/}
                {/*</li>*/}
                {/*<li>*/}
                    {/*<hr/>*/}
                    {/*DATA*/}
                {/*</li>*/}
                {/*<li>*/}
                    {/*<hr/>*/}
                    {/*INDEX*/}
                {/*</li>*/}
                {/*<li>*/}
                    {/*<hr/>*/}
                    {/*CONTACT US*/}
                {/*</li>*/}
            {/*</ul>*/}

        {/*</div>*/}

        {/*<div className="right">*/}
            {/*<img className="k4a" src="K4A.png"/>*/}
            {/*<img className="undp" src="UNDP.png"/>*/}
            {/*<img className="mbr" src="MBR.png"/>*/}
        {/*</div>*/}

    </div>

)

export default NavBar;

NavBar.propTypes = {};
NavBar.defaultProps = {};