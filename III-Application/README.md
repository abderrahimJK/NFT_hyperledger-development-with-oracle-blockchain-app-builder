# Develop Hyperledger Fabric Applications With App Builder

- [Develop Hyperledger Fabric Applications With App Builder](#develop-hyperledger-fabric-applications-with-app-builder)
    - [Prerequisites](#prerequisites)
        - [Install AppBuilder CLI](#install-appbuilder-cli)
    - [App Builder Basics](#app-builder-basics)
    - [Test Chaincodes With Postman](#test-chaincodes-with-postman)

Oracle developed Oracle Blockchain App Builder as a toolset for rapid and manageable Hyperledger Fabric development that helps to develop, test, debug, and deploy smart contracts (chaincodes).

## Prerequisites
  - App Builder CLI

## Develop Blockchain NFTMarketplaceMr

### Create Specification File
We will now create the specification file ```MoroccoLionsToken.yaml```.

![](../assets/p14.png)

```yaml

 assets:
    - name: MoroccanArtCollections
      type: token
      symbol: ART      #mandatory
      standard: erc721+   
      anatomy:
        type: nonfungible
        unit: whole
      behavior:
        - indivisible      # mandatory
        - singleton        # mandatory
        - mintable:        # mandatory
            max_min_quantity: 20000
        - transferable
        - burnable
        - roles:
            minter_role_name: minter
      properties:
        - name: price
          type: number
        - name: on_sale_flag
          type: boolean
      metadata:
        - name: painting_name
          type: string
        - name: description
          type: string
        - name: image
          type: string
        - name: painter_name
          type: string
 ```
In this sample specification file you can see all the sections and attributes for a representation of an NFT token. Just as a first overview of the sections defined in the file:
- ***Assets***: Place where the different assets (standard entities, FTs, NFTs) are defined. Inside each of the assets we can distingish different sections which can vary depending on the kind of represented asset. For NFTs and FTs these are the different subsections:
    - ***Type/Symbol/Standard***: You must indicate in these properties that this token is based in the ERC-721 Standard, and give to it a unic symbol indentifier.
    - ***Anatomy***: In this section you specify it is a non-fungible token (NFT) and whether it would be subdivided into smaller fractions (nowadays "whole" is the only option for NFT tokens).
    - ***Behavior***: In this section is where must be defined if the token can be minted, and in such case, which is the maximum number of mintable tokens. Here you must also state it is an indivisible token, if is singleton for each class, transferable, and burnable which is similar to its deletion, but not disapearing, so it is still there but not usable at all. Also in this section you can restrict token behaviors to specific roles.
    - ***Metadata***: This section define a sort of prpoperties which must be set during token creation, and can not be changed in the future. So its value will remain inmutable for the whole life of the token (i.e.: manufacturer, .
    - ***Properties***: Standard attributes of the token which can vary during the life of the token.
- ***customMethods***: Place where a list of non estandard methods are defined. For those methods AppBuilder will only generate the signature of the method, without any implementation on them. The implementation of these methods are the only code the be implemented by the developer.

After you detect all the necessary business processes over the assets in the chaincode, you create a list of custom methods. We will implement those methods afterward when the scaffolded project is generated. Let's add all the required smart contracts in the ```customMethods``` block:

```yaml
 customMethods:
   - executeQuery
   - "createAccountByConsumers(org_id: string, user_id: string, token_type: string)" # Create accounts for consumers while signing up
   - "sell(token_id: string, selling_price: number)" # Post the token for selling in the marketplace
   - "buyWithTokens(from_org_id: string, from_user_id: string, to_org_id: string, to_user_id: string, nonfungible_token_id: string, fungible_token_id: string, amount_paid: number)"  # Buy the NFT after paying the using FT Tokens 
   - "buyWithDirectPayment(from_org_id: string, from_user_id: string, to_org_id: string, to_user_id: string, nonfungible_token_id: string, amount_paid: number)"  # Buy the NFT after paying the amount using payment gateway
```

### implementing custom methods:

```javascript
/**
*      
* BDB sql rich queries can be executed in OBP CS/EE.
* This method can be invoked only when connected to remote OBP CS/EE network.
*    
*/
@Validator(yup.string())
    public async executeQuery(query: string) {
        const result = await this.query(query);
        return result;
    }
@Validator(yup.string(), yup.string(), yup.string())
          public async createAccountByConsumers(org_id: string, user_id: string, token_type: string) {       
          //await this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.createAccount', 'TOKEN');
          return await this.Ctx.ERC721Account.createAccount(org_id, user_id, token_type);   
    }
@Validator(yup.string(), yup.number())
public async sell (token_id: string, selling_price: number) {       
          try {  
            const token = await this.Ctx.ERC721Token.get(token_id);
            const t = new MoroccanArtCollections(token)
            t.price =  selling_price;
            t.on_sale_flag = true;
            //console.log(token);           
            await this.Ctx.ERC721Token.updateToken(t);
            return `Token ID : '${token_id}' has been posted for selling in the marketplace'`;           
          } catch(error) {
                throw new Error(error.message);
        }
}
@Validator(yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.number())
public async buyWithTokens(from_org_id: string, from_user_id: string, to_org_id: string, to_user_id: string, nonfungible_token_id: string, fungible_token_id: string, amount_paid: number) {
        try {  
            const token = await this.Ctx.ERC721Token.get(nonfungible_token_id);
            const t = new MoroccanArtCollections(token);
            const oChainUtil = new OChainUtils(this.Ctx.Stub);
            var msg = `Token ID : '${nonfungible_token_id}' had not been transferred'`;
            if (t.on_sale_flag==true) {
                if(t.price == amount_paid) {                   
                     // @ts-ignore
                    await oChainUtil.invokeChaincode("LoyaltyToken7", "transferTokens", [fungible_token_id, from_org_id, from_user_id, amount_paid], "marketplace");
                    const from_account_id = await this.Ctx.ERC721Account.generateAccountId(from_org_id, from_user_id);                   
                    const to_account_id = await this.Ctx.ERC721Account.generateAccountId(to_org_id, to_user_id);         
                    await this.Ctx.ERC721Token.transferFrom(from_account_id, to_account_id, t);
     
                    msg = `Token ID : '${nonfungible_token_id}' has been successfully transferred to UserID : '${to_user_id}'`;           
              }           
            }
            else {
                msg = `Token ID : '${nonfungible_token_id}' has not been transferred to UserID : '${to_user_id}' as the amount was not fully paid'`;
            }
            return msg;
       } catch(error)
          {
            throw new Error(error.message);
         }
}
@Validator(yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.number())
    public async buyWithDirectPayment(from_org_id: string, from_user_id: string, to_org_id: string, to_user_id: string, nonfungible_token_id: string, amount_paid: number) {
         try {  
             const token = await this.Ctx.ERC721Token.get(nonfungible_token_id);
             const t = new MoroccanArtCollections(token);
             var msg = `Token ID : '${nonfungible_token_id}' had not been transferred'`;           
           if (t.on_sale_flag==true) {
                 if(t.price == amount_paid) {                   
                 const from_account_id = await this.Ctx.ERC721Account.generateAccountId(from_org_id, from_user_id);         
                 const to_account_id = await this.Ctx.ERC721Account.generateAccountId(to_org_id, to_user_id);                   
                 await this.Ctx.ERC721Token.transferFrom(from_account_id, to_account_id, t);
                   
                 msg = `Token ID : '${nonfungible_token_id}' has been successfully transferred to UserID : '${to_user_id}'`;
                 }
             }
             else {
                 msg = `Token ID : '${nonfungible_token_id}' has not been transferred to UserID : '${to_user_id}' as the amount was not fully paid'`;
             }
             return msg;
         } catch(error) {         
             throw new Error(error.message);
         }
      }
}
```

| :information_source: Note          |
|:-----------------------------------|
| ```executeQuery``` method enables you to execute SQL-ish queries on top of the world state database! Count, group, filter assets and more. Detailed instructions can be found [here](https://docs.oracle.com/en/database/other-databases/blockchain-enterprise/21.1/user/supported-rich-query-syntax.html#GUID-7A7766A3-EA2C-4A3D-BE62-7B4EC747EE5B).|

# Deployment of the NFT Smartcontract into the Founder Instance

1. First of all we must create the deployable package from the chaincode project. From Visual Studio, push the right button on top of the name of the chaincode project, from the popup menu select the Package option, and select the directory to save the chaincode package file:

<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p16.png"/>
</p>

2. Now we are going to access to the Oracle Blockchain Service Console to install and deploy the chaincode package into the Founder instance:
   - Navigate to the Chaincode tab, and push the Deploy a New Chaincode button:

<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p17.png"/>
</p>

3. Select the Advanced Deployment option:

<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p18.png"/>
</p>

4. Set all the values to Install the chaincode package into the Founder instance and push the Next button:

   - `Package Label`: Give a name which can help you identify which package is installed in the different existing channels.
   - `Chaincode Language`: Select among the different languages, based in the language in which you have developed the chaincode.
   - `Target Peers`: Select the peers in which you want to install the chaincode package.
   - `Is Packaged Chaincode`: Leave this box unselected if what you are going to upload is a zip file. Select the checkbox for tar.gz files.
   - `Chaincode Source`: Push the Upload Chaincode File to be able to navigate in your file system to select the chaincode zip file.

<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p19.png"/>
</p>

5. If the installation succeed we will see the below success message. Then, next step is the deployment of the chaincode in the selected channel, so you must set all the values related with the deployment phase and push the Next button:

   - `Channel`: Select the channel in which you want to deploy the smartcontract.
   - `Chaincode Name`: Set the name with which the smartcontract will be deployed on the channel.
   - `Version`: Asign a number to this deployment, which is aligned with the installed package installed before. In this way you will be able to correlate packages installed with chaincodes deployed in the different channels.
   - `Init-required`: Select this checkbox if the init method of the chaincode needs to be invoked before allow user transactions.
   - `Endorsement Policy`: You can specify Endorsment policies during deployment, but for the purpose of this HoL we do not need them.
   - `Private Data Collection`: You can set Private Data Collections, but for the purpose of this HoL we do not need them.

<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p20.png"/>
</p>

6. When you `open Work and Pension Department` service console and select the `Chaincodes` tab, you will see the fresh chaincode you have just installed, deployed on the targeted channel (in my case `default`).

<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p22.png"/>
</p>

# Test Chaincodes With Postman

Find the `restproxy` URL in the Tax Authority service console by selecting `Nodes` tab. Copy the URL, as in the picture below.

<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p23.png"/>
</p>

## Prepare Postman Collection to execute REST APIs

Here it is a Postman collection prepared to be used agains the two prepared smartcontract.
The following picture shows all the varibles we have defined and needs to be adapted to your environment:

<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p24.png"/>
</p>

Invoke the chaincode `createArtCollectionToken`. When you receive response **"returnCode"**: "Success", you have `sucessfuly` created new asset on the blockchain.

- Request body :
```json
{
      "chaincode": "{{NFTChaincode}}",
      "args": [
              "createArtCollectionToken",
              "{\"token_id\":\"{{NFTTokenID}}\",\"token_uri\":\"https://ipfs.io/ipfs/QmV68aiT7xw2WX8pmDbeTWpGP2or35NUFan9RagymsLpgV?filename=ArtCollection_NFT1.json\",\"metadata\":{\"painting_name\":\"Oracle - Red Bull Partnership\",\"image\":\"https://ipfs.io/ipfs/QmVap6Gkh3Cp9DiLLWvkvJHpuXpFmYB2GzU1caM57gNcAa?filename=Oracle_RedBull_NFT1.jpeg\",\"painter\":\"Abderrahim\"},\"price\":200,\"on_sale_flag\":false}"
      ],
     "timeout": 0,
     "sync": true
}

```

<p align="center"  alt="Select The compartment where the instance of the founder organization will be created">
<img  src="https://github.com/abderrahimJK/NFT_hyperledger-development-with-oracle-blockchain-app-builder/blob/main/assets/p24.jpg"/>
</p>