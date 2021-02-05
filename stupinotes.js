const LoginFunction = (emailPar, passwordPar) => {
    // checking if the email is a valid email before sending the query to the server
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(emailPar)) {
      // the email is valid, 
      // now checking if the password is at least 8char long before sending the query to the server.
      if (passwordPar > 0) {
        // the password is also valid so we can now send the query to the server
        fetch("")
      } else {
        // invalid password
        Alert.alert(
          `Passwordd error:`,
          `The entered password should be at least 8 characters long.`
        )
      }
    } else {
      // invalid email
      Alert.alert(
        `Email error:`,
        `The entered email [${emailPar}] is invalid,\nplease enter a valid email address.`
      )
    }
  }






  // the users page function has been called
  // so we are create some useState() hooks and save the user data in them
  // we are using useState() hooks rather then variables as hooks
  // are easier to manipulate and immediately change the way the ui looks due to
  // direct change (idk what im saying but ye)
  // also considering the settings page will be a modal on the mainpage
  // its gonna make EVERYTHING with user setting editing WAY easier!.
  // let [curUserUSN, setCurUserUSN] = useState(CURUSER.username);
  // let [curUserBio, setCurUserBio] = useState(CURUSER.bio);
  // let [curUserEmail, setCurUserEmail] = useState(CURUSER.email);
  // let [curUserPassword, setCurUserPassword] = useState(CURUSER.password);
  // let [curUserCreatedOnTime, setCurUserCreatedOnTime] = useState(CURUSER.createdOnTime);
  
  /**
   *   MEMORY LEAKAGE RELATED STUFF
   */
  // this function will be called upon every exit as a way
  // to clear user data states and clear some memory
  // to prevent memory leakage, the data although wont be completely gone
  // as it still has an instance saving it as a global variable
  // which will be accessed for getting the user data again 
  // when UPP function is calledd







/**
   *  USER SEARCHING RELATED CODE (TO BE USED IN OTHER PAGES TOO!)
   */
  // user search text useState("") state holder
  let [userSearchText, setUserSearchText] = useState("");
  // user search text input handler
  const userSearchTXTinputHandler = (userTXT_par) => {
    setUserSearchText(userTXT_par);
  }

  // search users function (the function that calls on button click)
  const SearchUser = () => {
    // saving the searched username in a variable
    let searchedUSN = userSearchText;

    // fetching the server to get data back
    fetch(`http://192.168.42.232/singleuser/${searchedUSN}`)
    .then(res => res.json(res))
    .then(data => SearchUserFActual(...data))
    .catch(err => Alert.alert("Login Error:", `User with the username of [${searchedUSN}] doesn't exist.`))
  }

  // the user search function that will be only calledd if there is no error
  // this is also the function which will set the searched user to a global variable
  // and call the SearchedUserPage
  const SearchUserFActual = (searchedUserData) => {
    // setting the value of the searchedUserData to the
    // global searched user variable (aka: )
    GLOBALSEARCHEDUSER = searchedUserData;
    console.log(GLOBALSEARCHEDUSER.username);

    // clearing the text entry
    setUserSearchText("")

    // navigating the user to the SearchedUserPage
    navigation.navigate("SearchedUser");
  }


        {/* THE USER SEARCH BAR AND ITS VIEW */}
        <View style={UPPStyle.SBandSearchButtonHolderStyle}>
        <TextInput value={userSearchText} onChangeText={userSearchTXTinputHandler} placeholder="Search Users" style={UPPStyle.UserSearchBar} title="Search Users"/>
        <Button onPress={() => SearchUser()} title="Search"/>
      </View>



// ===========================



return (
  <View>
<View style={SearchUP_Styles.SearchedUserActual}>
  {/* THE SEARCHED USER DATA HOLDER VIEW*/}
  <ScrollView style={{flex:1, backgroundColor:"gray"}}>
    <View style={UPPStyle.UserDataHolderViewAKAbioETC}>
      {/* THE BLACK USER DATA (USN & BIO) LOCATION */}
      <View style={{width:"100%",minHeight:100,maxHeight:300,marginTop:"1%",alignItems:"center",marginBottom:"12%"}}>
        <Image style={{width:100,height:100,marginTop:"3%"}} source={require("./data/ProfilePicPlaceHolder.bmp")}/>
        <Text style={{color:"white",fontSize:25}}>CURUSER.username</Text>
      </View>
      <Text style={{color:"white",fontSize: 14, marginLeft:"5%"}}>CURUSER.bio</Text>
    </View>
    {/* THIS IS WHERE THE CODE WILL BE FOR RENERING ALL THE POSTS BY THE USER */}
    <View>
      <ScrollView style={{flex:1}}>
        {/* THE FUNCTION FOR GETTING ALL THE DATA*/}
        {/* here */}
        {/* THE BOTTOM FILLER FOR THE SCROLL VIEW */}
        <View style={{width:"100%",height:50,backgroundColor:"gray",marginTop:150,borderRadius:11}}></View>
      </ScrollView>
    </View>
  </ScrollView>
</View>
</View>
)





// now checking if a password is entered
if (password.length > 0) {
  // now checking if the password is at least 8 chars long
  if (password.length > 7) {
    // now checking if the user entered an email
  } else {
    Alert.alert(
      SUER,
      "The password has to be at least 8 characters long"
    );
  };
} else {
  // no password entered so giving an error
  Alert.alert(
    SUER,
    "Please enter a password"
  );
};





      // creating the post request to the server
      fetch(`http://192.168.42.232/users`, {
        "method": "POST",
        "headers": {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          
        })
      }).then(res => {
        return res.json()
      }).then(data => console.log(data))
      .catch(err => console.log(err))