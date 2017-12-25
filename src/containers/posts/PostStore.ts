import { action, observable, runInAction } from 'mobx';
import request from '../../utils/request';

class PostStore {
    @observable posts: any = [];

    rootStore: object;

    constructor(initialState: any = {}, rootStore: object) {
        Object.assign(this, initialState);
        this.rootStore = rootStore;
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
                    if (post._id === postId) {
                        Object.assign(post, result.data);
                    }
                    return post;
                });
            });
        }
    }

    @action
    updatePost(comment: any){
        this.posts = this.posts.map((post: any) => {
            if (post._id === comment.postId) {
                post.comments.push(comment);
            }
            return post;
        });
    }
}

export default PostStore;