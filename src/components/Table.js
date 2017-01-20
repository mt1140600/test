import React, {Component} from "react";
import { Cell, EditableCell, Column, Table } from "@blueprintjs/table";
import * as constants from "../constants";
import Baby from "babyparse";

class TableExample extends Component {
    constructor(){
      super();
      this.state = { tableCells: [["Name", "Age", "Sex"], ["Anand", 22, "Male"], ["Stone Cold", 40, "Beast"]], csv: null};
    }

    download = () => {
      var csvContent = "data:text/csv;charset=utf-8,";
      this.state.tableCells.forEach( (infoArray, index) => {
        let dataString = infoArray.join(",");
        csvContent += index < this.state.tableCells.length ? dataString+ "\n" : dataString;
      });
      var encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    }

    editCell = (row, col, value) => {
      console.log("confirm");
      let newArray = [...this.state.tableCells];
      let newRow = [...newArray][row];
      newRow[col] = value;
      newArray[row] = newRow;
      this.setState({ tableCells: newArray });
    }

    renderColumn = (item, index) => {
      const renderCell = (rowIndex) => {
        return <EditableCell value={this.state.tableCells[rowIndex + 1][index]} onConfirm={this.editCell.bind(null, rowIndex+1, index)}/>
      }
      return(
        <Column name={item} renderCell={renderCell} />
      );
    }

    addRow = () => {
      let newArray = [...this.state.tableCells];
      let newRow = [];
      for(let i=0; i< this.state.tableCells[0].length; i++){
        newRow.push(null);
      }
      newArray.push(newRow);
      this.setState({ tableCells: newArray });
    }

    handleFileSelect = (evt) => {
      var files = evt.target.files; // FileList object
      var reader = new FileReader();
      reader.readAsText(files[0], "UTF-8");
      reader.onload = (evt) => {
        console.log(evt.target.result);
        //map csv contents to 2D array
        let parsed = Baby.parse(evt.target.result);
        console.log(parsed.data);
        this.setState({tableCells: parsed.data});
      }
      reader.onerror = function (evt) {
        console.log("error reading file");
      }
    }

     render() {
        return (
          <div>
            <Table numRows={this.state.tableCells.length - 1}>
                {this.state.tableCells[0].map(this.renderColumn)}
            </Table>
            <button onClick={this.addRow}>Add row</button>
            <button onClick={this.download}>Download</button>
            <input type="file" onChange={this.handleFileSelect} />
          </div>
        );
    }

}

export default TableExample;
