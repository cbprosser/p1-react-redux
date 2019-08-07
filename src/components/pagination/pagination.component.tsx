import React, { Component } from 'react'
import { ButtonToolbar, Button, ButtonGroup } from 'reactstrap';

interface IPaginationState {
    pArray: any[]
}

interface IPaginationProps {
    page: number,
    view: number,
    length: number,
    selectPage: (newPage: number) => any
}

export default class PaginationComponent extends Component<IPaginationProps, IPaginationState> {
    constructor(props: any) {
        super(props);

        this.state = {
            pArray: []
        }
    }

    pagination = (currentPage: number, finalPage: number) => {
        let left = currentPage - 1,
            right = currentPage + 2,
            range = [],
            rangeWithDots = [],
            l;

        for (let i = 1; i <= finalPage; i++) {
            if (i === 1 || i === finalPage || i >= left && i < right) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    }

    newPage = (nextPage: number) => {
        if(nextPage < 1 || nextPage > this.props.length) {
            return;
        } else {
            this.props.selectPage(nextPage);
        }
    }
    pageButtonSelect = (event: any) => {
        const target = event.currentTarget.innerText;
        this.newPage(+target);
    }

    componentDidUpdate(prevProps: any) {
        if (prevProps === this.props) {
            return;
        }
        const finalPage = Math.ceil(this.props.length / this.props.view);
        this.setState({
            pArray: this.pagination(this.props.page, finalPage)
        });
    }

    render() {
        let buttons: any = [];
        let currentButton: any;

        for (let i = 0; i < this.state.pArray.length; i++) {
            currentButton = this.state.pArray[i];
            if (currentButton === '...') {
                buttons.push(<Button disabled>{currentButton}</Button>);
            } else if (currentButton === this.props.page) {
                buttons.push(<Button active>{currentButton}</Button>)
            } else {
                buttons.push(<Button onClick={this.pageButtonSelect}>{currentButton}</Button>)
            }
        }

        return (
            <ButtonToolbar>
                <Button disabled={(this.props.page === 1) ? true : false} onClick={() => this.newPage(this.props.page - 1)}>Prev</Button>
                <ButtonGroup className="mx-2">
                    {buttons}
                </ButtonGroup>
                <Button disabled={(this.props.page === Math.ceil(this.props.length / this.props.view)) ? true : false} onClick={() => this.newPage(this.props.page + 1)}>Next</Button>
            </ButtonToolbar>
        )
    }
}
