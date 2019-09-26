import React, { Component } from 'react';
import { Platform, StyleSheet,StatusBar,FlatList,Button,Linking } from 'react-native';
import { whileStatement } from '@babel/types';
import { Text, TextInput, View } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data:[],text:""};
  }

  getInfo=()=>{
    let i=0
    resultstr=""
    for(;i<this.state.data.length-1;i++)
    {
      resultstr+=this.state.data[i].key.toLowerCase()+","
    }
    resultstr+=this.state.data[i].key.toLowerCase()
  
    fetch('https://demo8899147.mockable.io/online_part%3Fitems=entry,'+resultstr+",exit")
    .then((response) => response.json())
    .then((responseJson) => {
      Linking.openURL(responseJson.Url);
    })
    .catch((error) => {
      console.error(error);
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar/>
   <View style={styles.toolbar}>
   <Text style={styles.text}>Walkpath Navigator</Text>
   </View>
 
   <View style={{padding: 10}}>
     <View style={{display:"flex",flexDirection:"row"}}>
   <TextInput
     style={{height: 40, padding:'1%'}}
     placeholder="Type here to Add product"
     onChangeText={(text) => this.setState({text})}   />
   <View style={{alignSelf:"flex-end"}}>
    <Button
          title="Add item"
          color="#f194ff"
        
          onPress={() => this.setState({data:[...this.state.data, {key:this.state.text}]})}
        />
</View>
    </View>    
           <FlatList
          data={this.state.data}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />

        <View style={{marginTop:"10%"}}>
        <Button
          title="Send info"
          
          color="#f194ff"
          onPress={()=>{this.getInfo()}}
        />
        </View>
 
  
 </View>
 </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  toolbar:{
    backgroundColor: '#afeeee',
    color: '#000000',
    paddingTop : '10%',
    paddingBottom: '5%',
    paddingLeft:'5%'
  },
  text:{
    color: 'white',
    fontWeight: 'bold',
    paddingTop:'5%'
  },
  button:{
  marginTop:"5%"
  },
  item:{
    backgroundColor:"white"
  }
});
