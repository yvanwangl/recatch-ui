import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { observer, inject } from 'mobx-react';
import PostStore from '../PostStore';
import PostItem from './PostItem';

export interface PostsProps {
    post: PostStore;
    history: any;
}

@inject('post')
@observer
class Posts extends React.Component<PostsProps & RouteComponentProps<any>> {
    static async fetchData(post: PostStore, params: any) {
        await post.fetchPosts();
    }

    componentDidMount() {
        let { post } = this.props;
        if (post.posts.length == 0) {
            post.fetchPosts();
        }
    }

    //查看博客详情
    handleItemClick = (postId: string) => {
        let { history, post } = this.props;
        post.fetchPostById(postId);
        history.push(`/post/${postId}`);
    };

    render() {
        let { post } = this.props;
        let postItems = post.posts.map((p: any) => {
            return <PostItem key={p._id} post={p} handleItemClick={() => this.handleItemClick(p._id)} />;
        });
        return <div className='Posts-content'>
            {postItems}
        </div>;
    }
}

export default withRouter(Posts);