import React, {Component} from 'react'
import {
    View, BackHandler, Text, Dimensions, TextInput, StatusBar, ScrollView, TouchableOpacity, AsyncStorage
} from 'react-native'



import {Card, Avatar,Button} from 'react-native-elements'
import Header from "../generalisedComponent/Header";


var ImagePicker = require('react-native-image-picker');


export default class Profile extends Component {
    constructor(props)
    {
        super(props)

        this.state= {
            email:'',
            name:'',
            address:'',
            image_uri:''
        }


    }

    componentWillMount() {
        console.log('will mount called')
        AsyncStorage.getItem('first_name').then((name)=>{
            console.log(name)
            this.setState({
                name:name
            })
        }).catch((error)=>console.log(error.message)).done()
        AsyncStorage.getItem('last_name').then((name)=>{
            console.log(name)
            this.setState({
                name:this.state.name+name
            })
        })
        AsyncStorage.getItem('address').then((name)=>{
            console.log(name)
            this.setState({
                address:name
            })
        })
        AsyncStorage.getItem('city').then((name)=>{
            console.log(name)
            this.setState({
                address:this.state.address+name
            })
        })
        AsyncStorage.getItem('email').then((name)=>{
            console.log(name)
            this.setState({
                email:name
            })
        })
        AsyncStorage.getItem('image_uri').then((name)=>{
            console.log(name)
            this.setState({
                image_uri:name
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

            <View style={{flex: 1, justifyContent: 'center'}}>
                <StatusBar backgroundColor="#8111a3" barStyle="light-content"/>

                <Header title={'Profile'} visibility={true} onPress={()=>this.props.navigation.navigate('EmailInformation')}/>

                <ScrollView
                    contentContainerStyle={{flexGrow: 1, paddingTop: 20, paddingBottom: 10, justifyContent: 'center'}}>
                    <Card style={styles.container}>



                        <TouchableOpacity onPress={() => this.imagePicker()}

                        >
                            <Avatar
                                xlarge
                                rounded
                                containerStyle={{marginTop:10,alignSelf:'center'}}
                                source={{uri: this.state.image_uri}}

                                activeOpacity={0.8}
                            />
                        </TouchableOpacity>


                        <View style={styles.elementStyle}>
                            <Text style={styles.titleStyle} >Name:</Text>
                            <Text style={styles.contentStyle}>{this.state.name}</Text>

                        </View>

                        <View style={styles.elementStyle}>
                            <Text style={styles.titleStyle} >Email:</Text>
                            <Text style={styles.contentStyle}>{this.state.email}</Text>

                        </View>

                        <View style={styles.elementStyle}>
                            <Text style={styles.titleStyle} >Address:</Text>
                            <Text style={styles.contentStyle}>{this.state.address}</Text>

                        </View>



                        <Button title={'New Profile'} containerViewStyle={{marginTop:25}} backgroundColor={'#6A0888'} onPress={()=>{

                            AsyncStorage.setItem('first_name','')
                            AsyncStorage.setItem('last_name','')
                            AsyncStorage.setItem('email','')
                            AsyncStorage.setItem('address','')
                            AsyncStorage.setItem('city','')
                            AsyncStorage.setItem('image_uri','')
                            this.props.navigation.navigate('GeneralInformation')

                        }} />
                    </Card>
                </ScrollView>
            </View>


        );
    }
}

const styles = {

    elementStyle:{
        flexDirection:'row',flex:1,marginTop:20
    },
    titleStyle: {
        flex:0.5,
        fontWeight:'bold',
        fontSize:16,
        marginLeft:15
    },
    contentStyle:{
        flex:0.5,
        fontSize:18,marginLeft:25
    },

    loginText: {
        fontSize: 30,
        color: '#000',
        alignSelf: 'center',
        marginBottom: 10
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
}