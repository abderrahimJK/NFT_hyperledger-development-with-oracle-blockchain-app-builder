# Preparation of Oracle App Builder development environment

The creation of an Hyperledger Fabric (HLF) Smartcontract is somehow a quite complex task, you need to know all the intrinsics about HLF, you need to know how to code in Java, Typescript, or GoLang, and you also need to know how to deploy and manage the whole lifecycle of the Smartcontract project.

AppBuilder has been created to simplify the creation of an smartcontract project, in fact AppBuilder is a low-code tool which is able to create the whole Chaincode project from scratch. A part of that, AppBuilder will also help you in the testing phase, packaging of the project, and also, if you want, in the deployment of the chaincode locally in your own laptop for unitary testing, or remotely into a real Oracle Blockchain Network.

<p align="center"  alt="App Builder in VSCode">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p7.png"/>
</p>

AppBuilder has been created in two flavors, you can use it as a command line tool aimed to automate CI/CD processes, or you can use it as a Microsoft Visual Code Pluging. Both of them will allow you to execute exactly the same functionality, just select the one you prefer depending on what are your preferences as developer.
1. On the Oracle Blockchain Platform Cloud Console click on Developer tools.

<p align="center"  alt="Click on Visual Studio Code Extension">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p8.png"/>
</p>

2. Next step open VSCode and click on extensions

<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p9.png"/>
</p>

3. To install App Builder go to three dots and select the **install from VSIX**

<p align="center"  alt="Select The extension file that were downloaded previously">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p10.png"/>
</p>

# Connect App Builder to OBP

There are many tech to connect to the OBP for this project we used an authentication with API keys

1. For creating our keys, navigate to User details and in Resources click on API keys.

<p align="center"  alt="Select The extension file that were downloaded previously">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p11.png"/>
</p>

2. Add API key and copy Configuration File int local home directory to a new file named `.oci`

<p align="center"  alt="Select The extension file that were downloaded previously">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p12.png"/>
</p>

3. If everything went right, we in App Builder should have some example profiles.

<p align="center"  alt="Select The extension file that were downloaded previously">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p13.png"/>
</p>

