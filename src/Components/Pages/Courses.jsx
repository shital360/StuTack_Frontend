import { Link } from "react-router-dom";

function Courses({ courses, setCourses }) {
  const deleteCourse = (code) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.code !== code));
    }
  };

  return (
    <div>
      <h2>Courses</h2>

      <Link to="/courses/add">
        <button>Add Course</button>
      </Link>

      <table border="1" width="100%" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Class</th>
            <th>Teacher</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((c) => (
            <tr key={c.code}>
              <td>{c.code}</td>
              <td>{c.name}</td>
              <td>{c.className}</td>
              <td>{c.teacher}</td>
              <td>
                <Link to={`/courses/edit/${c.code}`}>
                  <button>Edit</button>
                </Link>

                <button
                  style={{ marginLeft: "5px" }}
                  onClick={() => deleteCourse(c.code)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Courses;