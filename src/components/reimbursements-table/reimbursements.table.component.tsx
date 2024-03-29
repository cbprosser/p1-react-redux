import React, { Component, MouseEvent } from 'react'
import { connect } from 'react-redux'
import { IState, IReimbursementState } from '../../reducers';
import Reimbursement from '../../models/reimbursement.model';
import { Table } from 'reactstrap';
import PaginationComponent from '../pagination/pagination.component';

interface IReimbursementTableState {
    expandedRows: any[],
    page: number,
    view: number
}

interface IReimbursementTableProps {
    reimbursements: IReimbursementState
}

export class ReimbursementsTableComponent extends Component<IReimbursementTableProps, IReimbursementTableState> {
    constructor(props: any) {
        super(props);

        this.state = {
            expandedRows: [], // used to hold the currently expanded rows for rendering
            page: 1,
            view: 1
        }
    }

    rowClick = (rid: number) => {
        const currentExpandedRows = this.state.expandedRows;
        const isRowExpanded = currentExpandedRows.includes(rid); // Is it already expanded?
        const newExpandedRows = (isRowExpanded) ? currentExpandedRows.filter(id => id !== rid) : currentExpandedRows.concat(rid); // if it is, filter it out, if it isn't, add it in.
        this.setState({
            expandedRows: newExpandedRows
        })
    }

    createRow = (rid: number) => {
        const data = this.props.reimbursements.reimbursements;
        if (!data) {
            return;
        }
        const rowClickCallback = () => { this.rowClick(data![rid].reimbursementId) }; // Moved out of line due to needing to pass in event variables
        let row = [
            (
                <tr onClick={rowClickCallback} key={`parentRow${data![rid].reimbursementId}`}>
                    <td>{data![rid].reimbursementId}</td>
                    <td>{data![rid].author.username}</td>
                    <td>{data![rid].dateSubmitted}</td>
                    <td>{data![rid].amount}</td>
                    <td>{data![rid].type.type}</td>
                </tr>
            )];
        if (this.state.expandedRows.includes(data![rid].reimbursementId)) {
            row.push(
                <tr key={`childRow${data![rid].reimbursementId}`}>
                    <td colSpan={2}>Status: {data![rid].status.status}</td>
                    <td colSpan={3}>Description: <p>{data![rid].description}</p></td>
                </tr>
            )
        }

        return row;
    }

    selectPage = (newPage: number) => {
        this.setState({
            page: newPage
        })
    }

    render() {
        let allRows: any[] = [];

        const length: number = (this.props.reimbursements.reimbursements) ? this.props.reimbursements.reimbursements.length : 0;

        for (let i = 0; i < length; i++) {
            allRows.push(this.createRow(i));
        }
        
        const allDataLength: number = (this.props.reimbursements.length) ? this.props.reimbursements.length : 0;

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
                <tbody>
                    <tr>
                        <td colSpan={5}>
                            <PaginationComponent length={allDataLength} page={this.state.page} view={this.state.view} selectPage={this.selectPage}/>
                        </td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}


const mapStateToProps = (state: IState) => ({
    reimbursements: state.reimbursements
})


const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ReimbursementsTableComponent)
