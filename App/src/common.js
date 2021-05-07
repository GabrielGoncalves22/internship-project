import { Alert, Platform } from 'react-native';

const server = Platform.OS === 'ios'
    ? 'http://localhost:3000'
    : 'http://10.0.2.2:3000';

function showError(error) {
    if (error.response && error.response.data) {
        Alert.alert('Erro', error.response.data)
    } else {
        Alert.alert('Erro', error)
    }    
};

function showSuccess(msg) {
    Alert.alert(msg)
};

export { server, showError, showSuccess };