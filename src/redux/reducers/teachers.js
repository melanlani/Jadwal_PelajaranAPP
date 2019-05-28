const initialState = {
  data: [],
  dataSingle: {},
  pending: false,
  error: ''
}

export default teachers = (state = initialState, action) => {
  switch (action.type) {

    case 'GET_TEACHERS_PENDING':
      return {
        ...state,
        pending: true
      };
    case 'GET_TEACHERS_FULFILLED':
      return {
        ...state,
        data: action.payload.data.result,
        pending: false,
      };
    case 'GET_TEACHERS_REJECTED':
      return {
        error: action.payload.data,
        pending: false,
      };

    case 'DELETE_TEACHERS_PENDING':
      return {
        ...state,
        data: [],
        pending: true
      };
    case 'DELETE_TEACHERS_FULFILLED':

      return {
        data: state.data.filter((teacher)=>teacher.id !== action.payload.data.result),
        pending: false
      }

    case 'ADD_TEACHERS_PENDING':
      return {
        ...state,
        data: [],
        pending: true
      };
    case 'ADD_TEACHERS_FULFILLED':
      return {
        ...state,
        pending: false,
      };
    case 'ADD_TEACHERS_REJECTED':
      return {
        ...state,
        error: action.payload.data,
        pending: false,
      };

    case 'UPDATE_TEACHERS_PENDING':
      return {
        ...state,
        data: [],
        pending: true
      };
    case 'UPDATE_TEACHERS_FULFILLED':
      return {
        ...state,
        data: state.data.map((teacher)=>teacher.id === action.payload.data.result.id ? {...teacher,...action.payload.data.result}:teacher),
        pending: false,
      };
    case 'UPDATE_TEACHERS_REJECTED':
      return {
        ...state,
        error: action.payload.data,
        pending: false,
      };

    case 'SHOW_TEACHERS_PENDING':
      return {
        ...state,
        pending: true
      };
    case 'SHOW_TEACHERS_FULFILLED':
      return {
        ...state,
        dataSingle: action.payload.data.result,
        pending: false,
      };

    default:
      return state;
  }
}
