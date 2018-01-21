import React, { Component } from 'react';
import {
    Platform,
    StyleSheet, BackHandler,
    Text, Dimensions, Easing, Animated,
    View, ScrollView, TouchableOpacity, TextInput, StatusBar, AsyncStorage
} from 'react-native';

import {StackNavigator} from 'react-navigation';

import {Card, Avatar, Button, FormValidationMessage} from 'react-native-elements'
import Header from "../generalisedComponent/Header";


export  default class EmailInformation extends Component<{}> {

    constructor(props){
        super(props)
        this.state={
            email:' ',
            password:' ',
            cPassword:' ',
            prevEmail:'',
            validEmail:true,
            validPassword:true
        }
    }

    componentWillMount() {
        console.log('will mount called')
        AsyncStorage.getItem('email').then((name)=>{
            console.log(name)
            this.setState({
                prevEmail:name,
                email:name
            })
        }).catch((error)=>console.log(error.message)).done()

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
    }

    onBackButtonPressed() {
        return true;
    }

    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
            this.setState({email:text,validEmail:false})
            return false;
        }
        else {
            this.setState({email:text,validEmail:true})
        }
    }

    checkPasswordsMatch(value) {
        var match = this.state.password === value;
        console.log(match)
        this.setState({
            validPassword: match,
            cPassword: value
        });
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#8111a3" barStyle="light-content"/>

                <Header onPress={()=>{
                    this.props.navigation.navigate('ImageInformation')
                }} title={'Email Validator'} visibility={true}/>
                <View style={{flex: 0.95, justifyContent: 'center'}}>


                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingTop: 20,
                            paddingBottom: 10,
                            justifyContent: 'center'
                        }}>
                        <Card style={styles.container}>

                            <Text style={styles.loginText}>Email/Password</Text>


                            <TextInput style={{marginTop: 15}} value={this.state.prevEmail} placeholder={'Email'}

                                       onChangeText={(text) => {
                                           this.validate(text)
                                       }
                                       }

                            />
                            {!this.state.email ?
                                <FormValidationMessage>Email is required</FormValidationMessage> : null}

                            {!this.state.validEmail ?
                                <FormValidationMessage>Email syntax wrong</FormValidationMessage> : null}



                            <TextInput style={{marginTop: 15}} placeholder={'Password'} secureTextEntry={true} onChangeText={(text) => {
                                this.setState({
                                    password: text
                                })
                            }}/>
                            {!this.state.password ?
                                <FormValidationMessage>Password is required</FormValidationMessage> : null}


                            <TextInput style={{marginTop: 15}} placeholder={'Confirm Password'} secureTextEntry={true} onChangeText={(text) => {
                                this.checkPasswordsMatch(text)
                            }}/>
                            {!this.state.cPassword ? <FormValidationMessage>Password Should not be empty</FormValidationMessage> : null}
                            {!this.state.validPassword ? <FormValidationMessage>Password Should be matched</FormValidationMessage> : null}


                            <Button title={'Submit'} containerViewStyle={{marginTop: 15}} backgroundColor={'#6A0888'}
                                    onPress={()=> {
                                        if (this.state.email&&this.state.validEmail && this.state.email !== ' ') {

                                            if (this.state.password && this.state.password !== ' ') {
                                                if (this.state.cPassword&&this.state.validPassword && this.state.cPassword !== ' ') {
                                                    this.props.navigation.navigate('Profile')

                                                    console.log(this.state)
                                                    AsyncStorage.setItem('email', this.state.email)

                                                }
                                                else {
                                                    this.setState({
                                                        cPassword: ''
                                                    })
                                                }
                                            }
                                            else {

                                                this.setState({
                                                    password: ''
                                                })
                                            }
                                        } else {
                                            this.setState({
                                                email: ''
                                            })
                                        }
                                    }}/>



                        </Card>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = {
    loginText: {
        fontSize: 30,
        color: '#000',
        alignSelf: 'center',
        marginBottom: 10
    },

    button: {
        backgroundColor: 'blue',
        width: 100,
        marginBottom: 20,
        padding: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    container: {

        backgroundColor: '#f8f8f8',
        flex: 1,
        justifyContent: 'center'
    },
    avatar: {
        position: 'absolute',
        top: 50,
        left: (Dimensions.get('window').width / 2) - 50,
        alignItems: 'center',
        width: 100,
        height: 100,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 100,
    }
};

