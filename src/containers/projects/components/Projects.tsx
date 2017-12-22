import * as React from 'react';
import {inject, observer} from 'mobx-react';

@inject('project')
@observer
class Projects extends React.Component {
    render(){
        return '项目列表页';
    }
}

export default Projects;