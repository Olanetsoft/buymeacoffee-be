const main = async () => {
  const coffeeContractFactory = await hre.ethers.getContractFactory(
    "CoffeePortal"
  );
  const coffeeContract = await coffeeContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await coffeeContract.deployed();
  console.log("Coffee Contract deployed to:", coffeeContract.address);

  /*
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(
    coffeeContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  /*
   * Let's try to buy a coffee
   */
  const coffeeTxn = await coffeeContract.buyCoffee(
    "This is coffee #1",
    "idris",
    ethers.utils.parseEther("0.001")
  );
  await coffeeTxn.wait();

  /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(
    coffeeContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allCoffee = await coffeeContract.getAllCoffee();
  console.log(allCoffee);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
