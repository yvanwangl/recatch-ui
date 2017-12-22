import { observable, action, runInAction } from 'mobx';
import request from '../../utils/request';

class LinkStore {
    @observable links: any = [];

    constructor(initialState: any = {}) {
        Object.assign(this, initialState);
    }

    @action
    async fetchLinks() {
        let result = await request('/api/links');
        if (result && result.success) {
            runInAction(() => {
                this.links = result.data.links;
            });
        }
    }
}

export default LinkStore;