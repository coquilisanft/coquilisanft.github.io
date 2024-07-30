"use client";

import { NFTCard } from "@/components/NFTCard";
import styles from "@/styles/Home.module.css";
import {
  useAddress,
  useContract,
  useNFTBalance,
  useOwnedNFTs,
} from "@thirdweb-dev/react";

export default function Home() {
  const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!;
  const { data: contract } = useContract(NFT_CONTRACT_ADDRESS);
  const address = useAddress();
  const { data: nfts, isLoading } = useOwnedNFTs(contract, address);
  const { data: nftBalance } = useNFTBalance(contract, address);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <h1>Loading your assets...</h1>
        <div className={styles.loader}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Assets</h1>
      <h2>
        TOTAL ITEMS: <span>{nftBalance?.toNumber()}</span>
      </h2>

      {!address && <h1>Connect your wallet</h1>}
      {address && isLoading && <h1>Loading...</h1>}
      {address && !isLoading && !nfts?.length && <h1>You have no NFTs :(</h1>}
      <div className={styles.nfts}>
        {nfts?.map((nft) => (
          <NFTCard metadata={nft.metadata} key={nft.metadata.id} />
        ))}
      </div>
    </div>
  );
}
