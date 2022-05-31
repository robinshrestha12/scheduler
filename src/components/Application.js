import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";



// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };



export default function Application(props) {
  //const [day, setDay] = useState("Monday");
  //const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  //to fix appointment error while hard coded appointments object is commented out.
  //const dailyAppointments =[];
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log(dailyAppointments);
  const setDay = day => setState({ ...state, day });
  //const setDays = (days) => setState(prev => ({ ...prev, days }));

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
        setState({
          ...state,
          appointments
        });
      })
  }

  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, appointment).then(() =>{
      setState({
        ...state,
        appointments
      });
    })
  }

  useEffect(() => {
    const urlDays = `/api/days`;
    const urlAppointments = `/api/appointments`;
    const urlInterviews = `/api/interviewers`;
    // console.log(state.interviewers);
    // axios.get(url).then(response => {
    //   console.log(response);
    //  // setDays(response.data);
    //   //setState(prev => ({ ...prev, state.days}));
    // })
    Promise.all([
      axios.get(urlDays),
      axios.get(urlAppointments),
      axios.get(urlInterviews)
    ]).then((all) => {
      // console.log(all[0])
      // console.log(all[1]);
      console.log(all[2].data);

      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  const schedule = Object.values(dailyAppointments).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}

      // {...appointment}

      />

    )
  }

  )
  //console.log(day);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            //day={"Monday"}
            value={state.day}
            onChange={setDay}

          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
