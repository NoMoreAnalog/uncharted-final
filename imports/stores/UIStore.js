import {computed, extendObservable} from 'mobx';

class UIStore {

    constructor() {

        extendObservable(this, {
            sideBarExpanded: false
        });

    }

    toggleSideBarExpanded = value => {
        this.sideBarExpanded = !this.sideBarExpanded;
    }

}

export default UIStore;