import React, {Component} from 'react'
import {
    View, Image, StatusBar, ScrollView, TouchableOpacity, AsyncStorage
} from 'react-native'

var ImagePicker =require('react-native-image-picker')
import {Button, Card,Avatar} from 'react-native-elements'
import Header from "../generalisedComponent/Header";

var options = {
    title: 'Select Avatar',
    customButtons: [

    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class ImageInformation extends Component {

    constructor(props) {
        super(props)
        this.state = {

            image_uri: ''
        }


    }

    componentWillMount() {
        AsyncStorage.getItem('image_uri').then((image)=>{
            this.setState({
                image_uri:image
            })
        }).done()
    }

    imagePicker() {

        console.log('called')
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {


                console.log(response.uri)

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };


               this.setState({
                   image_uri: response.uri
               })

            }
        });
    }

    render() {
        return (
            <View>
                <StatusBar backgroundColor="#8111a3" barStyle="light-content"/>

                <Header onPress={()=>this.props.navigation.navigate('GeneralInformation')} title={'Image Capturer'} visibility={true}/>

                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingTop: 20,
                        paddingBottom: 10,
                        justifyContent: 'center'
                    }}>
                    <Card style={styles.container}>

                    <Button title={'Choose/Capture Image'} containerViewStyle={{marginTop: 15}}
                            backgroundColor={'#6A0888'} onPress={()=>{this.imagePicker()

                    }}/>
                    <Image source={{uri: this.state.image_uri}} style={{marginTop:20,marginHorizontal:10,height:300}}/>

                        <TouchableOpacity onPress={()=>{
                            if(this.state.image_uri) {
                               AsyncStorage.setItem('image_uri',this.state.image_uri)

                                this.props.navigation.navigate('EmailInformation')
                            }
                            else{
                                alert('please choose a image')
                            }
                        }} style={{alignSelf:'center'}}>
                            <Avatar
                                large
                                rounded
                                containerStyle={{backgroundColor:'#6A0888',marginTop:10}}
                                source={require('../images/white_arrow_forwar.png')}
                            />

                        </TouchableOpacity>

                    </Card>
                </ScrollView>
            </View>
        )

    }
}
const  styles={
    container: {

        backgroundColor: '#f8f8f8',
        flex: 1,
        justifyContent: 'center'
    },
}