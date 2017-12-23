import * as React from 'react';
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import FlatButton from 'material-ui/FlatButton';

import './index.css';

export interface CommentInputProps {
    parentId: string;
    parentName: string;
    postId: string;
    saveComment: Function;
    cancelComment: Function;
}

const plugins = { dvr: validatorjs };

const fields = [{
    name: 'email',
    label: 'Email',
    placeholder: 'Insert Email',
    rules: 'required|email|string|between:5,25',
}, {
    name: 'password',
    label: 'Password',
    placeholder: 'Insert Password',
    rules: 'required|string|between:5,25',
}, {
    name: 'passwordConfirm',
    label: 'Password Confirmation',
    placeholder: 'Confirm Password',
    rules: 'required|string|same:password',
}];

const hooks = {
    onSuccess(form) {
        alert('Form is valid! Send the request here.');
        // get field values
        console.log('Form Values!', form.values());
    },
    onError(form) {
        alert('Form has errors!');
        // get all form errors
        console.log('All form errors', form.errors());
    }
}

const form = new MobxReactForm({ fields }, { plugins, hooks });

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
        let { parentId, postId, saveComment } = this.props;
        Object.assign(values, { parentId, postId });
        saveComment(values);
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
        let { parentId, parentName, handleSubmit, cancelComment } = this.props;
        let contentPlaceholder = parentId != '' ? `回复 @${parentName}：` : '回复一下：';
        return (
            <div className="CommentInput">
                <form onSubmit={form.onSubmit}>
                    <label htmlFor={form.$('username').id}>
                        {form.$('username').label}
                    </label>
                    <input {...form.$('username').bind() } />
                    <p>{form.$('username').error}</p>

                    {/* ... other inputs ... */}

                    <button type="submit" onClick={form.onSubmit}>Submit</button>
                    <button type="button" onClick={form.onClear}>Clear</button>
                    <button type="button" onClick={form.onReset}>Reset</button>

                    <p>{form.error}</p>
                </form>
                <form className="CommentInput-commentForm">
                    <div className='CommentInput-form-item'>
                        <Field
                            name="name"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: '昵称：',
                                floatingLabelText: '昵称：'
                            } as any}
                        />
                    </div>
                    <div className='CommentInput-form-item'>
                        <Field
                            name="commentContent"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: contentPlaceholder,
                                floatingLabelText: contentPlaceholder
                            } as any}
                        />
                    </div>
                    <div className='CommentInput-buttons'>
                        <FlatButton secondary={true} label='取消' onClick={() => cancelComment()} />
                        <FlatButton primary={true} label='发布' onClick={handleSubmit(this.handleSave)} />
                    </div>

                </form>
            </div>
        );
    }
}

export default CommentInput;