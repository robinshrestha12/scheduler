// helpers functions

export function getAppointmentsForDay(state, name) {
 //getting days from the name
  const filteredDays = state.days.find(day => day.name === name);
  if ((state.days.length) === 0 || filteredDays === undefined) {
    return [];
  }

  return filteredDays.appointments.map((id) =>
    state.appointments[id]
  );
  
}
export function getInterview(state, interview) {
  
  const filteredInterview = {};
  if (!interview) return null;
  filteredInterview.student = interview.student;
  filteredInterview.interviewer = state.interviewers[interview.interviewer]
  return filteredInterview;
}
export function getInterviewersForDay(state, name) {
 
  const filteredDays = state.days.find(day => day.name === name);
  if ((state.days.length) === 0 || filteredDays === undefined) {
    return [];
  }

   return filteredDays.interviewers.map((id) =>
     state.interviewers[id]
   );

}