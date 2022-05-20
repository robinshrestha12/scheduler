import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  const {interviewers} = props;
  const interviewerListData = interviewers.map(interviewersToRender => {
    return (
      <InterviewerListItem
        key = {interviewersToRender.id}
        id = {interviewersToRender.id}
        name = {interviewersToRender.name}
        avatar = {interviewersToRender.avatar}
        selected = { interviewersToRender.id === props.interviewer}
        setInterviewer = {props.setInterviewer}
      />
    )
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListData}</ul>
    </section>
  );
}