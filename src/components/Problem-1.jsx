import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");

  // 1. A STATE TO STORE THE TASKS WITH STATUS
  const [tasks, setTasks] = useState([]);

  const handleClick = (val) => {
    setShow(val);
  };

  // 2. THEN LET US GRAB THE INPUT
  const handleSubmit = (e) => {
    e.preventDefault();
    const taskName = e.target.taskName.value;
    const taskStatus = e.target.taskStatus.value;

    // 3. UPDATE THE STORE OF THE TASK AND EMPTY THE INPUT BOX
    setTasks([...tasks, { taskName, status: taskStatus.toLowerCase() }]);
    e.target.reset();
  };

  // 4. FILTER THE TASK BASED ON STATUS
  const filteredTasks = tasks.filter((task) => {
    if (show === "all") return true;
    return task.status === show;
  });

  // 5. FINALLY SORT THEM
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const order = { active: 1, completed: 2 };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                id="taskName"
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                id="taskStatus"
                type="text"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map(({ taskName, status }, index) => (
                <tr key={index}>
                  <td>
                    {index + 1}. {taskName}
                  </td>
                  <td>{status.charAt(0).toUpperCase() + status.slice(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
