import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){
  const {days} =props;
  const dayListItemData = days.map(dayToRender =>{
    return (
      <DayListItem
      key={dayToRender.id}
      name ={dayToRender.name}
      spots={dayToRender.spots}
      selected={dayToRender.name ===props.day}
      setDay = {props.setDay}
      />
    )
  })
  return (
    <ul>
      {dayListItemData}
    </ul>
    );
};
