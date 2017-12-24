import * as React from 'react';
import { observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import { reactiveMobxForm, Control } from 'reactive-mobx-form';
import FlatButton from 'material-ui/FlatButton';

import './index.css';

export interface CommentInputProps {
    parentId: string;
    parentName: string;
    postId: string;
    saveComment: Function;
    cancelComment: Function;
    submit: ()=> void;
}

@observer
class CommentInput extends React.Component<CommentInputProps> {
    constructor(props: CommentInputProps) {
        super(props);
        this.state = {
            name: '',
            commentContent: '',
            contentPlaceholder: '回复一下：',
            remainWords: 200
        };
    }

    handleSave = (values: any) => {
        let { parentId, postId, submit } = this.props;
        Object.assign(values, { parentId, postId });
        submit(values);
    };

    componentWillMount() {
        let { parentId, parentName } = this.props;
        if (parentId != '') {
            this.setState({
                contentPlaceholder: `回复 @${parentName}：`
            });
        }
    }

    render() {
        let { cancelComment } = this.props;
        //let contentPlaceholder = parentId != '' ? `回复 @${parentName}：` : '回复一下：';
        return (
            <div className="CommentInput">
                <form className="CommentInput-commentForm">
                    <div className='CommentInput-form-item'>
                        <label htmlFor="name">昵称</label>
                        <Control name="name" rules='string|between:1,25' component={TextField as any} type="text" />
                    </div>
                    <div className='CommentInput-form-item'>
                        <label htmlFor="commentContent">回复内容</label>
                        <Control name="commentContent" rules='required|string|between:1,200' component={TextField as any} type="number" />
                    </div>
                    <div className='CommentInput-buttons'>
                        <FlatButton secondary={true} label='取消' onClick={() => cancelComment()} />
                        <FlatButton primary={true} label='发布' onClick={this.handleSave} />
                    </div>
                </form>
            </div>
        );
    }
}

const ContactFormReactive = reactiveMobxForm('comments')(CommentInput);
export default ContactFormReactive;