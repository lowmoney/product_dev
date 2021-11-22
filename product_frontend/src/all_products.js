import * as React from "react"
import { useState, useEffect } from "react"
import Product from "./product"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function AllProducts() {
    const [found, setFound] = useState(false)
    const [products, setProducts] = useState([])


    useEffect(() => {
        try {
            let origin_url = window.location.origin
            let url = new URL(`${origin_url}/api/get_products`)
            fetch(url, {method: 'GET'})
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products)
                console.log(data)
                console.log(data.products)
                setFound(true)
            })
            .catch((error) => {
                console.log('products not found')
            })
        } catch (error) {
            console.log('ran into an error')
        }

        console.log(products)
    }, []);

    return (
        <div className="m-5">
            <Container>
            <h4>All Products</h4>
                {found &&
                    <Row>
                        {products.map((product) => (<Product name={product.name} price={product.price} key={product.key} />))}
                    </Row>
                }

                {!found && 

                <Container>
                    <Row>
                        <Col>
                            getting products..
                        </Col>
                    </Row>
                </Container>
                }
            </Container>
        </div>
    )
}

export default AllProducts