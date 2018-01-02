import * as React from 'react';
import { inject, observer } from 'mobx-react';
import ProjectStore from '../ProjectStore';
import { default as ProjectItem} from '../../../components/Item';

export interface ProjectModel {
    id: string;
    name: string;
    link: string;
    description: string;
}

export interface ProjectsProps {
    project: ProjectStore;
}

@inject('project')
@observer
class Projects extends React.Component<ProjectsProps> {

    componentDidMount() {
        let { project } = this.props;
        if (project.projects.length == 0) {
            project.fetchProjects();
        }
    }

    render() {
        let { project } = this.props;
        let projectItems = project.projects.map((p: ProjectModel) => <ProjectItem key={p['_id']} item={p} buttonLabel='查看项目' />)
        return (
            <div className='Item-wrapper'>
                {projectItems}
            </div>
        );
    }
}

export default Projects;