import React, { Component } from 'react';
import axios from "axios";
import './App.css';

import { Button, Card, Image } from 'semantic-ui-react'
{/* <a href="tel:+1-800-555-5555">Call 1-800-555-5555</a> */}
class OrderCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'new',
      details: '1 burger, 1 fry',
      cost: 10
    }
  }
  render() {
    return (
      <Card fluid>
        <Card.Content>
          {/* <Image floated='right' size='mini' src='/assets/images/avatar/large/steve.jpg' /> */}
          <Card.Header>{this.state.status}</Card.Header>
          <Card.Description>
            <ul>
              <li></li>
              <li>{(this.state.cost > 0 ? this.state.cost : <Button basic color='red'> Estimate </Button>)}</li>
            </ul>
            
            {this.state.details}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui four buttons'>
            <Button basic color='green'>
              Approve
            </Button>
            <Button basic color='green'>
              Approve
            </Button>
            <Button basic color='green'>
              Approve
            </Button>
            <Button basic color='red'>
              Decline
            </Button>
          </div>
        </Card.Content>
      </Card>
    )
  }
}


const CardExampleGroups = () => (
  <Card.Group>
    
    <Card fluid>
      <Card.Content>
        <Image floated='right' size='mini' src='/assets/images/avatar/large/molly.png' />
        <Card.Header>Molly Thomas</Card.Header>
        <Card.Meta>New User</Card.Meta>
        <Card.Description>
          Molly wants to add you to the group <strong>musicians</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
    <Card fluid>
      <Card.Content>
        <Image floated='right' size='mini' src='/assets/images/avatar/large/jenny.jpg' />
        <Card.Header>Jenny Lawrence</Card.Header>
        <Card.Meta>New User</Card.Meta>
        <Card.Description>Jenny requested permission to view your contact details</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
  </Card.Group>
)

class OrderCardGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isLoaded: false
    }
    // this.handleLoginClick = this.handleLoginClick.bind(this);
    // this.handleLogoutClick = this.handleLogoutClick.bind(this);
    // this.state = {isLoggedIn: false};
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

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const {orders, isLoaded} = this.state;
    if (isLoaded) {
      let orderComponents = orders.map(order => {
        return <li key={order._id}>{order._id}</li>
      });
      return (
        <ul>{orderComponents}</ul>
      );
    } else {
      return (<h1>Loading...</h1>);
    }
    // let button;

    // if (isLoggedIn) {
    // } else {
    //   button = <LoginButton onClick={this.handleLoginClick} />
    // }

    return (
      <div> hi </div>
    );
  }
}

function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
const numbers = [1, 2, 3, 4, 5];

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
