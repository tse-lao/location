import { RlyMumbaiNetwork, createAccount, getAccount, getAccountPhrase } from '@rly-network/mobile-sdk';
import { Wallet } from 'ethers';
import { useRootNavigation, useRouter, useSegments } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
const rlyNetwork = RlyMumbaiNetwork;
rlyNetwork.setApiKey("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjEwMX0.h1avIemeKU-1Xbjp7nkdhF1-59C6jY4Im3GBiQa6OP0F3v3j-8fVQI2Fbu703H5mSYX52sGCAg8VcpCfjY5zLg")
const AuthContext = React.createContext(null);
// This hook can be used to access the user info.
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return authContext;
};

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user:any) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/(auth)/create');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/');
    }
  }, [user, segments]);
}
interface ProviderProps {
  children: React.ReactNode;
}

interface User {  
  address: string;
  balance: number;
  wallet:any;
  
}

export function Provider(props: ProviderProps) {
  const [user, setAuth] = React.useState<User | null>();
  const [authInitialized, setAuthInitialized] = React.useState(false);
  const router= useRouter();

  const useProtectedRoute = (user: User | null) => {
    const segments = useSegments();
    const router = useRouter();


    // checking that navigation is all good;
    const [isNavigationReady, setNavigationReady] = useState(false);
    const rootNavigation = useRootNavigation();

    useEffect(() => {
      const unsubscribe = rootNavigation?.addListener("state", (event) => {
        setNavigationReady(true);
      });
      return function cleanup() {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [rootNavigation]);

    React.useEffect(() => {
      if (!isNavigationReady) {
        return;
      }

      const inAuthGroup = segments[0] === "(auth)";

      if (!authInitialized) return;

      if (
        // If the user is not signed in and the initial segment is not anything in the auth group.
        !user &&
        !inAuthGroup
      ) {
        // Redirect to the sign-in page.
        router.push("/(auth)/create");
      } else if (user && inAuthGroup) {
        // Redirect away from the sign-in page.
        router.push("/");
      }
    }, [user, segments, authInitialized, isNavigationReady]);
  };
  
  useEffect(() => {
    (async () => {
      try {
        retrieveAccount();
      } catch (error) {
        console.log("error", error);
        setAuth(null);
      }

      setAuthInitialized(true);
      console.log("initialize ", user);
    })();
  }, []);


  
  //get and set the acocounts
  const setupAccount = async () => {
    const account = await createAccount();
    console.log(account);
    await rlyNetwork.claimRly()
    const balance = await rlyNetwork.getBalance() 
    
    const mnemonic = await getAccountPhrase() as any;

const wallet = Wallet.fromPhrase(mnemonic) as any;
    
    //getting the signer 
    setAuth({
      address: account,
      balance: balance, 
      wallet: wallet
    })
  }
  
  const retrieveAccount = async () => {
    const account = await getAccount()
    if(!account){
      //push towards the create account page
      router.replace('/create');
      return;
    };
    console.log(account);
    const balance = await rlyNetwork.getBalance()
    const mnemonic = await getAccountPhrase() as any;

const wallet = Wallet.fromPhrase(mnemonic);
    
    setAuth({
      address: account,
      balance: balance, 
      wallet: wallet
    })
  }
  
  
  const claimTokens = async () => {
    await rlyNetwork.claimRly()
    //const balance = await rlyNetwork.getBalance()
   // setBalance(balance)
  }
  

  return (
    <AuthContext.Provider
      //@ts-ignore
      value={{
        signIn: retrieveAccount,
        signOut: setupAccount,
        user,
        authInitialized,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

