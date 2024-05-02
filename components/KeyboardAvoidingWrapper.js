import React from 'react';

//keyboard avoiding view
import {KeyboardAvoidingView,ScrollView,KeyboardAvoidingViewBase,Keyboard, View} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

const KeyboarAvoidingWrapper=({children})=>{
    return(
        <KeyboardAvoidingView style={{flex:1}}>
            <ScrollView> <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                    {children}
                    </View>
               
                       
                    
                   
                    </TouchableWithoutFeedback>
               
            </ScrollView>

        </KeyboardAvoidingView>
    );
}

export default KeyboarAvoidingWrapper;