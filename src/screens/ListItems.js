import React,{useEffect,useState} from 'react'
import { View, Text,FlatList,StyleSheet,Linking,Platform } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'


const ListItems = () => {
    const [item, setItems] = useState([])
    const items =[
        {
            name:"Picture",
            desc:"I'm selling this picture",
            price:"Rs 200",
            year:"2018",
            phone:"2893833",
            image:"https://images.unsplash.com/photo-1584535553837-33e69fc4ca4d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cGhvdG9zfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"

        },
        {
            name:"Camera",
            desc:"I'm selling this Camera with afforable price",
            price:"Rs 10,000",
            year:"2018",
            phone:"1827733",
            image:"https://images.unsplash.com/photo-1487915650694-c30bafaa5a34?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHBob3Rvc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"

        }
    ]

    const getDetails=async ()=>{
        const querySnap = await firestore().collection('product').get()
        const result =querySnap.docs.map(docSnap=>docSnap.data())
        setItems(result)

    }

    const openDial =(phone)=>{
        if(Platform.OS ==='android'){
            Linking.openURL(`tel:${phone}`)
        } else[
            Linking.openURL(`telprompt:${phone}`)
        ]

    }

    useEffect(() =>{
        getDetails()
        return

    },[])
    const renderItem =(item)=>{
        return(
            <Card style={styles.card}>
    <Card.Title title={item.name}  />
    <Card.Content>
      
      <Paragraph>{item.desc}</Paragraph>
      <Paragraph>{item.year}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: item.image }} />
    <Card.Actions>
      <Button>{item.price}</Button>
      <Button onPress={()=> openDial()}>{item.phone}</Button>
    </Card.Actions>
  </Card>
        )
    }
    return (
        <View>
            <Text>
                <FlatList
                data ={items}
                keyExtractor={(item)=> item.phone}
                renderItem={({item})=> renderItem(item)}
                />
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        margin:10,
        elevation:2
       
    }
});

export default ListItems
