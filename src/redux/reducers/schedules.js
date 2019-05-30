const initialState = {
  data: [],
  dataSingle: [],
  pending: false,
  error: ''
}

export default schedules = (state = initialState, action) => {
  switch (action.type) {

    case 'GET_SCHEDULES_PENDING':
      return {
        ...state,
        pending: true
      };
    case 'GET_SCHEDULES_FULFILLED':
      return {
        ...state,
        data: action.payload.data.result,
        pending: false,
      };
    case 'GET_SCHEDULES_REJECTED':
      return {
        error: action.payload.data,
        pending: false,
      };

    case 'UPDATE_SCHEDULES_PENDING':
      return {
        ...state,
        data: [],
        pending: true
      };
    case 'UPDATE_SCHEDULES_FULFILLED':
      return {
        ...state,
        data: state.data.map((teacher)=>teacher.id === action.payload.data.result.id ? {...teacher,...action.payload.data.result}:teacher),
        pending: false,
      };
    case 'UPDATE_SCHEDULES_REJECTED':
      return {
        ...state,
        error: action.payload.data,
        pending: false,
      };

    case 'SHOW_SCHEDULES_PENDING':
      return {
        ...state,
        pending: true
      };
    case 'SHOW_SCHEDULES_FULFILLED':
      return {
        ...state,
        dataSingle: action.payload.data.result,
        pending: false,
      };

    default:
      return state;
  }
}
