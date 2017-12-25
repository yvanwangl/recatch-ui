import * as React from 'react';
// import Chip from 'material-ui/Chip';
import TodayIcon from 'material-ui/svg-icons/action/today';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import AuthorIcon from 'material-ui/svg-icons/image/edit';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router';
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
    }

    config = {
        placeholderText: 'Edit Your Content Here!',
        charCounterCount: false,
        toolbarButtons: [],
        events: {
            'froalaEditor.initialized': function (e: any, editor: any) {
                editor.edit.off();
            }
        }
    };

    handleList = () => {
        let { history } = this.props;
        history.push('/');
    };

    handleSiblingClick = (postId: string) => {
        let { history, post } = this.props;
        post.fetchPostById(postId);
        history.push(`/post/${postId}`);
        //滚动到顶部
        window.scrollTo(0, 0);
    };

    render() {
        let { post: { posts }, match } = this.props;
        let viewPost = posts.filter((post: any) => post._id == match.params.postId)[0];
        let viewPostIndex = posts.indexOf(viewPost);
        let previousViewPost = viewPostIndex == 0 ? {} : posts[viewPostIndex - 1];
        let nextViewPost = viewPostIndex == posts.length - 1 ? {} : posts[viewPostIndex + 1];
        console.log(viewPost[0]);
        let {
            author,
            count,
            title,
            content,
            publishDate,
            comments,
        } = viewPost;

        // let labelItems = labels.map((label, index) => {
        //     return <Chip
        //         key={index}
        //         style={{ margin: 4, display: 'inline-block' }}
        //         backgroundColor={label.bgColor}
        //         labelColor={label.fontColor}>
        //         {label.name}
        //     </Chip>;
        // })

        return (
            <div className='PostView-wrapper'>
                <div className='PostView-content'>
                    <h1 className='PostView-title'>{title}</h1>
                    <div className='PostView-info'>
                        <span className='PostView-card-icon-wrapper'><TodayIcon className='PostView-card-icon' /> {dateFormat(publishDate)}</span>
                        <span className='PostView-card-icon-wrapper'><AuthorIcon className='PostView-card-icon' /> {author}</span>
                        <span className='PostView-card-icon-wrapper'><VisibilityIcon className='PostView-card-icon' /> {count}</span>
                        <span className='PostView-card-icon-wrapper'><CommentIcon className='PostView-card-icon' /> {comments.length}</span>
                    </div>
                    <FroalaEditor
                        tag='textarea'
                        config={this.config}
                        model={content}
                    />
                    {/* {labelItems} */}
                </div>
                <div className='PostView-sibllings'>
                    {
                        viewPostIndex == 0 ?
                            null :
                            <div className='PostView-previous'>
                                <span onClick={() => this.handleSiblingClick(previousViewPost._id)} style={{ backgroundImage: `url(${previousViewPost.coverImg})` }}>
                                    <p>Previous</p>
                                    <p>{previousViewPost.title}</p>
                                </span>
                            </div>
                    }
                    {
                        viewPostIndex == posts.length - 1 ?
                            null :
                            <div className='PostView-next'>
                                <span onClick={() => this.handleSiblingClick(nextViewPost._id)} style={{ backgroundImage: `url(${previousViewPost.coverImg})` }}>
                                    <p>Next</p>
                                    <p>{nextViewPost.title}</p>
                                </span>
                            </div>
                    }
                </div>
                {
                    comments.length > 0 ? <CommentManage comments={comments} /> : null
                }
            </div>
        );
    }
}

export default withRouter(PostView);
