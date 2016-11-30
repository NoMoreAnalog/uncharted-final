import React from "react";
import {observer} from 'mobx-react';

// ViewActiveTrigger component - Clickable area to slide open/close side bar
const ViewActiveTrigger = observer(['chartStore'], (props) =>

    <button
        className='ui fluid button view-active-trigger'
        onClick={props.chartStore.toggleActiveIndicators}>

        {props.chartStore.activeIndicatorsOpen ? <i className='icon chevron down'/> : <i className='icon chevron up'/>}
        {props.chartStore.activeIndicatorsOpen ? 'View Countries and Indicators' : 'View Active Indicators'}

    </button>

)

export default ViewActiveTrigger;