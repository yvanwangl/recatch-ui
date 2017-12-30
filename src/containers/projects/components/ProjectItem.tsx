// import * as React from 'react';
// import { observer } from 'mobx-react';
// import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
// import './index.css';

// export interface ProjectModel {
//     id: string;
//     name: string;
//     link: string;
//     description: string;
// }

// export interface ProjectItemProps {
//     project: ProjectModel;
// }

// @observer
// class ProjectItem extends React.Component<ProjectItemProps> {
//     render() {
//         let { name, link, description } = this.props.project;
//         return (
//             <Card className='ProjectItem-card'>
//                 <CardHeader
//                     title={<h1 className='ProjectItem-card-title'>{name}</h1>}
//                 />
//                 <CardText className='ProjectItem-card-text'>
//                     {description}
//                 </CardText>
//                 <CardActions className='ProjectItem-card-actions'>
//                     <a href={link} target='_blank'><FlatButton primary={true} label="查看项目" /></a>
//                 </CardActions>
//             </Card>
//         );
//     }
// }

// export default ProjectItem;