import axios from 'axios';
import { baseUrl } from './api';

export const getSubjects = () => {
  return {
    type: 'GET_SUBJECTS',
    payload: axios.get(`${baseUrl}/api/v1/subjects`)
  }
}

export const deleteSubjects = (id) => {
    return{
      type: 'DELETE_SUBJECTS',
      payload: axios.delete(`${baseUrl}/api/v1/subjects/${id}`)
    }
}

export const addSubjects = (subject_name,teacher_id,schedule_start,schedule_end) => {
  return {
    type: 'ADD_SUBJECTS',
    payload: axios.post(`${baseUrl}/api/v1/subjects`,{
      subject_name : subject_name,
      teacher_id : teacher_id,
      schedule_start : schedule_start,
      schedule_end : schedule_end

    })
  }
}

export const showSubjects = (id) => {
  return {
    type: 'SHOW_SUBJECTS',
    payload: axios.get(`${baseUrl}/api/v1/subjects/subject/${id}`)
  }
}

export const updateSubjects = (id, subject_name,teacher_id,schedule_start,schedule_end) => {
  return {
    type: 'UPDATE_SUBJECTS',
    payload: axios.put(`${baseUrl}/api/v1/subjects/${id}`,{
      subject_name : subject_name,
      teacher_id : teacher_id,
      schedule_start : schedule_start,
      schedule_end : schedule_end
    })
  }
}
