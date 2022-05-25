import React from "react";

export function getAppointmentsForDay(state, name) {
  console.log(state.days);

  const filteredDays = state.days.find(day => day.name===name);
  if((state.days.length)===0 || filteredDays===undefined){
    return [];
  }

  return filteredDays.appointments.map((id) => 
     state.appointments[id]
  );
  //Note: if used {} withing map after => then another return word is required.
}