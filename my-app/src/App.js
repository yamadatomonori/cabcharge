import './App.css';
import React from 'react';
import axios from 'axios';

import { Form, Text, TextArea } from 'react-form';

const FIELDS = [
  'from',
  'to',
  'cc',
  'bcc',
  'subject',
  'text'
];
  
class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {submit: "Submit", isEnabled: true};
  }
  
  componentDidUpdate(prevProps, prevState) {
    let submittedValues = this.state.submittedValues;
    
    if (submittedValues !== prevState.submittedValues) {
      axios.post('/send', FIELDS.reduce((ac, e) => {
        if (submittedValues[e]) {
          ac[e] = submittedValues[e];
        }
        
        return ac;
      }, {}))
      
      .then(response => this.setState({message: response.data}))
      .catch(error => this.setState({message: error.message}))
      .finally(() => this.setState({isEnabled: true, submit: 'Submit'}));
    }
  }
  
  render() {
    return (
      <div className ="mainContent">
        <Form onSubmit={
          submittedValues => {
            this.setState({submittedValues});
            this.setState({submit: 'Submitting...'});
            this.setState({isEnabled: false, message: ''});
          }
        }>
          {formApi => (
            <form onSubmit={formApi.submitForm} id="form">
              <label htmlFor="from">From</label>
              <Text field="from" id="from" size="45" />
              <label htmlFor="to">To</label>
              <TextArea field="to" id="to" cols="50" rows="2" />
              <label htmlFor="cc">CC</label>
              <TextArea field="cc" id="cc" cols="50" rows="2" />
              <label htmlFor="bcc">BCC</label>
              <TextArea field="bcc" id="bcc" cols="50" rows="2" />
              <label htmlFor="subject">Subject</label>
              <Text field="subject" id="subject" size="90" />
              <label htmlFor="text">Text</label>
              <TextArea field="text" id="text" cols="100" rows="10" />
              <button type="submit" className="mb-4 btn btn-primary" disabled={!this.state.isEnabled}>
                {this.state.submit}
              </button>
              <span className="message">{this.state.message}</span>
            </form>
          )}
        </Form>
      </div>
    );
  }
}

export default App;
