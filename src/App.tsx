import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar} from 'react-bootstrap';
import SearchBar from "./search-bar/SearchBar";

function App() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <SearchBar/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default App;
