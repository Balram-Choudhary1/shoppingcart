
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native' // For navigation

const LoginScreen = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [passwordIsVisible, setPasswordIsVisible] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const navigation = useNavigation();

   const handleLogin = async () => {
      if (!email || !password) {
         setError("Please enter both email and password");
         return;
      }

      setLoading(true);
      setError(null);

      try {
         const response = await axios.post('https://reqres.in/api/login', {
            email,
            password
         });

         // If login is successful, navigate to the home page
         if (response.data.token) {
            navigation.navigate('Home'); // Make sure 'Home' is your screen name in the navigation stack
         }
      } catch (err) {
         setError("Login failed. Please check your credentials.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
         }}>
            <View style={styles.content}>

               <Text style={styles.title}>
                  Login
               </Text>

               {error && <Text style={styles.errorText}>{error}</Text>}

               <View style={styles.inputcontainer}>
                  <View style={styles.icon}>
                     <Entypo name="mail" size={22} color="#7C808D" />
                  </View>
                  <TextInput
                     style={styles.input}
                     placeholder='Email ID'
                     placeholderTextColor="#7C808D"
                     selectionColor="#3662AA"
                     color="black"
                     onChangeText={setEmail}
                     value={email}
                  />
               </View>

               <View style={styles.inputcontainer}>
                  <View style={styles.icon}>
                     <Entypo name="lock" size={22} color="#7C808D" />
                  </View>
                  <TextInput
                     style={styles.input}
                     placeholder='Password'
                     secureTextEntry={passwordIsVisible}
                     placeholderTextColor="#7C808D"
                     selectionColor="#3662AA"
                     color="black"
                     onChangeText={setPassword}
                     value={password}
                  />
                  <TouchableOpacity style={styles.passwordVisible}
                     onPress={() => setPasswordIsVisible(!passwordIsVisible)}
                  >
                     <Entypo name={passwordIsVisible ? "eye" : "eye-with-line"}
                        size={22}
                        color="#7C808D" />
                  </TouchableOpacity>
               </View>

               <TouchableOpacity style={styles.forgotPasswordButton}>
                  <Text style={styles.forgotPasswordText}>Forget password</Text>
               </TouchableOpacity>

               {/* login button */}
               <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                  <Text style={styles.loginButtonText}>{loading ? "Logging in..." : "Login"}</Text>
               </TouchableOpacity>

               <View style={styles.orContainer}>
                  <View style={styles.orLine} />
                  <Text style={styles.orText}>Or</Text>
                  <View style={styles.orLine} />
               </View>

               <TouchableOpacity style={styles.googleButton}>
                  <Image style={styles.googleLogo} source={require("../assets/google.png")} />
                  <Text style={styles.googleButtonText}>Login with Google</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.registerButton}>
                  <Text style={styles.registerButtonText}>Don't have an account yet? <Text style={styles.registerButtonTextHighlight}>Register now!</Text></Text>
               </TouchableOpacity>

            </View>
         </ScrollView>
      </SafeAreaView>
   )
}

export default LoginScreen

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   content: {
      paddingHorizontal: 30
   },
   title: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 40
   },
   inputcontainer: {
      flexDirection: 'row',
      width: "100%",
      alignItems: "center",
      justifyContent: 'center',
      marginBottom: 20,
      position: "relative"
   },
   icon: {
      marginRight: 15
   },
   input: {
      borderBottomWidth: 1.5,
      flex: 1,
      paddingBottom: 10,
      borderBottomColor: '#eee',
   },
   passwordVisible: {
      position: 'absolute',
      right: 0
   },
   forgotPasswordButton: {
      alignSelf: 'flex-end'
   },
   forgotPasswordText: {
      color: "#3662AA",
      fontSize: 16,
      fontWeight: "500"
   },
   loginButton: {
      backgroundColor: "#3662AA",
      padding: 14,
      borderRadius: 10,
      marginTop: 20
   },
   loginButtonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: 'bold',
      fontSize: 16
   },
   errorText: {
      color: 'red',
      fontSize: 14,
      marginBottom: 10,
   },
   orContainer: {
      flexDirection: "row",
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20
   },
   orLine: {
      height: 1,
      backgroundColor: "black",
      flex: 1
   },
   orText: {
      color: "#7C808D",
      marginRight: 10,
      marginLeft: 10,
      fontSize: 14
   },
   googleButton: {
      backgroundColor: '#e6e5e3',
      padding: 14,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "center",
      position: 'relative'
   },
   googleButtonText: {
      color: '#4E5867',
      fontSize: 16,
      fontWeight: "500",
      textAlign: 'center'
   },
   googleLogo: {
      width: 20.03,
      height: 20.44,
      position: 'absolute',
      left: 14
   },
   registerButton: {
      alignSelf: 'center',
      marginTop: 40
   },
   registerButtonText: {
      fontSize: 16,
      color: "#7C808D"
   },
   registerButtonTextHighlight: {
      fontSize: 16,
      color: "#3662AA",
      fontWeight: "500"
   }
})




