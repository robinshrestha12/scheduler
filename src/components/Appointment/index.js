import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";
import Form from "./Form";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //saving function
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) });

  }
  function deleteInterview(id) {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))

  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview ? <Show interview={props.interview} /> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}

        />
      )}
      {mode === CREATE && (
        <Form
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onCancel={(() => back(EMPTY))}
          bookInterview={props.bookInterview}
          onSave={save}
          
          
        />
      )}
      
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode ===CONFIRM && (
        <Confirm
        onConfirm = {deleteInterview}
        onCancel ={back}
        message = "Are you sure you would like to delete?"
        />
      )}
      {mode === DELETING && (
        <Status message="Deleting" />
      )}
    </article>

  )

}