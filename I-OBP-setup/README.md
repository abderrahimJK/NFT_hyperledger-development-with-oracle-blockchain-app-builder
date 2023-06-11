# Create an Oracle Blockchain Network

#### Table of Contents
[Introduction](#Introduction)  
[Prerequisites](#Prerequisites)

<a name="Introduction"/>

## Introduction

Oracle Blockchain Platform is a managed blockchain solution designed to set up Hyperledger Fabric network(s). It offloads the burden of Hyperledger components maintenance, focusing you on the applications and smart contract development. Oracle Blockchain Platform provides you with all the required components to support a blockchain network: computes, storage, containers, identity services, event services, and management services.

As a preassembled PaaS, Oracle Blockchain Platform includes all the dependencies required to provision and manage a blockchain network: compute, storage, containers, identity services, event services, and management services. Oracle Blockchain Platform also includes the blockchain network console to support integrated operations. This helps you start developing applications within minutes.

<a name="Prerequisites"/>

## Prerequisites
- Access to an Oracle Cloud tenancy

<a name="createFounder"/>

## Creation of the Founder instance
1. In the OCI services menu, select ***Developer Services*** and click on ***Blockchain Platform***.
   ![Select Blockchain Service from the OCI console](https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p1.png "Select Blockchain Service from the OCI console")

2. Press the button Create Blockchain Platform.
   ![Press the button Create Blockchain Platform](https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p2.png "Press the button Create Blockchain Platform")

3. Give your platform a Display Name (e.g. 'eshop'), optionally add a Description, and keep the remaining default selections, as they are the settings to create a Founder instance, which will be the founder of a new Hyperledger Fabric Network, and using the standard shape, which has exactly the same functionality as the Enterprise shape but at a lower cost, but perfectly valid for development work. Click 'Create'.
<p align="center">
<img width="727" height="848" src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p3.png"/>
</p>

4. Once pushed the 'Create' button, the creation of the instance for this Organization (e-shop) has been submited, and will be ready in a few minutes:
<p align="center">
<img width="834" height="415" src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p4.png"/>
</p>

5. When the Founder instance gets created, you will be able to access to the Oracle Blockchain console for this instance by pushing the 'Service Console' button:
<p align="center">
<img width="833" height="417" src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p5.png"/>
</p>

6. If everything works, you should get a message stating the Orderer attributes have been updated successfully, so you can push the step number ***4***, and you will be forwarded to the dashboard where you will see how the lessee participant is now part of the network created by the founder:
<p align="center">
<img width="840" height="500" src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p6.png"/>
</p>
