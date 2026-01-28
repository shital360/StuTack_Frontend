import React, { useState } from 'react';
import { Search, Bell, User, Filter, Download, Calendar, Check, X } from 'lucide-react';

const AttendanceSystem = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10-A');
  
  const classes = ['10-A', '10-B', '10-C', '9-A', '9-B', '9-C'];
  
  const [students, setStudents] = useState([
    { rollNo: '2024001', name: 'Aarav Sharma', class: '10-A', attendance: 'present' },
    { rollNo: '2024002', name: 'Priya Patel', class: '10-A', attendance: 'present' },
    { rollNo: '2024004', name: 'Ananya Singh', class: '10-A', attendance: 'absent' },
    { rollNo: '2024009', name: 'Rahul Verma', class: '10-A', attendance: 'present' },
    { rollNo: '2024010', name: 'Sanya Kapoor', class: '10-A', attendance: 'present' },
    { rollNo: '2024011', name: 'Karan Malhotra', class: '10-A', attendance: 'late' },
    { rollNo: '2024012', name: 'Diya Sharma', class: '10-A', attendance: 'present' },
    { rollNo: '2024013', name: 'Aditya Joshi', class: '10-A', attendance: 'absent' },
  ]);

  const toggleAttendance = (rollNo, status) => {
    setStudents(students.map(student => 
      student.rollNo === rollNo ? { ...student, attendance: status } : student
    ));
  };

  const markAllPresent = () => {
    setStudents(students.map(student => ({ ...student, attendance: 'present' })));
  };

  const markAllAbsent = () => {
    setStudents(students.map(student => ({ ...student, attendance: 'absent' })));
  };

  const getAttendanceStats = () => {
    const present = students.filter(s => s.attendance === 'present').length;
    const absent = students.filter(s => s.attendance === 'absent').length;
    const late = students.filter(s => s.attendance === 'late').length;
    const total = students.length;
    return { present, absent, late, total, percentage: ((present + late) / total * 100).toFixed(1) };
  };

  const stats = getAttendanceStats();

  const exportAttendance = () => {
    const headers = ['Roll No.', 'Student Name', 'Class', 'Date', 'Status'];
    const csvData = students.map(student => [
      student.rollNo,
      student.name,
      student.class,
      selectedDate,
      student.attendance
    ]);
    
    let csvContent = headers.join(',') + '\n';
    csvData.forEach(row => {
      csvContent += row.join(',') + '\n';
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_${selectedClass}_${selectedDate}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-gray-900">Student Information System</h1>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-12 pr-6 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-lg">
              <User className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Title Section */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Attendance Management</h2>
                <p className="text-sm text-gray-500 mt-1">Mark and track student attendance</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={exportAttendance}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-base"
                >
                  <Download className="w-5 h-5" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Filters and Stats */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={markAllPresent}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                >
                  Mark All Present
                </button>
                <button
                  onClick={markAllAbsent}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
                >
                  Mark All Absent
                </button>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 font-medium">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 font-medium">Present</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.present}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 font-medium">Absent</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.absent}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 font-medium">Late</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.late}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 font-medium">Attendance %</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.percentage}%</p>
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Roll No.</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.rollNo} className="hover:bg-gray-50">
                    <td className="px-6 py-5 whitespace-nowrap text-base text-gray-900">{student.rollNo}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-base text-gray-900">{student.name}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-base text-gray-900">{student.class}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-semibold ${
                        student.attendance === 'present' ? 'bg-green-100 text-green-800' :
                        student.attendance === 'absent' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {student.attendance.charAt(0).toUpperCase() + student.attendance.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => toggleAttendance(student.rollNo, 'present')}
                          className={`p-2 rounded-lg border-2 transition-all ${
                            student.attendance === 'present' 
                              ? 'bg-green-600 border-green-600 text-white' 
                              : 'border-gray-300 text-gray-600 hover:border-green-600 hover:text-green-600'
                          }`}
                          title="Mark Present"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => toggleAttendance(student.rollNo, 'absent')}
                          className={`p-2 rounded-lg border-2 transition-all ${
                            student.attendance === 'absent' 
                              ? 'bg-red-600 border-red-600 text-white' 
                              : 'border-gray-300 text-gray-600 hover:border-red-600 hover:text-red-600'
                          }`}
                          title="Mark Absent"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => toggleAttendance(student.rollNo, 'late')}
                          className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                            student.attendance === 'late' 
                              ? 'bg-yellow-600 border-yellow-600 text-white' 
                              : 'border-gray-300 text-gray-600 hover:border-yellow-600 hover:text-yellow-600'
                          }`}
                          title="Mark Late"
                        >
                          L
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Save Button */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-end gap-3">
              <button className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 text-base font-medium">
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-base font-medium">
                Save Attendance
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendanceSystem;