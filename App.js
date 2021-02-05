/**
 *  AUTHOR: Adak Celina
 *  author's github: [https://www.github.com/bosdoas12]
 * 
 */




import React, {useState} from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, ScrollView } from 'react-native';
import colors from "./colors";
import TermsOfService from "./data/TermsOfService";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// importing the post components
import HomePagePosts from "./components/HomePagePosts";
import PersonalPagePosts from "./components/PersonalPagePosts";
const Stack = createStackNavigator();


/**
 *  SOME GLOBAL VARS
 */
// current logged in user data variable;
var CURUSER;
var GLOBALSEARCHEDUSER;





/**
 *  ===   LOGIN PAGE   ===
 */
const LoginPage = ({ navigation }) => {

  /**
   *  random small stuff
   */
  // password view or not state changer
  let [vp, setVp] = useState(true);
  let [vpTXT, setVpTXT] = useState("View Password");
  const setVP_func = () => {
    vp ? setVp(false) : setVp(true);
    vp ? setVpTXT("Hide Password") : setVpTXT("View Password");
  }



  /**
   *  -- INPUT HANDLERS --
   */
  // username text input handler
  let [userNameET, setUserNameET] = useState("");
  const usernameTXThandler = (username_par) => {
    setUserNameET(username_par);
  }
  
  // password text input handler
  let [passwordET, setPasswordET] = useState("");
  const passwordTXThandler = (pass_par) => {
    setPasswordET(pass_par)
  }


  /**
   *  -- REQUESTS -- 
   */
  const LoginFunction = (usernamePar, passwordPar) => {
    // checking if the user entered a username
    if (usernamePar.length > 0) {
      // checking if the password is at least 8 chars long
      // before sending the query to the server
      if (passwordPar.length > 7) {
        // the password is at least 8 chars long so 
        // sending the query to the server
        fetch(`http://192.168.42.232/singleuser/${usernamePar}`)
        .then(FetchResponse => FetchResponse.json())
        .then(data => actualLoginFunctionPOSTREQ(...data, passwordPar))
        .catch(err => Alert.alert("Login Error:", `Username [${usernamePar}] doesn't exist.`))
        // Alert.alert("Login Error:", "There was an error logging in, please try again.")
      } else {
        Alert.alert(
          `Password Error`,
          `The password has to be at least 8 characters long.`
        )
      }
    } else {
      Alert.alert(
        "Username Error",
        "Please enter a username."
      )
    }
  }

  /**
   *  THE ACTUAL LOGIN FUNCTION AFTER THE REQUEST HAS BEEN MADE
   */
  const actualLoginFunctionPOSTREQ = (userData, preEnteredPasswordPar) => {
    // checking if the entered username matches with the entered password
    if (userData.password == preEnteredPasswordPar) {
      // the user has succesfully logged in
      // console.log(`SUccesfully loged in, welcome ${userData.email}`)
      // setting the current user to the global
      // and then clearing the text entries to allow an easy logout
      CURUSER = userData;
      // console.log(CURUSER.username)
      setPasswordET("");
      setUserNameET("");
      navigation.navigate("Log Out");
    } else {
      // the passwords dont match
      Alert.alert(
        "Login Error.",
        "The entered username and the password doesnt match"
      );
    }
  }

  return (
    <View style={LoginPageStyles.mainScreen}>
      <View style={LoginPageStyles.DPtxtNdLogoV}>
        <Text style={{fontSize: 40}}>DumbPosters</Text>
        <Image style={LoginPageStyles.LogoPicLoginScreenStyle} source={require("./assets/MRRETARDHACKERPHOTO.png")}/>
      </View>
      {/* CREATING THE LOGIN SECTION NOW*/}
      <View style={LoginPageStyles.LoginSectionDesign}>
        <Text style={{fontSize: 28, borderColor: "#000", borderBottomWidth: 2, marginBottom: "5%"}}>
          Login To Your Account
        </Text>
        <View style={LoginPageStyles.LoginBoxStyle}>
          <Text style={{fontSize: 18}}>Useranme:</Text>
          <TextInput value={userNameET} onChangeText={usernameTXThandler} placeholder="Username: " style={LoginPageStyles.DataTextEntryStyle}/>
          <Text style={{fontSize: 18}}>Password:</Text>
          <TextInput secureTextEntry={vp} value={passwordET} onChangeText={passwordTXThandler} placeholder="Password: " style={LoginPageStyles.DataTextEntryStyle}/>
          {/* VIEW OR HIDE PASSWORD BUTTON */}
          <TouchableOpacity onPress={setVP_func} style={{
            width: "30%", height: "22%", backgroundColor: "#53b9fc", marginTop: 5, marginBottom: "1%",
            alignItems: 'center', borderRadius: 5
            }}>
            <View style={{flex: 1}}>
              <Text>{vpTXT}</Text>
            </View>
          </TouchableOpacity>
          {/* THE LOGIN BUTTON */}
          <TouchableOpacity onPress={() => LoginFunction(userNameET, passwordET)} activeOpacity={0.6} style={LoginPageStyles.LoginButtonViewStyle}>
            <View style={{flex: 1}}>
              <Text style={{marginTop: "2%", fontSize: 22}}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* CREATING THE INFO AND SIGNUP BUTTON */}
        <View style={LoginPageStyles.infoAndSignupViewStyle}>
          <Text style={{
            marginHorizontal: "7%",
            marginTop: "8%",
            marginBottom: "3%",
            fontSize: 17,
            }}>Dont have an account? Create one with the button below!
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")} activeOpacity={0.6} style={LoginPageStyles.SignUpButtonViewStyle}>
            <View style={{flex: 1}}>
              <Text style={{marginTop: "1%", fontSize: 20}}>Signup!</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* CREATING THE COPYRIGHT SECTION RIGHT HERE*/}
      <View style={{width: "100%", height: "6%", backgroundColor: "gray", padding: "2%"}}>
        <Text style={{color: "black", fontSize: 18}}>
          © 2021, DumbPosters™. All Rights Reserved. 
        </Text>
      </View>
    </View>
  );
}
/**
 *  Login Page Styles
 */
const LoginPageStyles = StyleSheet.create({
  mainScreen: {
    width: "100%",
    height: "96%",
    backgroundColor: colors.mainBGLightBlueColor,
    alignItems: 'center',
  },
  DPtxtNdLogoV: {
    width: "86%",
    height: "28%",
    marginTop: "4%",
    marginBottom: "1%",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 1,
        backgroundColor: "white",
        elevation: 150,
  },
  LogoPicLoginScreenStyle: {
    width: "60%",
    height: "55%",
    marginTop: "3%",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  LoginSectionDesign: {
    alignItems: 'center',
    width: "100%",
    height: "66%",
    marginTop: "1%",
    borderColor: "black",
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  LoginBoxStyle: {
    alignItems: 'center',
    width: "70%",
    height: "55%",
    borderColor: "black",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 12,

  },
  DataTextEntryStyle: {
    borderBottomWidth: 1,
    borderColor: "black",
    fontSize: 15,
    minWidth: "40%",
    maxWidth: "60%",
  },
  LoginButtonViewStyle: {
    width: "50%",
    height: "20%",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#53b9fc",
    marginTop: "2%",
    borderRadius: 15,
    alignItems: "center",
    alignContent: "center"
  },
  infoAndSignupViewStyle: {
    width: "100%",
    height: "42%",
    alignItems: "center",
  },
  SignUpButtonViewStyle: {
    minWidth: "40%",
    height: "22%",
    backgroundColor: "#53b9fc",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    alignContent: "center"
  }
});



/**
 *  ===============================================================================================
 *  ===============================================================================================
 *  ===============================================================================================
 */

/**
 *  --- SIGNUP PAGE ---
 */
const SignUpPage = ({ navigation }) => {

    /**
     * Creating the state call for displaying the TOS modal
     */
    let [viewTOS, setViewTOS] = useState(false);
    const setViewTOSStateF = () => {
        viewTOS ? setViewTOS(false) : setViewTOS(true);
        // console.log(viewTOS)
    }


    /**
     *  THE VIEW PASSWORDS OR NOT RELATED CODE  
     */
    // the passwords title and password is visible or not state holder:
    let [passwordsButtonTitle, setPasswordsButtonTitle] = useState("View Passwords");
    let [passwordsButtonVisibilityState, setPasswordsVisibilityState] = useState(true);
    const ChangePasswordsButtonStateFunction = () => {
      if (!passwordsButtonVisibilityState) {
        // if the passwords visibility state is false 
        // setting the password to visible
        setPasswordsButtonTitle("View Passwords");
        setPasswordsVisibilityState(true);
      } else {
        // otherwise setting it to invisible
        setPasswordsButtonTitle("Hide Passwords");
        setPasswordsVisibilityState(false);
      }
    }




    /**
     *  SIGNUP RELATED CODE 
     */
    
    // the username state holder and handler
    let [signUpUsn, setSignUpUsn] = useState("");
    const signUpUsnHandler = (usernamePar) => {
      setSignUpUsn(usernamePar);
    }
    // the email state holder and handler
    let [signUpEmail, setSignUpEmail] = useState("");
    const signUpEmailHandler = (emailPar) => {
      setSignUpEmail(emailPar);
    }
    // the password state holder and handler
    let [signUpPassword, setSignUpPassword] = useState("");
    const signUpPasswordHandler = (passwordPar) => {
      setSignUpPassword(passwordPar);
    }
    // the confirmation password state holder and handler
    let [signUpCONFPassword, setSignUpCONFPassword] = useState("");
    const signUpCONFPasswordHandler = (CONFPasswordPar) => {
      setSignUpCONFPassword(CONFPasswordPar);
    }


    // signup function which will be called on signup button clicks
    const SignUpFunc = () => {
      // some general variables i will use in this function
      const SUER = "Signup Error";
      
      // setting the state datas to variables 
      // as its easier to remember the names lol
      let username = signUpUsn;
      let email = signUpEmail;
      let password = signUpPassword;
      let confPassword = signUpCONFPassword;


      // starting the signup validity checks!
      // first checking if a username is even entered
      if (username.length > 0) {
        // now checking if the username is at least 4 chars long
        if (username.length > 3) {
          // now checking if the username entered an email
          if (email.length > 0) {
            // now checking if the entered email is valid
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(email)) {
              // now checking if a password is entered
              if (password.length > 0) {
                // now checking if the password is at least 8 chars long
                if (password.length > 7) {
                  // now checking if the password and confirmation passwords are matching
                  if (password == confPassword) {
                    // now as all the checks are done we can call the actual signup function
                    // which will be doing the server checks and if it all succeeds
                    // it will do the post request and create the account
                    ACTUALSIGNUPFUNCTIONASCHTUNG(username, email, password)
                    // =================================================
                    // =================================================
                    // =================================================
                  } else {
                    Alert.alert(
                      SUER,
                      "The passwords arent matching"
                    );
                  }
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
            } else {
              // the email is invalid so error
              Alert.alert(
                SUER,
                "Please enter a valid email address"
              );
            }
          } else {
            // no email entered so error
            Alert.alert(
              SUER,
              "Please enter an email"
            );
          };
        } else {
          // username is less than 4chars long so error
          Alert.alert(
            SUER,
            "The username has to be at least 4 characters long"
          );
        };
      } else {
        // no username entered so error
        Alert.alert(
          SUER,
          "Please enter a username"
        );
      };
    };



    // the actual function which will do the post request
    const ACTUALSIGNUPFUNCTIONASCHTUNG = (username, email, password) => {
      // checking if the username already exists in the server as the first step
      fetch(`http://192.168.42.232/singleuser/${username}`)
      .then(FoundSingleUser => FoundSingleUser.json())
      .then(data => checkIfUsernameExists(data))
      .catch(err => console.log(err))
      // this is the function that will take user data 
      // as parameter and check if the username already exists.
      const checkIfUsernameExists = (userData) => {
        // checking if it exists
        if (userData.err != undefined) {
          // the username doesnt exist, 
          // so now checking if the email already exists,
          // and if it doesnt, we can create the account
          fetch(`http://192.168.42.232/singleusersBYEMAIL/${email}`)
          .then(FoundSingleUserByEMres => FoundSingleUserByEMres.json())
          .then(data => checkIfEmailAlreadyExistsAndCreateAccount(data))
          .catch(err => console.log(err))

        } else {
          // the username already exists so alerting the user
          Alert.alert(
            "Signup Error",
            `The entered username [${username}] already exists`
          );
        };
      };


      /**
       *  THIS IS THE EMAIL CHECKER FUNCTION
       *  THIS WHILL CHECK IF THE EMAIL ALREADY EXISTS
       *  AND IF VALIITY CHECKS SUCCEED, THIS FUNCTION
       *  WILL ALSO CREATE THE ACCOUNT.
       */
      const checkIfEmailAlreadyExistsAndCreateAccount = (serverData) => {
        // checking the json status we get
        // 0 = email doesnt exist
        // 1 = email exists
        if (serverData.jsonstatus == 0) {
          /**
           *  ALL THE VALIDITY CHECKS SUCCEEDED,
           *  SO WE CAN CREATE THE ACCOUNT NOW!
           */
          // creating the post request to the server
          fetch(`http://192.168.42.232/users`, {
            "method": "POST",
            "headers": {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password
            })
          }).then(res => {
            return res.json()
          }).then(data => AccountCreatedSuccesfullyCall(data))
          .catch(() => Alert.alert("Signup Error", "There was an error creating your account"))

        } else {
          // the email already exists so alerting the user about it
          Alert.alert(
            "Signup Error",
            `The entered email [${email}] already exists`
          );
        };

        // the function which will run if the account was created succesfuly
        // mainly for memory cleanup and some visual shit.
        const AccountCreatedSuccesfullyCall = (serverResponse) => {
          // checking if everything was **perfect**
          if (serverResponse.ACSTATS == "perfect") {
            // everything was **perfect** :D
            // so now we can clear all unneeded memory usage we have
            
            // first we clear the input state holders
            setSignUpUsn("");
            setSignUpEmail("");
            setSignUpPassword("");
            setSignUpCONFPassword("");

            // then we alert the user the account has been created succesfully
            Alert.alert(
              "Account created succesfully!", 
              `Welcome to the club, ${username}! \nHave Fun :)`)
          
          } else {
            // everything was perfect for some reason
            // and generally as i THINK i already handled all 
            // the possible errors, tbh i dont think this error can even
            // exist as non-conectivity is handled on (line: 498);
            // so ima just give a stupid error like (line: 498) just in case
            Alert.alert(
              "Signup Error", "There was an error creating your account"
            );
          };
        };
      };
    };


    return (
        <View style={SignUpPageStyles.mainScreen}>
            {/* MAIN VIEW */}
            <View style={SignUpPageStyles.SignUpEntriesHolder}>
                {/* COMPONENT HOLDER FOR THE ENTRIES AND THE SIDE "BEAUTY" ADDER VIEW*/}
                <Text style={{fontSize: 30, marginTop: "3%"}}>Create an Account</Text>
                <View style={SignUpPageStyles.CompHolderAndSBAdderViewStyle}>
                    {/* CREATING THE INPUT ENTRY COMPONENTS */}
                    <View style={SignUpPageStyles.InputEntryComponents}>
                        <Text style={{fontSize: 15, marginLeft: "15%"}}>Username:</Text>
                        <TextInput value={signUpUsn} onChangeText={signUpUsnHandler} style={SignUpPageStyles.CompholderInputStyles} placeholder=" username:"/>
                    </View>
                    <View style={SignUpPageStyles.InputEntryComponents}>
                        <Text style={{fontSize: 15, marginLeft: "15%"}}>Email:</Text>
                        <TextInput value={signUpEmail} onChangeText={signUpEmailHandler} style={SignUpPageStyles.CompholderInputStyles} placeholder=" email:"/>
                    </View>
                    <View style={SignUpPageStyles.InputEntryComponents}>
                        <Text style={{fontSize: 15, marginLeft: "15%"}}>Password:</Text>
                        <TextInput secureTextEntry={passwordsButtonVisibilityState} value={signUpPassword} onChangeText={signUpPasswordHandler} style={SignUpPageStyles.CompholderInputStyles} placeholder=" password:"/>
                    </View>
                    <View style={SignUpPageStyles.InputEntryComponents}>
                        <Text style={{fontSize: 15, marginLeft: "15%"}}>Confirm Password:</Text>
                        <TextInput secureTextEntry={passwordsButtonVisibilityState} value={signUpCONFPassword} onChangeText={signUpCONFPasswordHandler} style={SignUpPageStyles.CompholderInputStyles} placeholder=" confirm password:"/>
                    </View>

                    {/* THE VIEW PASSWORDS OR NOT BUTTON */}
                    <Button onPress={() => ChangePasswordsButtonStateFunction()} title={passwordsButtonTitle}/>


                    {/* THE TERMS OF SERVICE AND SIGNUP BUTTON */}
                    <Text style={{fontSize: 16, marginVertical: "3%"}}>
                        By signing in, you agree to our: 
                        <Text style={{color: "blue"}} onPress={() => setViewTOSStateF()}>
                            TERMS OF SERVICE.{viewTOS}
                        </Text>
                    </Text>

                    {/* THE TERMS OF SERVICE MODAL */}
                    <Modal 
                    animationType="slide" visible={viewTOS}
                    transparent={true}>
                        <View style={SignUpPageStyles.TOS_ModalVStyle}>
                            <View style={SignUpPageStyles.TOS_ModalComponentsHolder} >
                                <Text style={{
                                    marginVertical: "2%",
                                    fontSize: 25
                                }}>
                                    TERMS OF SERVICE
                                </Text>
                                {/* THE SCROLLVIEW INCLUDING THE TOS TEXT */}
                                <View style={SignUpPageStyles.TOSHolder_ScrollViewStyle}>
                                    <ScrollView>
                                        <Text style={{
                                            fontSize: 16,
                                            alignItems: 'center',
                                            marginVertical: 20
                                        }}>
                                            {TermsOfService}
                                        </Text>
                                    </ScrollView>
                                </View>
                                <Text style={{marginVertical:"5%",fontSize:20}}>
                                    BY SIGNING IN YOU AGREE TO THE TERMS OF SERVICE.
                                </Text>
                                <Button title="Go Back To HomeScreen" onPress={setViewTOSStateF}/>
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity onPress={() => SignUpFunc()} activeOpacity={0.6} style={SignUpPageStyles.SignUpButtonStyle}>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 18, marginTop: "5%"}}>
                                Signup
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={SignUpPageStyles.copyRightPlaceSU_Page}>
                    <Text style={{
                        fontSize: 16,
                        marginTop: "3%"
                    }}>
                        © 2021, DumbPosters™. All Rights Reserved.
                    </Text>
                </View>
            </View>
        </View>
    )
}

const SignUpPageStyles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor: colors.mainBGLightBlueColor,
        alignItems: 'center',
    },
    SignUpEntriesHolder: {
        width: "86%",
        height: "90%",
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "black",
        marginTop: "10%",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowRadius: 6,
        shadowOpacity: 1,
        elevation: 20,
    },
    CompHolderAndSBAdderViewStyle: {
        width: "84%",
        height: "84%",
        borderColor: "black",
        borderLeftWidth: 3,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        marginTop: "1%",
        alignItems: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    InputEntryComponents: {
        width: "90%",
        height: "13%",
        borderColor: "black",
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        backgroundColor: "#eff",
        marginBottom: "5%",
        shadowColor: "black",
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowRadius: 6,
        shadowOpacity: 1,
        elevation: 20,
    },
    CompholderInputStyles: {
        minWidth: "40%",
        maxWidth: "70%",
        fontSize: 18,
        borderBottomWidth: 1,
        borderColor: "black",
        marginLeft: "15%"
    },
    copyRightPlaceSU_Page: {
        width: "100%",
        height: "9%",
        borderWidth: 1,
        borderColor: "black",
        alignItems: "center",
        backgroundColor: "gray",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    SignUpButtonStyle: {
        marginTop: "2%",
        borderColor: "black",
        borderWidth: 1,
        backgroundColor: "#53b9fc",
        width: "50%",
        height: "10%",
        borderRadius: 5,
        alignItems: "center"
    },
    TOS_ModalVStyle: {
        flex: 1,
        backgroundColor: "rgba(0,0,0, 0.7)",
        alignItems: 'center'
    },
    TOS_ModalComponentsHolder: {
        width: "96%",
        height: "90%",
        borderWidth: 3,
        borderColor: "black",
        borderRadius: 10,
        marginTop: "5%",
        backgroundColor: "white",
        alignItems: "center"
    },
    TOSHolder_ScrollViewStyle: {
        width: "80%",
        height: "65%",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 15
    }
})



/**
 *  ===============================================================================================
 *  ===============================================================================================
 *  ===============================================================================================
 */

const UserPersonalPage = ({ navigation }) => {
  /**
   *   SOME DATA THAT WILL BE NEEDED IN THE WHOLE FUNCTION 
   */




  /**
   *  THE POSTS RELATEDD STUFF
   */
  // personal posts state holder
  let [personalPosts, setPersonalPosts] = useState([]);
  const SetUserPostsArrayFunction = (postData => {
    // filtering the data properly to the user
    setPersonalPosts(postData.filter(post => {
      if (post.author == CURUSER.username) {
      // the valid posts are returned
      return post;
    } else {
      // otherwise, returning null/nothing.
      null;
    }}))
  })
    
    // the fetch call which will get all the pots so we can filter them later
  fetch("http://192.168.42.232/posts")
  .then(res => res.json())
  .then(data => SetUserPostsArrayFunction(data))
  .catch(() => Alert.alert("Error", "There was an error displaying your posts"))



  /**
   *   ADD NEW POST MODAL RELATED STUFF
   */
  // the state holder for viewing the add new post modal or not
  let [ANPmodalVisibility, setANPmodalVisibility] = useState(false);
  // the function for opening the modal
  const ONOROFFmodalF = () => {
    if (ANPmodalVisibility) {
      // if the modal visibility is true making it false
      setANPmodalVisibility(false);
    } else {
      // otherwise making it true
      setANPmodalVisibility(true)
    }
  }
  
  // TEXT INPUT HANDLERS AND TEXT INPUT STATE HOLDERS
  // title text
  let [titleText, setTitleText] = useState("");
  // title input handdler
  const titleInputHandler = (titleTXT) => {
    if (titleTXT.length < 128) {
      setTitleText(titleTXT);
    } else {
      Alert.alert("INFO", "The maximum title text length is 128 characters");
      setTitleText(titleTXT);
    }
  }
  // body text
  let [bodyText, setBodyText] = useState("");
  // body input handdler
  const bodyInputHandler = (bodyTXT) => {
    // checking if the body txt is under 768 chars long
    // if it is then we wont update the state as the 
    // max post length is 768.
    if (bodyTXT.length < 768) {
      setBodyText(bodyTXT);
    }else{
      Alert.alert("INFO", "The maximum body text length is 768 characters");
      setBodyText(bodyTXT);
    }
  }


  // the cancel function
  const CancelNewModalFunc = () => {
    // first setting the texts as empty
    setTitleText("");
    setBodyText("");
    
    // then removing the modal
    setANPmodalVisibility(false);
  }

  /**
   *  THE ADD POST FUNCTION
   */
  const AddPost = () => {
    // saving the states into variables
    let Ftitle = titleText;
    let fbody = bodyText;
    // running a few validitiy checks
    // checking if the user entered a title
    if (Ftitle.length > 0) {
      // checking if the user entered a body
      if (fbody.length > 0) {
        // these are pretty much all the validity checks we will do
        // we dont need any server side validity checks neither
        // as that would be stupid, imagine - ("Unable to post your post, the body is already in use") LOL.

        // getting the current username from the global variable
        let Fusername = CURUSER.username;

        // also removing the current modal as the loading proccess makes the buttons act weirdly
        // so we can just remove that from the screen now
        setANPmodalVisibility(false);

        // now creting the post request to the server immediately
        fetch(`http://192.168.42.232/posts`,{
          "method": "POST",
          "headers": {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            author: Fusername,
            title: Ftitle,
            body: fbody
          })
        }).then(res => res.json()).then(
          data => SuccesfullPostMessageF(data)
        ).catch(() => {
          Alert.alert(
            "Post Error",
            "No connection to the server"
          )
        })

      } else {
        // no body was entered so error
        Alert.alert("Post Error", "Please Enter A Body")
      }
    } else {
      // no title was entered so error
      Alert.alert("Post Error", "Please Enter A Title")
    }
  }

  // this function will alert the user about the succesfull post
  const SuccesfullPostMessageF = (serverResponse) => {
    // alerting that the post was succesfull
    if (serverResponse.PostStatus == "Completed") {
      // the post has been posted succesfully
      // telling the user it has been created sucesfully
      Alert.alert(
        "Sucess",
        "The post has been created succesfully!"
      );
      // clearing the states holding the post data
      setTitleText("");
      setBodyText("");
    }
  } 




  /**
   *  BIO RELATED CODE
   */
  // this is the bio modal view or not state holder
  let [viewEditBioM, setViewEditBioM] = useState(false);

  // this is the state holder of the bio of the current user
  let [curUserBioState, setCurUserBioState] = useState("");
  // this is the function for opening the modal or closing it
  const OpenOrCloseviewEditBioMF = () => {
    // Opening the bio editing modal and calling the fethes for getting the bio of the current user and
    // setting it to the textInput of bio editing, so the user will see their current bio too
    // and than create the put request from a button in the modal
    setViewEditBioM(true)
    // getting the name of the current user in a variable
    let currentUserUsername = CURUSER.username;
    // fetching the bio of the current user
    fetch(`http://192.168.42.232/singleuser/${currentUserUsername}`)
    .then(res => res.json())
    // setting the text of the textInput to the gotten data with the function
    // function is needed as without spreading the json data returns undefined (line: 906)
    .then(data => FUNCSETCURUSERBIO(...data))
    .catch(null)
    
    const FUNCSETCURUSERBIO = userData => {
      setCurUserBioState(userData.bio);
    }
  };

  // the function for cancelling bio editing
  const CancelBioEditFunc = () => {
    // now removing the modal
    setViewEditBioM(false);

    // first clearing the states
    setCurUserBioState("");
  }

  // the bio text input input handler function
  const BioInputHandlerF = (bioText) => {
    // checking if the limit of 512 characters hasnt been exceeded
    if (bioText.length < 512) {
      setCurUserBioState(bioText)
    } else {
      Alert.alert("ERROR", "Max bio length is 512 characters.")
    }
  }

  // the save new bio changes function
  const SaveNewBioChangesF = () => {
    // closing the edit bio modal
    setViewEditBioM(false);
    // getting the value of the bio state holder to a variable
    let newBio = curUserBioState;
    console.log(newBio)
    // creating the put request
    fetch(`http://192.168.42.232/users`,{
          "method": "PUT",
          "headers": {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            userID: CURUSER._id,
            username: CURUSER.username,
            newBio: newBio,
            email: CURUSER.email,
            password: CURUSER.password,
            sentCot: CURUSER.createdOnTime
          })
        }).then(res => res.json()).then(
          data => ConfBioF(data)
        ).catch(() => {
          Alert.alert(
            "Post Error",
            "No connection to the server"
          )
        })
  }

  // the function for confirming the update has been succesfull
  // and doing the proper required clean up.
  const ConfBioF = (serverData) => {
    // checking if the success message has been accesse
    if (serverData.serverInfo == "updateSuccesfull") {
      // setting the CURUSER.bio to the CurUserBioState
      CURUSER.bio = curUserBioState;
      // clearing some state holders for memory
      setCurUserBioState("");
      
      // alerting the user that the update has been successfull!
      Alert.alert("Success", "Your bio has been updated succesfully!");
    }
  }




    
  return (
    <View style={UPPStyle.mainScreen}>
      <View style={{width:"100%",height:"92%",backgroundColor:"white"}}>
        <ScrollView style={{flex:1, backgroundColor:"gray"}}>
          <View style={UPPStyle.UserDataHolderViewAKAbioETC}>
            {/* THE BLACK USER DATA (USN & BIO) LOCATION */}
            <View style={{width:"100%",minHeight:100,maxHeight:300,marginTop:"1%",alignItems:"center",marginBottom:"12%"}}>
              <Image style={{width:100,height:100,marginTop:"3%"}} source={require("./data/ProfilePicPlaceHolder.bmp")}/>
              <Text style={{color:"white",fontSize:25}}>{CURUSER.username}</Text>
            </View>
            <Text style={{color:"white",fontSize: 14, marginLeft:"5%"}}>{CURUSER.bio}</Text>
            {/* THE USER DATA BOX BUTTONS*/}
            <View style={{width:"100%",height:50,flexDirection:"row",justifyContent:"space-evenly"}}>
              <TouchableOpacity activeOpacity={0.6} style={UPPStyle.USDATABOX_ButtonsStyles}>
                <View style={{flex:1}}>
                  <Text style={{fontSize:20}}>Settings</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => OpenOrCloseviewEditBioMF()} activeOpacity={0.6} style={UPPStyle.USDATABOX_ButtonsStyles}>
              <View style={{flex:1}}>
                <Text style={{fontSize:20}}>Edit Bio</Text>
              </View>
              </TouchableOpacity>



              {/* THE MODAL OF EDIT BIO */}
              <Modal animationType="slide" transparent={true} visible={viewEditBioM}>
                <View style={{ width:"100%",height:"100%",backgroundColor:"gray",borderColor:"black",borderWidth:2,alignItems:'center'}}>
                  <Text style={{fontSize:35,marginTop:"5%",marginBottom:"10%"}}>EDIT YOUR BIO:</Text>
                  <TextInput maxLength={512} onChangeText={BioInputHandlerF} multiline={true} numberOfLines={10} value={curUserBioState} style={{width:"86%",fontSize:20,height:"40%",borderColor:"black",
                                                                                                borderWidth:1,borderRadius:10,backgroundColor:"white"}} />
                  <TouchableOpacity activeOpacity={0.4} onPress={() => SaveNewBioChangesF()} style={UPPStyle.modalButtons}>
                    <View style={{flex:1}}>
                      <Text style={{fontSize:18,marginTop:"3%"}}>SAVE CHANGES</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.4} onPress={() => CancelBioEditFunc()} style={UPPStyle.modalButtons}>
                    <View style={{flex:1}}>
                      <Text style={{fontSize:18,marginTop:"3%"}}>CANCEL</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Modal>




            </View>
          </View>
          {/* ADD NEW POST BUTTON */}
          <Button onPress={() => ONOROFFmodalF()} title="ADD NEW POST"/>
          <View style={{alignItems:"center",width:"100%",height:40,marginVertical:3}}>
            <Text style={{color:"white",fontSize:20}}>POSTS:</Text>
            <View style={{width:"100%",borderColor:"white",borderTopWidth:3}}></View>
          </View>




          {/* ADD NEW POST MODAL */}
          <Modal animationType="fade" transparent={true} visible={ANPmodalVisibility}>
            <View style={{width:"100%",height:"100%",backgroundColor:"gray",alignItems:"center"}}>
              <Text style={{fontSize:30,marginTop:"5%"}}>Add New Post</Text>
              <Text style={{marginBottom:"3%"}}>____________________________________</Text>
              <Text style={{fontSize:24,marginBottom:"1%"}}>Enter The Title Of The Post</Text>
              <TextInput maxLength={128} value={titleText} onChangeText={titleInputHandler} style={UPPStyle.ANP_modalTitleTextInputStyle} placeholder="Title"/>
              <Text style={{marginBottom:"3%"}}>____________________________________</Text>
              <Text style={{fontSize:24,marginBottom:"1%"}}>Write Your Post Below</Text>
              <TextInput  maxLength={768} value={bodyText} onChangeText={bodyInputHandler} numberOfLines={20} multiline={true} style={UPPStyle.ANP_modalBodyTextInputStyle} placeholder="Post Body"/>
              <TouchableOpacity activeOpacity={0.4} onPress={() => AddPost()} style={UPPStyle.modalButtons}>
                <View style={{flex:1}}>
                  <Text style={{fontSize:22,marginTop:"3%"}}>ADD POST</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.4} onPress={() => CancelNewModalFunc()} style={UPPStyle.modalButtons}>
                <View style={{flex:1}}>
                  <Text style={{fontSize:22,marginTop:"3%"}}>CANCEL</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>




          {/* THIS IS WHERE THE CODE WILL BE FOR RENERING ALL THE POSTS BY THE USER */}
          <View>
            <ScrollView style={{flex:1}}>
              {/* THE FUNCTION FOR GETTING ALL THE DATA*/}
              {personalPosts.map(post => <PersonalPagePosts author={post.author} title={post.title}
                                                            body={post.body} 
                                                            createdOnTime={post.createdOnTime} 
                                                            key={post._id}/>).reverse()}
              {/* THE BOTTOM FILLER FOR THE SCROLL VIEW */}
              <View style={{width:"100%",height:50,backgroundColor:"gray",marginTop:150,borderRadius:11}}></View>
            </ScrollView>
          </View>

        </ScrollView>
      </View>
      {/* THE FOOTER OF THE APP */}
      {/* TO BE COPIES TO THE OTHER PAGES TOO */}
      <View style={{
        backgroundColor:"white",width:"100%",height:"8%",borderColor:"black",borderTopWidth:3,
        flexDirection:"row",justifyContent:"space-evenly"}}>
        <TouchableOpacity onPress={() => {
          setPersonalPosts([]);
          navigation.navigate("Log Out")
          }} activeOpacity={0.6} style={UPPStyle.FOOTERBUTTONSTYLES}>
          <View style={{flex:1}}>
            <Text style={{fontSize:20}}>HomeScreen</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setPersonalPosts([]);
          navigation.navigate("SearchedUser")
          }} activeOpacity={0.6} style={UPPStyle.FOOTERBUTTONSTYLES}>
          <View style={{flex:1}}>
            <Text style={{fontSize:18}}>Searched User</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setPersonalPosts([]);
          navigation.navigate("Personal Page")
          }} activeOpacity={0.6} style={UPPStyle.FOOTERBUTTONSTYLES}>
          <View style={{flex:1}}>
            <Text style={{fontSize:20}}>Your Page</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const UPPStyle = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: colors.mainBGLightBlueColor,
    alignItems: "center"
  },
  SBandSearchButtonHolderStyle: {
    flexDirection: "row",
    marginTop: "4%",
    width: "100%",
    height: "7%"
  },
  UserSearchBar: {
    width: "70%",
    marginRight: "3%",
    backgroundColor: "white",
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    fontSize: 20,
    marginLeft: "4%"
  },
  UserDataHolderViewAKAbioETC: {
    width: "90%",
    marginHorizontal: "5%",
    minHeight: 200,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    backgroundColor: "black",
    marginBottom: 15,
    shadowColor: "black",
    shadowOffset: {
        width: 10,
        height: 10
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 20,
  },
  USDATABOX_ButtonsStyles: {
    width: "35%",
    height: 30,
    backgroundColor: "#53b9fc",
    marginTop: 5,
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
  },
  FOOTERBUTTONSTYLES: {
    width: "30%",
    height: "80%",
    backgroundColor: "#53b9fc",
    marginTop: 5,
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10
  },
  ANP_modalTitleTextInputStyle: {
    minWidth: "30%",
    maxWidth: "70%",
    height: "10%",
    fontSize: 20,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white"
  },
  ANP_modalBodyTextInputStyle: {
    width: "84%",
    height: "30%",
    fontSize: 20,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white"
  },
  modalButtons: {
    width:"40%",
    height:"8%",
    backgroundColor:"#53b9fc",
    borderColor:"black",
    borderWidth:2,
    borderRadius:10,
    marginTop:"3%",
    alignItems:"center"
  }
})



/**
 *  ===============================================================================================
 *  ===============================================================================================
 *  ===============================================================================================
 */

/**
 *   THE ACTUAL HOMESCREEN
 */
const ActualHomeScreen = ({ navigation }) => {

  /**
   *  THE DATA CODE
   */
  // the array useState([]) which will hold the fetched data
  let [postsArr, setPostsArr] = useState([]);

  // the fetch call which will get the posts data to render all posts
  fetch("http://192.168.42.232/posts")
  .then(res => res.json())
  .then(data => removeCurrentUsersPostsFromHPF(data))
  .catch(() => null)

  // the function which will set the homescreen posts to all posts
  // except of the current users own posts
  const removeCurrentUsersPostsFromHPF = (postData) => {
    setPostsArr(postData.filter(post => {
      // if the posts author isnt the current user 
      // then we will display the post
      if (post.author != CURUSER.username) {
        return post;
        // otherwise we will return null;
      } else {
        null;
      }
    }))
  }
  

  return (
    <View style={AHS_Style.mainScreen}>
      <Text style={{fontSize:30, marginVertical:5}}>Explore posts by others!</Text>
      {/* CREATING THE SCROLLVIEW THAT WILL HOLD ALL THE POSTS LATER */}
      <View style={AHS_Style.ALLPOSTSSCRLVIEWHOLDERVIEW}>
        <ScrollView>
          {/* THIS IS WHERE ALL THE POSTS ARE BEING DISPLAYED */}
          {/* (ALL, NO MATTER POSTED BY WHO, WITH SERVER ROW) */}
          {postsArr.map(post => {
            return <HomePagePosts author={post.author} title={post.title}
                                  body={post.body} createdOnTime={post.createdOnTime} key={post._id}/>}).reverse()}
          <View style={{width:"100%",height:50,backgroundColor:"gray",marginTop:150,borderRadius:11}}>
            
          </View>
        </ScrollView>
      </View>
      {/* THE FOOTER OF THE APP */}
      {/* TO BE COPIES TO THE OTHER PAGES TOO */}
      <View style={{
        backgroundColor:"white",width:"100%",height:"8%",borderColor:"black",borderTopWidth:3,
        flexDirection:"row",justifyContent:"space-evenly"}}>
        <TouchableOpacity onPress={() => {
          setPostsArr([]);
          navigation.navigate("Log Out")
          }} activeOpacity={0.6} style={UPPStyle.FOOTERBUTTONSTYLES}>
          <View style={{flex:1}}>
            <Text style={{fontSize:20}}>HomeScreen</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setPostsArr([]);
          navigation.navigate("SearchedUser")
          }} activeOpacity={0.6} style={UPPStyle.FOOTERBUTTONSTYLES}>
          <View style={{flex:1}}>
            <Text style={{fontSize:18}}>Searched User</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setPostsArr([]);
          navigation.navigate("Personal Page")
          }} activeOpacity={0.6} style={UPPStyle.FOOTERBUTTONSTYLES}>
          <View style={{flex:1}}>
            <Text style={{fontSize:20}}>Your Page</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const AHS_Style = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: colors.mainBGLightBlueColor,
    alignItems: "center"
  },
  SBandSearchButtonHolderStyle: {
    flexDirection: "row",
    marginTop: "4%",
    width: "100%",
    height: "7%"
  },
  UserSearchBar: {
    width: "70%",
    marginRight: "3%",
    backgroundColor: "white",
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    fontSize: 20,
    marginLeft: "4%"
  },
  ALLPOSTSSCRLVIEWHOLDERVIEW: {
    width: "94%",
    height: "81%",
    backgroundColor: "gray",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    marginTop: "1%"
  }
})



/**
 *  ===============================================================================================
 *  ===============================================================================================
 *  ===============================================================================================
 */

/**
 *  SEARCHED USER PAGE

 */
const SearchedUserPage = ({ navigation }) => {
  /**
   *  SEARCH PAGE RELATED CODE
   */
  // the state holder for viewing the modal or not
  // setting it as false by default
  let [viewModal, setViewModal] = useState(false)
  

  /**
   *  VIEWING THE SEARCHED USERS USN AND BIO
   */
  let [SUPUSN, setSUPUSN] = useState("");
  let [SUPBIO, setSUPBIO] = useState("");
  
  
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
    .catch(err => {
      Alert.alert("Login Error:", `User with the username of [${searchedUSN}] doesn't exist.`)
      // closing
      setViewModal(false);
    })
  }

  // the user search function that will be only calledd if there is no error
  // this is also the function which will set the searched user to a global variable
  // and call the SearchedUserPage
  const SearchUserFActual = (searchedUserData) => {
    // setting the value of the searchedUserData to the
    // global searched user variable (aka: )
    GLOBALSEARCHEDUSER = searchedUserData;
    // console.log(GLOBALSEARCHEDUSER.username);

    
    // setting the user usn and bio directly
    setSUPUSN(GLOBALSEARCHEDUSER.username);
    setSUPBIO(GLOBALSEARCHEDUSER.bio);


    // opening the modal
    setViewModal(true);

    // clearing the text entry
    setUserSearchText("")
  }



  /**
   *  VIEWING THE USERS POSTS RELATED CODE
   */
  // setting a useState([]) for holding the posts of the searched user
  let [searchedUserPosts, setSearchedUserPosts] = useState([]);
  // the function for filtering the posts and displaying the 
  // posts of the searched user only
  const FilterPostsAndSearchedUserOnlyFunc = (postsData) => {
    setSearchedUserPosts(postsData.filter(post => {
      if (post.author == GLOBALSEARCHEDUSER.username) {
        // if the posts author is the searched user 
        // we will display the post
        return post;
      } else {
        // otherwise, we wont
        null;
      }
    }))
  }
    
  // the fetch call which will get all the pots so we can filter them later
  fetch(`http://192.168.42.232/posts`)
  .then(res => res.json())
  .then(data => FilterPostsAndSearchedUserOnlyFunc(data))
  .catch(() => null)



  return (
    <View style={SearchUP_Styles.mainScreen}>
      {/* THE USER SEARCH BAR AND ITS VIEW */}
      <View style={UPPStyle.SBandSearchButtonHolderStyle}>
        <TextInput value={userSearchText} onChangeText={userSearchTXTinputHandler} placeholder="Search Users" style={UPPStyle.UserSearchBar} title="Search Users"/>
        <Button onPress={() => SearchUser()} title="Search"/>
      </View>




      {/* THE SEARCHED USER MODAL WILL BE HERE */}
      <Modal animationType="slide" visible={viewModal}>
        <View style={{width:"100%",height:"100%",backgroundColor:"gray"}}>
          {/* THE USER SEARCH BAR AND ITS VIEW */}
            <View style={UPPStyle.SBandSearchButtonHolderStyle}>
              <TextInput value={userSearchText} onChangeText={userSearchTXTinputHandler} placeholder="Search Users" style={UPPStyle.UserSearchBar} title="Search Users"/>
              <Button onPress={() => SearchUser()} title="Search"/>
            </View>
            
            
            {/* THE ACTUAL DESIGN HERE */}
            <View style={{width:"100%",height:"83%",backgroundColor:"white"}}>
        <ScrollView style={{flex:1, backgroundColor:"gray"}}>
          <View style={UPPStyle.UserDataHolderViewAKAbioETC}>
            {/* THE BLACK USER DATA (USN & BIO) LOCATION */}
            <View style={{width:"100%",minHeight:100,maxHeight:300,marginTop:"1%",alignItems:"center",marginBottom:"12%"}}>
              <Image style={{width:100,height:100,marginTop:"3%"}} source={require("./data/ProfilePicPlaceHolder.bmp")}/>
              <Text style={{color:"white",fontSize:25}}>{SUPUSN}</Text>
            </View>
            <Text style={{color:"white",fontSize: 14, marginLeft:"5%"}}>{SUPBIO}</Text>
          </View>
          <View style={{alignItems:"center",width:"100%",height:40,marginVertical:3}}>
            <Text style={{color:"white",fontSize:20}}>POSTS:</Text>
            <View style={{width:"100%",borderColor:"white",borderTopWidth:3}}></View>
          </View>

          {/* THIS IS WHERE THE CODE WILL BE FOR RENERING ALL THE POSTS BY THE USER */}
          <View>
            <ScrollView style={{flex:1}}>
              {/* THE FUNCTION FOR GETTING ALL THE DATA*/}
              {searchedUserPosts.map(post => {
                return <HomePagePosts author={post.author} title={post.title}
                      body={post.body} createdOnTime={post.createdOnTime} key={post._id}/>}).reverse()}
              {/* THE BOTTOM FILLER FOR THE SCROLL VIEW */}
              <View style={{width:"100%",height:50,backgroundColor:"gray",marginTop:150,borderRadius:11}}></View>
            </ScrollView>
          </View>

        </ScrollView>
      </View>
      <View style={{
              backgroundColor:"white",width:"100%",height:"8%",borderColor:"black",borderTopWidth:3,
              flexDirection:"row",justifyContent:"space-evenly"}}>
              <TouchableOpacity onPress={() => {
                setSUPUSN("");
                setSUPBIO("");
                setSearchedUserPosts([]);
                setViewModal(false);
                navigation.navigate("Log Out")
              }} activeOpacity={0.6} style={UPPStyle.FOOTERBUTTONSTYLES}>
                <View style={{flex:1}}>
                  <Text style={{fontSize:20}}>HomeScreen</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setSUPUSN("");
                setSUPBIO("");
                setSearchedUserPosts([]);
                setViewModal(false);
                navigation.navigate("SearchedUser")
                }} activeOpacity={0.6} style={UPPStyle.FOOTERBUTTONSTYLES}>
                <View style={{flex:1}}>
                  <Text style={{fontSize:18}}>Searched User</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setSUPUSN("");
                setSUPBIO("");
                setSearchedUserPosts([]);
                setViewModal(false);
                navigation.navigate("Personal Page")
                }} activeOpacity={0.6} style={UPPStyle.FOOTERBUTTONSTYLES}>
                <View style={{flex:1}}>
                  <Text style={{fontSize:20}}>Your Page</Text>
                </View>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>


      {/* THE FOOTER OF THE APP */}
      {/* TO BE COPIES TO THE OTHER PAGES TOO */}
      <View style={{
        backgroundColor:"white",width:"100%",height:"8%",borderColor:"black",borderTopWidth:3,
        flexDirection:"row",justifyContent:"space-evenly"}}>
        <TouchableOpacity onPress={() => {
          setViewModal(false);
          navigation.navigate("Log Out")
          }} activeOpacity={0.6} style={UPPStyle.FOOTERBUTTONSTYLES}>
          <View style={{flex:1}}>
            <Text style={{fontSize:20}}>HomeScreen</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setViewModal(false);
          navigation.navigate("SearchedUser")
          }} activeOpacity={0.6} style={UPPStyle.FOOTERBUTTONSTYLES}>
          <View style={{flex:1}}>
            <Text style={{fontSize:18}}>Searched User</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setViewModal(false);
          navigation.navigate("Personal Page")
          }} activeOpacity={0.6} style={UPPStyle.FOOTERBUTTONSTYLES}>
          <View style={{flex:1}}>
            <Text style={{fontSize:20}}>Your Page</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const SearchUP_Styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: colors.mainBGLightBlueColor,
    alignItems: "center"
  },
  SearchedUserActual: {
    width: "100%",
    height: "81%",
    backgroundColor: "gray",
    marginTop: "2%",
    borderColor: "black",
    borderWidth: 3,
    alignItems: "center"
  }
})



/**
 *  ===============================================================================================
 *  ===============================================================================================
 *  ===============================================================================================
 */

/**
 * APP
 */

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={LoginPage}>
        <Stack.Screen name="Login" component={LoginPage}/>
        <Stack.Screen name="SignUp" component={SignUpPage}/>
        <Stack.Screen name="Personal Page" component={UserPersonalPage}/>
        <Stack.Screen name="Log Out" component={ActualHomeScreen}/>
        <Stack.Screen name="SearchedUser" component={SearchedUserPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}



 
 