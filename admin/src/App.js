import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import moment from "moment";

import { Button, Card, Image } from 'semantic-ui-react'

class OrderCard extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      cost: this.props.cost,
      status: this.props.status
    }
  }
  render() {
    const { 
      createdOn,
      _id,
      customerName,
      customerEmail,
      customerPhone,
      details,
      startAddress,
      endAddress,
    } = this.props;
    const {status, cost} = this.state;
    const emailLink = `mailto:${customerEmail}`;
    return (
      <Card fluid>
        <Card.Content>
          {/* <Image floated='right' size='mini' src='/assets/images/avatar/large/steve.jpg' /> */}
          <Card.Header>{status}</Card.Header>
          <Card.Description>
            <ul>
              <li>Name: {customerName}</li>
              <li>
                Phone: <a href={customerPhone}>{customerPhone}</a>
              </li>
              <li>
                Email: <a href={emailLink}>{customerEmail}</a>
              </li>
              <li>Details: {details}</li>
              <li>Start Address: <a href={startAddress.url}>{startAddress.formatted_address}</a></li>
              <li>End Address: <a href={endAddress.url}>{endAddress.formatted_address}</a></li>
              <li> Submitted {moment.duration(moment(new Date()).diff(createdOn)).asMinutes()} minutes ago </li>
              <li>{(cost > 0 ? cost : <Button basic color='red'> Estimate </Button>)}</li>
            </ul>
            
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}



class OrderCardGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    axios.post('/getAllOrders')
    .then(resp => {
      this.setState({
        orders: resp.data.orders,
        isLoaded: true
      });
    });
  }

  render() {
    const {orders, isLoaded} = this.state;
    if (isLoaded) {
      let orderComponents = orders.map(order => {
        return <OrderCard key={order._id} {...order} />
      });
      return (
        <ul>{orderComponents}</ul>
      );
    } else {
      return (<h1>Loading...</h1>);
    }
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <OrderCardGroup />
      {/* <CardExampleGroups /> */}
      {/* <AdminTable /> */}
      </div>
    );
  }
}



export default App;
