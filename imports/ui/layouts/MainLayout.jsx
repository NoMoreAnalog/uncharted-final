import React, {PropTypes} from 'react';
import DevTools from 'mobx-react-devtools';
import {observer} from 'mobx-react';

import Sidebar from '../sidebar/SideBar.jsx';
import TopBar from '../topbar/TopBar.jsx';
import Charts from '../charts/Charts.jsx';

// MainLayout component - represents the whole app
const MainLayout = observer((props) =>

    <div className="main-layout">

        <TopBar/>
        <DevTools />

        <div className="container">
            <Charts/>
            <input
                className="side-bar-trigger"
                type="checkbox"
                id="trigger"
            /><label htmlFor="trigger"></label>
            <Sidebar
                countryStore={props.countryStore}
                indicatorStore={props.indicatorStore}
            />
        </div>

    </div>

)

export default MainLayout;

MainLayout.propTypes = {
    countryStore: PropTypes.any,
    indicatorStore: PropTypes.any
};

MainLayout.defaultProps = {};