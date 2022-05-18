import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", { "day-list__item": false, "day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0 });

  const formatSpots = () => {
    const numberOfSpots = props.spots;
    if (numberOfSpots === 0) {
      return ("no spots remaining");
    } else if (numberOfSpots === 1) {
      return ("1 spot remaining");
    } else {
      return `${numberOfSpots} spots remaining`;
    }
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}