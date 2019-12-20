import React, { useState, useEffect } from 'react';
import {
  // Row,
  // Col,
  Input,
  // Select,
  // Button,
  // DatePicker,
  // message
} from 'antd'

// import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/dark.css';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function Add(props) {

  const [ id,            ] = useState(0)
  const [ title,   setTitle   ] = useState('');
  const [ content, setContent ] = useState('');
  // const [ loading, setLoading ] = useState(false);

  const handleChange = value => {
    console.log(value);
    setContent(value);
  };

  useEffect(() => {
    let _id = props.match.params.id;
    if (_id !== id) {
      // setId(id)
      // fetch(id);
    }
  })


  // const fetch = async id => {
  //   try {
  //     setLoading(!loading)
  //   } catch (error) {
      
  //   } finally {
  //     setLoading(!loading)
  //   }
  // }

  return (
    <div>
      <h1> Add </h1>

      <Input 
        value={title}
        addonBefore="博客标题"
        onChange={e=>{setTitle(e.target.value)}}
        size="large"
        style={{ marginBottom: '32px'}}
      />

      <SimpleMDE
        id="your-custom-id"
        label="Your label"
        onChange={handleChange}
        value={content}
        options={{
          autofocus: true,
          spellChecker: false,
          previewRender(plainText) {
            return marked(plainText, {
              renderer: new marked.Renderer(),
              gfm: true,
              pedantic: false,
              sanitize: false,
              tables: true,
              breaks: true,
              smartLists: true,
              smartypants: true,
              highlight(code) {
                return highlight.highlightAuto(code).value;
              },
            });
          },
          // etc.
        }}
      />

      {/* <textarea id="editor"></textarea> */}
      {/* <Input.TextArea
        
        value={content} 
        className="markdown-content" 
        rows={15}  
        onChange={e=>{setContent(e.target.value)}}
        placeholder="文章内容"
      /> */}
    </div>
  )
}

export default Add;