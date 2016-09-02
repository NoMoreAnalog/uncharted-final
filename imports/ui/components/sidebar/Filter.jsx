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

        const className = this.props.store.sideBarExpanded ? 'filter show' : 'filter hide';

        return (
            <input
                className={className}
                placeholder="Search"
                onChange={this._onChange}
                ref={(ref) => this.input = ref}
            />
        )
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