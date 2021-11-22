import * as React from "react"
import { useState, useEffect } from "react"
import Card from 'react-bootstrap/Card'

function Product(props) {
    return (
        <div className="m-1">
            <Card>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.price}</Card.Subtitle>
                    <Card.Text>{props.key}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product