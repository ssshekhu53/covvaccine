import React, { Component } from 'react';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Dropdown, Container, Form, Button, Message } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import moment from 'moment';
import '../App.css';

class Homepage extends Component {

    constructor(props) {
        super(props);

        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeDistrict = this.onChangeDistrict.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            stateOption: [],
            districtOption: [],
            state_id: null,
            district_id: null,
            slots: [],
            today: new Date(),
            isSubmitting: false,
            formError: false,
        };
    }

    componentDidMount() {
        document.title = "Search By District | Covvaccine";

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
            this.setState({
                state_id: data.value
            });
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
        this.setState({
            district_id: data.value
        });
    }

    onChangeDate(date) {
        this.setState({
            today: date
        });
    }

    onSubmit(e) {
        e.preventDefault(); 
        this.setState({
            isSubmitting: true
        });
        if(this.state.state_id === null || this.state.district_id === null)
        {
            this.setState({
                formError: true,
            });
            this.setState({
                isSubmitting: false
            });
        }
        else{
            this.setState({
                formError: false,
            });
            axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.district_id}&date=${moment(this.state.date).format('DD-MM-YYYY')}`)
            .then(response => {
                console.log(response.data);
                this.setState({
                    isSubmitting: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isSubmitting: false
                });
            });
        }
    }

    render()
    {
        return(
            <Container>
                <Form loading={this.state.isSubmitting} error={this.state.formError} onSubmit={this.onSubmit}>
                    { this.state.formError === true?
                        <Message
                            error
                            header='Action Forbidden'
                            content='Please fill all the fields.'
                        />:''
                    }
                    <Form.Group widths='equal'>
                        <Form.Field required>
                            <Dropdown
                                placeholder='Select State'
                                fluid
                                selection
                                options={this.state.stateOption}
                                onChange={this.onChangeState}
                                className=""
                                error={this.state.formError && this.state.state_id === null ? true: false}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <Dropdown
                                placeholder='Select District'
                                fluid
                                selection
                                options={this.state.districtOption}
                                onChange={this.onChangeDistrict}
                                className=""
                                error={this.state.formError && this.state.district_id === null ? true: false}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <div className="customDatePickerWidth">
                            <DatePicker selected={this.state.today} onChange={this.onChangeDate} widths="full" className="" />
                            </div>
                        </Form.Field>
                    </Form.Group>
                    <Button primary type="submit" className="w-100">Search Slots</Button>
                </Form>
                <Container>
                    {/* { this.state.slots.length !== 0 ? (<Accordion panels={rootPanels(this.state.slots)} styled />): '' } */}
                </Container>
            </Container>
        );
    }
}

export default Homepage;