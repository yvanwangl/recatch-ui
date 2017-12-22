import * as React from 'react';
import { inject, observer } from 'mobx-react';

@inject('link')
@observer
class Links extends React.Component {

    render() {
        return '友链页面';
    };
}

export default Links;