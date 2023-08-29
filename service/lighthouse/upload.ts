
import axios from 'axios';
import { getLighthouseKeys } from '.';

export async function uploadFile(address: any | undefined, formResult: any, data: any): Promise<string> {
  if (!address) throw new Error("Address is undefined");
  
  const { JWT, apiKey } = await getLighthouseKeys(address);
  if (!JWT || !apiKey) throw new Error("Failed to get Lighthouse keys");

  let json = JSON.stringify(formResult);
  
   console.log(address)
   console.log(formResult);

  const formData = {
    json: json,
    address: address,
    apiKey: apiKey,
  };

  const config = {
    headers: {
      Authorization: `${JWT}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const url = "https://api.dataponte.com";
    const response = await axios.post(
      `${url}/files/uploadJSON`,
      formData,
      config
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.error("Something went wrong when uploading the file");
    throw err;
  }
}

export async function uploadSource(address: any | undefined, formResult: any, name: any, source:any): Promise<string> {
  if (!address) throw new Error("Address is undefined");
  
  const { JWT, apiKey } = await getLighthouseKeys(address);
  if (!JWT || !apiKey) throw new Error("Failed to get Lighthouse keys");

  let json = JSON.stringify(formResult);
  
   console.log(address)
   console.log(formResult);

  const formData = {
    json: json,
    address: address,
    apiKey: apiKey,
    name: name,
    source: source
  };

  const config = {
    headers: {
      Authorization: `${JWT}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const url = "https://api.dataponte.com";
    const response = await axios.post(
      `${url}/files/uploadSource`,
      formData,
      config
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.error("Something went wrong when uploading the file");
    throw err;
  }
}