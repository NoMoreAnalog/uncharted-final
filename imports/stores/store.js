import {observable} from 'mobx';

class Store {

    // UI setup
    @observable sideBarExpanded = false;
    @observable activeIndicatorsOpen = false;

    // Used in top bar to determine which chart user can selected
    @observable barActive = false;
    @observable lineActive = false;
    @observable radarActive = false;
    @observable scatterActive = false;

    // Which chart is being displayed
    @observable barDraw = false;
    @observable lineDraw = false;
    @observable radarDraw = false;
    @observable scatterDraw = false;

    // Number of currently selected countries/indicators
    @observable activeCountries = [];
    @observable activeIndicators = [];

    // Current focus (default is country)
    @observable countryFocus = true;
    @observable indicatorFocus = false;

    // Title for ChartArea
    @observable chartTitle = '';

    toggleSideBarExpanded = () => {
        this.sideBarExpanded = !this.sideBarExpanded;
    }

    toggleActiveIndicators = () => {
        this.activeIndicatorsOpen = !this.activeIndicatorsOpen;
    }

    drawChart = chartType => {

        if (chartType === 'bar' && this.barActive) this.setBarDraw(!this.barDraw);
        if (chartType === 'line' && this.lineActive) this.setLineDraw(!this.lineDraw);
        if (chartType === 'radar' && this.radarActive) this.setRadarDraw(!this.radarDraw);
        if (chartType === 'scatter' && this.scatterActive) this.setScatterDraw(!this.scatterDraw);

    }

    chartDetermination = itemStore => {

        // How many of each are active?

        itemStore.type === 'country' ?
            this.activeCountries.replace(itemStore.activeCountries) :
            this.activeIndicators.replace(itemStore.activeIndicators);

        // Determine which charts a user is allowed to view

        const countries = this.activeCountries.length;
        const indicators = this.activeIndicators.length;

        this.barActive = (countries === 1 && indicators >= 1) || (indicators === 1 && countries >= 1);
        this.lineActive = (countries >= 1 && indicators >= 1) || (indicators >= 1 && countries >= 1);
        this.radarActive = (countries >= 1 && indicators >= 3) || (indicators >= 1 && countries >= 3);
        this.scatterActive = (countries >= 1 && indicators === 2);

        if (!this.barActive) this.setBarDraw(false);
        if (!this.lineActive) this.setLineDraw(false);
        if (!this.radarActive) this.setRadarDraw(false);
        if (!this.scatterActive) this.setScatterDraw(false);

        // Default a chart to show, we prefer bar first and scatter last

        if (!this.barDraw && !this.lineDraw && !this.radarDraw && !this.scatterDraw) {
            if (this.barActive) this.setBarDraw()
            else if (this.lineActive) this.setLineDraw();
            else if (this.radarActive) this.setRadarDraw();
            else if (this.scatterActive) this.setScatterDraw();
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

    setBarDraw = (show = true) => {
        this.barDraw = show;
        if (this.barDraw) {
            this.setLineDraw(false);
            this.setRadarDraw(false);
            this.setScatterDraw(false);
        }
    }

    setLineDraw = (show = true) => {
        this.lineDraw = show;
        if (this.lineDraw) {
            this.setBarDraw(false);
            this.setRadarDraw(false);
            this.setScatterDraw(false);
        }
    }

    setRadarDraw = (show = true) => {
        this.radarDraw = show;
        if (this.radarDraw) {
            this.setBarDraw(false);
            this.setLineDraw(false);
            this.setScatterDraw(false);
        }
    }

    setScatterDraw = (show = true) => {
        this.scatterDraw = show;
        if (this.scatterDraw) {
            this.setBarDraw(false);
            this.setLineDraw(false);
            this.setRadarDraw(false);
        }
    }

}

export default Store;