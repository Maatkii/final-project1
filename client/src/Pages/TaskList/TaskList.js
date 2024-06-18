import React, { useState, useEffect } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useNavigate } from "react-router-dom";
import "./style.css";
import "../TaskPage/style.css";
import { useDispatch, useSelector } from "react-redux";
import { get_All_Tasks } from "../../redux/actions/TaskActions";
import { calculateTimeSince } from "../../utils";

const TaskList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [maxValue, setMaxValue] = useState(1500);
  useEffect(() => {
    dispatch(get_All_Tasks());
  }, []);

  const [value, setValue] = useState([0, 0]);
  const [skillsInput, setSkillsInput] = useState("");
  const [filterSkills, setFilterSkills] = useState([
    "reactjs",
    "php",
    "laravel",
    "angular",
  ]);
  // const [categoryDropdown, setCategoryDropdwon] = useState(false);
  const { tasks } = useSelector((state) => state.taskReducer);
  const getMaxPrice = (data) => {
    let maxPrice = 0;

    data.forEach((item) => {
      const { price } = item;
      const max = parseInt(price.max);
      if (max > maxPrice) {
        maxPrice = max;
      }
    });

    return maxPrice;
  };
  useEffect(() => {
    setMaxValue(getMaxPrice(tasks));
  }, [tasks]);
  const filteredTasks = tasks?.filter(
    (task) =>
      task.price.max >= value[1] ||
      task.skills.some((skill) => (filterSkills.includes(skill) ? task : null))
  );

  return (
    <div className="padding-top-1">
      <div className="container margin-top-40">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <div className="sidebar-container">
              {/* Category */}
              {/* <div className="sidebar-widget">
                <h3>Category</h3>
                <div
                  className={`btn-group bootstrap-select show-tick default ${
                    categoryDropdown ? "open" : ""
                  }`}
                  onClick={() => setCategoryDropdwon(!categoryDropdown)}
                >
                  <button
                    type="button"
                    className="btn dropdown-toggle bs-placeholder btn-default"
                    data-toggle="dropdown"
                    role="button"
                    title="All Categories"
                  >
                    <span className="filter-option pull-left">
                      All Categories
                    </span>
                    &nbsp;
                    <span className="bs-caret">
                      <span className="caret" />
                    </span>
                  </button>
                  <div
                    className="dropdown-menu open"
                    role="combobox"
                    style={{ maxHeight: "265px", overflow: "hidden" }}
                  >
                    <ul
                      style={{ maxHeight: "245px", overflowY: "auto" }}
                      className="dropdown-menu inner"
                      role="listbox"
                      aria-expanded="false"
                    >
                      <li data-original-index={0}>
                        <a
                          tabIndex={0}
                          className=""
                          data-tokens="null"
                          role="option"
                          aria-disabled="false"
                          aria-selected="false"
                        >
                          <span className="text">Admin Support</span>
                          <span className="glyphicon glyphicon-ok check-mark" />
                        </a>
                      </li>
                      <li data-original-index={1}>
                        <a
                          tabIndex={0}
                          className=""
                          data-tokens="null"
                          role="option"
                          aria-disabled="false"
                          aria-selected="false"
                        >
                          <span className="text">Customer Service</span>
                          <span className="glyphicon glyphicon-ok check-mark" />
                        </a>
                      </li>
                      <li data-original-index={2}>
                        <a
                          tabIndex={0}
                          className=""
                          data-tokens="null"
                          role="option"
                          aria-disabled="false"
                          aria-selected="false"
                        >
                          <span className="text">Data Analytics</span>
                          <span className="glyphicon glyphicon-ok check-mark" />
                        </a>
                      </li>
                      <li data-original-index={3}>
                        <a
                          tabIndex={0}
                          className=""
                          data-tokens="null"
                          role="option"
                          aria-disabled="false"
                          aria-selected="false"
                        >
                          <span className="text">Design &amp; Creative</span>
                          <span className="glyphicon glyphicon-ok check-mark" />
                        </a>
                      </li>
                      <li data-original-index={4}>
                        <a
                          tabIndex={0}
                          className=""
                          data-tokens="null"
                          role="option"
                          aria-disabled="false"
                          aria-selected="false"
                        >
                          <span className="text">Legal</span>
                          <span className="glyphicon glyphicon-ok check-mark" />
                        </a>
                      </li>
                      <li data-original-index={5}>
                        <a
                          tabIndex={0}
                          className=""
                          data-tokens="null"
                          role="option"
                          aria-disabled="false"
                          aria-selected="false"
                        >
                          <span className="text">Software Developing</span>
                          <span className="glyphicon glyphicon-ok check-mark" />
                        </a>
                      </li>
                      <li data-original-index={6}>
                        <a
                          tabIndex={0}
                          className=""
                          data-tokens="null"
                          role="option"
                          aria-disabled="false"
                          aria-selected="false"
                        >
                          <span className="text">IT &amp; Networking</span>
                          <span className="glyphicon glyphicon-ok check-mark" />
                        </a>
                      </li>
                      <li data-original-index={7}>
                        <a
                          tabIndex={0}
                          className=""
                          data-tokens="null"
                          role="option"
                          aria-disabled="false"
                          aria-selected="false"
                        >
                          <span className="text">Writing</span>
                          <span className="glyphicon glyphicon-ok check-mark" />
                        </a>
                      </li>
                      <li data-original-index={8}>
                        <a
                          tabIndex={0}
                          className=""
                          data-tokens="null"
                          role="option"
                          aria-disabled="false"
                          aria-selected="false"
                        >
                          <span className="text">Translation</span>
                          <span className="glyphicon glyphicon-ok check-mark" />
                        </a>
                      </li>
                      <li data-original-index={9}>
                        <a
                          tabIndex={0}
                          className=""
                          data-tokens="null"
                          role="option"
                          aria-disabled="false"
                          aria-selected="false"
                        >
                          <span className="text">Sales &amp; Marketing</span>
                          <span className="glyphicon glyphicon-ok check-mark" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <select
                    className="selectpicker default"
                    multiple=""
                    data-selected-text-format="count"
                    data-size={7}
                    title="All Categories"
                    tabIndex={-98}
                  >
                    <option>Admin Support</option>
                    <option>Customer Service</option>
                    <option>Data Analytics</option>
                    <option>Design &amp; Creative</option>
                    <option>Legal</option>
                    <option>Software Developing</option>
                    <option>IT &amp; Networking</option>
                    <option>Writing</option>
                    <option>Translation</option>
                    <option>Sales &amp; Marketing</option>
                  </select>
                </div>
              </div> */}

              {/* Fixed Price */}
              <div className="sidebar-widget">
                <h3>Fixed Price</h3>
                <div className="margin-top-55" />
                {/* Range Slider */}
                <h4>{`TND ${value[1]}`}</h4>
                <RangeSlider
                  min={0}
                  className="single-thumb"
                  max={maxValue}
                  value={value}
                  onInput={setValue}
                />
              </div>
              {/* Tags */}
              <div className="sidebar-widget">
                <h3>Skills</h3>
                <div className="clearfix" />
                {/* More Skills */}
                <div className="keywords-container margin-top-20">
                  <div className="keyword-input-container">
                    <input
                      type="text"
                      className="keyword-input"
                      placeholder="add more skills"
                      onChange={(e) => setSkillsInput(e.target.value)}
                    />
                    <button
                      className="keyword-input-button ripple-effect"
                      onClick={(e) => {
                        setFilterSkills((prev) => [...prev, skillsInput]);
                        setSkillsInput("");
                      }}
                    >
                      <i className="fa-solid fa-add" />
                    </button>
                  </div>
                  <div className="keywords-list" style={{ height: "auto" }}>
                    {/* keywords go here */}
                    {filterSkills.map((skills, index) => {
                      return (
                        <span className="keyword" key={index}>
                          <span
                            class="keyword-remove"
                            onClick={() =>
                              setFilterSkills(
                                filterSkills.filter((el) => el !== skills)
                              )
                            }
                          ></span>
                          <span className="keyword-text">{skills}</span>
                        </span>
                      );
                    })}
                  </div>
                  <div className="clearfix" />
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
          <div className="col-xl-9 col-lg-8 content-left-offset">
            {/* Tasks Container */}
            <div className="tasks-list-container compact-list margin-top-35">
              {/* Task */}
              {filteredTasks
                .filter((el) => el.offerSituation !== "closed")
                .map((task, index) => {
                  return (
                    <a className="task-listing" key={index}>
                      <div className="task-listing-details">
                        <div className="task-listing-description">
                          <h3 className="task-listing-title">{task.title}</h3>
                          <ul className="task-icons">
                            <li>
                              <i className="fa-solid fa-clock" />{" "}
                              {calculateTimeSince(task.postedDate)}
                            </li>
                          </ul>
                          <p className="task-listing-text">
                            {task.description}
                          </p>
                          <div className="task-tags">
                            {task.skills.map((skill, index) => {
                              return <span key={index}>{skill}</span>;
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="task-listing-bid">
                        <div className="task-listing-bid-inner">
                          <div className="task-offers">
                            <strong>
                              TND{task.price.min} - TND{task.price.max}
                            </strong>
                          </div>
                          <span
                            className="button button-sliding-icon ripple-effect"
                            onClick={() =>
                              navigate(`/task-details/${task._id}`)
                            }
                          >
                            Bid Now <i className="fa-solid fa-arrow-right" />
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })}
            </div>
            {/* Tasks Container / End */}
            {/* Pagination */}
            <div className="clearfix" />
            <div className="row">
              <div className="col-md-12">
                {/* Pagination */}
                {/* <div className="pagination-container margin-top-60 margin-bottom-60">
                  <nav className="pagination">
                    <ul>
                      <li className="pagination-arrow">
                        <a href="#" className="ripple-effect">
                          <i className="fa-thin  fa-arrow-left" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="ripple-effect">
                          1
                        </a>
                      </li>
                      <li>
                        <a href="#" className="current-page ripple-effect">
                          2
                        </a>
                      </li>
                      <li>
                        <a href="#" className="ripple-effect">
                          3
                        </a>
                      </li>
                      <li>
                        <a href="#" className="ripple-effect">
                          4
                        </a>
                      </li>
                      <li className="pagination-arrow">
                        <a href="#" className="ripple-effect">
                          <i className="fa-thin fa-arrow-right" />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div> */}
              </div>
            </div>
            {/* Pagination / End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
