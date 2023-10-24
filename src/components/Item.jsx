import React from 'react';

function Item({
  id,
  task,
  completed,
  handleDelete,
  handleCheck,
  handleEditing,
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '.5rem',
        alignItems: 'center',
      }}
    >
      <input
        type='checkbox'
        checked={!!completed}
        onChange={() => handleCheck(id)}
      />
      <p>{task}</p>
      <button
        style={{ background: 'green', height: '3rem' }}
        onClick={() => handleEditing(id)}
      >
        Edit
      </button>
      <button
        style={{ background: 'red', height: '3rem' }}
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
}

export default Item;
