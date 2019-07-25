import React, { Component } from 'react';
import axios from 'axios';

class EmailSender extends Component {
    componentDidMount() {
        axios.get('/API/sendEmail')
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                Solo Millos
            </div>
        );
    }
}

export default EmailSender;