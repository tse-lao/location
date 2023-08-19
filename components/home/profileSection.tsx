import { BlurView } from 'expo-blur';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../app/context/auth';

const url = "https://images.unsplash.com/photo-1580907826414-5345a5aa68ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2748&q=80";

const ProfileSection = () => {
    const {user} = useAuth() as any;
    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: url }} style={styles.image}>
                <BlurView style={styles.absolute} intensity={10}>
                    <View style={styles.content}>
                        <Text style={styles.greeting}>Good Morning, </Text>
                        <Text style={styles.address}>{user.address}</Text>
                    </View>
                </BlurView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    content: {
        flex: 1,
        marginTop: 50,
        marginHorizontal: 20,
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    greeting: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20, // Adjusted to equivalent of text-xl in TailwindCSS
    },
    address: {
        color: 'white',
        fontWeight: '600', // semi-bold in TailwindCSS is roughly equivalent to fontWeight 600
        maxWidth: 200
    }
});

export default ProfileSection;
