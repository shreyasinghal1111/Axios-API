import axios from 'axios';
const api=axios.create({
    baseURL:'https://api.github.com',
})
export const getPost=()=>{
    return  api.get('search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=2')
}