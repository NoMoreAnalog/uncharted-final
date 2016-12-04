// Libs
import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Image, Form, Button, Message, Segment, Header, Grid} from 'semantic-ui-react';

export default class SignIn extends Component {

    state = {
        badUsernamePassword: false,
        loading: false
    };

    componentDidMount() {
        document.body.style.backgroundColor = '#00adc6';
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = '';
    }

    _handleSubmit = (e, serializedForm) => {

        e.preventDefault()

        this.setState({loading: true});

        Meteor.loginWithPassword(serializedForm.username, serializedForm.password, (err) => {
            if (err) {
                this.setState({badUsernamePassword: true, loading: false});
            }
        });

    }

    render() {

        const {badUsernamePassword, loading} = {...this.state};

        return (
            <Grid verticalAlign='middle' centered style={{height: '100%'}}>

                <Grid.Column style={{maxWidth: 450}}>

                    <Segment padded='very' textAlign='center'>

                        <Form onSubmit={this._handleSubmit} error={badUsernamePassword}>

                            <Image
                                src='../login-screen-k4all.png'
                                alt='login-screen-k4all.png'
                                centered
                                size='small'/>

                            <Header as='h1' content={'Please Sign In'}/>

                            <Form.Input
                                name='username'
                                className='sign-in-input'
                                placeholder='Username'
                                fluid
                            />

                            <Form.Input
                                name='password'
                                className='sign-in-input'
                                type='password'
                                placeholder='Password'
                                fluid
                            />

                            <Message error content='You have entered an invalid username and password. Try again.'/>

                            <Button
                                type='submit'
                                content='Sign In'
                                style={{color: '#ffffff'}}
                                loading={loading}
                                disabled={loading}
                            />

                        </Form>

                    </Segment>

                </Grid.Column>

            </Grid>
        )

    }

}