// Libs
import React, {Component} from 'react';
import DevTools from 'mobx-react-devtools';
import {observer} from 'mobx-react';

// Components
import Steps from '../components/Steps';
import NavBar from '../components/topbars/NavBar.jsx';
import ChartSelector from '../components/topbars/ChartSelector.jsx';
import ChartArea from '../components/charts/ChartArea.jsx';
import Footer from '../components/Footer.jsx';
import SideBar from '../components/sidebar/SideBar.jsx';

// ChartsLayout component - represents the charts portion of the app
@observer(['chartStore'])
export default class ChartsLayout extends Component {

    render() {

        const {chartStore} = {...this.props};

        return (
            <div className="charts-layout">

                <DevTools />

                <div className="top-bar">
                    <NavBar />
                    <ChartSelector />
                </div>

                <div className={chartStore.sideBarExpanded ? 'content-wrapper shrink' : 'content-wrapper'}>
                    <ChartArea />
                    <Footer />
                </div>

                <SideBar />

                <Steps />

            </div>
        )

    }

}