import { useNavigate } from "react-router-dom";

function AddStudent() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>Add Student</h1>

      <input type="text" placeholder="Student Name" />
      <input type="text" placeholder="Class" />
      <input type="text" placeholder="Roll No" />

      <button>Add</button>
      <button onClick={() => navigate("/students")}>Back</button>
    </div>
  );
}

export default AddStudent;
