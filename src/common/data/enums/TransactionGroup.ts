/**
 * Determines whether or not a sub-account is a compatible destination
 * for re-mapping another sub-account's transactions.
 */
enum TransactionGroup {
  SINGLE_SIG_PUBLIC = 'SINGLE_SIG_PUBLIC',
  SINGLE_SIG_PRIVATE = 'SINGLE_SIG_PRIVATE',
  MULTI_SIG_PUBLIC = 'MULTI_SIG_PUBLIC',
  MULTI_SIG_PRIVATE = 'MULTI_SIG_PRIVATE',
  TESTNET = 'TESTNET',
}

export default TransactionGroup
