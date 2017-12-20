import { action, observable } from 'mobx';
import request from '../../utils/request';

class PostStore {
    @observable posts:any = [];

    constructor(initialState: any = {}){
        Object.assign(this, initialState);
    }

    @action
    async fetchPosts() {
        this.posts = await request('/api/posts');
    }

    @action
    async fetchPostById(postId: string){
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