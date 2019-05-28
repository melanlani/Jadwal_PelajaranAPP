import axios from 'axios';
import { baseUrl } from './api';

export const getTeachers = () => {
  return {
    type: 'GET_TEACHERS',
    payload: axios.get(`${baseUrl}/api/v1/teachers`)
  }
}

export const deleteTeachers = (id) => {
    return{
      type: 'DELETE_TEACHERS',
      payload: axios.delete(`${baseUrl}/api/v1/teachers/${id}`)
    }
}

export const addTeachers = (teacher_name) => {
  return {
    type: 'ADD_TEACHERS',
    payload: axios.post(`${baseUrl}/api/v1/teachers`,{
      teacher_name : teacher_name
    })
  }
}

export const showTeachers = (id) => {
  return {
    type: 'SHOW_TEACHERS',
    payload: axios.get(`${baseUrl}/api/v1/teachers/${id}`)
  }
}

export const updateTeachers = (id, teacher_name) => {
  return {
    type: 'UPDATE_TEACHERS',
    payload: axios.put(`${baseUrl}/api/v1/teachers/${id}`,{
      teacher_name : teacher_name
    })
  }
}
