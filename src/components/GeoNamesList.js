import React, { Component } from 'react';

import ReactTable from "react-table";
import 'react-table/react-table.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import {SERVER_URL} from '../Constants.js'
import MapContainer from '../components/MapContainer'

function updateState(text){
    this.setState({text})
}

class GeoNamesList extends Component {

    constructor(props) {
        super(props);
        this.state = { name: '', geoNames: []};
    }

    updateChild(geonames) {
        // geonames.map((geoname) => {
        //     return {{
        //      lat: geoname.ltd,
        //      lng: geoname.longlngitude
        //    }}
        // updateState(text)
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
                <MapContainer/>
            </div>
          );
    }

    search = () => {
        const url = SERVER_URL + `api/geonames?name=${this.state.name}`;
        fetch(url)
        .then(response => response.json()) 
        .then(responseData => {
            this.setState({
                geoNames: responseData
            }); 
            this.updateChild(responseData);
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