import { GET, POST, DELETE  } from "./request";

export const getArticleList = () => GET('/getArticleList')

export const getPost     = id => GET('/getArticle/' + id)

export const delPost = (id) => DELETE(`/post/${id}`)

export const updatePost = (payload) => POST('/updatePost', payload)

export const createPost = (payload) => POST('/post', payload)


export const deleteArticle = (payload) => DELETE('/delArticle', payload)

export const login = (payload) => POST('/login', payload)