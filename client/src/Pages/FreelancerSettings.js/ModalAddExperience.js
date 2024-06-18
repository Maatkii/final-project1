import React, { useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { freelancerAddNewExperience } from "../../redux/actions/FreelancerActions";
import { useDispatch, useSelector } from "react-redux";
import { ADD_FREELANCER_EXPERIENCE_LOADING } from "../../redux/constants/actions-types";
import ClipLoader from "react-spinners/ClipLoader";
const ModalAddExperience = ({ show, handleClose }) => {
  const [present, setPresent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.FreelancerReducer);
  const handlePresentChange = (e) => {
    setPresent(e.target.checked);
  };
  const [newExperience, setNewExperience] = useState({
    endDate: "",
  });
  const handleChange = (e) => {
    setNewExperience({ ...newExperience, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ADD_FREELANCER_EXPERIENCE_LOADING });
    if (present === true) {
      dispatch(
        freelancerAddNewExperience({
          newExperience: { ...newExperience, endDate: "Present" },
          handleClose,
        })
      );
    } else {
      dispatch(freelancerAddNewExperience({ newExperience, handleClose }));
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Experience</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Experience Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="experience title"
              name="title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company Name"
              name="companyName"
              onChange={handleChange}
            />
          </Form.Group>
          <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Leave a description here"
              style={{ height: "100px" }}
              onChange={handleChange}
            />
          </FloatingLabel>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Start Date"
              name="startDate"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Check
              type="checkbox"
              label="Present"
              checked={present}
              onChange={handlePresentChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              onChange={handleChange}
              placeholder="End Date"
              disabled={present}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {loading ? <ClipLoader color="#fff" size={20} /> : "Add Experience"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddExperience;
