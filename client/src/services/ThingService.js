import axios from 'axios';

import { API_URL } from '../constants';

export default {
    fetchthings() {
        return axios.get(`${API_URL}/things`);
    }
};