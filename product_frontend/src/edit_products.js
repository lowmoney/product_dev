import * as React from "react"
import { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function AddProduct() {
    const [request, setRequest] = useState(0)
    const [edited, setEdited] = useState(false)
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)
    const [key, setkey] = useState(null)


    useEffect(() => {
        try {
            if (key){
                let origin_url = window.location.origin
                let url = new URL(`${origin_url}/api/edit_product`)
                fetch(url, {method:'PUT', headers:{'accept':'application/json', 'Content-Type':'application/json'}, body:JSON.stringify({'key':key, 'name':name, 'price':price})})
                .then((res) => res.json())
                .then((data) => {
                    setEdited(true)
                })
                .catch((error) => {
                    console.log('Product not edited :(')
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
            <h4>Edit Product</h4>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Key</Form.Label>
                                <Form.Control onChange={(e) => setkey(e.target.value)} type="text" placeholder="DB key for the product"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Edit Name</Form.Label>
                                <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Name and/or price must be entered"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Edit Price</Form.Label>
                                <Form.Control onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Name and/or price must be entered"/>
                            </Form.Group>
                            <Button variant="warning" onClick={() => setRequest(request+1)}>Edit Product</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

            { edited &&            
                <Container>
                    <Row>
                        <Col>
                            Edited {key}: {name} for ${price}
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    )
}

export default AddProduct