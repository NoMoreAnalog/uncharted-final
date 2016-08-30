import {extendObservable} from 'mobx';

class Store {

    constructor() {

        extendObservable(this, {
            sideBarExpanded: false,
            activeIndicatorsOpen: false
        });

    }

    toggleSideBarExpanded = () => {
        this.sideBarExpanded = !this.sideBarExpanded;
    }

    toggleActiveIndicators = () => {
        this.activeIndicatorsOpen = !this.activeIndicatorsOpen;
    }

    chartDetermination = () => {
        console.log('testing.......');
    }

}

export default Store;