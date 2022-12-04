const { default: axios } = require("axios");
const { transactionType } = require("./enum/transactionType");
const Portfolio = require("./model/portfolio");
const { strings } = require("./strings");

const convertToUSD = async (res) => {
  for (const token of res) {
    const convertRes = await axios.get(
      `https://min-api.cryptocompare.com/data/price?fsym=${token._id}&tsyms=USD`
    );
    token.totalAmount *= convertRes.data.USD;
  }
};

const allAggregate = async () => {
  try {
    console.log(`${strings.loading}\n`.bgMagenta);

    const result = await Portfolio.aggregate([
      {
        $group: {
          _id: "$token",
          totalAmount: {
            $sum: {
              $cond: [
                { $eq: ["$transaction_type", transactionType.DEPOSIT] },
                "$amount",
                { $multiply: ["$amount", -1] },
              ],
            },
          },
        },
      },
    ]);
    console.log(`${strings.beforeConversion}\n`.bold.blue, result);
    await convertToUSD(result);
    console.log(`${strings.afterConversion}\n`.bold.blue, result);
    return result;
  } catch (error) {
    console.error(strings.mongoFail);
    process.exit(1);
  }
};

const tokenAggregate = async (token) => {
  try {
    console.log(`\n${strings.loading}\n`.bgMagenta);

    const result = await Portfolio.aggregate([
      {
        $match: {
          token: token,
        },
      },
      {
        $group: {
          _id: "$token",
          totalAmount: {
            $sum: {
              $cond: [
                { $eq: ["$transaction_type", transactionType.DEPOSIT] },
                "$amount",
                { $multiply: ["$amount", -1] },
              ],
            },
          },
        },
      },
    ]);
    console.log(`${strings.beforeConversion}\n`.bold.blue, result);
    await convertToUSD(result);
    console.log(`${strings.afterConversion}\n`.bold.blue, result);
    return result;
  } catch (error) {
    console.error(strings.mongoFail);
    process.exit(1);
  }
};
const timeStampAggregate = async (timestamp) => {
  try {
    console.log(`\n${strings.loading}\n`.bgMagenta);

    const result = await Portfolio.aggregate([
      {
        $match: {
          timestamp: { $lte: new Date(timestamp) },
        },
      },
      {
        $group: {
          _id: "$token",
          totalAmount: {
            $sum: {
              $cond: [
                { $eq: ["$transaction_type", transactionType.DEPOSIT] },
                "$amount",
                { $multiply: ["$amount", -1] },
              ],
            },
          },
        },
      },
    ]);
    console.log(`${strings.beforeConversion}\n`.bold.blue, result);
    await convertToUSD(result);
    console.log(`${strings.afterConversion}\n`.bold.blue, result);
    return result;
  } catch (error) {
    console.error(strings.mongoFail);
    process.exit(1);
  }
};

const timeStampAggregateAndToken = async (timestamp, token) => {
  try {
    console.log(`\n${strings.loading}\n`.bgMagenta);
    const result = await Portfolio.aggregate([
      {
        $match: {
          token: token,
          timestamp: { $lte: new Date(timestamp) },
        },
      },
      {
        $group: {
          _id: "$token",
          totalAmount: {
            $sum: {
              $cond: [
                { $eq: ["$transaction_type", transactionType.DEPOSIT] },
                "$amount",
                { $multiply: ["$amount", -1] },
              ],
            },
          },
        },
      },
    ]);
    console.log(`${strings.beforeConversion}\n`.bold.blue, result);
    await convertToUSD(result);
    console.log(`${strings.afterConversion}\n`.bold.blue, result);
    return result;
  } catch (error) {
    console.error(strings.mongoFail);
    process.exit(1);
  }
};

module.exports.allAggregate = allAggregate;
module.exports.tokenAggregate = tokenAggregate;
module.exports.timeStampAggregate = timeStampAggregate;
module.exports.timeStampAggregateAndToken = timeStampAggregateAndToken;
