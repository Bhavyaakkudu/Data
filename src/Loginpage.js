import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./Loginpage.css"
import { useNavigate } from 'react-router-dom';

function Loginpage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log('Username:', name);
        console.log('Password:', password);
        alert("Welcome to admin panel");
        nav("/Registration");
    
    };

    return (
        <div className="login">
            <h1>Sign In</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <InputGroup>
                        <InputGroup.Text className="icon">
                            <i className="fas fa-user"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Enter Username"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <InputGroup>
                        <InputGroup.Text className="icon">
                            <i className="fas fa-lock"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit" className="full-width-button">
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default Loginpage;
