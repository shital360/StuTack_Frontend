import { Link } from "react-router-dom";
import AddCourse from "./AddCourse";

function Courses() {
  const courses = [
    {
      code: "C101",
      name: "Mathematics",
      className: "10",
      credit: 5,
      teacher: "Mr. Sharma",
      status: "Active"
    }
  ];

  return (
    <div>
      <h2>Courses</h2>

      {/* Link to AddCourse page */}
      <Link to="/courses/add">
        <button>Add Course</button>
      </Link>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Class</th>
            <th>Credit</th>
            <th>Teacher</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((c) => (
            <tr key={c.code}>
              <td>{c.code}</td>
              <td>{c.name}</td>
              <td>{c.className}</td>
              <td>{c.credit}</td>
              <td>{c.teacher}</td>
              <td>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Courses;
