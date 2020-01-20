import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Input,
  // Select,
  Button,
  // DatePicker,
  message
} from 'antd'

import dayjs from "dayjs";

// import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/dark.css';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";


import { getPost, updatePost, createPost } from "../../config/api";

function Add(props) {

  console.log('props: ', props.match.params);

  // const [ id ] = useState(0)
  const [ post,   setPost   ] = useState({
    title: '',
    content: '',
    view_count: 0,
  });
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  // const [ loading, setLoading ] = useState(false);



  // const fetchPost = async () => {
  //   let _id = props.match.params.id;
  //   try {
  //     setLoading(!loading)
  //     const resp = await getPost(_id)
  //     console.log(resp);
  //     setPost(resp.data)
  //     setTitle(resp.data.title)
  //     setContent(resp.data.content)
  //   } catch (error) {
      
  //   } finally {
  //     setLoading(!loading)
  //   }
  // }


  useEffect(() => {
    const fetchPost = async () => {
      let _id = props.match.params.id;
      if (_id === undefined) { return; }
      try {
        // setLoading(!loading)
        const resp = await getPost(_id)
        console.log(resp);
        setPost(resp.data)
        setTitle(resp.data.title)
        setContent(resp.data.content)
      } catch (error) {
        
      } finally {
        // setLoading(!loading)
      }
    }
    fetchPost();
  }, [props.match.params.id])

  const handleContentChange = value => {
    // console.log(value);
    setContent(value);
  };
  const handleTitleChange = value => {
    // console.log(value);
    setTitle(value);
  };

  const handleSubmit = async () => {
    let currTime = dayjs().unix();
    const payload = Object.assign({}, post, {
      title, content,
      add_time: currTime,
      // update_time: currTime,
    })

    try {
      let resp;
      if (payload.id !== undefined) {
        resp = await updatePost(payload);
        message.success('更新成功')
      } else {
        resp = await createPost(payload)
        message.success('创建成功')
      }
      console.log('add resp: ', resp)
    } catch (error) {
      
    }
  }


  return (
    <div>
      <Row gutter={16}>
        <Col span={18}>
          <div className="main">
            <h1>编辑文章</h1>
            <Input 
              value={title}
              addonBefore="博客标题"
              onChange={e=>{handleTitleChange(e.target.value)}}
              size="large"
              style={{ marginBottom: '32px'}}
            />

            <SimpleMDE
              id="your-custom-id"
              label="Your label"
              onChange={handleContentChange}
              value={post.content}
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
          </div>
        </Col>
        <Col span={6} >
          <div className="right-Sider">
            <h4>发布</h4>

            <Button type="primary" onClick={handleSubmit}>提交</Button>
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default Add;