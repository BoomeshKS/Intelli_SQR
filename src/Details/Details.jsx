import './Details.css'



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Details = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedSalary, setEditedSalary] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/receive_data');
        setEmployeeData(response.data);
        console.log('received data',response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    const [id,Name, Salary] = selectedOption.split('|');
    setSelectedEmployeeId(id);
    setSelectedName(Name);
    setSelectedSalary(Salary);
    setEditedName('');
    setEditedSalary('');
  };

  const handleEdit = () => {
    setEditedName(selectedName);
    setEditedSalary(selectedSalary);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/update_employee/${selectedEmployeeId}`, {
        name: editedName,
        salary: editedSalary
      });
      setSelectedName(editedName);
      setSelectedSalary(editedSalary);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };


  const handleDelete = async (employeeid) => {
    try {
      await axios.delete(`http://localhost:5000/delete_employee/${employeeid}`);
      // If the deletion is successful, clear the selected employee data
      setSelectedEmployeeId('');
      setSelectedName('');
      setSelectedSalary('');
      setEditedName('');
      setEditedSalary('');
      // Refetch data or update the employee list to reflect the deletion
      // Example: refetchData();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
  
  









  return (
    <div>
      <h1 className='Heading1'>Employee Details:<a href='/' className='anc'>logout</a></h1>
      <select value={selectedEmployeeId} onChange={handleSelectChange} className='option'>
        <option value="">Select Employee</option>
        {employeeData.map(employee => (
          <option key={employee._id} value={`${employee._id}|${employee.Name}|${employee.Salary}`}>
            {employee.Name} - {employee.Salary}
          </option>
        ))}
      </select>
      {selectedEmployeeId && (
        <>
          <div className='display-name'>
            <p>Name: {selectedName}</p>
            <p>Salary: {selectedSalary}</p>
          </div>
          <label htmlFor="" className='label1'>Name</label>
          <input
            type="text"
            value={editedName}
            className='input1'
            onChange={(e) => setEditedName(e.target.value)}
          />
          <br />
          <label htmlFor=""className='label2'>Salary</label>
          <input
            type="text"
            className='input2'
            value={editedSalary}
            onChange={(e) => setEditedSalary(e.target.value)}
          />
          <br />
          <button onClick={handleSave} className='save-btn'>Save</button>
          <button onClick={() => handleDelete(selectedEmployeeId)} className='delete-btn'>Delete</button>

          {!editedName && !editedSalary && <button onClick={handleEdit} className='edit-btn'>Edit</button>}
          {/* <button onClick={handleSendData}>Send Data</button> */}
        </>
      )}
    </div>
  );
};

export default Details;
