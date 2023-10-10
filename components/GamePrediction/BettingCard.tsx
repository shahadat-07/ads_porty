"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { GameProps, SiteInformations, TeamBet, User } from "@/const";
import { useRouter } from "next/navigation";

const Game: React.FC<GameProps> = ({
  game,
  rate,
  currentUser,
  isPredictionSubmitted,
}) => {
  // console.log(game.teams);
  const cookies = new Cookies();
  const token = cookies.get("jwt");
  const router = useRouter();
  // const decoded = jwt(token) as { exp: number; id: number | string };
  const decoded: { id: string } | null = token ? jwt(token) : null;
  const [disabled, setDisabled] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [betAmounts, setBetAmounts] = useState<TeamBet>({});
  const [potentialWinnings, setPotentialWinnings] = useState<TeamBet>({});
  let currentGameFromUserHistory;
  if (isPredictionSubmitted) {
    currentGameFromUserHistory = currentUser?.gamesPredictionHistory?.find(
      (currentGame) => currentGame.gameId === game.id
    );
  }
  const isApiCalled = currentGameFromUserHistory?.isApiCalled;

  useEffect(() => {
    if (
      game.winning_team !== "Not Defined" &&
      isApiCalled === false &&
      isPredictionSubmitted
    ) {
      axios
        .post(`https://server.adsporty.com/ad-game-revenue/${game.id}`, {
          userId: currentUser._id,
          winning_team: game.winning_team,
        })
        .then((res) => {
          router.refresh();
        })
        .catch((error: any) => {
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            // toast.error(errorMessage);
          } else {
            // toast.error("Something went wrong!");
          }
        });
    }
  }, [
    game.winning_team,
    game.id,
    isPredictionSubmitted,
    currentUser?._id,
    isApiCalled,
    router,
  ]);

  const userSelectedTeams = currentUser?.gamesPredictionHistory;
  // console.log(userSelectedTeams);

  //Toggle Selection
  const toggleTeamSelection = (team: string) => {
    if (isPredictionSubmitted) {
      return; // Prevent selection if prediction is already submitted
    }

    setSelectedTeams((prevSelectedTeams) => {
      if (prevSelectedTeams.includes(team)) {
        setPotentialWinnings((prevPotentialWinnings) => {
          const updatedWinnings = { ...prevPotentialWinnings };
          delete updatedWinnings[team];
          return updatedWinnings;
        });
        return prevSelectedTeams.filter((t) => t !== team);
      } else {
        return [...prevSelectedTeams, team];
      }
    });
  };

  const handleBetChange = (team: string, betAmount: number) => {
    if (isPredictionSubmitted) {
      return;
    }

    // Update the bet amount
    setBetAmounts((prevBetAmounts) => ({
      ...prevBetAmounts,
      [team]: betAmount,
    }));

    // Calculate potential winnings (assuming a fixed percentage rate)
    const percentageRate = rate / 100;
    const potentialWinningsValue = betAmount * percentageRate + betAmount;

    // Update potential winnings, but clear it when the bet amount is zero
    setPotentialWinnings(
      (prevPotentialWinnings) =>
        ({
          ...prevPotentialWinnings,
          [team]: betAmount === 0 ? undefined : potentialWinningsValue,
        } as TeamBet)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    const formData: {
      isApiCalled: boolean;
      gameId: string;
      match_type: string;
      which_sport: string;
      prediction_type: string;
      match_date: string;
      match_time: string;
      winning_team: string;
      predictionInformations: object[];
      teams: string[];
    } = {
      isApiCalled: false,
      gameId: game.id,
      match_type: game.match_type,
      which_sport: game.which_sport,
      prediction_type: game.prediction_type,
      match_date: game.match_date,
      match_time: game.match_time,
      winning_team: game.winning_team,
      predictionInformations: [],
      teams: game.teams,
    };

    selectedTeams.forEach((teamName) => {
      formData.predictionInformations.push({
        teamName: teamName,
        betAmount: betAmounts[teamName],
        potentialWinnings: potentialWinnings[teamName],
      });
    });

    const totalBetAmount = formData.predictionInformations.reduce(
      (total, prediction: any) => {
        return total + prediction.betAmount;
      },
      0
    );

    if (totalBetAmount < 5) {
      setDisabled(false);
      return toast.error("Prediction should be atleast $5");
    } else if (totalBetAmount > currentUser?.games_wallet?.balance) {
      setDisabled(false);
      return toast.error("Not enough money!");
    }

    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const apiEndpoint = "https://server.adsporty.com/add-prediction";

    try {
      const response = await axiosInstance.post(apiEndpoint, formData);
      toast.success(response.data.message);
      router.refresh();
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong!");
      }
    }
    //  finally {
    //   setDisabled(false);
    // }
  };

  return (
    <div
      className={`${
        game?.winning_team === "Not Defined" ? "" : "hidden"
      } mb-8 border px-4 py-2`}
    >
      {isPredictionSubmitted ? (
        <div className="p-2 md:p-5">
          {game.winning_team === "Not Defined" ? (
            <div className="mb-5">
              <p className="text-green-500 text-center text-sm md:text-base">
                Prediction submitted for this game
              </p>
              <p className="text-gray-500 text-center text-sm md:text-base">
                Result will be updated soon. Stay tuned!
              </p>
            </div>
          ) : (
            <div>
              {currentGameFromUserHistory &&
              currentGameFromUserHistory.predictionInformations.some(
                (sport: any) => sport.teamName === game.winning_team
              ) ? (
                <div className="flex flex-col items-center mb-2 md:mb-8">
                  <p className="md:text-xl text-purple-600 font-bold">
                    Congratulations!
                  </p>
                  <p className="text-green-600">
                    Your predicted team {game.winning_team} has won the game!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center mb-2 md:mb-8">
                  <p className="md:text-xl text-red-600 font-bold">Ouh!</p>
                  <p className="text-sm md:text-base text-red-600 text-center">
                    Unfortunately, the team you predicted did not emerge as the
                    winner in the game.
                  </p>
                </div>
              )}
            </div>
          )}
          <>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex justify-center">
                <p className="md:text-lg mb-2 md:mb-0">
                  {game.which_sport} / {game.match_type} ({game.prediction_type}
                  )
                </p>
              </div>

              <div className="border-2 p-2 border-purple-200 text-purple-600 font-semibold rounded-lg bg-purple-50 text-center text-sm md:text-base">
                {game?.teams?.map((team: string, teamIndex: any) => (
                  <span key={teamIndex}>
                    {team}
                    {teamIndex < game?.teams?.length - 1 && (
                      <span className="mx-1">vs</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-2 md:mt-5">
              <table className="border-collapse w-full">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-2 md:px-3 p-1 md:py-2 text-sm md:text-base">
                      Team
                    </th>
                    <th className="border border-gray-400 px-2 md:px-3 p-1 md:py-2 text-sm md:text-base">
                      Prediction
                    </th>
                    <th className="border border-gray-400 px-2 md:px-3 p-1 md:py-2 text-sm md:text-base">
                      Potential Winning
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userSelectedTeams.map((t: any, index: number) => {
                    // console.log(t);
                    if (t.gameId === game.id) {
                      return t?.predictionInformations?.map(
                        (prediction: any, predictionIndex: number) => (
                          <tr key={predictionIndex}>
                            <td className="border border-gray-400 px-2 md:px-3 py-1 md:py-2 text-sm md:text-base">
                              <span className="font-bold text-purple-600">
                                {prediction.teamName}
                              </span>
                            </td>
                            <td className="border border-gray-400 px-2 md:px-3 py-1 md:py-2 text-sm md:text-base">
                              <span className="font-bold text-purple-600">
                                $ {prediction.betAmount}
                              </span>
                            </td>
                            <td className="border border-gray-400 px-2 md:px-3 py-1 md:py-2 text-sm md:text-base">
                              <span className="font-bold text-purple-600">
                                $ {prediction.potentialWinnings}
                              </span>
                            </td>
                          </tr>
                        )
                      );
                    } else {
                      return null;
                    }
                  })}
                </tbody>
              </table>
            </div>
            {game.winning_team !== "Not Defined" ? (
              <div className="mt-5 md:mt-10 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 text-white p-1 md:p-6 rounded-lg text-center">
                <h1 className="text-lg md:text-4xl font-bold">
                  {" "}
                  Winning Team: {game.winning_team}
                </h1>
              </div>
            ) : (
              <div></div>
            )}
          </>
        </div>
      ) : (
        <div>
          <div className={` flex flex-col md:flex-row justify-between `}>
            <div className="flex justify-center">
              <p className="md:text-lg mb-2 md:mb-0">
                {/* {isPredictionSubmitted} */}
                {game.which_sport} / {game.match_type} ({game.prediction_type})
              </p>
            </div>

            <div className="border-2 p-2 border-purple-200 text-purple-600 font-semibold rounded-lg bg-purple-50 text-center">
              {game?.teams?.map((team: string, teamIndex: any) => (
                <span key={teamIndex}>
                  {team}
                  {teamIndex < game?.teams?.length - 1 && (
                    <span className="mx-1">vs</span>
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between max-w-xl mx-auto mt-5 md:mt-10">
            {game.teams.map((team, teamIndex) => (
              <button
                key={teamIndex}
                className={`flex items-center justify-center border rounded-lg px-4 py-2 ${
                  selectedTeams.includes(team) ? "bg-purple-600 text-white" : ""
                }`}
                onClick={() => toggleTeamSelection(team)}
              >
                {team}
              </button>
            ))}
            <button
              className={`flex items-center justify-center border rounded-lg px-4 py-2 ${
                selectedTeams.includes("Draw") ? "bg-purple-600 text-white" : ""
              }`}
              onClick={() => toggleTeamSelection("Draw")}
            >
              Draw
            </button>
          </div>
          <div className="my-8 max-w-xl mx-auto">
            {selectedTeams.map((team, teamIndex) => (
              <div
                key={teamIndex}
                className="flex flex-col gap-2 border-2 mb-5 rounded-lg p-5"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <p>{team === "vs" ? "Draw" : team}</p>
                  {betAmounts[team] && (
                    <p>Potential Winnings: ${potentialWinnings[team] || 0}</p>
                  )}
                </div>
                <input
                  type="number"
                  className="border rounded-lg px-4 py-1"
                  placeholder="Amount"
                  onChange={(e) =>
                    handleBetChange(team, parseFloat(e.target.value))
                  }
                />
              </div>
            ))}
            <div className="flex justify-between flex-col md:flex-row">
              <button
                disabled={disabled}
                onClick={handleSubmit}
                className={`bg-purple-600 text-white rounded-lg py-2 px-4 block mb-5 ${
                  disabled ? "cursor-not-allowed opacity-50" : ""
                } `}
              >
                Confirm Prediction
              </button>
              <p className="text-xs"> * There will be no reverse option! </p>
            </div>
          </div>
          {game.winning_team !== "Not Defined" ? (
            <h1 className="text-2xl text-center font-semibold">
              Winning Team: {game.winning_team}
            </h1>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

// const BettingCard: React.FC<{
//   siteInformations: SiteInformations;
//   currentUser: User;
// }> = ({ siteInformations, currentUser }) => {
//   return (
//     <div className="max-w-3xl mx-auto border border-purple-500 bg-white rounded-lg shadow-lg p-4 mt-8 mb-section-gap-sm md:mb-section-gap">
//       {siteInformations?.uploadGames?.length > 0 ? (
//         siteInformations?.uploadGames
//           .filter((game) => game.winning_team === "Not Defined")
//           .map((game, index) => {
//             const isPredictionSubmitted =
//               currentUser?.gamesPredictionHistory.some(
//                 (prediction) => prediction.gameId === game.id
//               );

//             return (
//               <Game
//                 key={index}
//                 game={game}
//                 rate={siteInformations.game_percentage_rate}
//                 currentUser={currentUser}
//                 isPredictionSubmitted={isPredictionSubmitted}
//               />
//             );
//           })
//       ) : (
//         <p className="text-center font-semibold">No Games to Show!</p>
//       )}
//     </div>
//   );
// };

const BettingCard: React.FC<{
  siteInformations: SiteInformations;
  currentUser: User;
}> = ({ siteInformations, currentUser }) => {
  // console.log(siteInformations);
  return (
    <div className="max-w-3xl mx-auto border border-purple-500 bg-white rounded-lg shadow-lg p-4 mt-8 mb-section-gap-sm md:mb-section-gap">
      {siteInformations?.uploadGames?.length > 0 ? (
        siteInformations?.uploadGames?.map((game, index) => {
          // console.log(game);
          const isPredictionSubmitted =
            currentUser?.gamesPredictionHistory.some(
              (prediction) => prediction.gameId === game.id
            );

          return (
            <Game
              key={index}
              game={game}
              rate={siteInformations.game_percentage_rate}
              currentUser={currentUser}
              isPredictionSubmitted={isPredictionSubmitted}
            />
          );
        })
      ) : (
        <p className="text-center font-semibold">No Games to Show!</p>
      )}
    </div>
  );
};

export default BettingCard;
