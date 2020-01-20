import { GET, POST, PUT, DELETE  } from "./request";

export const getPostList    = () => GET('/posts')

export const getPost        = id => GET('/posts/' + id)

export const delPost        = (id) => DELETE(`/posts/${id}`)

export const createPost     = (payload) => POST('/posts', payload)

export const updatePost     = (payload) => PUT('/posts', payload)

export const deleteArticle  = (payload) => DELETE('/posts' + payload.id)

export const login = (payload) => POST('/login', payload)
export const logout = () => POST('/logout')