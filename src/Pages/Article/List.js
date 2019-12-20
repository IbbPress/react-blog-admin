import React, { useState } from 'react';
import { Button, Table, Tag, Popconfirm } from 'antd';
// import { getArticleList } from "../../config/api";

const { Column } = Table;
const data = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    id: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    id: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

function List (props) {

  const [ list ] = useState(data)
  // const [ loading, toggleLoading ] = useState(false)
  // const getList = async () => {
  //   try {
  //     toggleLoading(!loading)
  //     const resp = await getArticleList();
  //     setList(resp.data.list)
  //   } catch (error) {
      
  //   } finally {
  //     toggleLoading(!loading)
  //   }
  // }

  const updateArticle = (id) => {
    props.history.push(`/index/add/${id}`)
  }
  const delArticle = (id) => {
    console.log(id);
  }

  // setList(data);

  const tags = tags => (
    <span>
      {tags.map(tag => (
        <Tag color="blue" key={tag}>
          {tag}
        </Tag>
      ))}
    </span>
  )
  const actions = (text, record) => (
    <span>
      <Button type="primary" onClick={()=>{updateArticle(record.id)}}>编辑</Button>&nbsp;
      {/* <Divider type="vertical" /> */}
      <Popconfirm title="Sure to delete?" onConfirm={()=>{delArticle(record.id)}}>
        <Button>删除</Button>
      </Popconfirm>
    </span>
  )

  return (
    <div className="article-list">
      <h1>文章列表</h1>
      <Table dataSource={list} >
        <Column title="标题" dataIndex="firstName" key="firstName" />
        <Column title="集数" dataIndex="age" key="age" />
        <Column title="发布时间" dataIndex="address" key="address" />
        <Column title="标签" dataIndex="tags" key="tags" render={tags} />
        <Column title="操作" key="action" render={actions} />
      </Table>
    </div>
  )
}

export default List;