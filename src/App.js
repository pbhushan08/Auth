import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from '../src/components/LoginForm';


class App extends Component {
    state = { loggedIn: null }

   componentWillMount() {
        firebase.initializeApp ({
            apiKey: "AIzaSyALGTMwhXyI9E41Um24MFzrtEXizvzadBU",
            authDomain: "authentication-23264.firebaseapp.com",
            databaseURL: "https://authentication-23264.firebaseio.com",
            projectId: "authentication-23264",
            storageBucket: "authentication-23264.appspot.com",
            messagingSenderId: "486655641436"
          } );

          firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                  this.setState({ loggedIn: true});
              }
              else {
                  this.setState({ loggedIn: false})
              }
          });
        }

        renderContent() {
            switch (this.state.loggedIn) {
                case true:
                    return (
                    <Button
                        onPress={() => firebase.auth().signOut()}>
                           Log Out
                        </Button>
                    );
                case false:
                      return <LoginForm />;

                default:
                return <Spinner size="large" />;
            }
        } 

    render () {
        return (
              <View>
                  <Header  headerText="Authentication" />
                  {this.renderContent()}
              </View>
        );
    }
}


export default App;