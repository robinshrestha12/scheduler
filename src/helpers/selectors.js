//import React from "react";

export function getAppointmentsForDay(state, name) {
  //console.log(state.days);

  const filteredDays = state.days.find(day => day.name === name);
  if ((state.days.length) === 0 || filteredDays === undefined) {
    return [];
  }

  return filteredDays.appointments.map((id) =>
    state.appointments[id]
  );
  //Note: if used {} withing map after => then another return word is required.
}
export function getInterview(state, interview) {
  //console.log(state.appointments.interview);
  const filteredInterview = {};
  if (!interview) return null;
  filteredInterview.student = interview.student;
  filteredInterview.interviewer = state.interviewers[interview.interviewer]
  return filteredInterview;
}
export function getInterviewersForDay(state, name) {
  //console.log(state.days);

  const filteredDays = state.days.find(day => day.name === name);
  if ((state.days.length) === 0 || filteredDays === undefined) {
    return [];
  }

   return filteredDays.interviewers.map((id) =>
     state.interviewers[id]
   );
//get interviewers for the day
/*const interviewersFromDays = filteredDays.interviewers;
let filteredInterviewers = [];

for(let interviewer of interviewersFromDays){
  filteredInterviewers.push(state.interviewers[interviewer]);
}
return filteredInterviewers;*/

  //Note: if used {} withing map after => then another return word is required.
}