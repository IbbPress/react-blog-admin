import React, { useState, useEffect } from 'react';
import { Button, Table, Popconfirm, Icon } from 'antd';
import { getPostList, delPost } from "../../config/api";
import dayjs from 'dayjs'
const { Column } = Table;
function List (props) {

  const [ list, setList ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const getList = async () => {
    try {
      setLoading(true)
      const resp = await getPostList();
      setList(resp.data)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  const updateArticle = (id) => {
    props.history.push(`/posts/edit/${id}`)
  }
  const delArticle = async (id) => {
    try {
      const resp = await delPost(id);
      console.log('delete post resp: ', id, resp);
    } catch (error) {
      
    }
  }

  // setList(data);
  useEffect(() => {
    getList();
  }, [])

  // const tags = tags => (
  //   <span>
  //     {tags.map(tag => (
  //       <Tag color="blue" key={tag}>
  //         {tag}
  //       </Tag>
  //     ))}
  //   </span>
  // )
  const actions = (text, record) => (
    <span>
      <Button type="primary" onClick={()=>{updateArticle(record.id)}}>编辑</Button>&nbsp;
      {/* <Divider type="vertical" /> */}
      <Popconfirm
        title="确定要删除吗？"
        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
        okText="删除"
        okType="danger"
        cancelText="再想想"
        onConfirm={()=>{delArticle(record.id)}}>
        <Button>删除</Button>
      </Popconfirm>
    </span>
  )
  const time = (create_time, record) => (
    dayjs.unix(record.create_time).format('YYYY-MM-DD')
  )

  return (
    <div className="article-list">
      <h1>文章列表</h1>
      <Table dataSource={list} loading={loading} rowKey={record => record.id}>
        <Column title="标题" dataIndex="title" key="title" />
        <Column title="发布时间" dataIndex="create_time" render={time} />
        <Column title="阅读次数" dataIndex="view_count" key="view_count" />
        <Column title="操作" key="action" render={actions} />
      </Table>
    </div>
  )
}

export default List;