import axios from 'axios';

const instance = axios.create({
    baseURL:"https://react-burger-builder-7b496-default-rtdb.firebaseio.com/"
})
export default instance;