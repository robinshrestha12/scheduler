import React from "react";

import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);
describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("1.loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //console.log(prettyDOM(container));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    //console.log(prettyDOM(appointments));

    // const appointment = getAllByTestId(container, "appointment")[0];
    //console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    //console.log(prettyDOM(appointment));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //expect(getByText(appointment, "Saving")).not.toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    //console.log(prettyDOM(day));
  });
  it("2. loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));


    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument()

    //debug();
  }),
    it("3.loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
      // 1. Render the Application.
      const { container, debug } = render(<Application />);

      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));

      // 3. Click the "Edit" button on the booked appointment.
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );

      fireEvent.click(queryByAltText(appointment, "Edit"));


      //4. Change the name and save the interview
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones Edited" }
      });
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

      fireEvent.click(getByText(appointment, "Save"));



      // 5. Check that the element with the text "Saving" is displayed.
      expect(getByText(appointment, "Saving")).toBeInTheDocument();

      // No need to change the spots for "Monday", since this is an edit

      //check if the spots for Monday are the same.....
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

      expect(getByText(appointment, "Saving")).toBeInTheDocument();

      await waitForElement(() => getByText(appointment, "Lydia Miller-Jones Edited"));
      debug();

    }),
    /* test number five */
    it("shows the save error when failing to save an appointment", async () => {
      axios.put.mockRejectedValueOnce();

      const { container} = render(<Application />);

      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));

      // 3. Click the "Edit" button on the booked appointment.
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );

      fireEvent.click(queryByAltText(appointment, "Edit"));
      // fireEvent.change(getByAltText(appointment, "Archie Cohen"), {
      //   target: { value: "Robin Text Edit" }
      // });
      // fireEvent.change(getByText(appointment, "Archie Cohen"), {
      //   target: { value: "Lydia Miller-Jones" }
      // });     
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones Edited" }
      });
      fireEvent.click(getByText(appointment, "Save"));
      expect(getByText(appointment, "Saving")).toBeInTheDocument();

      await waitForElement(() => getByText(appointment, "Error"));

  
      expect(getByText(appointment, "Error")).toBeInTheDocument();

      // No need to change the spots for "Monday", since this is an edit

      //check if the spots for Monday are the same.....
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    
      await waitForElement(() => getByText(appointment, "Could not save appointment"));
      
    }),
    
    it("shows the delete error when failing to delete an existing appointment", () => {
      axios.put.mockRejectedValueOnce();
      //debug();

    })
});
