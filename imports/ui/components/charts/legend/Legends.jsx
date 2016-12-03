import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import {Grid} from 'semantic-ui-react';

import Legend from './Legend.jsx';

// Legends component - Container for the chart specific legends
const Legends = observer(['countryStore', 'indicatorStore', 'chartStore'], (props) =>

    <Grid className='legends'>

        <Grid.Row stretched>

            <Grid.Column width={8}>

                <Legend
                    title={'Country:'}
                    list={props.countryStore.activeCountries}
                    classed='countries'
                    itemStore={props.countryStore}
                    store={props.chartStore}
                />

            </Grid.Column>

            <Grid.Column width={8}>

                <Legend
                    title={'Indicator:'}
                    list={props.indicatorStore.activeIndicators}
                    classed='indicators'
                    itemStore={props.indicatorStore}
                    store={props.chartStore}
                />

            </Grid.Column>

        </Grid.Row>

    </Grid>
)

export default Legends;