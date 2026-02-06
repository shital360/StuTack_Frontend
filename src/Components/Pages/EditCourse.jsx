import { useState } from "react";

function EditCourse() {
  const [code] = useState("C101"); // disabled
  const [name, setName] = useState("Mathematics");
  const [className, setClassName] = useState("10");
  const [credit, setCredit] = useState("5");
  const [teacher, setTeacher] = useState("Mr. Sharma");
  

  const handleUpdate = () => {
    alert(
      `Updated:\n${name}, Class ${className}, Credit ${credit}, Teacher ${teacher}`
    );
  };

  return (
    <div>
      <h2>Edit Course</h2>

      <input value={code} disabled />
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={className} onChange={(e) => setClassName(e.target.value)} />
      <input value={credit} onChange={(e) => setCredit(e.target.value)} />
      <input value={teacher} onChange={(e) => setTeacher(e.target.value)} />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditCourse;
