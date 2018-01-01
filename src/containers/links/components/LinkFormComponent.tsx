import * as React from 'react';
import { observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

export interface LinkFormProps {
    saveLink: Function;
    handleCancel: () => void;
    linkForm: any;
    openDialog: boolean;
}

export interface LinkFormState {
    openSnackbar: boolean;
}

const delayTime = 2000;

@observer
class LinkForm extends React.Component<LinkFormProps, LinkFormState> {

    constructor(props: LinkFormProps) {
        super(props);
        this.state = {
            openSnackbar: false
        };
    }

    //确定按钮点击事件
    handleConfirm = () => {
        let { linkForm, saveLink, handleCancel } = this.props;
        let values = linkForm.values();
        saveLink(values).then((result: any) => {
            if (result.success) {
                this.setState({ openSnackbar: true });
                setTimeout(handleCancel, delayTime);
            }
        });
    };

    render() {
        let { handleCancel, linkForm, openDialog } = this.props;
        let { openSnackbar } = this.state;
        let nameField = linkForm.$('name');
        let linkField = linkForm.$('link');
        let emailField = linkForm.$('email');
        let descriptionField = linkForm.$('description');

        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onClick={handleCancel}
            />,
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleConfirm}
            />,
        ];

        return (
            <Dialog
                title='申请友链'
                actions={actions}
                modal={false}
                open={openDialog}
                onRequestClose={handleCancel}
            >
                <form className="LinkInput-commentForm">
                    <div className='LinkInput-form-item'>
                        <TextField
                            floatingLabelText='网站名称'
                            hintText='网站名称'
                            errorText={nameField.error}
                            fullWidth={true}
                            {...nameField.bind() }
                        />
                    </div>
                    <div className='LinkInput-form-item'>
                        <TextField
                            floatingLabelText='网站地址'
                            hintText='网站地址'
                            errorText={linkField.error}
                            fullWidth={true}
                            {...linkField.bind() }
                        />
                    </div>
                    <div className='LinkInput-form-item'>
                        <TextField
                            floatingLabelText='邮箱地址'
                            hintText='审核结果将会以邮件的形式发送到您的邮箱 :)'
                            errorText={emailField.error}
                            fullWidth={true}
                            {...emailField.bind() }
                        />
                    </div>
                    <div className='LinkInput-form-item'>
                        <TextField
                            floatingLabelText='你的梦想是什么'
                            hintText='你的梦想是什么'
                            errorText={descriptionField.error}
                            fullWidth={true}
                            rows={2}
                            rowsMax={5}
                            {...descriptionField.bind() }
                        />
                    </div>
                </form>
                <Snackbar
                    open={openSnackbar}
                    message="友链申请提交成功 :)"
                    autoHideDuration={delayTime}
                    style={{ textAlign: 'center' }}
                />
            </Dialog>
        );
    }
}

export default LinkForm;