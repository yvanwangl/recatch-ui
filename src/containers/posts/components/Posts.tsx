import * as React from 'react';
import { observer, inject } from 'mobx-react';
import PostStore from '../PostStore';

export interface PostsProps {
    post: PostStore;
}

@inject('post')
@observer
class Posts extends React.Component<PostsProps> {
    static async fetchData(post: PostStore, params: any) {
        await post.fetchPosts();
    }

    render() {
        let { post } = this.props;
        let postItems = post.posts.map((p: any) => {
            <span>{p.content}</span>
        });
        return (
            <div>
                {postItems}
            </div>
        );
    }
}

export default Posts;