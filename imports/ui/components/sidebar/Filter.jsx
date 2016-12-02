import React, {PropTypes, Component} from "react";
import {observer} from 'mobx-react';

// Filter component - used to filter countries and indicator sections
@observer(['chartStore'])
export default class Filter extends Component {

    _onChange = () => {
        const {useActiveFilter, itemStore} = {...this.props};
        useActiveFilter ? itemStore.activeFilter = this.input.value : itemStore.filter = this.input.value;
    }

    render() {

        const {chartStore, itemStore} = {...this.props};

        const placeHolder = itemStore._randomList(3);

        return chartStore.sideBarExpanded ?

            <div className="ui fluid icon input">
                <input
                    type="text"
                    className="filter"
                    placeholder={'Search    Example: ' + placeHolder}
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