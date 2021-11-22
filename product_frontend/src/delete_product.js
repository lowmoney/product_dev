import * as React from "react"
import { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function AddProduct() {
    const [request, setRequest] = useState(0)
    const [deleted, setDeleted] = useState(false)
    const [key, setkey] = useState(null)


    useEffect(() => {
        try {
            if (key){
                let origin_url = window.location.origin
                let url = new URL(`${origin_url}/api/delete_product`)
                fetch(url, {method: 'DELETE', headers:{'accept':'application/json', 'Content-Type':'application/json'}, body:JSON.stringify({'key':key})})
                .then((res) => res.json())
                .then((data) => {
                    setDeleted(true)
                })
                .catch((error) => {
                    console.log('Product was not able to be deleted, the server is most likley down')
                })
            } else {
                console.log('you need to enter a key')
            }
        } catch (error) {
            console.log('an error :(')
        }
    }, [request]);

    return (
        <div className="m-5">
            <Container>
            <h4>Delete Product</h4>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Key</Form.Label>
                                <Form.Control onChange={(e) => setkey(e.target.value)} type="text" placeholder="DB key"/>
                            </Form.Group>
                            <Button variant="danger" onClick={() => setRequest(request+1)}>Delete Product</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

            { deleted &&            
                <Container>
                    <Row>
                        <Col>
                            Deleted {key}
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    )
}

export default AddProduct