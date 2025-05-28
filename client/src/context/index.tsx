import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useContractWrite,
  useMetamask,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext(null);

export const StateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { contract } = useContract(
    "0xbB8821Cb6E0D17a5Da1Db758c1cfdE9748C32c6d",
    "custom",
    { chainId: 11155111 } // Sepolia's chainId
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  //Create campaign
  const publishCampaign = async (form) => {
    try {
      const data = await contract.call("createCampaign", [
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  //get Campaign
  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");
    console.log(campaigns);
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
