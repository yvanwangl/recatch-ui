import * as React from 'react';
import { observer, inject } from 'mobx-react';
import CommentStore from '../CommentStore';
import Paper from 'material-ui/Paper';
import CommentItem from './CommentItem';
import commentFormConstructor from './commentForm';
import CommentInput from './CommentInput';
import { formatComments } from '../../../utils/util';
import './index.css';

//评论生成迭代器
function commentIterator(childComments: any, commentItems: any, parentName: any, saveComment: Function) {
    childComments.map((childComment: any) => {
        commentItems.push(
            <CommentItem
                key={childComment['_id']}
                commentValue={childComment}
                parentName={parentName}
                saveComment={saveComment}
            />
        )
        if (childComment['children']) {
            commentIterator(childComment['children'], commentItems, childComment['name'], saveComment);
        }
    });
}

export interface CommentManageProps {
    comments: any;
    comment: CommentStore;
    postId: string;
}

export interface CommentManageState {
    expanded: boolean;
}

const commentForm = commentFormConstructor();

@inject('comment')
@observer
class CommentManage extends React.Component<CommentManageProps, CommentManageState> {

    componentWillMount() {
        commentForm.clear();
    }

    //取消按钮点击事件
    handleCancel = () => {
        commentForm.clear();
    };

    //提交按钮点击事件
    handleSave = () => {
        let { comment: commentStore, postId } = this.props;
        let values = commentForm.values();
        Object.assign(values, { parentId: '', postId });
        commentForm.validate({ showErrors: true }).then(({ isValid }: any) => {
            if (isValid) {
                commentStore.saveComment(values).then(() => {
                    setTimeout(()=> commentForm.clear(), 500);
                });
            }
        });
    };

    render() {
        let { comments, comment: commentStore } = this.props;
        /**
         * 对评论进行序列化操作
         * 对评论按日期进行倒叙
         * 对评论进行子评论组织
         */
        let newComments = formatComments(comments);
        //对评论按博客进行归类
        let commentItems: Array<React.ReactNode> = [];
        newComments.map((comment: any, index: number) => {
            commentItems.push(
                <CommentItem
                    key={comment['_id']}
                    commentValue={comment}
                    parentName=''
                    saveComment={commentStore.saveComment}
                />
            );
            if (comment['children']) {
                commentIterator(comment['children'], commentItems, comment['name'], commentStore.saveComment);
            }

        });

        return (
            <Paper className='Manage-container CommentManage-container'>
                <div className="CommentManage-commentWrap">
                    <h3 className='CommentManage-comment-title'>[ 评论一角 ]</h3>
                    <p className='CommentManage-comment-holder'>{commentItems.length == 0 ? '还没有评论，沙发等你来！' : '欢迎留下到此一游的见证 : )'}</p>
                    <CommentInput
                        parentId={''}
                        parentName={''}
                        commentForm={commentForm}
                        cancelComment={this.handleCancel}
                        saveComment={this.handleSave}
                    />
                </div>
                <div className="CommentManage-commentWrap">
                    {commentItems}
                </div>
            </Paper>
        );
    }
}

export default CommentManage as any;