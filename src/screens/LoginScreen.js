import React,{useState} from 'react'
import { View, Text,Image,StyleSheet,KeyboardAvoidingView, TouchableOpacity ,Alert} from 'react-native'
import { TextInput,Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userlogin= async()=>{
        if(!email || !password){
            Alert.alert("Please input the field")
            return
        }


        try{
            await auth().signInWithEmailAndPassword(email,password)
        }catch(err){

        Alert.alert("Please input the field")
        }
    
    }
    return (
        <KeyboardAvoidingView behavior='position' >
        
            
            <View style={styles.alignImage}>
                <Image style={{resizeMode:"center",width:200,height:200}} source={require('../assets/login.png')}/>
                <Text style={styles.textSize}>
                    Please login to continue
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

<Button  mode="contained" onPress={() => userlogin()}>
    Login
  </Button>
          <TouchableOpacity onPress={()=>navigation.navigate("signup")}><Text style={{textAlign:'center'}}>Don't have account?</Text></TouchableOpacity>      
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
