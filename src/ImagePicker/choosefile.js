import {launchImageLibrary} from "react-native-image-picker";

const chooseFile = (type) => {
    let options = {
        mediaType: type,
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
    };
    launchImageLibrary(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            alert('User cancelled camera picker');
            return;
        } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
        } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
        } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
    });
};
