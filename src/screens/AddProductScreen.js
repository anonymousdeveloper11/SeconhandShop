import React,{useState} from 'react'
import { View, Text,StyleSheet,Alert } from 'react-native'
import { TextInput,Button } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'






const AddProductScreen = () => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [year, setYear] = useState('')
    const [price, setPrice] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState('')

    const postData = async()=>{

      
      try{
        await firestore().collection('product')
        .add({
          name,
          desc,
          phone,
          price,
          year,
          image,
          uid:auth().currentUser.uid
        })
        Alert.alert('Data uploaded')
      }catch(err){

        Alert.alert('Somthing went wrong')
      }
      
    }

    const openCamera = ()=>{
      launchCamera({quality:0.5}, (fileobj)=>{
       // console.log(fileobj)
     const uploadTask=  storage.ref().child(`/items/${Date.now}`).putFile(fileobj.uri)
     uploadTask.on('state_changed', 
  (snapshot) => {
    
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    if(progress=100) {alert("uploaded")}
   
  }, 
  (error) => {
    alert("something went wrong")
  }, 
  () => {
    
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      setImage(downloadURL)
    });
  }
);
      })
    }
    return (
        <View style={styles.conatiner}>
            <Text>Add Product</Text>
            <TextInput
      label="Title"
      value={name}
      mode = "outlined"
      onChangeText={text => setName(text)}
    />
    <TextInput
      label="Description of Product."
      value={desc}
      mode = "outlined"
      numberOflines={3}
      multiline ={true}
      onChangeText={text => setDesc(text)}
    />
    <TextInput
      label="Year of Purchase Product"
      value={year}
      mode = "outlined"
      keywordType ="numeric"
      onChangeText={text => setYear(text)}
    />
    <TextInput
      label="Price"
      value={price}
      mode = "outlined"
      keywordType ="numeric"
      onChangeText={text => setPrice(text)}
    />
    <TextInput
      label="Phone"
      value={phone}
      mode = "outlined"
      keywordType ="numeric"
      onChangeText={text => setPhone(text)}
    />

<Button icon="camera" mode="contained" onPress={() => openCamera()}>
    Upload Image
  </Button>
  <Button  mode="contained" onPress={() => postData()}>
    Add Prodduct
  </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    conatiner:{
        flex:1,
        marginHorizontal:30,
        justifyContent:"space-evenly"
    

    },

    text:{
        fontSize:22,
        textAlign:'center'
        

    }

});

export default AddProductScreen
