import prisma from "../lib/prisma";

/* GET WINNING BIDDER */

export const selectWinner = async (tenderId: number) => {

  const bidders = await prisma.bidder.findMany({
    where: {
      tenderId
    }
  });

  if (!bidders.length) {
    throw new Error("No bidders found");
  }

  let winner = bidders[0];
  let highestScore =
    (winner.technicalScore ?? 0) + (winner.financialScore ?? 0);

  for (const bidder of bidders) {

    const score =
      (bidder.technicalScore ?? 0) +
      (bidder.financialScore ?? 0);

    if (score > highestScore) {
      highestScore = score;
      winner = bidder;
    }

  }

  return {
    winner,
    score: highestScore
  };

};