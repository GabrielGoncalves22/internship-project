import { Alert, Platform } from 'react-native';

const server = Platform.OS === 'ios'
    ? 'http://localhost:3000'
    : 'http://10.0.2.2:3000';

function showError(error) {
    if (error.response && error.response.data) {
        Alert.alert('Registo de Assiduidade', error.response.data)
    } else {
        Alert.alert('Registo de Assiduidade', error)
    }    
};

function showSuccess(msg) {
    Alert.alert('Registo de Assiduidade', msg)
};

export { server, showError, showSuccess };