import React from "react";
import { View, Text, TouchableOpacity, Button, CheckBox } from "react-native";
import { useEffect, useState } from "react";

state ={
    isVisible: false,
    oneChecked: false,
    twoChecked: false,
    threeChecked: false,
    fourChecked: false,
    fiveChecked: false,
    sixChecked: false,
    sevenChecked: false,
  };
  const [data, setData] = React.useState({
      checked:false,
    isVisible: false,
    oneChecked: false,
    twoChecked: false,
    threeChecked: false,
    fourChecked: false,
    fiveChecked: false,
    sixChecked: false,
    sevenChecked: false,
  });
const onePressed=(val)=>{

}
const twoPressed=(val)=>{

}
const threePressed=(val)=>{

}
const fourPressed=(val)=>{

}
const fivePressed =(val)=>{

}

const sixPressed=(val)=>{
    
}
const sevenPressed=(va)=>{
    
}
const handleCheked=(val)=>{
    if (val == false){
        setData({
          ...data,
          checked: true
          
        });
      } else {
        setData({
          ...data,
          checked: true
        });
      }
}
  feverPressed();
  return (
    <Overlay
      isVisible={this.state.isVisible}
      windowBackgroundColor="rgba(255, 255, 255, .5)"
      overlayBackgroundColor="red"
      width="auto"
      height="auto"
    >
      <CheckBox center title="Fever/Chills" checked={this.state.checked} onPress={(val) => handleCheked(val)} />
      <CheckBox center title="Nausea/Vommiting" checked={this.state.checked} onPress={(val) => handleCheked(val)} />
      <CheckBox center title="Sore Throat" checked={this.state.checked} onPress={(val) => handleCheked(val)} />
      <CheckBox
        center
        title="Shortness of Breath"
        checked={this.state.checked}
        onPress={(val) => handleCheked(val)}
      />
      <CheckBox center title="Cough" checked={this.state.checked} onPress={(val) => handleCheked(val)} />
      <CheckBox center title="Fatigue" checked={this.state.checked} onPress={(val) => handleCheked(val)}/>
      <CheckBox
        center
        title="Loss of Taste and Smell"
        checked={this.state.checked}
        onPress={(val) => handleCheked(val)}
      />
      <CheckBox
        center
        title="Mussle or Body Ache"
        checked={this.state.checked}
        onPress={(val) => handleCheked(val)}
      />
    </Overlay>
  );
};
export default SafetyScreen;
