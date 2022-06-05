export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        //logic
         ...state, day: action.day 
      }
    case SET_APPLICATION_DATA:
      return {
        //logic
        ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers
      }
    case SET_INTERVIEW:
      const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview}
      };
      const appointments = {
        ...state.appointments, 
        [action.id]:appointment
      };
      const newState ={
        ...state,
        appointments: appointments,
        
      }
      // const newState ={
      //   ...state,
      //   appointments: {
      //     ...state.appointments,
      //     [action.id]: {
      //       ...state.appointments[action.id],
      //       interview: {...action.interview}
      //     }
      //   }
      // }
      return {
        //logic
        ...newState
        
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }


}
export default reducer;