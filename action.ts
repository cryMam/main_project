import axios from 'axios';
import { Dispatch } from 'redux';
import { TodoAction, TodoActioTypes } from '../../types/todo';

export const fetchTodos =
  (page = 1, limit = 10) =>
  async (dispatch: Dispatch<TodoAction>) => {
    try {
      dispatch({ type: TodoActioTypes.FETCH_TODOS });
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos',
        {
          params: { _page: page, _limit: limit },
        }
      );
      dispatch({
        type: TodoActioTypes.FETCH_TODOS_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: TodoActioTypes.FETCH_TODOS_ERROR,
        payload: 'Error while loading todos',
      });
    }
  };

export const setTodoPage = (page: number): TodoAction => {
  return { type: TodoActioTypes.SET_TODO_PAGE, payload: page };
};
