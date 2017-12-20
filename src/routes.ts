import Posts from './containers/posts/components/Posts';

const routes =  [
    {
        path: '/',
        component: Posts
    },
    {
        path: '/post/:postId',
        component: Posts
    }
];

export default routes;