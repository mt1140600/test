import React, {Component} from "react";
import { Cell, Column, Table } from "@blueprintjs/table";

class TableExample extends Component {
     render() {

        return (
            <Table numRows={10}>
                <Column name="Rupees" renderCell={renderCell}/>
            </Table>
        );
    }
}

export default TableExample;
