import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Registration.css'; 

import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Registration() {
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [mobile, setMobile] = useState('');
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [registrations, setRegistrations] = useState([]);
    const [filteredRegistrations, setFilteredRegistrations] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedPlace, setEditedPlace] = useState('');
    const [editedMobile, setEditedMobile] = useState('');
    const [editedDate, setEditedDate] = useState(new Date());

    const handleRegistration = (event) => {
        event.preventDefault();
        const registrationData = {
            name,
            place,
            mobile,
            date: date.toDateString()
        };
        setRegistrations([...registrations, registrationData]);
        setFilteredRegistrations([...registrations, registrationData]);
        setName('');
        setPlace('');
        setMobile('');
        setDate(new Date());
        alert('Registration Successful');
    };

    const handleFilter = () => {
        const filtered = registrations.filter(
            (registration) => registration.date === selectedDate.toDateString()
        );
        setFilteredRegistrations(filtered);
    };

    const handleShowAll = () => {
        setFilteredRegistrations(registrations);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        const registration = filteredRegistrations[index];
        setEditedName(registration.name);
        setEditedPlace(registration.place);
        setEditedMobile(registration.mobile);
        setEditedDate(new Date(registration.date));
    };

    const handleSaveEdit = () => {
        const updatedRegistrations = [...registrations];
        updatedRegistrations[editIndex] = {
            name: editedName,
            place: editedPlace,
            mobile: editedMobile,
            date: editedDate.toDateString()
        };
        setRegistrations(updatedRegistrations);
        setFilteredRegistrations(updatedRegistrations);
        setEditIndex(null);
    };

    const handleCancelEdit = () => {
        setEditIndex(null);
    };

    const handleDelete = (index) => {
        const updatedRegistrations = [...registrations];
        updatedRegistrations.splice(index, 1);
        setRegistrations(updatedRegistrations);
        setFilteredRegistrations(updatedRegistrations);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({ html: '.table' });
        doc.save('registrations.pdf');
    };

    return (
        <div className="combined-page">
            <div className="registration-form">
                <h1>Registration form</h1>
                <Form onSubmit={handleRegistration}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPlace">
                        <Form.Control
                            type="text"
                            placeholder="Place"
                            value={place}
                            onChange={(event) => setPlace(event.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMobile">
                        <Form.Control
                            type="tel"
                            placeholder="Mobile No"
                            value={mobile}
                            onChange={(event) => setMobile(event.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDate">
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            className="form-control"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="full-width-button">
                        Register
                    </Button>
                </Form>
            </div>
            <div className="booking-details">
                <h1>Booking Details</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formSelectDate">
                        <Form.Label>Select a Date</Form.Label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="form-control"
                            required
                        />
                    </Form.Group>
                    <div className="button-group">
                        <Button variant="primary" onClick={handleFilter} className="full-width-button">
                            Filter
                        </Button>
                        <Button variant="secondary" onClick={handleShowAll} className="full-width-button">
                            All
                        </Button>
                    </div>
                </Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Place</th>
                            <th>Mobile</th>
                            <th>Date</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRegistrations.map((registration, index) => (
                            <tr key={index}>
                                <td>{editIndex === index ? <input value={editedName} onChange={(e) => setEditedName(e.target.value)} /> : registration.name}</td>
                                <td>{editIndex === index ? <input value={editedPlace} onChange={(e) => setEditedPlace(e.target.value)} /> : registration.place}</td>
                                <td>{
editIndex === index ? <input value={editedMobile} onChange={(e) => setEditedMobile(e.target.value)} /> : registration.mobile}</td>
<td>{editIndex === index ? <DatePicker selected={editedDate} onChange={(date) => setEditedDate(date)} /> : registration.date}</td>
<td>
    <Button variant="danger" onClick={() => handleDelete(index)}>
        Delete
    </Button>
</td>
<td>
    {editIndex === index ? (
        <>
            <Button variant="success" onClick={handleSaveEdit}>
                Save
            </Button>
            <Button variant="secondary" onClick={handleCancelEdit}>
                Cancel
            </Button>
        </>
    ) : (
        <Button variant="warning" onClick={() => handleEdit(index)}>
            Edit
        </Button>
    )}
</td>
</tr>
))}
</tbody>
</Table>
<Button variant="success" onClick={handleDownloadPDF} className="full-width-button">
Download PDF
</Button>
</div>
</div>
);
}

export default Registration;
