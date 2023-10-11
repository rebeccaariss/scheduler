import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

// ----------------------------------------------------------------------------------------------------
  // Rendering with the relevant props for corresponding tests:
  const { getByPlaceholderText } = render(
    <Form interviewers={interviewers}/>
  ); // destructuring getByPlaceholderText helper function from the
  // object that "render" returns

  const { getByTestId } = render(
    <Form interviewers={interviewers} name="Lydia Miller-Jones"/>
  );
// ----------------------------------------------------------------------------------------------------

  it("renders without student name if not provided", () => {
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  // Additional tests from Compass activity:
  it("validates that the student name is not blank", () => {
    // Mock onSave function:
    const onSave = jest.fn(); // jest is included as a global object when using Jest for testing

    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave}/>
    );

    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("validates that the interviewer cannot be null", () => {
    // Mock onSave function:
    const onSave = jest.fn(); // jest is included as a global object when using Jest for testing

    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} name="Lydia Miller-Jones"/>
    );

    fireEvent.click(getByText("Save"));

    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name and interviewer are defined", () => {
    // Mock onSave function:
    const onSave = jest.fn(); // jest is included as a global object when using Jest for testing

    const { getByText, queryByText } = render(
      <Form 
        interviewers={interviewers}
        onSave={onSave}
        name="Lydia Miller-Jones"
        interviewer={interviewers[0].id}
      />
    );

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
});