//here we will generate the api key and jwt token, so we can use it directly. we need to store them in such a way that we can access them from the frontend
// and pass them on to the backend for encryption. 
import { getJWT } from '@lighthouse-web3/kavach';
import lighthouse from '@lighthouse-web3/sdk';
import { getAccountPhrase } from '@rly-network/mobile-sdk';
import * as SecureStore from 'expo-secure-store';


import axios from 'axios';
import { Wallet } from 'ethers';

async function signAuthMessage() {
    //get account 
    //@ts-ignore
    const mnemonic = await getAccountPhrase() as any;
    const wallet = Wallet.fromPhrase(mnemonic) as any;
    const signer = wallet.connect()
    
    console.log(signer);

    const message = await lighthouse.getAuthMessage(signer.address);
    
    //@ts-ignore
    //const signedMessage = await signMessage({message: message.data.message});
    
    console.log("message to sign: " + message.data.message)
    const signedMessage = await signer.signMessage(message.data.message);
    return {signedMessage, address: signer.address};
}


export async function generateApiKey() {
    //const { signedMessage, address } = await signAuthMessage();
    const mnemonic = await getAccountPhrase() as any;
    const wallet = Wallet.fromPhrase(mnemonic) as any;
    const verificationMessage = (
        await axios.get(
            `https://api.lighthouse.storage/api/auth/get_message?publicKey=${wallet.address}`
        )
    ).data;

   



   // const message = await lighthouse.getAuthMessage(signer.address);
    
    //@ts-ignore
    //const signedMessage = await signMessage({message: message.data.message});
    
    //console.log("message to sign: " + message.data.message)
    const signedMessage = await wallet.signMessage(verificationMessage);
    console.log(verificationMessage);


    //@ts-ignore
    //const signedVerificationMessage = await signMessage({ message: verificationMessage });
    
    //console.log(signedVerificationMessage); 
    

    const response = await lighthouse.getApiKey(wallet.address, signedMessage);
    
    console.log(response);

    
    if (response.data.apiKey) {
        await SecureStore.setItemAsync(`lighthouse-api-key-${wallet.address}`, response.data.apiKey);
        console.log("added the apiKey")
        return response.data.apiKey;
    }
    console.log(response);
    return response;
}

export async function generateJWT() {
    const { signedMessage, address } = await signAuthMessage();
    const response = await getJWT(address, signedMessage);
    if (response.JWT) {
        await SecureStore.setItemAsync(`lighthouse-jwt-${address}`, response.JWT);
        return response;
    }

    if (response.error) {
        throw Error('JWT generation failed:');
    }
}

export async function getLighthouseKeys(address: any) {
    // first check if there is a jwt token
    if (!(await SecureStore.getItemAsync(`lighthouse-jwt-${address}`))) {
        await generateJWT();
    }

    if (!(await SecureStore.getItemAsync(`lighthouse-api-key-${address}`))) {
        await generateApiKey();
    }
    
    console.log("got all the keys");

    return {
        JWT: await SecureStore.getItemAsync(`lighthouse-jwt-${address}`),
        apiKey: await SecureStore.getItemAsync(`lighthouse-api-key-${address}`),
    };
}