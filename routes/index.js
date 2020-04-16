import express from 'express';
import TodoController from '../todosControllers/todos';
import TweetsController from '../todosControllers/twitter';

const router = express.Router();

router.get('/api/v1/todos', TodoController.getAllTodos);
router.get('/api/v1/todos/:id', TodoController.getTodo);
router.post('/api/v1/todos', TodoController.createTodo);
router.put('/api/v1/todos/:id', TodoController.updateTodo);
router.delete('/api/v1/todos/:id', TodoController.deleteTodo);
router.get('/api/v1/twitter',  TweetsController.getHealthRelatedTweets);

export default router;