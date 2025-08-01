const abi = [
  {
    inputs: [
      {
        internalType: "contract IMangrove",
        name: "mgv",
        type: "address"
      },
      {
        components: [
          {
            internalType: "address",
            name: "outbound_tkn",
            type: "address"
          },
          {
            internalType: "address",
            name: "inbound_tkn",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tickSpacing",
            type: "uint256"
          }
        ],
        internalType: "struct OLKey",
        name: "olKeyBaseQuote",
        type: "tuple"
      },
      {
        internalType: "uint256",
        name: "gasreq",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IERC20",
        name: "token",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Credit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IERC20",
        name: "token",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Debit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "olKeyHash",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "offerId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "makerData",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "mgvData",
        type: "bytes32"
      }
    ],
    name: "LogIncident",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "olKeyHash",
        type: "bytes32"
      }
    ],
    name: "OfferListKey",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "PopulateEnd",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "PopulateStart",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "RetractEnd",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "RetractStart",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address"
      }
    ],
    name: "SetAdmin",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "SetBaseQuoteTickOffset",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "SetGasprice",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "SetGasreq",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "enum OfferType",
        name: "ba",
        type: "uint8"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "offerId",
        type: "uint256"
      }
    ],
    name: "SetIndexMapping",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "SetLength",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "SetStepSize",
    type: "event"
  },
  {
    inputs: [],
    name: "BASE",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "FUND_OWNER",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MGV",
    outputs: [
      {
        internalType: "contract IMangrove",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "QUOTE",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "ROUTER_IMPLEMENTATION",
    outputs: [
      {
        internalType: "contract AbstractRouter",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "STRICT_PULLING",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "TICK_SPACING",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address"
      }
    ],
    name: "activate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "current",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "baseQuoteTickOffset",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "from",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "to",
        type: "uint256"
      },
      {
        internalType: "Tick",
        name: "baseQuoteTickIndex0",
        type: "int256"
      },
      {
        internalType: "uint256",
        name: "_baseQuoteTickOffset",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "firstAskIndex",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "bidGives",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "askGives",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "pricePoints",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "stepSize",
        type: "uint256"
      }
    ],
    name: "createDistribution",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "index",
                type: "uint256"
              },
              {
                internalType: "Tick",
                name: "tick",
                type: "int256"
              },
              {
                internalType: "uint256",
                name: "gives",
                type: "uint256"
              }
            ],
            internalType: "struct DirectWithBidsAndAsksDistribution.DistributionOffer[]",
            name: "asks",
            type: "tuple[]"
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "index",
                type: "uint256"
              },
              {
                internalType: "Tick",
                name: "tick",
                type: "int256"
              },
              {
                internalType: "uint256",
                name: "gives",
                type: "uint256"
              }
            ],
            internalType: "struct DirectWithBidsAndAsksDistribution.DistributionOffer[]",
            name: "bids",
            type: "tuple[]"
          }
        ],
        internalType: "struct DirectWithBidsAndAsksDistribution.Distribution",
        name: "distribution",
        type: "tuple"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "baseAmount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "quoteAmount",
        type: "uint256"
      }
    ],
    name: "depositFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "enum OfferType",
        name: "ba",
        type: "uint8"
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "getOffer",
    outputs: [
      {
        internalType: "Offer",
        name: "offer",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "enum OfferType",
        name: "ba",
        type: "uint8"
      },
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256"
      }
    ],
    name: "indexOfOfferId",
    outputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "outbound_tkn",
                type: "address"
              },
              {
                internalType: "address",
                name: "inbound_tkn",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "tickSpacing",
                type: "uint256"
              }
            ],
            internalType: "struct OLKey",
            name: "olKey",
            type: "tuple"
          },
          {
            internalType: "uint256",
            name: "offerId",
            type: "uint256"
          },
          {
            internalType: "Offer",
            name: "offer",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "takerWants",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "takerGives",
            type: "uint256"
          },
          {
            internalType: "OfferDetail",
            name: "offerDetail",
            type: "uint256"
          },
          {
            internalType: "Global",
            name: "global",
            type: "uint256"
          },
          {
            internalType: "Local",
            name: "local",
            type: "uint256"
          }
        ],
        internalType: "struct MgvLib.SingleOrder",
        name: "order",
        type: "tuple"
      }
    ],
    name: "makerExecute",
    outputs: [
      {
        internalType: "bytes32",
        name: "ret",
        type: "bytes32"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "outbound_tkn",
                type: "address"
              },
              {
                internalType: "address",
                name: "inbound_tkn",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "tickSpacing",
                type: "uint256"
              }
            ],
            internalType: "struct OLKey",
            name: "olKey",
            type: "tuple"
          },
          {
            internalType: "uint256",
            name: "offerId",
            type: "uint256"
          },
          {
            internalType: "Offer",
            name: "offer",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "takerWants",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "takerGives",
            type: "uint256"
          },
          {
            internalType: "OfferDetail",
            name: "offerDetail",
            type: "uint256"
          },
          {
            internalType: "Global",
            name: "global",
            type: "uint256"
          },
          {
            internalType: "Local",
            name: "local",
            type: "uint256"
          }
        ],
        internalType: "struct MgvLib.SingleOrder",
        name: "order",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "makerData",
            type: "bytes32"
          },
          {
            internalType: "bytes32",
            name: "mgvData",
            type: "bytes32"
          }
        ],
        internalType: "struct MgvLib.OrderResult",
        name: "result",
        type: "tuple"
      }
    ],
    name: "makerPosthook",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "noRouter",
    outputs: [
      {
        components: [
          {
            internalType: "contract AbstractRouter",
            name: "routerImplementation",
            type: "address"
          },
          {
            internalType: "address",
            name: "fundOwner",
            type: "address"
          },
          {
            internalType: "bool",
            name: "strict",
            type: "bool"
          }
        ],
        internalType: "struct Direct.RouterParams",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "enum OfferType",
        name: "ba",
        type: "uint8"
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "offerIdOfIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "enum OfferType",
        name: "ba",
        type: "uint8"
      }
    ],
    name: "offeredVolume",
    outputs: [
      {
        internalType: "uint256",
        name: "volume",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "params",
    outputs: [
      {
        internalType: "uint32",
        name: "gasprice",
        type: "uint32"
      },
      {
        internalType: "uint24",
        name: "gasreq",
        type: "uint24"
      },
      {
        internalType: "uint32",
        name: "stepSize",
        type: "uint32"
      },
      {
        internalType: "uint32",
        name: "pricePoints",
        type: "uint32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "enum OfferType",
        name: "ba",
        type: "uint8"
      }
    ],
    name: "pending",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "index",
                type: "uint256"
              },
              {
                internalType: "Tick",
                name: "tick",
                type: "int256"
              },
              {
                internalType: "uint256",
                name: "gives",
                type: "uint256"
              }
            ],
            internalType: "struct DirectWithBidsAndAsksDistribution.DistributionOffer[]",
            name: "asks",
            type: "tuple[]"
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "index",
                type: "uint256"
              },
              {
                internalType: "Tick",
                name: "tick",
                type: "int256"
              },
              {
                internalType: "uint256",
                name: "gives",
                type: "uint256"
              }
            ],
            internalType: "struct DirectWithBidsAndAsksDistribution.DistributionOffer[]",
            name: "bids",
            type: "tuple[]"
          }
        ],
        internalType: "struct DirectWithBidsAndAsksDistribution.Distribution",
        name: "distribution",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint32",
            name: "gasprice",
            type: "uint32"
          },
          {
            internalType: "uint24",
            name: "gasreq",
            type: "uint24"
          },
          {
            internalType: "uint32",
            name: "stepSize",
            type: "uint32"
          },
          {
            internalType: "uint32",
            name: "pricePoints",
            type: "uint32"
          }
        ],
        internalType: "struct CoreKandel.Params",
        name: "parameters",
        type: "tuple"
      },
      {
        internalType: "uint256",
        name: "baseAmount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "quoteAmount",
        type: "uint256"
      }
    ],
    name: "populate",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "index",
                type: "uint256"
              },
              {
                internalType: "Tick",
                name: "tick",
                type: "int256"
              },
              {
                internalType: "uint256",
                name: "gives",
                type: "uint256"
              }
            ],
            internalType: "struct DirectWithBidsAndAsksDistribution.DistributionOffer[]",
            name: "asks",
            type: "tuple[]"
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "index",
                type: "uint256"
              },
              {
                internalType: "Tick",
                name: "tick",
                type: "int256"
              },
              {
                internalType: "uint256",
                name: "gives",
                type: "uint256"
              }
            ],
            internalType: "struct DirectWithBidsAndAsksDistribution.DistributionOffer[]",
            name: "bids",
            type: "tuple[]"
          }
        ],
        internalType: "struct DirectWithBidsAndAsksDistribution.Distribution",
        name: "distribution",
        type: "tuple"
      }
    ],
    name: "populateChunk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "from",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "to",
        type: "uint256"
      },
      {
        internalType: "Tick",
        name: "baseQuoteTickIndex0",
        type: "int256"
      },
      {
        internalType: "uint256",
        name: "firstAskIndex",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "bidGives",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "askGives",
        type: "uint256"
      }
    ],
    name: "populateChunkFromOffset",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "from",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "to",
        type: "uint256"
      },
      {
        internalType: "Tick",
        name: "baseQuoteTickIndex0",
        type: "int256"
      },
      {
        internalType: "uint256",
        name: "_baseQuoteTickOffset",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "firstAskIndex",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "bidGives",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "askGives",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "uint32",
            name: "gasprice",
            type: "uint32"
          },
          {
            internalType: "uint24",
            name: "gasreq",
            type: "uint24"
          },
          {
            internalType: "uint32",
            name: "stepSize",
            type: "uint32"
          },
          {
            internalType: "uint32",
            name: "pricePoints",
            type: "uint32"
          }
        ],
        internalType: "struct CoreKandel.Params",
        name: "parameters",
        type: "tuple"
      },
      {
        internalType: "uint256",
        name: "baseAmount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "quoteAmount",
        type: "uint256"
      }
    ],
    name: "populateFromOffset",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "outbound_tkn",
            type: "address"
          },
          {
            internalType: "address",
            name: "inbound_tkn",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tickSpacing",
            type: "uint256"
          }
        ],
        internalType: "struct OLKey",
        name: "olKey",
        type: "tuple"
      },
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256"
      }
    ],
    name: "provisionOf",
    outputs: [
      {
        internalType: "uint256",
        name: "provision",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "enum OfferType",
        name: "ba",
        type: "uint8"
      }
    ],
    name: "reserveBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "from",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "to",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "baseAmount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "quoteAmount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "freeWei",
        type: "uint256"
      },
      {
        internalType: "address payable",
        name: "recipient",
        type: "address"
      }
    ],
    name: "retractAndWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "from",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "to",
        type: "uint256"
      }
    ],
    name: "retractOffers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "router",
    outputs: [
      {
        internalType: "contract AbstractRouter",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "router",
    outputs: [
      {
        internalType: "contract AbstractRouter",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin_",
        type: "address"
      }
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_baseQuoteTickOffset",
        type: "uint256"
      }
    ],
    name: "setBaseQuoteTickOffset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gasprice",
        type: "uint256"
      }
    ],
    name: "setGasprice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gasreq",
        type: "uint256"
      }
    ],
    name: "setGasreq",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "stepSize",
        type: "uint256"
      }
    ],
    name: "setStepSize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        internalType: "address payable",
        name: "receiver",
        type: "address"
      }
    ],
    name: "withdrawFromMangrove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "baseAmount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "quoteAmount",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      }
    ],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    stateMutability: "payable",
    type: "receive"
  }
] as const;

export default abi;