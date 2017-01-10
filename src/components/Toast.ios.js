import { Keyboard } from 'react-native';

import Toast from '@remobile/react-native-toast';


let keyboardIsShow = false;

Keyboard.addListener('keyboardDidShow', () => {
    keyboardIsShow = true;
});
Keyboard.addListener('keyboardDidHide', () => {
    keyboardIsShow = false;
});

export default {
    show:(msg) => {
        keyboardIsShow ? Toast.showShortCenter(msg) : Toast.show(msg);
    }
};

