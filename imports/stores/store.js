import {observable, extendObservable} from 'mobx';

class Store {

    @observable sideBarExpanded = false;
    @observable activeIndicatorsOpen = false;

    // constructor() {
    //
    //     extendObservable(this, {
    //         sideBarExpanded: false,
    //         activeIndicatorsOpen: false
    //     });
    //
    // }

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