import { useEffect, useState } from 'react';
import './App.css';
import Item from './components/Item';
import {
  routesDeleteApi,
  routesGetApi,
  routesPostApi,
  routesPutApi,
} from './api/apis';

function App() {
  const [inputText, setInputText] = useState('');
  const [isEditing, setEditing] = useState(false);
  const [todos, setTodos] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!inputText) return;
    const len = todos.length + 1;
    const newTodo = {
      id: len,
      task: inputText,
      completed: false,
    };
    const list = [newTodo, ...todos];
    setTodos(list);
    try {
      await routesPostApi({ routeName: '/todos', params: { ...newTodo } });
    } catch (error) {
      console.log('error', error);
    }
    setInputText('');
  };

  const handleDelete = async (id) => {
    const list = todos.filter((item) => item.id !== id);
    setTodos(list);
    try {
      await routesDeleteApi({ routeName: `/todos/${id}` });
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleCheck = async (id) => {
    const copyTodos = [...todos];
    const idx = todos.findIndex((item) => item.id === id);
    copyTodos[idx].completed = !copyTodos[idx].completed;
    setTodos(copyTodos);

    try {
      await routesPutApi({
        routeName: `/todos/${id}`,
        params: { ...copyTodos[idx] },
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const copyTodos = [...todos];
    const idx = todos.findIndex((item) => item.id === selected);
    copyTodos[idx].task = inputText;
    setTodos(copyTodos);

    try {
      await routesPutApi({
        routeName: `/todos/${selected}`,
        params: { ...copyTodos[idx] },
      });
    } catch (error) {
      console.log('error', error);
    }

    setSelected(null);
    setEditing(false);
    setInputText('');
  };

  const handleEditing = (id) => {
    const copyTodos = [...todos];
    const idx = todos.findIndex((item) => item.id === id);
    if (selected === id) {
      setEditing(false);
      setInputText('');
      setSelected(null);
      return;
    }
    setInputText(copyTodos[idx].task);
    setEditing(true);
    setSelected(id);
  };

  useEffect(() => {
    return async () => {
      try {
        const todos = await routesGetApi({ routeName: '/todos' });
        setTodos(todos.data);
      } catch (error) {
        console.log('error', error);
      }
    };
  }, []);

  return (
    <>
      <h1>Todo list</h1>
      <form
        style={{
          display: 'flex',
          width: '100%',
          gap: '1rem',
          paddingBottom: '1rem',
        }}
        onSubmit={isEditing ? handleUpdate : handleAdd}
      >
        <input
          type='text'
          style={{ width: '100%', padding: '.5rem' }}
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
        {isEditing ? (
          <button style={{ background: 'blue', height: '3rem' }}>Update</button>
        ) : (
          <button style={{ background: 'blue', height: '3rem' }}>Add</button>
        )}
      </form>
      {todos.map((item) => (
        <Item
          key={item.id}
          {...item}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
          handleEditing={handleEditing}
        />
      ))}
    </>
  );
}

export default App;
