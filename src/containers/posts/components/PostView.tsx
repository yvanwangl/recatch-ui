import * as React from 'react';
// import Chip from 'material-ui/Chip';
import TodayIcon from 'material-ui/svg-icons/action/today';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import AuthorIcon from 'material-ui/svg-icons/image/edit';
import Chip from 'material-ui/Chip';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
//import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router';
import { animateScroll as scroll } from 'react-scroll';
import PostStore from '../PostStore';
import CommentManage from '../../comments/components/CommentManage';
import { dateFormat } from '../../../utils/util';

export interface PostViewProps {
    post: PostStore;
    match: any;
    history: any
};


@inject('post')
@observer
class PostView extends React.Component<PostViewProps> {
    constructor(props: any) {
        super(props);
        //组件初始化滚动到顶部
        scroll.scrollToTop({
            duration: 700,
            delay: 0,
            smooth: "easeOutQuad"
        });
    }

    config = {
        key: 'GC-9qigB-32jbjD6lD-8I-8==',
        placeholderText: 'Edit Your Content Here!',
        charCounterCount: false,
        toolbarButtons: [],
        events: {
            'froalaEditor.initialized': function (e: any, editor: any) {
                editor.edit.off();
            }
        }
    };

    static async fetchData(post: PostStore, params: any) {
        await post.fetchPostById(params.postId);
    }

    handleList = () => {
        let { history } = this.props;
        history.push('/');
    };

    handleSiblingClick = (postId: string) => () => {
        let { history, post } = this.props;
        post.fetchPostById(postId);
        history.push(`/post/${postId}`);
        //滚动到顶部
        scroll.scrollToTop({
            duration: 1000,
            delay: 0,
            smooth: "easeOutQuad"
        });
    };

    //客户端渲染，加载所有文章，
    componentDidMount() {
        let { post, match } = this.props;
        if (post.posts.length == 0) {
            post.fetchPosts().then(() => post.fetchPostById(match.params.postId));
        }
    }

    render() {
        let { post: { posts }, match } = this.props;
        if (posts.length == 0) {
            return null;
        }
        let viewPost = posts.filter((post: any) => post._id == match.params.postId)[0];
        let viewPostIndex = posts.indexOf(viewPost);
        let previousViewPost = viewPostIndex == 0 ? {} : posts[viewPostIndex - 1];
        let nextViewPost = viewPostIndex == posts.length - 1 ? {} : posts[viewPostIndex + 1];
        let {
            _id = '',
            author = '',
            count = '',
            title = '',
            content = '',
            publishDate = '',
            comments = [],
            labels = []
        } = viewPost || {};

        let labelItems = labels.map((label: any) => {
            if (typeof label == 'string') {
                return label;
            }
            return <Chip
                key={label['_id']}
                style={{ margin: 4, display: 'inline-block' }}
                backgroundColor={label.bgColor}
                labelColor={label.fontColor}>
                {label.name}
            </Chip>;
        })

        return (
            <div className='PostView-wrapper'>
                <div className='PostView-content Editor-content'>
                    <h1 className='PostView-title'>{title}</h1>
                    <div className='PostView-info'>
                        <span className='PostView-card-icon-wrapper'><TodayIcon className='PostView-card-icon' /> {dateFormat(publishDate)}</span>
                        <span className='PostView-card-icon-wrapper'><AuthorIcon className='PostView-card-icon' /> {author}</span>
                        <span className='PostView-card-icon-wrapper'><VisibilityIcon className='PostView-card-icon' /> {count}</span>
                        <span className='PostView-card-icon-wrapper'><CommentIcon className='PostView-card-icon' /> {comments.length}</span>
                    </div>
                    <FroalaEditorView model={content} />
                    <p className='PostView-authInfo'>原创文章作者：{author} ( 如若转载，请注明出处 )</p>
                    <div className='PostView-labelItems'>
                        {labelItems}
                    </div>
                </div>
                <div className='PostView-sibllings'>
                    {
                        viewPostIndex == 0 ?
                            null :
                            <div className='PostView-previous'>
                                <span onClick={this.handleSiblingClick(previousViewPost._id)} style={{ backgroundImage: `url(${previousViewPost.coverImg})` }}>
                                    <p>Previous</p>
                                    <p>{previousViewPost.title}</p>
                                </span>
                            </div>
                    }
                    {
                        viewPostIndex == posts.length - 1 ?
                            null :
                            <div className='PostView-next'>
                                <span onClick={this.handleSiblingClick(nextViewPost._id)} style={{ backgroundImage: `url(${previousViewPost.coverImg})` }}>
                                    <p>Next</p>
                                    <p>{nextViewPost.title}</p>
                                </span>
                            </div>
                    }
                </div>
                <CommentManage postId={_id} comments={comments} />
            </div>
        );
    }
}

export default withRouter(PostView);
