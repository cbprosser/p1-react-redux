import React, { Component, MouseEvent } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../reducers';
import Reimbursement from '../../models/reimbursement.model';
import { Table } from 'reactstrap';

interface ITableState {
    data: Reimbursement[],
    expandedRows: any[]
}

export class ReimbursementsTableComponent extends Component<{}, ITableState> {
    constructor(props: any) {
        super(props);

        this.state = {
            data: [
                {
                    reimbursementId: 1,
                    author: {
                        userId: 1,
                        username: 'cbprosser',
                        password: '',
                        firstName: 'chris',
                        lastName: 'prosser',
                        email: 'cbprosser@gmail.com',
                        role: {
                            roleId: 1,
                            role: 'Administrator'
                        }
                    },
                    dateSubmitted: 6 / 24 / 19,
                    amount: 60,
                    description: 'Test Description',
                    dateResolved: 0,
                    resolver: {
                        userId: 2,
                        username: 'nottthebrave',
                        password: '',
                        firstName: 'nott',
                        lastName: 'the brave',
                        email: 'nott.the.brave@gmail.com',
                        role: {
                            roleId: 2,
                            role: 'Finance Manager'
                        }
                    },
                    status: {
                        statusId: 1,
                        status: 'Pending'
                    },
                    type: {
                        typeId: 1,
                        type: 'Lodging'
                    }
                },
                {
                    reimbursementId: 2,
                    author: {
                        userId: 1,
                        username: 'cbprosser',
                        password: '',
                        firstName: 'chris',
                        lastName: 'prosser',
                        email: 'cbprosser@gmail.com',
                        role: {
                            roleId: 1,
                            role: 'Administrator'
                        }
                    },
                    dateSubmitted: 6 - 24 - 2019,
                    amount: 60,
                    description: 'Test Description',
                    dateResolved: 0,
                    resolver: {
                        userId: 2,
                        username: 'nottthebrave',
                        password: '',
                        firstName: 'nott',
                        lastName: 'the brave',
                        email: 'nott.the.brave@gmail.com',
                        role: {
                            roleId: 2,
                            role: 'Finance Manager'
                        }
                    },
                    status: {
                        statusId: 1,
                        status: 'Pending'
                    },
                    type: {
                        typeId: 1,
                        type: 'Lodging'
                    }
                },
                {
                    reimbursementId: 3,
                    author: {
                        userId: 1,
                        username: 'cbprosser',
                        password: '',
                        firstName: 'chris',
                        lastName: 'prosser',
                        email: 'cbprosser@gmail.com',
                        role: {
                            roleId: 1,
                            role: 'Administrator'
                        }
                    },
                    dateSubmitted: 6 - 24 - 2019,
                    amount: 60,
                    description: 'Test Description',
                    dateResolved: 0,
                    resolver: {
                        userId: 2,
                        username: 'nottthebrave',
                        password: '',
                        firstName: 'nott',
                        lastName: 'the brave',
                        email: 'nott.the.brave@gmail.com',
                        role: {
                            roleId: 2,
                            role: 'Finance Manager'
                        }
                    },
                    status: {
                        statusId: 1,
                        status: 'Pending'
                    },
                    type: {
                        typeId: 1,
                        type: 'Lodging'
                    }
                },
            ],
            expandedRows: [] // used to hold the currently expanded rows for rendering
        }
    }

    rowClick = (rid: number) => {
        const currentExpandedRows = this.state.expandedRows;
        const isRowExpanded = currentExpandedRows.includes(rid); // Is it already expanded?
        const newExpandedRows = (isRowExpanded) ? currentExpandedRows.filter(id => id !== rid) : currentExpandedRows.concat(rid); // if it is, filter it out, if it isn't, add it in.
        this.setState({
            expandedRows : newExpandedRows
        })
    }

    createRow = (rid: number) => {
        const data = this.state.data;
        const rowClickCallback = () => {this.rowClick(data[rid].reimbursementId)}; // Moved out of line due to needing to pass in event variables
        let row = [
            (
                <tr onClick={rowClickCallback} key={`parentRow${data[rid].reimbursementId}`}>
                    <td>{data[rid].reimbursementId}</td>
                    <td>{data[rid].author.username}</td>
                    <td>{data[rid].dateSubmitted}</td>
                    <td>{data[rid].amount}</td>
                    <td>{data[rid].type.type}</td>
                </tr>
            )];
        if (this.state.expandedRows.includes(data[rid].reimbursementId)) {
            row.push(
                <tr key={`childRow${data[rid].reimbursementId}`}>
                    <td colSpan={2}>Status: {data[rid].status.status}</td>
                    <td colSpan={3}>Description: <p>{data[rid].description}</p></td>
                </tr>
            )
        }

        return row;
    }

    render() {
        let allRows: any[] = [];

        for (let i = 0; i < this.state.data.length; i++) {
            allRows.push(this.createRow(i));
        }

        return (
            <Table className="text-light bg-light" size="sm" hover striped responsive>
                <thead>
                    <tr>
                        <th>RID</th>
                        <th>Author</th>
                        <th>Date Submitted</th>
                        <th>Amount</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {allRows}
                </tbody>
            </Table>
        );
    }
}


const mapStateToProps = (state: IState) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ReimbursementsTableComponent)
