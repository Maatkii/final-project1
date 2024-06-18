import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskAction } from "../../redux/actions/TaskActions";
import ClipLoader from "react-spinners/ClipLoader";
import upload from "../../utils";
import { UPDATE_TASK_LOADING } from "../../redux/constants/actions-types";
const ModalUpdateTask = ({ show, updateTask, setUpdateTask, setShow }) => {
  const { loading } = useSelector((state) => state.taskReducer);
  const handleClose = () => {
    setShow(false);
  };
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [skill, setSkill] = useState("");
  const deleteSkill = (skill) => {
    const skills = updateTask.skills.filter(
      (updateTaskSkill) => updateTaskSkill !== skill
    );
    setUpdateTask({ ...updateTask, skills: skills });
  };
  const deleteFile = (file) => {
    const files = updateTask.attachement.filter(
      (fileName) => fileName !== file
    );
    setUpdateTask({ ...updateTask, attachement: files });
  };
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    dispatch({ type: UPDATE_TASK_LOADING });
    const images = await Promise.all(
      [...files].map(async (file) => {
        const url = await upload(file);
        return url;
      })
    );

    if ([...files].length > 0) {
      dispatch(
        updateTaskAction({
          post: {
            ...updateTask,
            attachement: [...updateTask.attachement, ...images],
          },
          handleClose,
        })
      );
    } else {
      dispatch(updateTaskAction({ post: updateTask, handleClose }));
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row">
            <div className="col-xl-6">
              <div className="submit-field">
                <h5>Project Title</h5>
                <input
                  type="text"
                  className="with-border"
                  defaultValue={updateTask.title}
                  name="title"
                  onChange={(e) =>
                    setUpdateTask({ ...updateTask, title: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="submit-field">
                <h5>Duration Limit</h5>
                <input
                  type="text"
                  className="with-border"
                  name="title"
                  defaultValue={updateTask.durationLimit}
                  onChange={(e) =>
                    setUpdateTask({
                      ...updateTask,
                      durationLimit: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-xl-12">
              <div className="submit-field">
                <h5>Price</h5>
                <div className="row">
                  <div className="col-xl-6">
                    <div className="input-with-icon">
                      <input
                        className="with-border"
                        type="text"
                        placeholder="Min"
                        defaultValue={updateTask.price.min}
                        onChange={(e) =>
                          setUpdateTask((prevState) => ({
                            ...prevState,
                            price: {
                              ...prevState.price,
                              min: e.target.value,
                            },
                          }))
                        }
                      />
                      <i className="currency">TND</i>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="input-with-icon">
                      <input
                        className="with-border"
                        type="text"
                        placeholder="Max"
                        defaultValue={updateTask.price.max}
                        onChange={(e) =>
                          setUpdateTask((prevState) => ({
                            ...prevState,
                            price: {
                              ...prevState.price,
                              max: e.target.value,
                            },
                          }))
                        }
                      />
                      <i className="currency">TND</i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="submit-field">
                <h5>Skills</h5>
                <div className="keywords-container">
                  <div className="keyword-input-container">
                    <input
                      type="text"
                      className="keyword-input with-border"
                      placeholder="e.g. react js , nodejs"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                    />
                    <button
                      className="keyword-input-button ripple-effect"
                      onClick={(e) => {
                        e.preventDefault();
                        setUpdateTask({
                          ...updateTask,
                          skills: [...updateTask.skills, skill],
                        });
                        setSkill("");
                      }}
                    >
                      <i className="fa-solid fa-plus" />
                    </button>
                  </div>
                  <div className="keywords-list" style={{ height: "auto" }}>
                    {/* keywords go here */}
                    {updateTask.skills.map((skill, index) => {
                      return (
                        <span className="keyword" key={index}>
                          <span
                            className="keyword-remove"
                            onClick={() => deleteSkill(skill)}
                          />
                          <span className="keyword-text">{skill}</span>
                        </span>
                      );
                    })}
                  </div>
                  <div className="clearfix" />
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="submit-field">
                <h5>Project Description</h5>
                <textarea
                  cols={30}
                  rows={5}
                  className="with-border margin-bottom-15"
                  defaultValue={updateTask.description}
                  onChange={(e) =>
                    setUpdateTask({
                      ...updateTask,
                      description: e.target.value,
                    })
                  }
                />
                {/* keywords go here */}
                {updateTask.attachement &&
                  updateTask.attachement.map((file, index) => {
                    return (
                      <span className="keyword " key={index}>
                        <span
                          className="keyword-remove"
                          onClick={() => deleteFile(file)}
                        />
                        <span className="keyword-text">
                          {file.slice(67, file.length)}
                        </span>
                      </span>
                    );
                  })}
                <div className="uploadButton margin-top-30">
                  <input
                    className="uploadButton-input"
                    type="file"
                    accept="image/*, application/pdf"
                    id="upload"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                  />
                  <label
                    className="uploadButton-button ripple-effect"
                    htmlFor="upload"
                  >
                    Upload Files
                  </label>
                  <span className="uploadButton-file-name">
                    Images or documents that might be helpful in describing your
                    job
                  </span>
                  <div
                    className="keywords-list"
                    style={{ height: "auto" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateTask}>
          {loading ? <ClipLoader color="#fff" size={20} /> : "Update Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdateTask;
