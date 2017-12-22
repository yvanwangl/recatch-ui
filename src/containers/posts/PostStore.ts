import { action, observable, runInAction } from 'mobx';
import request from '../../utils/request';

class PostStore {
    @observable posts: any = [];

    constructor(initialState: any = {}) {
        Object.assign(this, initialState);
    }

    @action
    async fetchPosts() {
        const result = await request('/api/posts');
        if(result && result.success) {
            runInAction(() => {
                this.posts = result.data.posts;
            });
        }
    }

    @action
    async fetchPostById(postId: string) {
        let result = await request(`/api/posts/${postId}`);
        if(result && result.success) {
            runInAction(() => {
                this.posts = this.posts.map((post: any) => {
                    if (post.id === postId) {
                        Object.assign(post, result.data);
                    }
                    return post;
                })
            });
        }
    }
}

export default PostStore;