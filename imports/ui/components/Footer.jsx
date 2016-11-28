import React from 'react';
import {Image, Grid} from 'semantic-ui-react'

const style = {
    marginTop: 20
};

const topGridStyle = {
    paddingLeft: 80,
    borderTop: 'solid 3px #EBEBEB',
    fontSize: 24,
    color: '#00ADC6'
};

const topRowStyle = {
    paddingTop: 20,
    paddingBottom: 20,
};

const ourStyle = {
    borderBottom: 'solid 3px #727272',
    paddingBottom: 15
};

const bottomGridStyle = {
    paddingLeft: 80,
    paddingRight: 25,
    color: 'white',
    backgroundColor: '#525865'
};

// Footer component - contains sponsor information
const Footer = (props) => (

    <div style={style}>

        <Grid columns='equal' style={topGridStyle}>

            <Grid.Row style={topRowStyle}>

                <Grid.Column verticalAlign='top'>
                    <div>
                        <span style={ourStyle}>Our</span>&nbsp;<span>Sponsors</span>
                    </div>
                </Grid.Column>

                <Grid.Column>
                    <Image
                        src='qindeel.png'
                        alt='qindeel'
                        height='100'
                    />
                </Grid.Column>

                <Grid.Column>
                    <Image
                        src='undp-1.png'
                        alt='undp-1'
                        height='100'
                    />
                </Grid.Column>

                <Grid.Column>
                    <Image
                        src='mbrf.png'
                        alt='mbrf'
                        height='100'
                    />
                </Grid.Column>

            </Grid.Row>

        </Grid>

        <Grid columns='equal' style={bottomGridStyle}>

            <Grid.Row verticalAlign='middle'>

                <Grid.Column>
                    All Rights Reserved &copy; 2016 Knowledge4All
                </Grid.Column>

                <Grid.Column>
                    <Image
                        floated='right'
                        src='name.png'
                        alt='name'
                        height='30'
                    />
                </Grid.Column>

            </Grid.Row>

        </Grid>

    </div>

)

export default Footer;