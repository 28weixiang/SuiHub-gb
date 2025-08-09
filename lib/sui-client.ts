import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client"
import { TransactionBlock } from "@mysten/sui.js/transactions"

// Initialize Sui client for testnet
export const suiClient = new SuiClient({
  url: getFullnodeUrl("testnet"),
})

// Package ID will be set after publishing
export const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || ""

// Move module names
export const MODULES = {
  GIG_LISTING: `${PACKAGE_ID}::gig_listing`,
  ESCROW: `${PACKAGE_ID}::escrow`,
  NFT_BADGE: `${PACKAGE_ID}::nft_badge`,
} as const

// Helper function to create a gig
export async function createGig(
  title: string,
  description: string,
  budget: number,
  category: string,
  skillsRequired: string[],
  deadline: number,
  signer: any, // Wallet signer
) {
  const tx = new TransactionBlock()

  tx.moveCall({
    target: `${MODULES.GIG_LISTING}::create_gig`,
    arguments: [
      tx.pure(title),
      tx.pure(description),
      tx.pure(budget),
      tx.pure(category),
      tx.pure(skillsRequired),
      tx.pure(deadline),
    ],
  })

  return await signer.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    options: {
      showEffects: true,
      showObjectChanges: true,
    },
  })
}

// Helper function to create escrow
export async function createEscrow(
  worker: string,
  gigTitle: string,
  paymentAmount: number,
  milestones: string[],
  milestoneAmounts: number[],
  milestoneDates: number[],
  signer: any,
) {
  const tx = new TransactionBlock()

  // Split coins for payment
  const [coin] = tx.splitCoins(tx.gas, [tx.pure(paymentAmount)])

  tx.moveCall({
    target: `${MODULES.ESCROW}::create_escrow`,
    arguments: [
      tx.pure(worker),
      tx.pure(gigTitle),
      coin,
      tx.pure(milestones),
      tx.pure(milestoneAmounts),
      tx.pure(milestoneDates),
    ],
  })

  return await signer.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    options: {
      showEffects: true,
      showObjectChanges: true,
    },
  })
}

// Helper function to mint NFT badge
export async function mintBadge(
  eventName: string,
  attendee: string,
  eventDate: number,
  badgeType: string,
  rarity: number,
  imageUrl: string,
  traitTypes: string[],
  traitValues: string[],
  signer: any,
) {
  const tx = new TransactionBlock()

  tx.moveCall({
    target: `${MODULES.NFT_BADGE}::mint_badge`,
    arguments: [
      tx.pure(eventName),
      tx.pure(attendee),
      tx.pure(eventDate),
      tx.pure(badgeType),
      tx.pure(rarity),
      tx.pure(Array.from(new TextEncoder().encode(imageUrl))),
      tx.pure(traitTypes),
      tx.pure(traitValues),
    ],
  })

  return await signer.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    options: {
      showEffects: true,
      showObjectChanges: true,
    },
  })
}

// Helper function to get user's objects
export async function getUserObjects(address: string) {
  return await suiClient.getOwnedObjects({
    owner: address,
    filter: {
      StructType: `${PACKAGE_ID}::gig_listing::Gig`,
    },
    options: {
      showContent: true,
      showType: true,
    },
  })
}
