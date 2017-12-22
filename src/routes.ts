import Posts from './containers/posts/components/Posts';
import PostView from './containers/posts/components/PostView';
import Projects from './containers/projects/components/Projects';
import Links from './containers/links/components/Links';

const routes =  [
    {
        path: '/',
        component: Posts
    },
    {
        path: '/post/:postId',
        component: PostView
    },
    {
        path: '/projects',
        component: Projects
    },
    {
        path: '/links',
        component: Links
    }
];

export default routes;