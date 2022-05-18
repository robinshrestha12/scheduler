import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){
  const {days} =props;
  const dayListItemData = days.map(day =>{
    return (
      <DayListItem
      key={day.id}
      name ={day.name}
      spots={day.spots}
      />
    )
  })
  return (
    <ul>
      {dayListItemData}
    </ul>
    );
};
