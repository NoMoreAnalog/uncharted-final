import React, {PropTypes, Component} from "react";
import {observer} from 'mobx-react';

// Filter component - used to filter countries and indicator sections
@observer(['chartStore'])
export default class Filter extends Component {

    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
    }

    _onChange() {
        this.props.useActiveFilter ?
            this.props.itemStore.activeFilter = this.input.value :
            this.props.itemStore.filter = this.input.value;
    }

    render() {

        return this.props.chartStore.sideBarExpanded ?

            <div className="ui fluid icon input">
                <input
                    type="text"
                    className="filter"
                    placeholder="Search"
                    onChange={this._onChange}
                    ref={(ref) => this.input = ref}
                />
                <i className="search icon"/>
            </div>

            : <div/>;

    }

}

Filter.wrappedComponent.propTypes = {
    itemStore: PropTypes.any.isRequired,
    useActiveFilter: PropTypes.bool
};

Filter.wrappedComponent.defaultProps = {
    useActiveFilter: false
};