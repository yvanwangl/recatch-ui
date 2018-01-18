import * as React from 'react';
import { observer } from 'mobx-react';
import TodayIcon from 'material-ui/svg-icons/action/today';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { dateFormat } from '../../../utils/util';
import './index.css';

export interface AuthorModel {
	name: string;
	avatar?: string;
}
export interface PostModel {
	_id: number | string;
	author: string;
	title: string;
	userId: string;
	userName: string;
	plaintext: string;
	content: string;
	count?: string;
	publishDate: string;
	coverImg: string;
	comments: Array<string>;
	labels: Array<any>;
}

export interface PostItemProps {
	key: string | number;
	post: PostModel;
	handleItemClick: (event: any) => void;
	// handleItemModify: () => void;
	// handleItemDelete: () => void;
}

@observer
class PostItem extends React.Component<PostItemProps> {

	render() {
		let { handleItemClick } = this.props;
		let { title, plaintext, count: views, publishDate, coverImg, comments } = this.props.post;

		return (
			<span className='PostItem-card' onClick={handleItemClick}>
				<Card style={{ height: '100%' }} containerStyle={{ height: '100%', position: 'relative' }}>
					<CardHeader
						textStyle={{ paddingRight: 0 }}
						title={<h1 className='PostItem-card-title'>{title}</h1>}
					//avatar={avatar}
					/>
					<CardMedia
						overlay={
							<CardTitle
								style={{ padding: '8 16' }}
								title={
									<div className='PostItem-card-icon-list'>
										<span className='PostItem-card-icon-wrapper'><TodayIcon className='PostItem-card-icon' /> {dateFormat(publishDate)}</span>
										<span className='PostItem-card-icon-wrapper'><VisibilityIcon className='PostItem-card-icon' /> {views}</span>
										<span className='PostItem-card-icon-wrapper'><CommentIcon className='PostItem-card-icon' /> {comments.length}</span>
									</div>
								}
								titleStyle={{ fontSize: 16, display: 'inline-block' }}
							/>
						}
						style={{ overflow: 'hidden' }}
					>
						<img className='PostItem-coverImg' src={coverImg} alt="" />
					</CardMedia>
					{/* <CardTitle title="Card title" subtitle="Card subtitle" /> */}
					<CardText className='PostItem-card-text'>
						{plaintext}
					</CardText>
					<CardActions className='PostItem-card-actions'>
						<FlatButton label="阅读全文..." secondary={true} onClick={handleItemClick} />
					</CardActions>
				</Card>
			</span>

		);
	}
}

export default PostItem;