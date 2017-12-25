import * as React from 'react';
import { observer, inject } from 'mobx-react';
import CommentStore from '../CommentStore';
import Paper from 'material-ui/Paper';
import CommentItem from './CommentItem';
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
}

export interface CommentManageState {
    expanded: boolean;
}

@(inject('comment') as any)
@observer
class CommentManage extends React.Component<CommentManageProps, CommentManageState> {

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
            <Paper className='Manage-container'>
                <div className="CommentManage-commentWrap">
                    {commentItems}
                </div>
            </Paper>
        );
    }
}

export default CommentManage as any;