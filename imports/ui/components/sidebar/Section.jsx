import React, {PropTypes, Component} from "react";
import {observer} from 'mobx-react';
import * as _ from 'lodash';

import Filter from './Filter.jsx';
import Item from './Item.jsx';
import Steps from '../Steps.jsx';

// Section component - these make up the side bar
@observer(['chartStore', 'countryStore'])
export default class Section extends Component {

    componentDidMount() {

        const {chartStore} = {...this.props};

        window.addEventListener('resize', this._handleResize);
        window.addEventListener('scroll', this._handleResize);
        this._handleResize();

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
        window.removeEventListener('scroll', this._handleResize);
    }

    componentDidUpdate() {
        this._handleResize();
    }

    _handleResize = () => {

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

    _selectClick = () => {
        const {countryStore} = {...this.props};
        countryStore.toggleAllCountries();
    }

    render() {

        const {classed, title, subtitle, itemStore, list, countryStore} = {...this.props};

        let selectStyle = {
            borderRadius: 2,
            cursor: 'pointer',
            padding: '1px 5px 3px 5px',
            display: 'inline-block',
            minWidth: 95
        };

        let selectText, step;

        if (classed === 'countries') {

            if (_.size(countryStore.activeCountries) === 0) {
                selectText = 'Select All';
                selectStyle = Object.assign({color: '#636363', backgroundColor: '#e3e3e3'}, selectStyle);
            } else {
                selectText = 'Deselect All';
                selectStyle = Object.assign({color: '#ffffff', backgroundColor: '#00adc6'}, selectStyle);
            }

            step = <Steps number={1}/>;

        } else if (classed === 'indicators') {
            step = <Steps number={2}/>;
        }

        return (

            <div className={'section ' + classed} ref={ref => this.section = ref}>

                {step}

                <div ref={ref => this.wrapper = ref}>

                    <h2 className='ui center aligned header' ref={ref => this.header = ref}>
                        {title}
                        <div className='ui center aligned sub header' style={{marginTop: 5, marginBottom: 5}}>
                            {subtitle}&nbsp;&nbsp;
                            <div style={selectStyle} onClick={this._selectClick}>{selectText}</div>
                        </div>
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