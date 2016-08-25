import React from 'react';

import Sidebar from '../sidebar/SideBar.jsx';
import TopBar from '../topbar/TopBar.jsx';
import Charts from '../charts/Charts.jsx';

// App component - represents the whole app
const MainLayout = (props) => (
    <div className="main-layout">
        <TopBar/>
        <div className="container">
            <Charts/>
            <Sidebar/>
        </div>
    </div>
)

export default MainLayout;

MainLayout.propTypes = {};
MainLayout.defaultProps = {};