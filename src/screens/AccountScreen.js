import React from 'react'
import { View, Text } from 'react-native'
import { TextInput,Button } from 'react-native-paper';

import auth from '@react-native-firebase/auth'

const AccountScreen = () => {
    return (
        <View>
            <Text>{auth().currentUser.email}
            </Text>
            <Button  mode="contained" onPress={() => auth().signOut()}>
    SignOut
  </Button>
        </View>
    )
}

export default AccountScreen
