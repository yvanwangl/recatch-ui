import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { observer, inject } from 'mobx-react';
import PostStore from '../PostStore';
import PostItem from './PostItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PrevIcon from 'material-ui/svg-icons/image/navigate-before';
import NextIcon from 'material-ui/svg-icons/image/navigate-next';
const { limit } = require('../../../system.config');

export interface PostsProps {
    post: PostStore;
    history: any;
}

@inject('post')
@observer
class Posts extends React.Component<PostsProps & RouteComponentProps<any>> {
    static async fetchData(post: PostStore, params: any) {
        await post.fetchPosts(1);
    }

    componentDidMount() {
        let { post } = this.props;
        if (post.posts.length == 0) {
            post.fetchPosts(1);
        }
    }

    //查看博客详情
    handleItemClick = (postId: string) => {
        let { history, post } = this.props;
        post.fetchPostById(postId);
        history.push(`/post/${postId}`);
    };

    //博客页面切换
    handlePageChange = (step: number) => {
        let { post } = this.props;
        post.fetchPosts(post.currentPage + step);
    };

    render() {
        let { post } = this.props;
        let { posts, totalCount, currentPage } = post;
        let postRemainder = posts.length % 3;
        let postFill = postRemainder == 0 ? 0 : 3-postRemainder; 
        let postItems = posts.map((p: any) => {
            return <PostItem key={p._id} post={p} handleItemClick={() => this.handleItemClick(p._id)} />;
        });
        let fillPostItems = new Array(postFill).fill('post').map(p => <span className='PostItem-card PostItem-fill'></span>);
        const nextBtn = <FloatingActionButton className='nextPage' secondary={true} onClick={() => this.handlePageChange(1)}><NextIcon /></FloatingActionButton>;
        const prevBtn = <FloatingActionButton className='prevPage' secondary={true} onClick={() => this.handlePageChange(-1)}><PrevIcon /></FloatingActionButton>;
        return (
            <div>
                <div className='Posts-content'>
                    {postItems}
                    {fillPostItems}
                </div>
                <div className='pagination'>
                    {
                        currentPage == 1 ? nextBtn :
                            currentPage == Math.ceil(totalCount / limit) ? prevBtn :
                                <span>{nextBtn} {prevBtn}</span>
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(Posts);