import React, {PropTypes, Component} from "react";
import {observer} from 'mobx-react';

import Filter from './Filter.jsx';
import Item from './Item.jsx';
import Steps from '../Steps.jsx';

// Section component - these make up the side bar
@observer(['chartStore'])
export default class Section extends Component {

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
            parseInt($(this.section).css('padding-bottom')) +
            parseInt($(this.header).css('margin-bottom'));

        this.scrollArea.style.height = height - padding + 'px';
        this.scrollArea.style.overflowY = 'scroll';
        this.scrollArea.style.overflowX = 'hidden';

    }

    componentDidMount() {

        const {chartStore} = {...this.props};

        window.addEventListener('resize', this._handleResize);
        window.addEventListener('scroll', this._handleResize);

        chartStore.resizeSectionScroller = this._handleResize;
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

        const {classed, title, subtitle, itemStore, list} = {...this.props};

        const step = classed === 'countries' ?
            <Steps number={1}/> :
            <Steps number={2}/>;

        return (

            <div className={'section ' + classed} ref={ref => this.section = ref}>

                {step}

                <div ref={ref => this.wrapper = ref}>

                    <h2 className='ui center aligned header' ref={ref => this.header = ref}>
                        {title}
                        <div className='ui center aligned sub header'>{subtitle}</div>
                    </h2>

                    <Filter
                        itemStore={itemStore}
                        useActiveFilter={title === 'Active Indicators'}
                    />

                </div>

                <div className='scrollArea' ref={ref => this.scrollArea = ref}>
                    <div className='ui list'>
                        {list.map(item =>
                            <Item
                                key={item._id}
                                itemStore={itemStore}
                                item={item}
                            />
                        )}
                    </div>
                </div>

            </div>
        )

    }

}

Section.wrappedComponent.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    list: PropTypes.array.isRequired,
    classed: PropTypes.string.isRequired,
    itemStore: PropTypes.any.isRequired
};

Section.wrappedComponent.defaultProps = {
    title: 'Title',
    subtitle: 'Click to select/deselect',
    list: [],
    classed: ''
};