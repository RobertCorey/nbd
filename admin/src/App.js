import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import moment from "moment";

import { Button, Card, Image, Modal, Header, Input, Form} from 'semantic-ui-react'



class OrderCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cost: this.props.cost,
      status: this.props.status
    }
  }

  handleUpdateQuote = (cost) => {
    return axios.post('/updateQuote', {
      id: this.props._id,
      cost: cost
    }).then(resp => {
      return this.setState({cost: cost, status: 'quoted'});
    });
  }

  handleMarkAsDelivered = () => {
    axios.post('/fulfillOrder', {id: this.props._id}).then(resp => {
      return this.setState({status: 'fulfilled'});
    })
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
              <li><QuoteButton cost={cost} onQuoteUpdate={this.handleUpdateQuote}/></li>
              <li><Button basic color="green" onClick={this.handleMarkAsDelivered}>Mark As Delivered</Button></li>
            </ul>
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

class QuoteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', inProgress: false};
  }

  componentDidMount() {
    this.setState({value: this.props.cost});
  }

  handleClick = () => {
    const value = this.state.value;
    this.props.onQuoteUpdate(this.state.value).then(() => {
      this.setState({updateWorked: true});
    });
  }

  handleInputChange = event => {
    this.setState({value: event.target.value});
  }

  render() {
    const cost = this.state.value;
    const updateWorked = this.state.updateWorked;
    return (
      <span>
        Cost: {cost > -1 ? `${cost}  ` : null}
        <Modal trigger={<Button basic color='red'>{cost > -1 ? "Requote" : "Quote"} Order</Button>}>
          <Modal.Header>Submit a Quote</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Input value={this.state.value} onChange={this.handleInputChange}/>
              <Button basic color='green' onClick={this.handleClick}>Submit Quote</Button>
              {updateWorked ? "Order Was Quoted!": ""}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </span>
    );
  }
}

class RejectButton extends React.Component {

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
      </div>
    );
  }
}



export default App;
