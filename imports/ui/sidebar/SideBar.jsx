import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

import Section from './Section.jsx'

// Sidebar component - bar on right side of screen with filters
const Sidebar = observer((props) =>

    <div className="side-bar">

        <Section
            title={'Countries'}
            subtitle={'Click to select/deselect'}
            list={props.countryStore.countries}
            classed="countries"
        />

        <Section
            title={'Indicators'}
            subtitle={'Click to select/deselect'}
            list={props.indicatorStore.indicators}
            classed="indicators"
        />

        <div className="view-active-trigger">
            <a href="#" onClick={props.uiStore.toggleActiveIndicators}>
                {props.uiStore.open ?
                    <div><img src="ic_expand_more_white_24dp_2x.png"/>View Countries and Indicators</div> :
                    <div><img src="ic_expand_less_white_24dp_2x.png"/>View Active Indicators</div>}
            </a>
        </div>

        <Section
            title={'Active Indicators'}
            subtitle={'Click to deselect'}
            list={props.indicatorStore.active}
            classed={props.uiStore.open ? 'active-indicators-open' : 'active-indicators-closed'}
        />

    </div>
)

Sidebar.propTypes = {
    countryStore: PropTypes.any,
    indicatorStore: PropTypes.any,
    uiStore: PropTypes.any
};

Sidebar.defaultProps = {};

export default Sidebar;
