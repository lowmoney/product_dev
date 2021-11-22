import * as React from "react"
import { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

function API() {
    const [request, setRequest] = useState(0)
    const [up, setUp] = useState(false)
    const [down, setDown] = useState(true)


    useEffect(() => {
        try {
            let origin_url = window.location.origin
            fetch(`${origin_url}/api`)
            .then((res) => res.json())
            .then((data) => {
                setDown(false)
                setUp(true)
            })
            .catch((error) => {
                console.log('Server down or not found')
                setDown(true)
                setUp(false)
            })
        } catch (error) {
            console.log('Server down or not founnd')
            setDown(true)
            setUp(false)
        }
    }, [request]);


    return (
        <div className="m-5">
            <Container>
                <Row>
                    <Col>
                        <h4>Status: <small> <u>{up &&   <Spinner animation="grow" variant="success" size="sm" />}{down &&   <Spinner animation="grow" variant="danger" size="sm" />}</u></small></h4>
                    </Col>
                </Row>
                <Button onClick={() => setRequest(request+1)}>
                    Check Status
                </Button>
            </Container>
        </div>
    )
}

export default API