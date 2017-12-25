import PostStore from '../containers/posts/PostStore';
import ProjectStore from '../containers/projects/ProjectStore';
import LinkStore from '../containers/links/LinkStore';
import CommentStore from '../containers/comments/CommentStore';

let rootStore = {
    post: PostStore,
    project: ProjectStore,
    link: LinkStore,
    comment: CommentStore
};

//初始化state对象
export let initialState = {
    post: {},
    project: {},
    link: {},
    comment: {}
};

export default function configStore(state: any = {}) {
    const createdStores = {};
    Object.keys(state).map(key => {
        createdStores[key] = new rootStore[key](state[key], createdStores);
    });

    return createdStores;
}