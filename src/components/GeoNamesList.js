import React, { Component } from 'react';

import ReactTable from "react-table";
import 'react-table/react-table.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import {SERVER_URL} from '../Constants.js'
import MapContainer from '../components/MapContainer'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class GeoNamesList extends Component {

    constructor(props) {
        super(props);
        this.state = { name: '', geoNames: [], markers: []};
        this.setMarkers = this.setMarkers.bind(this)
    }

    setMarkers(markers) {
        this.setState(state => ({
            markers: markers
        }));
    }

    search = () => {
        const url = SERVER_URL + `api/geonames?name=${this.state.name}`;
        fetch(url)
        .then(response => response.json()) 
        .then(responseData => {
            this.setState({
                geoNames: responseData
            }); 
            this.setMarkers();
        })
        .catch(err => console.error(err)); 
    }
    
    setName = (e) => {
        this.setState({
            name: e.target.value
        });
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
            },{
                Header: 'longitude',
                accessor: 'lng',
                filterable: false,
                sortable: false,
            },{
                Header: 'latitude',
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
               
                <Tabs defaultIndex={0} ref="tabs">
                    <TabList>
                        <Tab>Data</Tab>
                        <Tab>Map</Tab>
                    </TabList>
                    <TabPanel ref="tabPanel1">
                        <ReactTable 
                            data={this.state.geoNames} 
                            columns={columns} 
                            filterable={true}/>  
                    </TabPanel>
                    <TabPanel ref="tabPanel2">
                        <MapContainer ref = "mapContainer1" markers = {this.state.markers}/>
                    </TabPanel>
                </Tabs>
            </div>
          );
    }

}

export default GeoNamesList;