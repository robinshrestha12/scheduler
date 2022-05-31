
import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {
  //const interviewers = props.interviewers;

  const [student, setStudent] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = function(){
    setStudent("");
    setInterviewer(null);
  }
  const cancel = function(){
    reset();
    props.onCancel();

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

          />
        </form>
        <InterviewerList
          /* your code goes here */
          interviewers={props.interviewers}
          //setInterviewer ={() => onLoad(interviewer.id)}
          
          value ={interviewer}
          onChange={(event) => setInterviewer(event)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}/* your code goes here */  >Cancel</Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)}/* your code goes here */  >Save</Button>
        </section>
      </section>
    </main>
  );
}