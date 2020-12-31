import axios from 'axios'
import * as URLroutes from './URLRoutes'

const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` }
  };
  
export const authenticateToken = () => axios.get(URLroutes.authenticateUserURL,config)
          .then(res => { return res.data})
          .catch(error =>{
            alert(error)
            sessionStorage.clear()
            window.location.href="/games/unAuthError"
          })