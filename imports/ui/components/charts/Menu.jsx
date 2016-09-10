import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';

// Menu component - Placed in chart stage for print and export options
@observer(['store'])
class Menu extends Component {

    componentDidMount() {
        $(this.dropdown)
            .dropdown({
                on: 'hover'
            });
    }

    render() {

        return (

            <div className="chart-menu">
                <div className="ui right pointing dropdown icon" ref={(ref) => this.dropdown = ref}>
                    <i className="large content icon"></i>
                    <div className="menu">
                        <div className="item"><i className="large blue save icon"></i> Save as PNG</div>
                        <div className="item"><i className="large green file excel outline icon"></i> Export data</div>
                    </div>
                </div>
            </div>

        )

    }

}

export default Menu;

Menu.wrappedComponent.propTypes = {
    store: PropTypes.any.isRequired
};

Menu.wrappedComponent.defaultProps = {};