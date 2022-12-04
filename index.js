require("dotenv").config();
const { connectDB } = require("./config/db");
const { strings } = require("./strings");
const { exit } = require("process");
const yesno = require("yesno");
const {
  allAggregate,
  tokenAggregate,
  timeStampAggregate,
  timeStampAggregateAndToken,
} = require("./portfolio");
var colors = require("colors");

const question = `${strings.intro}${strings.givenNoParams}${strings.givenTokenParam}${strings.givenDateParam}${strings.givenDateAndTokenParam}${strings.terminate} \n`;

const runProgram = async () => {
  await connectDB();

  const restartProgram = async () => {
    const ok = await yesno({
      question: `\n${strings.callFunctionAgain}`.underline.cyan,
    });
    ok && getPortfolio();
  };

  const getPortfolio = async () => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(question, async (key) => {
      switch (parseInt(key)) {
        case 1:
          await allAggregate();
          readline.close();
          restartProgram();
          break;
        case 2:
          readline.question(
            `${strings.chooseToken}\n`.yellow,
            async (token) => {
              const convertedToken = token.toUpperCase();
              await tokenAggregate(convertedToken);
              readline.close();
              restartProgram();
            }
          );
          break;
        case 3:
          readline.question(
            `${strings.chooseDate}\n${strings.chooseDay}\n`.yellow,
            async (day) => {
              readline.question(
                `${strings.chooseMonth}\n`.yellow,
                async (month) => {
                  readline.question(
                    `${strings.chooseYear}\n`.yellow,
                    async (year) => {
                      const date = `${month}/${day}/${year}`;
                      const convertedDate = Date.parse(date);
                      console.log("converted date", convertedDate);
                      await timeStampAggregate(convertedDate / 1000);
                      readline.close();
                      restartProgram();
                    }
                  );
                }
              );
            }
          );
          break;
        case 4:
          readline.question(
            `${strings.chooseToken}\n`.yellow,
            async (token) => {
              readline.question(
                `${strings.chooseDate}\n${strings.chooseDay}\n`.yellow,
                async (day) => {
                  readline.question(
                    `${strings.chooseMonth}\n`.yellow,
                    async (month) => {
                      readline.question(
                        `${strings.chooseYear}\n`.yellow,
                        async (year) => {
                          const date = `${month}/${day}/${year}`;
                          const convertedDate = Date.parse(date);
                          console.log("converted date", convertedDate);
                          const convertedToken = token.toUpperCase();
                          await timeStampAggregateAndToken(
                            convertedDate / 1000,
                            convertedToken
                          );
                          readline.close();
                          restartProgram();
                        }
                      );
                    }
                  );
                }
              );
            }
          );
          break;
        case 5:
          exit();
        default:
          console.log(strings.chooseCorrectOption);
          getPortfolio();
      }
    });
  };
  getPortfolio();
};

runProgram();
