import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import API from './api_fetcher'
import AddProduct from './add_product'
import EditProduct from './edit_products'
import DeleteProduct from './delete_product'
import AllProducts from './all_products'
import Register from './register';
import Login from './login';
import { useState, useEffect } from "react"



import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function logout() {
  try {
    let origin_url = window.location.origin
    fetch(`${origin_url}/auth/logout`, {method:'put', headers:{'accept':'application/json', 'Content-Type':'application/json'}, body: JSON.stringify({'username':sessionStorage.getItem('username')})})
    .then( res => {
        if (!res.ok) {throw res}
        return res.json()
    })
    .then( json => {
        sessionStorage.removeItem("key")
        sessionStorage.removeItem("username")
    })
    .catch((error) => {
    })
    } catch (error) {
        console.log('Server down or not founnd')
    }
}

function LandingPage() {
  const [loggedin, setLoggedin] = useState(false)
  const [login, setLogin] = useState(false)
  const [logout, setLougout] = useState(false)


  useState(() => {

  }, [loggedin])

  useState(() => {
    set
  }, [login])

  useState(() => {

  }, [logout])

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Product</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!loggedin && <Nav.Link href="#" onClick={logout()}>Login</Nav.Link>}
              {!loggedin && <Nav.Link href="#" onClick={logout()}>Register</Nav.Link>}
              {loggedin && <Nav.Link href="#" onClick={logout()}>Register</Nav.Link>}
              <Nav.Link href="#">{sessionStorage.getItem('key') ? sessionStorage.getItem('key'):'login'}</Nav.Link>
              {Boolean(sessionStorage.getItem('key')) && <Nav.Link href="#" onClick={logout()}>logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col>
          <API />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
          <AddProduct />
          </Col>
        </Row>
      </Container>
    
      <Container>
        <Row>
          <Col>
          <EditProduct />
          </Col>
        </Row>
      </Container>
    
      <Container>
        <Row>
          <Col>
          <DeleteProduct />
          </Col>
        </Row>
      </Container>
      
      <Container>
        <Row>
          <Col>
          <AllProducts />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <Register/>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <Login/>
          </Col>
        </Row>
      </Container>
    </>
  )
}



ReactDOM.render(
  <React.StrictMode>

    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Product</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {sessionStorage.getItem('key')}
            <Nav.Link href="#">{sessionStorage.getItem('key') ? sessionStorage.getItem('key'):'login'}</Nav.Link>
            {!Boolean(sessionStorage.getItem('key')) && <Nav.Link href="#" onClick={logout()}>Register</Nav.Link>}
            {Boolean(sessionStorage.getItem('key')) && <Nav.Link href="#" onClick={logout()}>logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Container>
      <Row>
        <Col>
        <API />
        </Col>
      </Row>
    </Container>

    <Container>
      <Row>
        <Col>
        <AddProduct />
        </Col>
      </Row>
    </Container>
    
    <Container>
      <Row>
        <Col>
        <EditProduct />
        </Col>
      </Row>
    </Container>
    
    <Container>
      <Row>
        <Col>
        <DeleteProduct />
        </Col>
      </Row>
    </Container>
    
    <Container>
      <Row>
        <Col>
        <AllProducts />
        </Col>
      </Row>
    </Container>

    <Container>
      <Row>
        <Col>
          <Register/>
        </Col>
      </Row>
    </Container>

    <Container>
      <Row>
        <Col>
          <Login/>
        </Col>
      </Row>
    </Container>
    
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

