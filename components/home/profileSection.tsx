import { ethers } from 'ethers';
import { BlurView } from 'expo-blur';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../app/context/auth';
import profileAbi from '../../assets/abi/profile.json';
const url = "https://images.unsplash.com/photo-1580907826414-5345a5aa68ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2748&q=80";

const ProfileSection = () => {
    const {user} = useAuth() as any;
    const [profileName, setProfileName] = useState("");

    
    useEffect(() => {
        console.log(user);
        if(user){
            //we want to get the latest profile of the user 
           getProfile();
            
        }
    }
    , [user]);
    
    const getProfile = async () => {
        const provider = new ethers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/b382bdce42b544aeafc6fee8c036510f");
            
        const CONTRACT = process.env.PROFILE_CONTRACT || "0xeEc3516A2B806a79666a7903861eD5975c1738E0";
        const myContract = new ethers.Contract(CONTRACT, profileAbi, provider);
        const profile = await myContract.getProfile(user.address);
        if(profile[0] == ""){
            //no profile found
            setProfileName(user.address);
            return;
        }
        
        setProfileName(profile[0]);
    };
    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: url }} style={styles.image}>
                <BlurView style={styles.absolute} intensity={10}>
                    <View style={styles.content}>
                        <Text style={styles.address}>Good Morning, </Text>
                        <Text style={styles.greeting}>{profileName}</Text>
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
        marginTop: 80,
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
