//ImageStorage
export const SMART_CONTRACT_ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "buyImage",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_description",
				"type": "string"
			}
		],
		"name": "changeDescription",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "changePrice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "changeSoldStatus",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_cid",
				"type": "string"
			},
			{
				"name": "_price",
				"type": "uint256"
			},
			{
				"name": "_desription",
				"type": "string"
			}
		],
		"name": "uploadNewImage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "cid",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "isItForSale",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "description",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			}
		],
		"name": "NewImageUploaded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "completed",
				"type": "bool"
			}
		],
		"name": "SoldStatusChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "cid",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "isItForSale",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "ImageDeal",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "PriceChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "description",
				"type": "string"
			}
		],
		"name": "DescriptionChanged",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allImages",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "cid",
				"type": "string"
			},
			{
				"name": "price",
				"type": "uint256"
			},
			{
				"name": "isItForSale",
				"type": "bool"
			},
			{
				"name": "description",
				"type": "string"
			},
			{
				"name": "owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "amountOfImages",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

export const SMART_CONTRACT_ADDRESS =  "0xe26405e190BB6F0809d86D9eFf3Cb0820d010a88";


//Todo
// export const SMART_CONTRACT_ADDRESS =  "0xe72c2cEEFB27F9977784B5611a7f3A7830e4241D";
// export const SMART_CONTRACT_ABI = [
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"internalType": "string",
// 				"name": "_content",
// 				"type": "string"
// 			}
// 		],
// 		"name": "createTask",
// 		"outputs": [],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "id",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "bool",
// 				"name": "completed",
// 				"type": "bool"
// 			}
// 		],
// 		"name": "TaskCompleted",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "id",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "string",
// 				"name": "content",
// 				"type": "string"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "bool",
// 				"name": "completed",
// 				"type": "bool"
// 			}
// 		],
// 		"name": "TaskCreated",
// 		"type": "event"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "toggleCompleted",
// 		"outputs": [],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "taskCount",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "tasks",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "id",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "content",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "bool",
// 				"name": "completed",
// 				"type": "bool"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ];