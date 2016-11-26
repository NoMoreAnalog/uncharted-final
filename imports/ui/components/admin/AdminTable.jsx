// Libs
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Table, Input, Checkbox, Dropdown} from 'semantic-ui-react'

@observer(['store'])
export default class AdminTable extends Component {

    constructor() {
        super();
    }

    render() {

        const headerRow = (
            <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Country</Table.HeaderCell>
                <Table.HeaderCell>Indicator</Table.HeaderCell>
                <Table.HeaderCell>Year</Table.HeaderCell>
                <Table.HeaderCell>Value</Table.HeaderCell>
                <Table.HeaderCell>Created At</Table.HeaderCell>
                <Table.HeaderCell>Created By</Table.HeaderCell>
                <Table.HeaderCell>Changed At</Table.HeaderCell>
                <Table.HeaderCell>Changed By</Table.HeaderCell>
                <Table.HeaderCell>Delete?</Table.HeaderCell>
            </Table.Row>
        );

        let bodyRows = this.props.data.map((record, index) => {

            let country;
            let indicator;

            if (record._id) {
                country = <Table.Cell>{record.countryName}</Table.Cell>;
                indicator = <Table.Cell>{record.indicatorName}</Table.Cell>;
            } else {
                country =
                    <Table.Cell>
                        <Dropdown placeholder='Country' fluid search selection
                                  defaultValue={record.year}
                                  options={this.props.store.countryNameOptions}
                        />
                    </Table.Cell>;
                indicator =
                    <Table.Cell>
                        <Dropdown placeholder='Indicator' fluid search selection
                                  defaultValue={record.year}
                                  options={this.props.store.indicatorNameOptions}
                        />
                    </Table.Cell>;
            }

            return (
                <Table.Row key={index}>
                    <Table.Cell>{record._id}</Table.Cell>
                    {country}
                    {indicator}
                    <Table.Cell>
                        <Dropdown placeholder='Year' fluid search selection defaultValue={record.year}
                                  options={[
                                      {text: '2000', value: '2000'},
                                      {text: '2001', value: '2001'},
                                      {text: '2002', value: '2002'},
                                      {text: '2003', value: '2003'}]}
                        />
                    </Table.Cell>
                    <Table.Cell><Input focus placeholder='Value' defaultValue={record.value}/></Table.Cell>
                    <Table.Cell>{record.createdAt}</Table.Cell>
                    <Table.Cell>{record.createdBy}</Table.Cell>
                    <Table.Cell>{record.changedAt}</Table.Cell>
                    <Table.Cell>{record.changedBy}</Table.Cell>
                    <Table.Cell><Checkbox defaultChecked={record.delete}/></Table.Cell>
                </Table.Row>
            );

        });

        return (
            <Table celled padded>
                <Table.Header>{headerRow}</Table.Header>
                <Table.Body>{bodyRows}</Table.Body>
            </Table>
        )

    }
}