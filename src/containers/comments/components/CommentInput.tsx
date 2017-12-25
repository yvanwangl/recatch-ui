import * as React from 'react';
import { observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import './index.css';

export interface CommentInputProps {
    parentId: string;
    parentName: string;
    saveComment: () => void;
    cancelComment: () => void;
    commentForm: any;
}

@observer
class CommentInput extends React.Component<CommentInputProps> {

    render() {
        let { cancelComment, commentForm, parentId, parentName, saveComment } = this.props;
        let contentPlaceholder = parentId != '' ? `回复 @${parentName}：` : '回复一下：';
        let nameField = commentForm.$('name');
        let commentContentField = commentForm.$('commentContent');
        return (
            <div className="CommentInput">
                <form className="CommentInput-commentForm">
                    <div className='CommentInput-form-item'>
                        <TextField
                            floatingLabelText='昵称'
                            hintText='昵称'
                            errorText={nameField.error}
                            {...nameField.bind()}
                        />
                    </div>
                    <div className='CommentInput-form-item'>
                        <TextField
                            floatingLabelText={contentPlaceholder}
                            hintText={contentPlaceholder}
                            errorText={commentContentField.error}
                            fullWidth={true}
                            {...commentContentField.bind()}
                        />
                    </div>
                </form>
                <div className='CommentInput-buttons'>
                    <FlatButton secondary={true} label='取消' onClick={cancelComment} />
                    <FlatButton primary={true} label='发布' onClick={saveComment} />
                </div>
            </div>
        );
    }
}

export default CommentInput;