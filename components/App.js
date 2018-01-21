/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Dimensions, Easing, Animated,AsyncStorage,
    View, ScrollView, BackHandler,TouchableOpacity, TextInput, StatusBar
} from 'react-native';

import {StackNavigator} from 'react-navigation';

import {Card, Avatar, Button, FormValidationMessage} from 'react-native-elements'
import Header from "../generalisedComponent/Header";
import EmailInformation from "./EmailInformation";
import ImageInformation from "./ImageInformation";
import Profile from "./Profile";


class GeneralInformation extends Component<{}> {

    constructor(props) {
        super(props)
        this.state = {
            firstName: ' ',
            lastName: ' ',
            address: ' ',
            city: ' ',
            prevFirstName: '',
            prevLastName: '',
            prevAddress: '',
            prevCity: ''
        }


    }


    componentWillMount() {
        console.log('will mount called')
        AsyncStorage.getItem('first_name').then((name)=>{
            console.log(name)
            this.setState({
                prevFirstName:name,
                firstName:name
            })
        }).catch((error)=>console.log(error.message)).done()
        AsyncStorage.getItem('last_name').then((name)=>{
            console.log(name)
            this.setState({
                prevLastName:name,
                lastName:name
            })
        })
        AsyncStorage.getItem('address').then((name)=>{
            console.log(name)
            this.setState({
                prevAddress:name,
                address:name
            })
        })
        AsyncStorage.getItem('city').then((name)=>{
            console.log(name)
            this.setState({
                prevCity:name,
                city:name
            })
        })
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

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#8111a3" barStyle="light-content"/>

                <Header title={'Profile Validator'}/>
                <View style={{flex: 0.95, justifyContent: 'center'}}>


                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingTop: 20,
                            paddingBottom: 10,
                            justifyContent: 'center'
                        }}>
                        <Card style={styles.container}>

                            <Text style={styles.loginText}>General Information</Text>


                            <TextInput style={{marginTop: 15}} value={this.state.prevFirstName} placeholder={'First Name'}
                                       onChangeText={(text) => {
                                           this.setState({
                                               firstName: text,
                                               prevFirstName:text
                                           })

                                       }
                                       }

                            />
                            {!this.state.firstName ?
                                <FormValidationMessage>First Name is required</FormValidationMessage> : null}

                            <TextInput style={{marginTop: 15}} value={this.state.prevLastName} placeholder={'Last Name'} onChangeText={(text) => {
                                this.setState({
                                    lastName: text,
                                    prevLastName:text
                                })
                            }}/>


                            <TextInput style={{marginTop: 15}} value={this.state.prevAddress} placeholder={'Address'} onChangeText={(text) => {
                                this.setState({
                                    address: text
                                })
                            }}/>
                            {!(this.state.address) ?
                                <FormValidationMessage>Address is required</FormValidationMessage> : null}


                            <TextInput style={{marginTop: 15}} value={this.state.prevCity} placeholder={'City'} onChangeText={(text) => {
                                this.setState({
                                    city: text
                                })
                            }}/>
                            {!this.state.city ? <FormValidationMessage>City is required</FormValidationMessage> : null}


                            <Button title={'Save'} containerViewStyle={{marginTop: 15}} backgroundColor={'#6A0888'}
                                    onPress={() => {

                                         if(this.state.firstName&&this.state.firstName!==' '){

                                             if(this.state.address&&this.state.address!==' '){
                                                 if(this.state.city&&this.state.city!==' '){
                                                     this.props.navigation.navigate('ImageInformation')

                                                     console.log(this.state)
                                                     AsyncStorage.setItem('first_name',this.state.firstName)
                                                     AsyncStorage.setItem('last_name',this.state.lastName)

                                                     AsyncStorage.setItem('address',this.state.address)
                                                     AsyncStorage.setItem('city',this.state.city)
                                                 }
                                                 else {
                                                     this.setState({
                                                         city:''
                                                     })
                                                 }
                                             }
                                             else{

                                                 this.setState({
                                                     address:''
                                                 })
                                             }
                                         }else{
                                             this.setState({
                                                 firstName:''
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


const SimpleApp = StackNavigator({
        GeneralInformation: {screen: GeneralInformation},
        EmailInformation: {screen: EmailInformation},
        ImageInformation: {screen: ImageInformation},
        Profile: {screen: Profile}

    },
    {
        headerMode: 'none',
        mode: 'modal',

        navigationOptions: {
            gesturesEnabled: false,

        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const {layout, position, scene} = sceneProps;
                const {index} = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return {opacity, transform: [{translateY}]};
            },
        }),
    });

export default SimpleApp;

