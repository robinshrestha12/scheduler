
//hooks for keeping function in one place
import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW} from "reducers/reducers";

export default function useApplicationData() {

    const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

   
 const setDay = day => dispatch({ type: SET_DAY, day:day});

  useEffect(() => {
    const urlDays = `/api/days`;
    const urlAppointments = `/api/appointments`;
    const urlInterviews = `/api/interviewers`;
  
    Promise.all([
      axios.get(urlDays),
      axios.get(urlAppointments),
      axios.get(urlInterviews)
    ]).then((all) => {
  
      
      //deconstruction
      const [allDays, allAppointments, allInterviews] = all;
      console.log("all days", allDays.data);
      console.log("all appointments", allAppointments.data);
     
      dispatch ({ type:SET_APPLICATION_DATA, days: allDays.data, appointments: allAppointments.data, interviewers: allInterviews.data });
    })
  }, []);

  
  function bookInterview(id, interview) {
    console.log(id, interview);
   
     return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview
        })
      })
   
    
  }
  function cancelInterview(id) {
   
     return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview: null
        })
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}

