import React, { Component, useState } from 'react';

import ReactTable from "react-table";
import 'react-table/react-table.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import {SERVER_URL} from '../Constants.js'

class GeoNamesList extends Component {

    constructor(props) {
        super(props);
        this.state = { name: '', geoNames: []};
    }

    render() {
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
            },{
                Header: 'Country Name',
                accessor: 'countryName',
            },{
                Header: 'Population',
                accessor: 'population',
                filterable: false,
            },{
                Header: 'fcodeName',
                accessor: 'fcodeName',
            }, {
                Header: 'lng',
                accessor: 'lng',
                filterable: false,
                sortable: false,
            }, {
                Header: 'lat',
                accessor: 'lat',
                filterable: false,
                sortable: false,
            }, {
                id: 'button',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: 'name',
                Cell: ({value}) => (<button onClick={() => {this.btnClick(value)}}>Open Map</button>)
            }
        ]
        return (
            <div className="App">
                <DialogContent>
                    <TextField 
                        autoFocus margin="dense" 
                        value={this.state.name} onChange={this.setName} 
                        name="cityName"/>
                    <Button 
                        onClick={this.search} value={this.state.name} >search
                    </Button>
                </DialogContent>
              <ReactTable 
                data={this.state.geoNames} 
                columns={columns} 
                filterable={true}/>
            </div>
          );
    }

    btnClick =(value) => {
        // print(value);
    }

    search = () => {
        const url = SERVER_URL + `api/geonames?name=${this.state.name}`;
        fetch(url)
        .then(response => response.json()) 
        .then(responseData => {
            this.setState({
                geoNames: responseData
            }); 
        })
        .catch(err => console.error(err)); 
    }
    
    setName = (e) => {
        this.setState({
            name: e.target.value
        });
    } 
}

export default GeoNamesList;
