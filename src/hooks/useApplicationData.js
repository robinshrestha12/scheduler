
import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  //to fix appointment error while hard coded appointments object is commented out.

  const setDay = day => setState({ ...state, day });


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

      setState(prev => ({ ...prev, days: allDays.data, appointments: allAppointments.data, interviewers: allInterviews.data }));
    })
  }, []);

  function getDay(day){
    const weekDays = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
     
    }
  return weekDays[day];
  }
  //updateSpots function
function updateSpots(state, id){
//got through each appointment and check for the interview object.
const result = [];
for(let day of state.days){
  let spots = 0;
for(let id of day.appointments){
  if(state.appointments[id] && !state.appointments[id].interview){
    spots++;
  }

}
//after destructuring, putting new sports in the object.
result.push({...day, spots});
}

//setState with the spot.
return result;
}

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
      //update function.
      const newState ={
        ...state,
        appointments,
       
      }
      const days=updateSpots(newState);

        setState({
          ...newState,        
          days
        });
        

      })
  }
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {

      const newState ={
        ...state,
        appointments,
       
      }

     const days=updateSpots(newState);

        setState({
          ...newState,        
          days
        });
      //updatespots
    })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}

