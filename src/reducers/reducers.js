export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

function updateSpots(state, id) {
  //got through each appointment and check for the interview object.
  const result = [];
  for (let day of state.days) {
    let spots = 0;
    for (let id of day.appointments) {
      if (state.appointments[id] && !state.appointments[id].interview) {
        spots++;
      }
  
    }
    //after destructuring, putting new sports in the object.
    result.push({ ...day, spots });
  }

  //setState with the spot.
  return result;
}
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
        interview: action.interview
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      const newState = {
        ...state,
        appointments: appointments,

      }
      
      const days = updateSpots(newState);

      return {
        //logic
        ...newState,
        days

      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }


}
export default reducer;