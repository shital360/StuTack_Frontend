import { useState } from "react";

function Students() {
const [students, setStudents] = useState([
  { id: "001", name: "Ram", className: "10" },
  { id: "002", name: "Sita", className: "9" },
  { id: "003", name: "Hari", className: "10" },
  { id: "004", name: "Gita", className: "8" },
  { id: "005", name: "Ramesh", className: "9" },
  { id: "006", name: "Anita", className: "10" }
]);

  
  const [form, setForm] = useState({
    id: "",
    name: "",
    className: ""
  });

  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD STUDENT
  const addStudent = () => {
    if (!form.id || !form.name || !form.className) {
      alert("All fields required");
      return;
    }

    setStudents([...students, form]);
    resetForm();
  };

  // EDIT CLICK
  const editStudent = (student) => {
    setForm(student);
    setShowForm(true);
    setIsEdit(true);
  };

  // UPDATE STUDENT
  const updateStudent = () => {
    setStudents(
      students.map((s) =>
        s.id === form.id ? form : s
      )
    );
    resetForm();
  };

  // DELETE
  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const resetForm = () => {
    setForm({ id: "", name: "", className: "" });
    setShowForm(false);
    setIsEdit(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Students</h2>

      <button onClick={() => setShowForm(true)}>
        + Add Student
      </button>

      {showForm && (
        <div style={{ margin: "15px 0" }}>
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={form.id}
            onChange={handleChange}
            disabled={isEdit}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="className"
            placeholder="Class"
            value={form.className}
            onChange={handleChange}
          />

          {!isEdit ? (
            <button onClick={addStudent}>Save</button>
          ) : (
            <button onClick={updateStudent}>Update</button>
          )}
        </div>
      )}

      <table border="1" width="100%" cellPadding="8">
        <thead style={{ background: "#3498db", color: "#fff" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.className}</td>
              <td>
                <button onClick={() => editStudent(s)}>Edit</button>
                <button onClick={() => deleteStudent(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
