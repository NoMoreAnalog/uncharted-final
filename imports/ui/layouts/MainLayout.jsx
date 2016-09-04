import React, {PropTypes} from 'react';
import DevTools from 'mobx-react-devtools';
import {observer, inject} from 'mobx-react';

import Sidebar from '../components/sidebar/SideBar.jsx';
import NavBar from '../components/topbars/NavBar.jsx';
import ChartSelector from '../components/topbars/ChartSelector.jsx';
import Charts from '../components/charts/ChartArea.jsx';

// MainLayout component - represents the whole app
const MainLayout = observer(['countryStore', 'indicatorStore', 'store'], (props) =>

    <div className="main-layout">

        <DevTools />

        <div className="top-bar">
            <NavBar />
            <ChartSelector />
        </div>

        <div className="container">
            <Charts />
            <Sidebar />
        </div>

    </div>
)

export default MainLayout;

MainLayout.wrappedComponent.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

MainLayout.wrappedComponent.defaultProps = {};