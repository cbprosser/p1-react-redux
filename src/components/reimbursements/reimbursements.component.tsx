import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Container, Card, CardBody, CardHeader, ButtonGroup, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonToolbar, Input } from 'reactstrap';
import { IState } from '../../reducers';
import { ReimbursementsTableComponent } from '../reimbursements-table/reimbursements.table.component';

interface IReimbursementProps {
    user: any
}

interface IReimbursementState {
    dropdownSearchByIsOpen: boolean,
    searchBy?: string,
    status?: string,
    id?: number
}

export class ReimbursementsComponent extends Component<IReimbursementProps, IReimbursementState> {
    constructor(props: any) {
        super(props);

        this.state = {
            dropdownSearchByIsOpen: false,
            status: 'Pending',
            id: this.props.user && this.props.user.user.userId
        }
    }

    toggleSearchByDropdown = () => {
        this.setState({
            dropdownSearchByIsOpen: !this.state.dropdownSearchByIsOpen
        })
    }

    setSearchBy = (event: any) => {
        const target = event.currentTarget.innerText;
        this.setState({
            searchBy: target
        })
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm="3" md="2" className="d-none d-sm-none d-sm-block"></Col>
                    <Col id="main-row" className="bg-light text-center">
                        <Card className="bg-light text-left">
                            <CardHeader><h1 className="h3">{`Reimbursements${(this.state.searchBy) ? ` by ${this.state.searchBy}` : ''}`}</h1></CardHeader>
                            <CardBody>
                                <ButtonToolbar className="justify-content-between mb-2">
                                    <ButtonGroup>
                                        <ButtonDropdown isOpen={this.state.dropdownSearchByIsOpen} toggle={this.toggleSearchByDropdown}>
                                            <DropdownToggle caret>{this.state.searchBy || 'Search By'}</DropdownToggle>
                                            <DropdownMenu className="bg-dark">
                                                <DropdownItem header>Search By</DropdownItem>
                                                <DropdownItem className="bg-dark text-light" onClick={this.setSearchBy}>Status</DropdownItem>
                                                <DropdownItem className="bg-dark text-light" onClick={this.setSearchBy}>User ID</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </ButtonGroup>
                                    <ButtonGroup>
                                        {(() => {
                                            switch (this.state.searchBy) {
                                                case 'Status':
                                                    return (
                                                        <>
                                                            <Button>Status</Button>
                                                            <Button>View</Button>
                                                        </>
                                                    );
                                                case 'User ID':
                                                    return (
                                                        <>
                                                            <Input className="bg-dark text-light" type="number"/>
                                                            <Button>View</Button>
                                                        </>
                                                    );
                                                default:
                                                    return;
                                            }
                                        })()}
                                    </ButtonGroup>
                                </ButtonToolbar>
                                {(() => {
                                            switch (this.state.searchBy) {
                                                case 'Status':
                                                    return (
                                                        <ReimbursementsTableComponent/>
                                                    );
                                                case 'User ID':
                                                    return (
                                                        <ReimbursementsTableComponent/>
                                                    );
                                                default:
                                                    return;
                                            }
                                        })()}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="col-2 d-none d-sm-none d-md-block"></Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    user: state.auth.currentUser
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ReimbursementsComponent)
