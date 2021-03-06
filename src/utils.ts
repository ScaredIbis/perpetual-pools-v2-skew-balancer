import { ethers } from 'ethers';

export const MAX_SOL_UINT = ethers.BigNumber.from('340282366920938463463374607431768211455');

export const poolSwapLibraryAddresses: Record<string, string> = {
  421611: '0x8e761005bAFB81CEde15366158B1F769a411dDfc'
};

// used for encoding commits args
const encodedBits = 128 + 8 * 3;
const encodedBytes = encodedBits / 8;
const encodedHexCharacters = encodedBytes * 2;
const hexChars32Bytes = 64;
const paddingRequired = hexChars32Bytes - encodedHexCharacters;

export const COMMIT_TYPES = {
  ShortMint: 0,
  ShortBurn: 1,
  LongMint: 2,
  LongBurn: 3,
  LongBurnShortMint: 4,
  ShortBurnLongMint: 5
} as const;

export type CommitTypeKeys = keyof typeof COMMIT_TYPES;

export type CommitTypeValues = typeof COMMIT_TYPES[CommitTypeKeys]

export const encodeCommitArgs = ({
  commitType,
  amount,
  fromAggregateBalance,
  payForClaim
}: {
  commitType: CommitTypeValues,
  amount: string,
  fromAggregateBalance: boolean,
  payForClaim: boolean
}) => {
  const beforePadding = ethers.utils.solidityPack(
    ['bool', 'bool', 'uint8', 'uint128'],
    [payForClaim, fromAggregateBalance, commitType, amount]
  );

  return `0x${'0'.repeat(paddingRequired)}${beforePadding.slice(2)}`;
};
