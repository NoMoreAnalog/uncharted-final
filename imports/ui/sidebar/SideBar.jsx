import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

import Section from './Section.jsx'

// Sidebar component - bar on right side of screen with filters
const Sidebar = observer((props) =>

    <div className="side-bar">

        <Section
            title={'Countries'}
            subtitle={'Click to select/deselect'}
            list={props.countries}
            classed="countries"
        />

        <Section
            title={'Indicators'}
            subtitle={'Click to select/deselect'}
            list={props.indicators}
            classed="indicators"
        />

        <Section
            title={'Active Indicators'}
            subtitle={'Click to deselect'}
            list={[]}
            classed="active-indicators"
        />

    </div>

)

Sidebar.propTypes = {
    countries: PropTypes.array.isRequired,
    indicators: PropTypes.array.isRequired
};

Sidebar.defaultProps = {
    countries: [],
    indicators: []
};

export default Sidebar;
