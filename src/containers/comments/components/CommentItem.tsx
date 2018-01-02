import * as React from 'react';
import { observer } from 'mobx-react';
import CommentInput from './CommentInput';
import { dateFormat } from '../../../utils/util';
//import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
import commentFormConstructor from './commentForm';
import './index.css';

export interface CommentItemPorps {
    commentValue: any;
    parentName: string;
    saveComment: Function;
}

export interface CommentItemState {
    addChildComment: boolean;
    commentId: string;
}

const commentForm = commentFormConstructor();

@observer
export default class CommentItem extends React.Component<CommentItemPorps, CommentItemState> {
    constructor(props: CommentItemPorps) {
        super(props);
        this.state = {
            addChildComment: false,
            commentId: ''
        };
    }

    //回复按钮点击事件
    handleReply = () => {
        this.setState({
            addChildComment: !this.state.addChildComment
        });
        commentForm.clear();
    }

    //取消按钮点击事件
    handleCancel = () => {
        this.setState({
            addChildComment: false
        });
        commentForm.clear();
    };

    //提交按钮点击事件
    handleSave = () => {
        let { commentValue: { _id, postId }, saveComment } = this.props;
        let values = commentForm.values();
        Object.assign(values, { parentId: _id, postId });
        commentForm.validate({ showErrors: true }).then(({ isValid }: any) => {
            if (isValid) {
                saveComment(values).then(() => {
                    this.setState({
                        addChildComment: false
                    });
                    commentForm.clear();
                });
            }
        });
    };

    // _agreeClick(event) {
    //     let { comment, commentActions } = this.props;
    //     let agree = comment['agree'];
    //     let disagree = comment['disagree'];
    //     if (!this.state.disAgreeClick) {
    //         agree += 1;
    //     } else {
    //         agree += 1;
    //         disagree -= 1;
    //     }
    //     commentActions.likeComment({
    //         commentId: comment['_id'],
    //         agree: agree,
    //         disagree: disagree
    //     });
    //     this.setState({
    //         agreeClick: true
    //     });
    // }

    // _disAgreeClick(event) {
    //     let { comment, commentActions } = this.props;
    //     let agree = comment['agree'];
    //     let disagree = comment['disagree'];
    //     if (!this.state.agreeClick) {
    //         disagree += 1;
    //     } else {
    //         agree -= 1;
    //         disagree += 1;
    //     }
    //     commentActions.likeComment({
    //         commentId: comment['_id'],
    //         agree: agree,
    //         disagree: disagree
    //     });
    //     this.setState({
    //         disAgreeClick: true
    //     });
    // }

    // _deleteClick(event) {
    //     let { comment, commentActions, authCookie } = this.props;
    //     commentActions.deleteComment(comment['_id'], authCookie);
    // }

    // closeInput(is_success) {
    //     if (is_success) {
    //         this.setState({
    //             addChildComment: false
    //         });
    //     }
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return !(nextProps == this.props && nextState == this.state);
    // }

    render() {
        let { commentValue: { parentId, name, commentTime, commentContent, _id: id }, parentName } = this.props;
        // var agreeClick = !this.state.agreeClick ? this.agreeClick : null;
        // var disAgreeClick = !this.state.disAgreeClick ? this.disAgreeClick : null;
        var commentItem = parentId == '' ? 'commentItem' : 'commentItem childComment';

        return (
            <div className={commentItem}>
                <div className="commentatorInfo">
                    <p className="commentTime">{name} {dateFormat(commentTime, 2)} {parentName == '' ? '如是说：' : '回复：@' + parentName}</p>
                </div>
                <p className="commentContent">
                    {commentContent}
                </p>
                <div className="commentAction">
                    {/* <span className="agree" onClick={agreeClick}>
                        <Icon type="like" className="icon" />
                        <i>赞同( {comment['agree']} )</i>
                    </span>
                    <span className="disagree" onClick={disAgreeClick}>
                        <Icon type="dislike" className="icon" />
                        <i>反对( {comment['disagree']} )</i>
                    </span> */}

                    <FlatButton label="回复" primary={true} onClick={this.handleReply} />
                </div>
                {
                    this.state.addChildComment ?
                        <CommentInput
                            parentId={id}
                            parentName={name}
                            commentForm={commentForm}
                            cancelComment={this.handleCancel}
                            saveComment={this.handleSave}
                        />
                        : null
                }
            </div>
        );
    }
}