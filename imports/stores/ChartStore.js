'use strict';
/*global countryStore */
/*global indicatorStore */

// Libs
import {observable, action} from 'mobx';
import * as _ from 'lodash';

export default class ChartStore {

    // UI setup
    @observable sideBarExpanded = false;
    @observable activeIndicatorsOpen = false;

    // Chart setup
    @observable width = 500; // set dynamically in ChartWrapper
    @observable height = 450;
    @observable margin = {top: 20, right: 50, bottom: 50, left: 50};

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

    // Title for ChartArea
    @observable chartTitle = '';
    @observable chartTitle2 = '';

    // Stored functions called from this store
    chartResizeOnSideBarExpand;

    /*
     /
     / Callable functions
     /
     */

    @action toggleSideBarExpanded = () => {
        this.sideBarExpanded = !this.sideBarExpanded;
        this.sideBarExpanded ?
            this.chartResizeOnSideBarExpand(-450) :
            this.chartResizeOnSideBarExpand(450);
    }

    @action toggleActiveIndicators = () => {
        this.activeIndicatorsOpen = !this.activeIndicatorsOpen;
    }

    @action drawChart = chartType => {

        if (chartType === 'bar' && this.barActive) this.setBarDraw(!this.barDraw);
        if (chartType === 'line' && this.lineActive) this.setLineDraw(!this.lineDraw);
        if (chartType === 'radar' && this.radarActive) this.setRadarDraw(!this.radarDraw);
        if (chartType === 'scatter' && this.scatterActive) this.setScatterDraw(!this.scatterDraw);

        this.setTitle();
        recordStore.setYears();
    }

    @action setTitle = () => {

        // If only one indicator is selected set that as the chart title

        this.chartTitle = '';
        this.chartTitle2 = '';

        if (this.scatterDraw) {

            this.chartTitle = indicatorStore.activeIndicators[0].name;
            this.chartTitle2 = indicatorStore.activeIndicators[1].name;

        } else if (_.size(indicatorStore.activeIndicators) === 1) {

            this.chartTitle = indicatorStore.activeIndicators[0].name;

        } else if (_.size(countryStore.activeCountries) > 0) {

            this.chartTitle = countryStore.activeCountries[0].name;
            countryStore.activeCountries.forEach((country, index) => {
                if (index > 0) this.chartTitle += ', ' + country.name;
            });

        }

    }

    @action chartDetermination = () => {

        // Determine which charts a user is allowed to view

        const countries = countryStore.activeCountries.length;
        const indicators = indicatorStore.activeIndicators.length;

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

        this.setTitle();

    }

    @action setBarDraw = (show = true) => {
        this.barDraw = show;
        if (this.barDraw) {
            this.setLineDraw(false);
            this.setRadarDraw(false);
            this.setScatterDraw(false);
        }
    }

    @action setLineDraw = (show = true) => {
        this.lineDraw = show;
        if (this.lineDraw) {
            this.setBarDraw(false);
            this.setRadarDraw(false);
            this.setScatterDraw(false);
        }
    }

    @action setRadarDraw = (show = true) => {
        this.radarDraw = show;
        if (this.radarDraw) {
            this.setBarDraw(false);
            this.setLineDraw(false);
            this.setScatterDraw(false);
        }
    }

    @action setScatterDraw = (show = true) => {
        this.scatterDraw = show;
        if (this.scatterDraw) {
            this.setBarDraw(false);
            this.setLineDraw(false);
            this.setRadarDraw(false);
        }
    }

}