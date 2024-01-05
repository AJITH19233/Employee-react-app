import React from 'react';
//import { MdClose } from 'react-icons/md';
import '../App1.css';

const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleclose}>
          
        </div>
        <label htmlFor="Vendor_name"> Employee_name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleOnChange}
          value={rest.name}
        />

        <label htmlFor="Account_no">Salary:</label>
        <input
          type="text"
          id="salary"
          name="salary"
          onChange={handleOnChange}
          value={rest.salary}
        />

        <label htmlFor="Bank_name">Position></label>
        <input
          type="text"
          id="position"
          name="position"
          onChange={handleOnChange}
          value={rest.position}
        />

    

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Formtable;

