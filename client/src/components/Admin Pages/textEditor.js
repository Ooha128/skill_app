import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = () => {
  const [value, setValue] = useState('');

  const handleChange = (content) => {
    setValue(content);
  };

  return (
    <ReactQuill className='w-11/12 h-20'
      value={value}
      onChange={handleChange}
      modules={{ toolbar: true }}
      theme="snow"
    />
  );
};

export default TextEditor;
