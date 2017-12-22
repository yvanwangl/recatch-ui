import Posts from './containers/posts/components/Posts';
import PostView from './containers/posts/components/PostView';

const routes =  [
    {
        path: '/',
        component: Posts
    },
    {
        path: '/post/:postId',
        component: PostView
    }
];

export default routes;