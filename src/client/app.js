// import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import './app.scss';

// import user from './action/user';
// import ui from './action/ui';
// import socket from './socket';

import Notification from './commonComponent/notification';

class App extends React.Component {
    static propTypes = {
        state: PropTypes.object.isRequired,
        children: PropTypes.element,
        location: PropTypes.object.isRequired,
        windowFocus: PropTypes.bool,
        desktopNotification: PropTypes.bool,
        soundNotification: PropTypes.bool,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        // register server eventb
        socket.on('groupMessage', data => {
            console.log('groupMessage');
            user.addGroupMessage(data);
            if (this.props.soundNotification) {
                this.sound.play();
            }
            console.log(window.Notification.permission === 'granted' && this.props.windowFocus && this.props.desktopNotification);
            if (window.Notification.permission === 'granted' && this.props.windowFocus && this.props.desktopNotification) {
                const notification = new window.Notification(
                    `${data.from.username}发来消息:`,
                    {
                        icon: data.from.avatar,
                        body: data.content,
                        tag: data.from.id,
                    }
                );
                notification.onclick = function () {
                    this.close();
                    window.blur();
                    setTimeout(() => {
                        window.focus();
                    }, 0);
                };
                // auto close
                notification.onshow = function () {
                    setTimeout(() => {
                        this.close();
                    }, 3000);
                };
            }
        });

        socket.on('message', data => {
            user.addMessage(data);

            if (this.props.soundNotification) {
                this.sound.play();
            }

            if (window.Notification.permission === 'granted' && !this.props.windowFocus && this.props.desktopNotification) {
                const notification = new window.Notification(
                    `${data.from.username}发来消息:`,
                    {
                        icon: data.from.avatar,
                        body: data.content,
                        tag: data.from.id,
                    }
                );
                notification.onclick = function () {
                    this.close();
                    window.blur();
                    setTimeout(() => {
                        window.focus();
                    }, 0);
                };
                // auto close
                notification.onshow = function () {
                    setTimeout(() => {
                        this.close();
                    }, 3000);
                };
            }
        });

        socket.on('connect', () => {
            // get local storage token
            const token = window.localStorage.getItem('token');
            if (token && token !== '') {
                user
                    .reConnect(token)
                    .then(result => {
                        if (result.status === 201) {
                            user.online();
                            if (this.props.location.pathname === '/') {
                                this.context.router.push('/chat');
                            }
                        }
                    });
            }
        });
        socket.on('disconnect', () => {
            user.offline();
        });

        // html5 notification
        if (window.Notification.permission === 'default' || window.Notification.permission === 'denied') {
            window.Notification.requestPermission();
        }
    }

    componentDidMount() {
        window.onfocus = () => ui.windowFocus(true);
        window.onblur = () => ui.windowFocus(false);
    }

    render() {
        // for debug

        return (
            <div className="window">
                <div className="background" />
                <Notification />
                <audio
                    ref={sound => this.sound = sound}
                >
                    <source src="/sounds/message_sound.mp3" type="audio/mp3" />
                    <source src="/sounds/message_sound.ogg" type="audio/ogg" />
                    <source src="/sounds/message_sound.wav" type="audio/wav" />
                </audio>
                { this.props.children }
            </div>
        );
    }
}

export default connect(
    state => ({
        state: state,
        windowFocus: state.getIn(['ui', 'windowFocus']),
        desktopNotification: state.getIn(['ui', 'desktopNotification']),
        soundNotification: state.getIn(['ui', 'soundNotification']),
    })
)(App);
