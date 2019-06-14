import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor (props){
    super(props);
    this.state={
      gameState:[
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1,
    }     
  }
  
  componentDidMount(){
    this.initializeGame();
  }
  
  initializeGame=() => {
    this.setState({gameState:
    [
    [0,0,0],
    [0,0,0],
    [0,0,0]
    ],
    currentPlayer:1,
    });
  } 
  
  // Get winner Return 1 if Player 1 won, or a 0 if no one has won.
  getWinner= ()=>{
    const NUM_TILES=3;
    var arr=this.state.gameState;
    var sum;
    //check row..
    for (var i=0;i<NUM_TILES;i++){
      sum= arr[i][0]+arr[i][1]+arr[i][2];
      if (sum==3) {return 1;}
      else if (sum==-3){return -1;}  
      }
  
      //check colums...
    for(var i=0; i<NUM_TILES;i++){
      sum= arr[0][i]+arr[1][i]+arr[2][i];
      if (sum==3) {return 1;}
      else if (sum==-3){return-1;}
    }
    // check diagonals A
    
      sum=arr [0][0]+arr[1][1]+arr[2][2];
      if (sum==3) {return 1;}
      else if(sum==-3){return-1;}
  
    // check diagonals B
  
      sum=arr [2][0]+arr[1][1]+arr[0][2];
      if (sum==3) {return 1;}
      else if(sum==-3){return-1;}
   
  
    //NO WINNERS
    return 0; 
  }
  
  
  onTilePress=(row,col)=>{
    // dont change de option
    var value= this.state.gameState[row][col];
    if (value!==0) {return;}
  
    //Current player..
    var currentPlayer= this.state.currentPlayer;
    // set the correct tile...
    var arr=this.state.gameState.slice();
    arr[row][col]=currentPlayer;
    this.setState({gameState:arr});
  
    //switch to other player
    var nextPlayer= (currentPlayer== 1) ? -1 :1;
    this.setState({currentPlayer:nextPlayer});
  
    //check for winners...
    var winner=this.getWinner();
    if (winner== 1) {
      Alert.alert("The force is with Player 1 ");
      this.inicializeGame();
      }
      else if (winner==-1){
        Alert.alert("The force is with Player 2");
        this.initializeGame();
      }
     }
  }
  
  onNewGamePress= () => {
    this.initializeGame();
  }
  
  renderImage=(row,col)=>{
    var value= this.state.gameState[row][col];
    switch(value)
    {
     /* case 1:return <Image source = {{url:'http://icons.iconarchive.com/icons/jonathan-rey/star-wars-characters/128/Vader-03-icon.png'}}
     style = {styles.tileX} />;
     case -1:return <Image source = {{uri:'http://icons.iconarchive.com/icons/jonathan-rey/star-wars-characters/128/Luke-Skywalker-01-icon.png'}}
     style = {styles.tileO} />;
     default:return <View/>;
    }*/
    case 1: return <Icon name="close" style={styles.tileX}/>;
    case -1: return <Icon name="circle-outline" style={styles.tileO}/>;
    default:return <View/>;
  };
  
  render() {
  
      return (
        <View style={styles.container}>
  
        <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
          <TouchableOpacity onPress={()=>this.onTilePress(0,0)} style={[styles.tile, {borderLeftWidth:0, borderTopWidth:0}]}>
          {this.renderImage(0,0)}
          </TouchableOpacity>
  
          <TouchableOpacity onPress={()=>this.onTilePress(0,1)} style={[styles.tile,{borderTopWidth:0}]}>
          {this.renderImage(0,1)}
          </TouchableOpacity>
  
          <TouchableOpacity onPress={()=>this.onTilePress(0,2)} style={[styles.tile,{borderTopWidth:0, borderRightWidth:0,}]}>
          {this.renderImage(0,2)}
          </TouchableOpacity>
        </View>  
  
        <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
          <TouchableOpacity onPress={()=>this.onTilePress(1,0)} style={[styles.tile,{borderLeftWidth:0,}]}>
          {this.renderImage(1,0)}
          </TouchableOpacity>
  
          <TouchableOpacity onPress={()=>this.onTilePress(1,1)} style={[styles.tile,{}]}>
          {this.renderImage(1,1)}
          </TouchableOpacity>
  
          <TouchableOpacity onPress={()=>this.onTilePress(1,2)} style={[styles.tile,{borderRightWidth:0,}]}>
          {this.renderImage(1,2)}
          </TouchableOpacity>   
        </View>
  
        <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
          <TouchableOpacity onPress={()=>this.onTilePress(2,0)} style={[styles.tile,{borderButtonWidth:0,borderLeftWidth:0}]}>
          {this.renderImage(2,0)}
          </TouchableOpacity>
  
          <TouchableOpacity onPress={()=>this.onTilePress(2,1)} style={[styles.tile,{borderBottomWidth:0}]}>
          {this.renderImage(2,1)}
          </TouchableOpacity>
  
          <TouchableOpacity onPress={()=>this.onTilePress(2,2)} style={[styles.tile,{borderBottomWidth:0, borderRightWidth:0}]}>
          {this.renderImage(2,2)}
          </TouchableOpacity>
        </View>
  
        <View style={{paddingTop:50}}/>
        <Button title="New Game" onPress={this.onNewGamePress}/>
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile:{
    borderWidth:1,
    width:100,
    height:100,
  }
});
