import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';

import Section from './Section.jsx'
import ViewActiveTrigger from './ViewActiveTrigger.jsx';
import SideBarTrigger from './SideBarTrigger.jsx';

// Sidebar component - bar on right side of screen with filters
@observer(['countryStore', 'indicatorStore', 'chartStore'])
export default class SideBar extends Component {

    constructor() {
        super();
        this._handleResize = this._handleResize.bind(this);
    }

    _handleResize() {

        const height = window.innerHeight -
            document.getElementsByClassName('chart-selector')[0].getBoundingClientRect().bottom;

        this.sideBar.style.height = height  + 'px';

    }

    componentDidMount() {

        window.addEventListener('resize', this._handleResize);
        window.addEventListener('scroll', this._handleResize);
        this.props.chartStore.resizeSectionScroller = this._handleResize;
        this._handleResize();

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
        window.removeEventListener('scroll', this._handleResize);
    }

    componentDidUpdate() {
        this._handleResize();
    }

    render() {

        const {chartStore, countryStore, indicatorStore} = {...this.props};

        return (
            <div ref={(ref) => this.sideBar = ref}
                 className={chartStore.sideBarExpanded ?
                'side-bar expanded' :
                'side-bar'}>

                <SideBarTrigger />

                <Section
                    title={'Countries'}
                    list={countryStore.filteredCountries}
                    classed={chartStore.activeIndicatorsOpen ? 'countries closed' : 'countries'}
                    itemStore={countryStore}
                />

                <Section
                    title={'Indicators'}
                    list={indicatorStore.filteredIndicators}
                    classed={chartStore.activeIndicatorsOpen ? 'indicators closed' : 'indicators'}
                    itemStore={indicatorStore}
                />

                <ViewActiveTrigger />

                <Section
                    title={'Active Indicators'}
                    subtitle={'Click to deselect'}
                    list={indicatorStore.filteredActiveIndicators}
                    classed={chartStore.activeIndicatorsOpen ? 'active-indicators open' : 'active-indicators closed'}
                    itemStore={indicatorStore}
                />

            </div>
        )
    }

}
