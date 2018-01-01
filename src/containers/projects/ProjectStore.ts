import { action, observable, runInAction } from 'mobx';
import request from '../../utils/request';

class ProjectStore {
    @observable projects: any = [];

    constructor(initialState: any = {}) {
        Object.assign(this, initialState);
    }

    @action
    async fetchProjects() {
        let result = await request('/api/projects');
        if (result && result.success) {
            runInAction(() => {
                this.projects = result.data;
            });
        }
    }

}

export default ProjectStore;