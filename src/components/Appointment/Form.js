
import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {
  //const interviewers = props.interviewers;

  const [student, setStudent] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const reset = function () {
    setStudent("");
    setInterviewer(null);
  }
  const cancel = function () {
    reset();
    props.onCancel();

  }
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    props.onSave(student, interviewer);
  }

  function handleClick() {
    validate();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            value={student}
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
              your code goes here
              */

            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          /* your code goes here */
          interviewers={props.interviewers}
          //setInterviewer ={() => onLoad(interviewer.id)}

          value={interviewer}
          onChange={(event) => setInterviewer(event)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}/* your code goes here */  >Cancel</Button>
          <Button confirm onClick={handleClick} >Save</Button>
        </section>
      </section>
    </main>
  );
}