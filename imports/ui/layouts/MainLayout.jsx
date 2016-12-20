import React from 'react';
import DevTools from 'mobx-react-devtools'; // Add <DevTools /> for debugging
import {observer} from 'mobx-react';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools/> : '';

// MainLayout component - represents the whole app
const MainLayout = observer(['countryStore', 'indicatorStore', 'chartStore'], (props) =>
    <div>
        {devTools}
        {props.children}
    </div>
)

export default MainLayout;