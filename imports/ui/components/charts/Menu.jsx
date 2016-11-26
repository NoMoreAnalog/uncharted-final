import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';
import {Dropdown} from 'semantic-ui-react';
import {saveSvgAsPng} from '../../../startup/client/saveSvgAsPng';

// Menu component - Placed in chart stage for print and export options
@observer(['countryStore', 'indicatorStore', 'recordStore', 'store'])
export default class Menu extends Component {

    constructor() {
        super();
        this._JSONToCSVConvertor = this._JSONToCSVConvertor.bind(this);
    }

    componentDidMount() {
        $(this.dropdown)
            .dropdown({
                on: 'hover'
            });
    }

    _JSONToCSVConvertor() {
        const data = this.props.recordStore.recordsToDraw;

        if (!data || data.length === 0) return;


        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        const arrData = data.map(d => {
            return {
                Country: d.countryName,
                Indicator: d.indicatorName,
                Code: d.indicatorCode,
                Year: d.year,
                Value: d.value
            };
        });

        let CSV = '';
        CSV += 'Exported Data' + '\r\n\n'; // Set Report title in first row or line

        //This will generate the Label/Header
        let row = '';

        //This loop will extract the label from 1st index of on array
        for (let index in arrData[0]) {
            //Now convert each value to string and comma-separated
            row += index + ',';
        }

        row = row.slice(0, -1);

        CSV += row + '\r\n'; //append Label row with line break

        //1st loop is to extract each row
        for (let i = 0; i < arrData.length; i++) {
            row = '';
            //2nd loop will extract each column and convert it in string comma-separated
            for (let index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            CSV += row + '\r\n'; //add a line break after each row
        }

        if (CSV == '') {
            alert('Invalid data');
            return;
        }

        //Generate a file name
        const fileName = 'exported_data';

        //Initialize file format you want csv or xls
        const uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension

        //this trick will generate a temp <a /> tag
        const link = document.createElement('a');
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = 'visibility:hidden';
        link.download = fileName + '.csv';

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                        <Dropdown.Item icon='file excel outline' text='Export Data' onClick={this._JSONToCSVConvertor}/>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

        )

    }

}