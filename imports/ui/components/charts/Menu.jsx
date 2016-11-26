import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';
import {Dropdown} from 'semantic-ui-react';
import {saveSvgAsPng} from '../../../startup/client/saveSvgAsPng';

// Menu component - Placed in chart stage for print and export options
@observer(['store'])
export default class Menu extends Component {

    componentDidMount() {
        $(this.dropdown)
            .dropdown({
                on: 'hover'
            });
    }

    render() {

        return (

            <div className='chart-menu'>
                <Dropdown simple icon='content'>
                    <Dropdown.Menu>
                        <Dropdown.Item icon='save' text='Save As PNG' onClick=
                            {
                                () => saveSvgAsPng(
                                    document.getElementById('svg-chart'),
                                    'chart.png',
                                    {backgroundColor: '#FFF'})
                            }/>
                        <Dropdown.Item icon='file excel outline' text='Export Data'/>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

        )

    }

}