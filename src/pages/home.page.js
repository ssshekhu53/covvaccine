import React, { Component } from 'react';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Dropdown, Container, Form, Accordion, Icon } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';

const level1Panels = [
    { key: 'panel-1a', title: 'Level 1A', content: 'Level 1A Contents' },
  ]


const day1Panels = props => (
    props.centers.map((ele, index) => Object({
        key: `panel-1-${index}`, 
        title: ele.name,
        content: ele.address
    }))
);


const Day1Content = props => (
    <div>
        <Accordion.Accordion panels={day1Panels(props)} />
    </div>
)

const rootPanels = props => {
    let panel = [];
    let i = -1;
    while(++i<7)
        panel.push(Object({
            key: `panel-${i}`,
            title: moment().add(i, 'days').format('DD-MM-YYYY'),
            content: { content: Day1Content(props) }
        }));
    return panel;
} 

class Homepage extends Component {

    constructor(props) {
        super(props);

        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeDistrict = this.onChangeDistrict.bind(this);

        this.state = {
            stateOption: [],
            districtOption: [],
            slots: []
        };
    }

    componentDidMount() {
        axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
        .then(response => {
            let stateOption = response.data.states.map(elem => Object({key: elem.state_id, text: elem.state_name, value: elem.state_id}));
            this.setState({
                stateOption: stateOption
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    onChangeState(e, data) {
        // console.log(data.value);
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${data.value}`)
        .then(response => {
            let districtOption = response.data.districts.map(elem => Object({key: elem.district_id, text: elem.district_name, value: elem.district_id}));
            this.setState({
                districtOption: districtOption
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    onChangeDistrict(e, data) {
        // console.log(data.value);
        let date = moment().format('DD-MM-YYYY');
        axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${data.value}&date=${date}`)
        .then(response => {
            console.log(response.data);
            this.setState({
                slots: response.data
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    render()
    {
        return(
            <Container>
                <Form>
                    <Form.Group widths={2}>
                        <Dropdown
                            placeholder='Select State'
                            fluid
                            selection
                            options={this.state.stateOption}
                            onChange={this.onChangeState}
                            className="mx-2"
                        />
                        <Dropdown
                            placeholder='Select District'
                            fluid
                            selection
                            options={this.state.districtOption}
                            onChange={this.onChangeDistrict}
                            className="mx-2"
                        />
                    </Form.Group>
                </Form>
                <Container>
                    { this.state.slots.length !== 0 ? (<Accordion panels={rootPanels(this.state.slots)} styled />):'' }
                </Container>
            </Container>
        );
    }
}

export default Homepage;