import React, {PropTypes, Component} from 'react';
import {inject, observer} from 'mobx-react';

import NavBar from './NavBar.jsx';

// TopBar component - bar on top of page with chart options
@inject(['store']) @observer
class TopBar extends Component {

    constructor(props) {

        super(props);

        const store = props.store;

        this._drawBar = store.drawChart.bind(this, 'bar');
        this._drawLine = store.drawChart.bind(this, 'line');
        this._drawRadar = store.drawChart.bind(this, 'radar');
        this._drawScatter = store.drawChart.bind(this, 'scatter');

    }

    componentDidMount() {
        var menu = document.querySelector('.chart-types');
        var menuPosition = menu.getBoundingClientRect();
        var placeholder = document.createElement('div');
        placeholder.style.width = menuPosition.width + 'px';
        placeholder.style.height = menuPosition.height + 'px';
        var isAdded = false;

        window.addEventListener('scroll', function () {
            if (window.pageYOffset >= menuPosition.top && !isAdded) {
                menu.classList.add('sticky');
                menu.parentNode.insertBefore(placeholder, menu);
                isAdded = true;
            } else if (window.pageYOffset < menuPosition.top && isAdded) {
                menu.classList.remove('sticky');
                menu.parentNode.removeChild(placeholder);
                isAdded = false;
            }
        });
    }

    render() {

        const store = this.props.store;

        const classNameBar = store.barActive ? 'chart-type active' : 'chart-type';
        const classNameLine = store.lineActive ? 'chart-type active' : 'chart-type';
        const classNameRadar = store.radarActive ? 'chart-type active' : 'chart-type';
        const classNameScatter = store.scatterActive ? 'chart-type active' : 'chart-type';

        const imgBar = store.barDraw ? <img src="bar-selected.svg"/> : <img src="bar.svg"/>;
        const imgLine = store.lineDraw ? <img src="line-selected.svg"/> : <img src="line.svg"/>;
        const imgRadar = store.radarDraw ? <img src="radar-selected.svg"/> : <img src="radar.svg"/>;
        const imgScatter = store.scatterDraw ? <img src="scatter-selected.svg"/> : <img src="scatter.svg"/>;

        return (
            <div className="top-bar">

                <NavBar/>

                <div className="chart-types">

                    <div className="label">Available Graphs:</div>

                    <button onClick={this._drawBar} className={classNameBar}>{imgBar} Bar</button>
                    <button onClick={this._drawLine} className={classNameLine}>{imgLine} Line</button>
                    <button onClick={this._drawRadar} className={classNameRadar}>{imgRadar} Radar</button>
                    <button onClick={this._drawScatter} className={classNameScatter}>{imgScatter} Scatter</button>

                </div>

            </div>
        )

    }

}

export default TopBar;

TopBar.wrappedComponent.propTypes = {
    store: PropTypes.any.isRequired
};

TopBar.wrappedComponent.defaultProps = {};