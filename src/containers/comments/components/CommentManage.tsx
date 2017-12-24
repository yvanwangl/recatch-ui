import * as React from 'react';
import { observer } from 'mobx-react';
import Paper from 'material-ui/Paper';
import CommentItem from './CommentItem';
import { formatComments } from '../../utils/util';
import './index.css';

//评论生成迭代器
function commentIterator(childComments: any, commentItems: any, parentName: any, addComment: Function, deleteComment: Function) {
    childComments.map((childComment: any) => {
        commentItems.push(
            <CommentItem
                key={childComment['_id']}
                comment={childComment}
                parentName={parentName}
                handleAdd={addComment}
                handleDelete={deleteComment}
            />
        )
        if (childComment['children']) {
            commentIterator(childComment['children'], commentItems, childComment['name'], addComment, deleteComment);
        }
    });
}

export interface CommentManageProps {
    comments: any;
    fetchComments: Function;
    addComment: Function;
    deleteComment: Function;
    posts: any;
}

export interface CommentManageState {
    expanded: boolean;
}

@observer
class CommentManage extends React.Component<CommentManageProps, CommentManageState> {
    constructor(props: CommentManageProps) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    handleExpandChange = (expanded: boolean) => {
        this.setState({ expanded });
    };

    componentDidMount() {
        let { comments, fetchComments } = this.props;
        if (comments.length == 0) {
            fetchComments();
        }
    }

    render() {
        let { comments, addComment, deleteComment } = this.props;
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
                    comment={comment}
                    parentName=''
                    handleAdd={addComment}
                    handleDelete={deleteComment}
                />
            );
            if (comment['children']) {
                commentIterator(comment['children'], commentItems, comment['name'], addComment, deleteComment);
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

export default CommentManage;