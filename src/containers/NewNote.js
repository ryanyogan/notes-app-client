import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { API } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import config from '../config';
import { s3Upload } from '../libs/awsLib';
import './NewNote.css';

class NewNote extends Component {
  constructor(props) {
    super(props);
    this.file = null;
  }

  state = {
    isLoading: null,
    content: '',
  };

  validateForm = () => this.state.content.length > 0;

  handleChange = event =>
    this.setState({ [event.target.id]: event.target.value });

  handleFileChange = event => (this.file = event.target.files[0]);

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE}`); // eslint-disable-line
      return;
    }

    this.setState({ isLoading: true });

    try {
      const attachment = this.file ? await s3Upload(this.file) : null;

      await this.createNote({
        attachment,
        content: this.state.content,
      });

      this.props.history.push('/');
    } catch (error) {
      alert(error); // eslint-disable-line
      this.setState({ isLoading: false });
    }
  };

  createNote = note =>
    API.post('notes', '/notes', {
      body: note,
    });

  render() {
    return (
      <div className="NewNote">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>

          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating..."
          />
        </form>
      </div>
    );
  }
}

export default NewNote;
