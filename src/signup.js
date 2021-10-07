let text = email;
let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
if ( fname && lname && phone && email && password && confirmpassword != '') {
    if (regex.test(text) == true) {
        if (password == confirmpassword){
            axios.post('https://df2a819a1444.ngrok.io/api/register', {
                fname:fname,
                lname:lname,
                email:email,
                profile_image:filePath,
                password:password,
                appName:"Bartal"
              })
              .then(function (response) {
                console.log(response);
                alert(response)
              })
              .catch(function (error) {
                console.log(error);
              });

            const data={
                Image:filePath.uri,
                Email:email,
                Contact:phone,
                password:password
            }
         try {
             await AsyncStorage.setItem("users",JSON.stringify(data))
            } catch(error){
             console.log(error)
            }
         
         try {
            let userData = await AsyncStorage.getItem("users");
            let data = JSON.parse(userData);
            console.log("DATA=================",data.Email);
          } catch (error) {
            console.log("Something went wrong", error);
          }

            Alert.alert(
                'Success',
                'You are registered successfully',
                [
                    {
                        text: 'Ok',
                        // onPress: () =>navigation.goBack(),
                    },
                ],
                {cancelable: false},
            );
        } else {
            setconfirmpasswordvalidation('Password Not Match');
            setPasswordvalidation('Password Not Match');
        }
    } else {
        setEmailvalidation('Enter Correct Email');
    }
} else {
    if(fname=='')
    {
        setFnamevalidation('Required*')
    }
    if(lname=='')
    {
        setLnamevalidation('Required*')
    }

    if(email=="")
    {
       setEmailvalidation('Required*');
    }
    if(phone=="")
    {
        setPhonevalidation('Required*');
    }
    if(password=="")
    {
        setPasswordvalidation('Required*');
    }
    if(confirmpassword=="")
    {
        setconfirmpasswordvalidation('Required*');
    }
}