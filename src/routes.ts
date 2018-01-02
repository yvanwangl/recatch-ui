import Posts from './containers/posts/components/Posts';
import PostView from './containers/posts/components/PostView';
import Projects from './containers/projects/components/Projects';
import Links from './containers/links/components/Links';
import About from './containers/about/components/About';

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
    },
    {
        path: '/about',
        component: About
    }
];

export default routes;