import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PersonalPagePosts = ({author, title, body, createdOnTime}) => {
    return (
        <View style={HPP_Styles.PostOutsideStyle}>
            <Text style={{fontSize:10, }}>
                <Text style={{color:"blue",fontSize:20}}>{author}:</Text>
            </Text>
            <View style={HPP_Styles.bodyStyle}>
                <View style={{width:"100%",minHeight:30,maxHeight:60,marginBottom:5,borderColor:"black",
                              borderBottomWidth:1}}>
                    <Text style={{fontSize:20,marginLeft:"5%"}}>{title}</Text>
                </View>
                <Text style={{marginLeft:"1%",marginTop:3,fontSize:16}}>{body}</Text>
            </View>
        </View>
    )
}

const HPP_Styles = StyleSheet.create({
    PostOutsideStyle: {
        width: "92%",
        marginHorizontal: "4%",
        marginTop: 12,
        minHeight: 200,
        maxHeight: 10000,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "lightgray",
        alignItems:"center"
    },
    bodyStyle: {
        width: "90%",
        marginHorizontal: "5%",
        minHeight:150,
        maxHeight: 330,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "black",
        alignItems: "center",
        backgroundColor: "white",
        marginBottom:10
    }
})

export default PersonalPagePosts;