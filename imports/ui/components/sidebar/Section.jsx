import React, {PropTypes, Component} from "react";
import {observer} from 'mobx-react';

import Filter from './Filter.jsx';
import Item from './Item.jsx';

// Section component - these make up the side bar
@observer(['store'])
class Section extends Component {

    constructor() {
        super();
        this._handleResize = this._handleResize.bind(this);
    }

    _handleResize() {

        // Set the scroll area height or it is not scrollable

        const height =
            this.section.clientHeight -
            this.wrapper.clientHeight;

        const padding =
            parseInt($(this.section).css('padding-top')) +
            parseInt($(this.section).css('padding-bottom'));

        this.scrollArea.style.height = height - padding + 'px';
        this.scrollArea.style.overflowY = 'scroll';

    }

    componentDidMount() {
        window.addEventListener('resize', this._handleResize);
        this._handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
    }

    render() {

        const props = this.props;

        return (

            <div
                className={'section ' + props.classed}
                ref={(ref) => this.section = ref}>

                <div ref={(ref) => this.wrapper = ref}>
                    <div className="title">{props.title}</div>
                    <div className="subtitle">{props.subtitle}</div>
                    <Filter
                        itemStore={props.itemStore}
                        useActiveFilter={props.title === 'Active Indicators'}
                    />
                </div>

                <div ref={(ref) => this.scrollArea = ref}>
                    <ul className="ui list">
                        {props.list.map(item =>
                            <Item
                                key={item._id}
                                itemStore={props.itemStore}
                                item={item}
                            />
                        )}
                    </ul>
                </div>

            </div>
        )

    }

}

export default Section;

Section.wrappedComponent.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    list: PropTypes.array.isRequired,
    classed: PropTypes.string.isRequired,
    itemStore: PropTypes.any.isRequired,
    store: PropTypes.any
};

Section.wrappedComponent.defaultProps = {
    title: 'Title',
    subtitle: 'Click to select/deselect',
    list: [],
    classed: ''
};