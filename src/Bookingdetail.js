import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css';

function Bookingdetail({ registrations }) { // Receive registrations as a prop
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleFilter = () => {
        console.log('Selected Date:', selectedDate);
        alert(`Filtering results for ${selectedDate.toDateString()}`);
    };

    return (
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
                <Button variant="primary" onClick={handleFilter} className="full-width-button">
                    Filter
                </Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Place</th>
                        <th>Mobile</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {registrations.map((registration, index) => ( // Use registrations instead of registration
                        <tr key={index}>
                            <td>{registration.name}</td>
                            <td>{registration.place}</td>
                            <td>{registration.mobile}</td>
                            <td>{registration.date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </div>
    );
}

export default Bookingdetail;
