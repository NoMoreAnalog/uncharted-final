import {extendObservable} from 'mobx';

class UIStore {

    // @observable open = false;

    constructor() {
        extendObservable(this, {
            open: false
        });
    }

    toggleActiveIndicators = () => {
        this.open = !this.open;
    }

}

export default UIStore;