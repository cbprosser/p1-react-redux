import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';

export default class NotFound extends Component {
    render() {
        return (
            <Container id="main-container">
                <Row>
                    <Col sm="3" md="2" className="d-none d-sm-none d-sm-block"></Col>
                    <Col>Page not found.</Col>
                    <Col className="col-2 d-none d-sm-none d-md-block"></Col>
                </Row>
            </Container>
        )
    }
}
