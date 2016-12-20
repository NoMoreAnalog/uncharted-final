// Libs
import React from 'react';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';

// Components
import MainLayout from '../../ui/layouts/MainLayout';
import ChartsLayout from '../../ui/layouts/ChartsLayout';
import AdminLayout from '../../ui/layouts/AdminLayout';
import CountriesWrapper from '../../ui/components/admin/CountriesWrapper';
import CountriesOverview from '../../ui/components/admin/CountriesOverview';
import CountriesPopulations from '../../ui/components/admin/CountriesPopulations';
import Indicators from '../../ui/components/admin/Indicators';
import Records from '../../ui/components/admin/Records';

const Routes = (

    <Router history={browserHistory}>

        <Route component={MainLayout}>

            <Route path="/" component={ChartsLayout}/>

            <Route path="admin" component={AdminLayout}>

                <IndexRedirect to="countries"/>

                <Route path="countries" component={CountriesWrapper}>
                    <IndexRedirect to="overview"/>
                    <Route path="overview" component={CountriesOverview}/>
                    <Route path="populations" component={CountriesPopulations}/>
                </Route>

                <Route path="indicators" component={Indicators}/>
                <Route path="records" component={Records}/>

            </Route>

        </Route>

    </Router>

);

export default Routes;