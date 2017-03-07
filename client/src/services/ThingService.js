import axios from 'axios';

import { API_URL } from '../constants';

export default {
    fetchThings() {
        return axios.get(`${API_URL}/things`);
    }
};