import axios from 'axios';
import { baseUrl } from './api';

export const getSchedules = () => {
  return {
    type: 'GET_SCHEDULES',
    payload: axios.get(`${baseUrl}/api/v1/schedules`)
  }
}

export const showSchedules = (id) => {
  return {
    type: 'SHOW_SCHEDULES',
    payload: axios.get(`${baseUrl}/api/v1/schedules/${id}`)
  }
}

export const updateSchedules = (id, selectedItems) => {
  let data = new FormData();

    selectedItems.map(element => {
        data.append('subjects', element);
    });
  return {
    type: 'UPDATE_SCHEDULES',
    payload: axios.put(`${baseUrl}/api/v1/schedules/${id}`,data)
  }
}
