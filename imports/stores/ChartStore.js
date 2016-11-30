import {observable} from 'mobx';
import * as _ from 'lodash';

export default class Store {

    // UI setup
    @observable sideBarExpanded = false;
    @observable activeIndicatorsOpen = false;

    // Chart setup
    @observable width = 500;
    @observable height = 500;

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

    // Title for ChartArea
    @observable chartTitle = '';
    @observable chartTitle2 = '';

    // Stored functions called from this store
    resizeSectionScroller;
    chartResizeOnSideBarExpand;

    /*
     /
     / Callable functions
     /
     */

    toggleSideBarExpanded = () => {
        this.sideBarExpanded = !this.sideBarExpanded;
        this.sideBarExpanded ?
            this.chartResizeOnSideBarExpand(-450) :
            this.chartResizeOnSideBarExpand(450);
    }

    toggleActiveIndicators = () => {
        this.activeIndicatorsOpen = !this.activeIndicatorsOpen;
    }

    drawChart = chartType => {

        if (chartType === 'bar' && this.barActive) this.setBarDraw(!this.barDraw);
        if (chartType === 'line' && this.lineActive) this.setLineDraw(!this.lineDraw);
        if (chartType === 'radar' && this.radarActive) this.setRadarDraw(!this.radarDraw);
        if (chartType === 'scatter' && this.scatterActive) this.setScatterDraw(!this.scatterDraw);

        this.setTitle();
    }

    setTitle = () => {

        // If only one indicator is selected set that as the chart title

        this.chartTitle = '';
        this.chartTitle2 = '';

        if (this.scatterDraw) {

            this.chartTitle = this.activeIndicators[0].name;
            this.chartTitle2 = this.activeIndicators[1].name;

        } else if (_.size(this.activeIndicators) === 1) {

            this.chartTitle = this.activeIndicators[0].name;

        } else if (_.size(this.activeCountries) > 0) {

            this.chartTitle = this.activeCountries[0].name;
            this.activeCountries.forEach((country, index) => {
                if (index > 0) this.chartTitle += ', ' + country.name;
            });

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