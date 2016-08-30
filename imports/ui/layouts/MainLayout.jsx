import React, {PropTypes} from 'react';
import DevTools from 'mobx-react-devtools';
import {observer} from 'mobx-react';

import Sidebar from '../components/sidebar/SideBar.jsx';
import TopBar from '../components/topbar/TopBar.jsx';
import Charts from '../components/charts/ChartArea.jsx';

// MainLayout component - represents the whole app
const MainLayout = observer((props) =>

    <div className="main-layout">

        <TopBar/>
        <DevTools />

        <div className="container">

            <Charts
                countryStore={props.countryStore}
                indicatorStore={props.indicatorStore}
                uiStore={props.uiStore}
            />

            <Sidebar
                countryStore={props.countryStore}
                indicatorStore={props.indicatorStore}
                uiStore={props.uiStore}
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