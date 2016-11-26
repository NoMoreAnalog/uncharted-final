import React, {PropTypes} from 'react';
import DevTools from 'mobx-react-devtools';
import {observer, inject} from 'mobx-react';

import NavBar from '../components/topbars/NavBar.jsx';
import ChartSelector from '../components/topbars/ChartSelector.jsx';
import Charts from '../components/charts/ChartArea.jsx';
import Footer from '../components/Footer.jsx';
import SideBar from '../components/sidebar/SideBar.jsx';

// ChartsLayout component - represents the chart portion of the app
const ChartsLayout = observer(['countryStore', 'indicatorStore', 'store'], (props) =>

    <div className="charts-layout">

        <DevTools />

        <div className="top-bar">
            <NavBar />
            <ChartSelector />
        </div>

        <div className={props.store.sideBarExpanded ? 'content-wrapper shrink' : 'content-wrapper'}>
            <Charts />
            <Footer />
        </div>

        <SideBar />
        
    </div>

)

export default ChartsLayout;