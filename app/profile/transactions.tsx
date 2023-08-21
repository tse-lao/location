
  
  import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { List, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/auth";

export default function ProfileSettings() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const { user } = useAuth() as any;
  const providerUrl = `https://polygon-mumbai.infura.io/v3/b382bdce42b544aeafc6fee8c036510f`;
  const provider = new ethers.JsonRpcProvider(providerUrl);
  

  //lets implement the logic for updating the user profile data

  useEffect(() => {
    const apiKey = "6P7TF747KW8QMPQBTEM44I71ICMTWYVFEY";
    const getTransaction = async () => {
        fetch(`https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${user.address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => setTransactions(data.result))
        .catch(error => console.error('Error fetching data:', error));
      
    }
    if (user) {
      const address = user.address;
      //we now want to validate that the user has a profile
      getTransaction();
      
    }
  }, [user]);



  //TODO: implement the logic for updating the user profile data


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
          flexDirection: "column",
          gap: 24,
          alignItems: "center",
        }}
      >
        <Text>
            
            {loading ? <ActivityIndicator size="large" color="#00ff00" />: "Update Data Profile"}
        </Text>
        {transactions.length > 0 && transactions.map((transaction: any) => (
            <List.Item
            title={transaction.from}
            description={transaction.to}
            left={(props) => <List.Icon {...props} icon="cube-send" />}
            />
        ))}
       
      </View>
    
    </SafeAreaView>
  );
}
