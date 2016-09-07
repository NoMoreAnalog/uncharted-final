import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';

import Section from './Section.jsx'
import ViewActiveTrigger from './ViewActiveTrigger.jsx';
import SideBarTrigger from './SideBarTrigger.jsx';

// Sidebar component - bar on right side of screen with filters
@observer(['countryStore', 'indicatorStore', 'store'])
class SideBar extends Component {

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
        this.props.store.resizeSectionScroller = this._handleResize;
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

        const props = this.props;

        return (
            <div ref={(ref) => this.sideBar = ref}
                 className={props.store.sideBarExpanded ?
                'side-bar expanded' :
                'side-bar'}>

                <SideBarTrigger />

                <Section
                    title={'Countries'}
                    list={props.countryStore.filteredCountries}
                    classed={props.store.activeIndicatorsOpen ? 'countries closed' : 'countries'}
                    itemStore={props.countryStore}
                />

                <Section
                    title={'Indicators'}
                    list={props.indicatorStore.filteredIndicators}
                    classed={props.store.activeIndicatorsOpen ? 'indicators closed' : 'indicators'}
                    itemStore={props.indicatorStore}
                />

                <ViewActiveTrigger />

                <Section
                    title={'Active Indicators'}
                    subtitle={'Click to deselect'}
                    list={props.indicatorStore.filteredActiveIndicators}
                    classed={props.store.activeIndicatorsOpen ? 'active-indicators open' : 'active-indicators closed'}
                    itemStore={props.indicatorStore}
                />

            </div>
        )
    }

}

export default SideBar;

SideBar.wrappedComponent.propTypes = {
    countryStore: PropTypes.any,
    indicatorStore: PropTypes.any,
    store: PropTypes.any
};

SideBar.wrappedComponent.defaultProps = {};
