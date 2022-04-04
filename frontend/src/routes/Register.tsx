import React, { Component } from 'react';
import {
  Button, Container, Form, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { default as Modal } from '../components/Modal';
import AuthService from '../services/auth.service';

type Props = {};

type State = {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  loading: boolean;
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined,
      passwordConfirmation: undefined,
      loading: false,
    };
  }

  onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target as HTMLInputElement;
    this.setState({ email: email.value });
  };

  onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target as HTMLInputElement;
    this.setState({ password: password.value });
  };

  onPasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordConfirmation = e.target as HTMLInputElement;
    this.setState({ passwordConfirmation: passwordConfirmation.value });
  };

  isReady = () => this.state.email
    && this.state.password
    && this.state.passwordConfirmation
    && this.state.password === this.state.passwordConfirmation;

  onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      this.state.email
      && this.state.password
      && this.state.passwordConfirmation
      && this.state.password === this.state.passwordConfirmation
    ) {
      this.setState({ loading: true });
      AuthService.register(
        this.state.email,
        this.state.password,
        this.state.passwordConfirmation,
      ).then(
        () => {
          Modal.fire({
            icon: 'success',
            title: 'Register successful, please check your mail',
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          }).then(() => {
            window.location.replace('/login');
          });
        },
        (error) => {
          this.setState({ loading: false });
          Modal.fire({
            icon: 'error',
            title: 'Error!!',
            text: `Something went wrong while registering! ${error.toString()}`,
          });
        },
      );
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <form onSubmit={this.onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={this.onEmailChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={this.onPasswordChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                onChange={this.onPasswordConfirmationChange}
              />
            </Form.Group>
            <p>
              Durch das Registrieren stimmen Sie unserer&nbsp;
              <Link to="/dsgvo" target="_blank">DSGVO</Link>
              &nbsp;zu.
            </p>
            <Button
              variant="primary"
              type="submit"
              disabled={
                !this.isReady() || this.state.loading ? true : undefined
              }
            >
              {this.state.loading && (
                <span className="spinner-border spinner-border-sm" />
              )}
              Register!
            </Button>
          </form>
        </Row>
      </Container>
    );
  }
}
