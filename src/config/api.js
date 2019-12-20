import { GET, POST, DELETE  } from "./request";

export const getArticleList = () => GET('/getArticleList')

export const updateArticle = (payload) => POST('/updateArticle', payload)

export const deleteArticle = (payload) => DELETE('/delArticle', payload)