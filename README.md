# Blockcypher Integration

This application allows users to perform following actions on Bitcoin TestNet:

  1. View the balance for a specific address
  
  2. Send bitcoins to another address

## Getting Started

1.  Download the application from git using the following cmd:
git clone https://github.com/ayeshah/blockcypher-integration.git

2. cd blockcyper-integration

3.  Install the node dependencies:
  npm install

4.  Run the project:
   npm start

5. To access the application enter the following link on your browser http://localhost:3000/homepage 


### Prerequisites

1. Git

2. NodeJS

3. Go

4. [BTCEC](https://github.com/btcsuite/btcd/tree/master/btcec) for signing transactions


## Using the application

This application operates on bitcoin test net and hence requires the user to have a bitcoin testnet address.
If the user does not have one, he can generate an address using the 'Generate Address' feature on the website

Transferring Bitcoins is 3-step process

1. User must enter his/her bitcoin address in the application and check his balance. Testnet bitcoins can be retrieved from the following [faucet](http://bitcoinfaucet.uo1.net/)

2. User then enters the recipient's address and the amount to transfer

3. The user must sign the signto data with their private key using BTCEC tool
   Once BTCEC is installed:

   a. Build the signer:
   cd btcutils/signer
   go build

   b. Sign the transaction:
   signer [tosign] [privatekey]

4. Enter the signed data and public key in the form and post the transaction. A transaction ID will be returned back to the user,
  which can be used to track the transaction on the [blockchain explorer](https://live.blockcypher.com/btc-testnet/)



## Authors

* **Ayesha Hafeez** - *Initial work* - [ayesha](https://github.com/ayeshah)


## License

This project is licensed under the MIT License

## Acknowledgments

* UICookies for the site template https://uicookies.com/
