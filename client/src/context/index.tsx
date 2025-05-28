import React, { useContext, createContext } from "react";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext(null);

export const StateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { contract } = useContract(
    "0xbB8821Cb6E0D17a5Da1Db758c1cfdE9748C32c6d"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();

  const publishCampaign = async (form: any) => {
    try {
      const data = await createCampaign([
        address, // owner
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(), // deadline
        form.image,
      ]);

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  return (
    <StateContext.Provider
      value={{ address, contract, createCampaign: publishCampaign }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
