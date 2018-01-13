import { observable, action, runInAction } from 'mobx';
import request from '../../utils/request';
import { filterInput } from '../../utils/util';

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
                this.links = result.data;
            });
        }
    }

    @action.bound
    async saveLink(link: object) {
        //数据提交前对数据清洗
        Object.keys(link).map((key: string) => link[key] = filterInput(link[key]));
        let result = await request('/api/links', {
            method: 'post',
            body: JSON.stringify(link)
        });
        // if (result && result.success) {
        //     runInAction(() => {
        //         this.links = this.links.map((link: object) => {
        //             if(link['_id'] == result.data._id) {
        //                 Object.assign(link, result.data);
        //             }
        //             return link;
        //         });
        //     });
        // }
        return result;
    }
}

export default LinkStore;