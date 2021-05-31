import { Alert, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const server = Platform.OS === 'ios'
    ? 'http://localhost:3000'
    : 'http://10.0.2.2:3000';

const isNetworkAvailable = async () => {
    const netInfo = await NetInfo.fetch();
    return await netInfo.isInternetReachable
};

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

export { server, isNetworkAvailable, showError, showSuccess };