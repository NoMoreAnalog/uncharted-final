import React from 'react';
import DevTools from 'mobx-react-devtools'; // Add <DevTools /> for debugging
import {observer} from 'mobx-react';

// MainLayout component - represents the whole app
const MainLayout = observer(['countryStore', 'indicatorStore', 'chartStore'], (props) =>
    <div>
        {props.children}
    </div>
)

export default MainLayout;