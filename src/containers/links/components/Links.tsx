import * as React from 'react';
import { inject, observer } from 'mobx-react';
import LinkStore from '../LinkStore';
import RaisedButton from 'material-ui/RaisedButton';
import { default as LinkItem } from '../../../components/Item';
import linkForm from './linkForm';
import LinkForm from './LinkFormComponent';

export interface LinkModel {
    id: string;
    name: string;
    link: string;
    description: string;
}

export interface LinkProps {
    link: LinkStore;
}

export interface LinkState {
    openDialog: boolean;
}

@inject('link')
@observer
class Links extends React.Component<LinkProps, LinkState> {

    constructor(props: LinkProps) {
        super(props);
        this.state = {
            openDialog: false
        };
    }

    componentDidMount() {
        let { link } = this.props;
        if (link.links.length == 0) {
            link.fetchLinks();
        }
    }

    //新增按钮点击事件
    handleCreate = () => {
        this.setState({
            openDialog: true
        });
    };

    //取消按钮点击事件
    cancelLink = () => {
        this.setState({
            openDialog: false
        });
        linkForm.clear();
    };

    render() {
        let { link } = this.props;
        let { openDialog } = this.state;
        let linkItems = link.links.map((l: LinkModel) => <LinkItem key={l['_id']} item={l} buttonLabel='查看友链' />)
        return (
            <div className='Links-Manage'>
                <div className='Links-warning'>
                    <h2>
                        申请友链须知：
                    </h2>
                    <p>1、网站不包含色情、暴力等内容</p>
                    <p>2、网站已经在国内完成备案</p>
                    <p>3、网站为技术类站点</p>
                </div>
                <div className='Item-wrapper'>

                    {linkItems}
                    {
                        openDialog ?
                            <LinkForm
                                linkForm={linkForm}
                                saveLink={link.saveLink}
                                handleCancel={this.cancelLink}
                                openDialog={openDialog}
                            /> : null
                    }
                    <RaisedButton style={{ marginTop: 30 }} secondary={true} label="加入友链" fullWidth={true} onClick={this.handleCreate} />
                </div>
            </div>

        );
    }
}

export default Links;