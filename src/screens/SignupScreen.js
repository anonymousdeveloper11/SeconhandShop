import React,{useState} from 'react'
import { View, Text,Image,StyleSheet,KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import { TextInput,Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';



const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userSignup= async()=>{
        if(!email || !password){
            Alert.alert("Please input the field")
            return
        }


        try{
            await auth().createUserWithEmailAndPassword(email,password)
        }catch(err){

        Alert.alert("Please input the field")
        }

        
        
    }
    return (
        <KeyboardAvoidingView behavior='position' >
        
            
            <View style={styles.alignImage}>
                <Image style={{resizeMode:"center",width:200,height:200}} source={require('../assets/login.png')}/>
                <Text style={styles.textSize}>
                    Please signup
                </Text>
                </View>
            
                <View style = {styles.padding}>
                <TextInput
      label="Email"
      value={email}
      mode = "outlined"
      onChangeText={text => setEmail(text)}
    />
     <TextInput
      label="Password"
      value={password}
      mode = "outlined"
      secureTextEntry = {true}
      onChangeText={text => setPassword(text)}
    />

<Button  mode="contained" onPress={() => userSignup()}>
    Signup
  </Button>
  <TouchableOpacity onPress={()=>navigation.goBack()}><Text style={{textAlign:'center'}}>login!</Text></TouchableOpacity>      

            </View>
            </KeyboardAvoidingView>
            
    )
}

const styles = StyleSheet.create({
alignImage:{
    alignItems:'center'
},
textSize:{
    fontSize:22
    
},
padding:{
paddingHorizontal:40,
height:"50%",
justifyContent:"space-evenly"
}

});

export default LoginScreen
