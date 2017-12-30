import * as React from 'react';
import { observer } from 'mobx-react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './index.css';

const Item = observer(({ item: { name, link, description}, buttonLabel}) => (
    <Card className='Item-card'>
        <CardHeader
            title={<h1 className='Item-card-title'>{name}</h1>}
        />
        <CardText className='Item-card-text'>
            {description}
        </CardText>
        <CardActions className='Item-card-actions'>
            <a href={link} target='_blank'><FlatButton primary={true} label={buttonLabel} /></a>
        </CardActions>
    </Card>
));

export default Item;