import express from 'express';

// Controller imports
import basicController from './controllers/basicController';
import userController from './controllers/userController';
import subscriberController from './controllers/subscriberController';
import postController from './controllers/postController';
import commentController from './controllers/commentController';
import categoryController from './controllers/categoryController';

const routes = express();

// Basic routes
routes.get('/', basicController.get);

// User routes
routes.post('/signup', userController.post);
routes.post('/login', userController.login);

// Subscribe routes
routes.post('/subscribe', subscriberController.post);

// Post routes
routes.post('/post', postController.post);
routes.get('/posts', postController.getAll);
routes.get('/post/:_id', postController.getPostById);
routes.get('/posts/:_categoryId', postController.getByCategory);

// Comment routes
routes.post('/comment', commentController.post);

// Category routes
routes.post('/category', categoryController.post);
routes.get('/categories', categoryController.getAll);

export default routes;
