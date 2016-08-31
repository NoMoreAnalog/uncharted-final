import {extendObservable} from 'mobx';
import _ from 'lodash';

class Store {

    constructor() {

        extendObservable(this, {

            // UI setup
            sideBarExpanded: false,
            activeIndicatorsOpen: false,

            // Used in top bar to determine which chart user can selected
            barAvailable: false,
            lineAvailable: false,
            radarAvailable: false,
            scatterAvailable: false,

            // Which chart is being displayed
            barShowing: false,
            lineShowing: false,
            radarShowing: false,
            scatterShowing: false,

            // Number of currently selected countries/indicators
            activeCountries: [],
            activeIndicators: [],

            // Current focus (default is country)
            countryFocus: true,
            indicatorFocus: false,

            // Title for ChartArea
            chartTitle: ''
        });

    }

    toggleSideBarExpanded = () => {
        this.sideBarExpanded = !this.sideBarExpanded;
    }

    toggleActiveIndicators = () => {
        this.activeIndicatorsOpen = !this.activeIndicatorsOpen;
    }

    selectChart = chartType => {

        switch (chartType) {
            case 'bar':

                if (!this.barAvailable) return;
                this.barShowing = true;
                this.lineShowing = this.radarAvailable = this.scatterShowing = false;

                break;

            case 'line':

                if (!this.lineAvailable) return;
                this.lineShowing = true;
                this.barShowing = this.radarAvailable = this.scatterShowing = false;

                break;

            case 'radar':

                if (!this.radarAvailable) return;
                this.radarShowing = true;
                this.barShowing = this.lineAvailable = this.scatterShowing = false;

                break;

            case 'scatter':

                if (!this.scatterAvailable) return;
                this.scatterShowing = true;
                this.barShowing = this.lineAvailable = this.radarShowing = false;

                break;
        }

    }

    chartDetermination = itemStore => {

        // How many of each are active?

        itemStore.type === 'country' ?
            this.activeCountries.replace(itemStore.activeCountries) :
            this.activeIndicators.replace(itemStore.activeIndicators);

        // Determine which charts a user is allowed to view

        const countries = this.activeCountries.length;
        const indicators = this.activeIndicators.length;

        this.barAvailable = (countries === 1 && indicators >= 1) || (indicators === 1 && countries >= 1);
        this.lineAvailable = (countries >= 1 && indicators >= 1) || (indicators >= 1 && countries >= 1);
        this.radarAvailable = (countries >= 1 && indicators >= 3) || (indicators >= 1 && countries >= 3);
        this.scatterAvailable = (countries === 1 && indicators >= 2);

        if (!this.barAvailable) this.barShowing = false;
        if (!this.lineAvailable) this.lineShowing = false;
        if (!this.radarAvailable) this.radarShowing = false;
        if (!this.scatterAvailable) this.scatterShowing = false;

        // Default a chart to show, we prefer bar first and scatter last

        if (!this.barShowing && !this.lineShowing && !this.radarShowing && !this.scatterShowing) {
            if (this.barAvailable) this.barShowing = true
            else if (this.lineAvailable) this.lineShowing = true;
            else if (this.radarAvailable) this.radarShowing = true;
            else if (this.scatterAvailable) this.scatterShowing = true;
        }

        // Depending on the focus we will set the title for ChartArea

        this.chartTitle = '';

        if (this.countryFocus && this.activeCountries.length) {

            this.chartTitle = this.activeCountries[0].name;
            this.activeCountries.forEach((country, index) => {
                if (index > 0) this.chartTitle += ', ' + country.name;
            });

        }

        if (this.indicatorFocus && this.activeIndicators.length) {

            this.chartTitle = this.activeIndicators[0].name;
            this.activeIndicators.forEach((indicator, index) => {
                if (index > 0) this.chartTitle += ', ' + indicator.name;
            });

        }

    }

}

export default Store;