import { RlyMumbaiNetwork, getAccountPhrase } from "@rly-network/mobile-sdk";
import { Contract, Wallet, ethers, toBeHex } from "ethers";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import profileAbi from "../../assets/abi/profile.json";
import { useAuth } from "../context/auth";

export default function ProfileSettings() {
  const [username, setUsername] = useState("");
  const [interest, setInterest] = useState("");
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [useRelayer, setUseRelayer] = useState(false);
  const { user } = useAuth() as any;
  const providerUrl = `https://polygon-mumbai.infura.io/v3/b382bdce42b544aeafc6fee8c036510f`;
  const provider = new ethers.JsonRpcProvider(providerUrl);

  //lets implement the logic for updating the user profile data

  useEffect(() => {
    if (user) {
      const address = user.address;
      //we now want to validate that the user has a profile
      //if not, we want to create a profile for the user
      setUsername(user.address);
      retrieveProfile(address);
    }
  }, [user]);

  const retrieveProfile = async (address: string) => {
    console.log("provider fiund");
    const CONTRACT =
      process.env.PROFILE_CONTRACT ||
      "0xeEc3516A2B806a79666a7903861eD5975c1738E0";
    //checking
    console.log(CONTRACT);

    const myContract = new Contract(CONTRACT, profileAbi, provider);

    //call the functions to get the profile of this user
    const profile = await myContract.getProfile(address);

    if (profile[0] == "") {
      console.log("no profile found");
      return;
    } else {
      console.log("profile found");
      setUsername(profile[0]);
      //check if we can use relayer
      const lastTimestamp = await myContract.lastUpdatedTimestamp(user.address);
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (lastTimestamp + 86300 > currentTimestamp) {
        //we can update the profile directly
        //username, additional information, ipfs hash
        setUseRelayer(false);
      }
    }
    console.log(profile);
  };

  //TODO: implement the logic for updating the user profile data
  const updateProfile = async () => {
    console.log("updating profile");
    console.log();
    setLoading(true);

    //now we want to set the profile page and data but encrypted in the right way.
    const formData = {
      username: username,
      interest: interest,
      age: age,
      income: income,
      city: city,
    };
    //const hash = await uploadFile(user.address, formData, "profile-update");
const hash = "QmQiqhdyimn1uAuNqvrByJ9PTgvaCr31U5LpbNSsVHeoZM";
    console.log(hash); //returns the ipfs hash of the file

    //now we want to update the profile contract with the ipfs hash of the file
    //@ts-ignore
    const mnemonic = (await getAccountPhrase()) as any;

    const wallet = Wallet.fromPhrase(mnemonic) as any;
    const signer = wallet.connect(provider);
    const CONTRACT =
      process.env.PROFILE_CONTRACT ||
      "0xeEc3516A2B806a79666a7903861eD5975c1738E0";
    const myContract = new Contract(CONTRACT, profileAbi, signer);

    //we can go two ways either to directly do it ourselves or use the relayer. Depending on the status of the user we decide hat to do.
    if (useRelayer) {
      //here we use the logic for the relayer.

      const tx =
        await myContract.registerOrUpdateProfileViaRelayer.populateTransaction(
          username,
          "",
          hash
        );

      console.log(tx);

      //@ts-ignore
      const gas =
        await myContract.registerOrUpdateProfileViaRelayer.estimateGas(
          username,
          "",
          hash
        );

      //lets do this without a provider and register it straight up the network.

      console.log(gas);
      // get current network fee data
      const { maxFeePerGas, maxPriorityFeePerGas } =
        await provider.getFeeData();

      console.log(maxFeePerGas);
      console.log(maxPriorityFeePerGas);
      console.log(gas);

      console.log("fee data found");

      //create relay tx object

      //singer

      const gsnTx = {
        from: signer.address,
        data: tx.data,
        to: tx.to,
        gas: toBeHex(gas),
        //@ts-ignore
        maxFeePerGas: toBeHex(maxFeePerGas),
        //@ts-ignore
        maxPriorityFeePerGas: toBeHex(maxPriorityFeePerGas),
      } as any;

      console.log(gsnTx);

      try {
        //@ts-ignore
        const rlyNetwork: any = RlyMumbaiNetwork;

        rlyNetwork.setApiKey(
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjEwMX0.h1avIemeKU-1Xbjp7nkdhF1-59C6jY4Im3GBiQa6OP0F3v3j-8fVQI2Fbu703H5mSYX52sGCAg8VcpCfjY5zLg"
        );
        //@ts-ignore
        await rlyNetwork.relay(gsnTx);
      } catch (e) {
        console.log(e);
      }
    } else {
        const result = await myContract.registerOrUpdateProfile(username, "", hash);
        console.log(result);
    }
    
    setLoading(false);

    //based on the assumption
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        marginVertical: 24,
        padding: 24,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 32,
          alignItems: "center",
        }}
      >
        <IconButton icon="backburger" size={20} onPress={() => router.back()} />
        <Text>Profile Settings</Text>
      </View>
      <TextInput
        label="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        label="Interest"
        value={interest}
        onChangeText={(text) => setInterest(text)}
      />
      <TextInput
        label="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
      />
      <TextInput
        label="Income"
        value={income}
        onChangeText={(text) => setIncome(text)}
      />
      <TextInput
        label="City"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Button
        icon="refresh"
        mode="contained"
        onPress={updateProfile}
        disabled={loading}
      >
        {loading ? "loading.." : "Update Data Profile"}
      </Button>
      <Text>
        {useRelayer ? "Using relayer" : "Directly updating the contract"}
      </Text>
    </SafeAreaView>
  );
}
