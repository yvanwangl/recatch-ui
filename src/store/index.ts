import PostStore from '../containers/posts/PostStore';
import ProjectStore from '../containers/projects/ProjectStore';
import LinkStore from '../containers/links/LinkStore';

let rootStore = {
    post: PostStore,
    project: ProjectStore,
    link: LinkStore
};

//初始化state对象
export let initialState = {
    post: {},
    project: {},
    link: {}
};

export default function configStore(state: any = {}) {
    const createdStores = {};
    Object.keys(state).map(key => {
        createdStores[key] = new rootStore[key](state[key]);
    });

    return createdStores;
}