import React, {PropTypes} from 'react';
import DevTools from 'mobx-react-devtools';
import {observer, inject} from 'mobx-react';
import {StickyContainer} from 'react-sticky';

import Sidebar from '../components/sidebar/SideBar.jsx';
import TopBar from '../components/topbar/TopBar.jsx';
import Charts from '../components/charts/ChartArea.jsx';

// MainLayout component - represents the whole app
const MainLayout = observer(['countryStore', 'indicatorStore', 'store'], (props) =>

    <StickyContainer>

        <div className="main-layout">

            <TopBar />
            <DevTools />

            <div className="container">
                <Charts />
                <Sidebar />
            </div>

        </div>

    </StickyContainer>
)

export default MainLayout;

MainLayout.wrappedComponent.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

MainLayout.wrappedComponent.defaultProps = {};