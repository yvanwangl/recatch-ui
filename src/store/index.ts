import PostStore from '../containers/posts/PostStore';

let rootStore = {
    post: PostStore
};

export default function configStore(state: any = {}) {
    const createdStores = {};
    Object.keys(state).map(key => {
        createdStores[key] = new rootStore[key](state[key]);
    });

    return createdStores;
}