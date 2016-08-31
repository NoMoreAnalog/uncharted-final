import {extendObservable} from 'mobx';

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
                this.setBarShowing(!this.barShowing);

                break;

            case 'line':

                if (!this.lineAvailable) return;
                this.setLineShowing(!this.lineShowing);

                break;

            case 'radar':

                if (!this.radarAvailable) return;
                this.setRadarShowing(!this.radarShowing);

                break;

            case 'scatter':

                if (!this.scatterAvailable) return;
                this.setScatterShowing(!this.scatterShowing);

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
        this.scatterAvailable = (countries >= 1 && indicators === 2);

        if (!this.barAvailable) this.setBarShowing(false);
        if (!this.lineAvailable) this.setLineShowing(false);
        if (!this.radarAvailable) this.setRadarShowing(false);
        if (!this.scatterAvailable) this.setScatterShowing(false);

        // Default a chart to show, we prefer bar first and scatter last

        if (!this.barShowing && !this.lineShowing && !this.radarShowing && !this.scatterShowing) {
            if (this.barAvailable) this.setBarShowing()
            else if (this.lineAvailable) this.setLineShowing();
            else if (this.radarAvailable) this.setRadarShowing();
            else if (this.scatterAvailable) this.setScatterShowing();
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

    setBarShowing = (show = true) => {
        this.barShowing = show;
        if (this.barShowing) {
            this.setLineShowing(false);
            this.setRadarShowing(false);
            this.setScatterShowing(false);
        }
    }

    setLineShowing = (show = true) => {
        this.lineShowing = show;
        if (this.lineShowing) {
            this.setBarShowing(false);
            this.setRadarShowing(false);
            this.setScatterShowing(false);
        }
    }

    setRadarShowing = (show = true) => {
        this.radarShowing = show;
        if (this.radarShowing) {
            this.setBarShowing(false);
            this.setLineShowing(false);
            this.setScatterShowing(false);
        }
    }

    setScatterShowing = (show = true) => {
        this.scatterShowing = show;
        if (this.scatterShowing) {
            this.setBarShowing(false);
            this.setLineShowing(false);
            this.setRadarShowing(false);
        }
    }

}

export default Store;