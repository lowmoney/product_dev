import * as React from "react"
import { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function AddProduct() {
    const [request, setRequest] = useState(0)

    const [key, setKey] = useState(null)
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)

    const [added, setAdded] = useState(false)


    useEffect(() => {
        try {
            if (name || price){
                let origin_url = window.location.origin
                let url = new URL(`${origin_url}/api/add_product`)
                fetch(url, {method:'POST', headers:{'accept':'application/json', 'Content-Type':'application/json'}, body: JSON.stringify({'name':name, 'price':price})})
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setKey(data.key)
                    setName(data.name)
                    setPrice(data.price)
                    setAdded(true)
                })
                .catch((error) => {
                    console.log('Product not added :(')
                })
            } else {
                console.log('you need to enter a name and/or price')
            }
        } catch (error) {
            console.log('an error :(')
        }
    }, [request]);

    return (
        <div className="m-5">
            <Container>
                <h4>Add Product</h4>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="pants, shirt, etc."/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Price</Form.Label>
                                <Form.Control onChange={(e) => setPrice(e.target.value)} type="text" placeholder="20.00"/>
                            </Form.Group>
                            <Button variant="success" onClick={() => setRequest(request+1)}>Add Product</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

            { added &&            
                <Container>
                    <Row>
                        <Col>
                            Added {name} for ${price} with key: {key}
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    )
}

export default AddProduct