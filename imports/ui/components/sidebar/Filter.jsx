import React, {PropTypes, Component} from "react";
import {observer} from 'mobx-react';

// Filter component - used to filter countries and indicator sections
@observer(['store'])
class Filter extends Component {

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

        return this.props.store.sideBarExpanded ?

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

export default Filter;

Filter.wrappedComponent.propTypes = {
    itemStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired,
    useActiveFilter: PropTypes.bool
};

Filter.wrappedComponent.defaultProps = {
    useActiveFilter: false
};