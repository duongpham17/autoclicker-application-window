import axios from 'axios';
import { base_url, environment } from 'environment'
import { user_authentication } from '@localstorage';

const storage = user_authentication.get();

const token = storage?.token || "";

export const api = axios.create({
  baseURL: base_url[environment],
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token,
  },
});