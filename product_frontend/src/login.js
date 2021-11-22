import * as React from "react"
import { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert  from 'react-bootstrap/Alert'

function Login() {
    const [username, setUserame] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState(0)
    const [succ, setSucc] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {
        setUserame(document.getElementById("username").value)
        setPassword(document.getElementById("password").value)
        try {
            let origin_url = window.location.origin
            fetch(`${origin_url}/auth/login`, {method:'POST', headers:{'accept':'application/json', 'Content-Type':'application/json'}, body: JSON.stringify({'username':username, 'password':password})})
            .then( res => {
                if (!res.ok) {throw res}
                return res.json()
            })
            .then( json => {
                sessionStorage.setItem("key", json.key)
                sessionStorage.setItem("username", json.username)

                setError(false)
                setSucc(true)
            })
            .catch((error) => {
                setError(true)
                setSucc(false)
            })
        } catch (error) {
            console.log('Server down or not founnd')
        }
    }, [login]);


    return (
        <div className="m-5">
            {succ && 
                <Alert variant="success">
                    {username} logged in
                </Alert>
            }

            {error && 
                <Alert variant="danger">
                    {username} does not exist or the credentials are invalid
                </Alert>
            }

            <Container>
                <Row>
                    <Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" id="username" />
                            <Form.Text className="text-muted">
                                The username is unique
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" id="password" />
                        </Form.Group>
                        <Button onClick={(e)=>{setLogin(login +1)}} variant="primary">
                            Login
                        </Button>
                    </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login