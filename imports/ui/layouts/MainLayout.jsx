import React, {PropTypes} from 'react';
import DevTools from 'mobx-react-devtools';
import {observer, inject} from 'mobx-react';

// MainLayout component - represents the whole app
const MainLayout = observer(['countryStore', 'indicatorStore', 'store'], (props) =>
    <div>
        <DevTools />
        {props.children}
    </div>
)

export default MainLayout;