import React, {PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import Section from './Section.jsx'

import {Countries} from '../../api/countries.js';
import {Indicators} from '../../api/indicators.js';

// Sidebar component - bar on right side of screen with filters
const Sidebar = (props) => (

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

export default createContainer(() => {

    Meteor.subscribe('countries');
    Meteor.subscribe('indicators');

    return {
        countries: Countries.find({}, {sort: {createdAt: -1}}).fetch(),
        indicators: Indicators.find({}, {sort: {createdAt: -1}}).fetch(),
    };

}, Sidebar);
