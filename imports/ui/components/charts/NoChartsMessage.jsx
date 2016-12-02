// Libs
import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';
import {Header, Divider, Icon} from 'semantic-ui-react';

// NoChartsMessage component - Let user know there is no chart due to data
@observer(['recordStore'])
export default class NoChartsMessage extends Component {

    render() {

        const {noData, recordStore} = {...this.props};

        if (recordStore.loading) {
            return (
                <div style={{textAlign: 'center', padding: '150px 100px 0px 100px'}}>
                    <Icon
                        loading
                        size={'massive'}
                        color='grey'
                        name={'spinner'}
                        style={{textAlign: 'center'}}
                    />
                    <Divider/>
                    <Header as='h1' content={'Loading...'}/>
                </div>
            )
        }

        if (noData) {
            return (
                <div style={{textAlign: 'center', padding: '150px 100px 0px 100px'}}>
                    <Icon
                        size={'massive'}
                        color='grey'
                        name={'frown'}
                        style={{textAlign: 'center'}}
                    />
                    <Divider/>
                    <Header as='h1' content={'No data found...'}/>
                </div>
            )
        }

        return null;

    }

}

NoChartsMessage.wrappedComponent.propTypes = {
    noData: PropTypes.bool
};

NoChartsMessage.wrappedComponent.defaultProps = {
    noData: false
};