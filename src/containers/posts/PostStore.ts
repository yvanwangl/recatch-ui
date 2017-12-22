import { action, observable, runInAction } from 'mobx';
import request from '../../utils/request';

class PostStore {
    @observable posts: any = [];

    constructor(initialState: any = {}) {
        Object.assign(this, initialState);
    }

    @action
    async fetchPosts() {
        try {
            const { data } = await request('/api/posts');
            runInAction(() => {
                this.posts = data.posts;
            });
        } catch (e) {

        }
    }

    @action
    async fetchPostById(postId: string) {
        let updatePost = await request(`/api/posts/${postId}`);
        this.posts = this.posts.map((post: any) => {
            if (post.id === postId) {
                Object.assign(post, updatePost);
            }
            return post;
        })
    }
}

export default PostStore;