import { User } from "@/const";
import React from "react";

interface PredictionInformation {
  teamName: string;
  betAmount: number;
  potentialWinnings: number;
}

interface prediction {
  isApiCalled: boolean;
  gameId: string;
  match_date: string;
  match_time: string;
  match_type: string;
  which_sport: string;
  prediction_type: string;
  teams: string[];
  winning_team: string;
  predictionInformations: PredictionInformation[];
}

interface TableCardProps {
  data: prediction;
}

const TableCard: React.FC<TableCardProps> = async ({ data }) => {
  // console.log(data.teams);

  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div className="text-center">
        <p className="text-lg font-semibold"> {data.match_date} </p>
        <p className="text-sm text-gray-600">
          {data.match_type} ({data.which_sport})
        </p>
        <p className="text-xl font-semibold mt-2">
          {data?.teams?.map((team: string, teamIndex: any) => (
            <span key={teamIndex}>
              {team}
              {teamIndex < data?.teams?.length - 1 && (
                <span className="mx-1">vs</span>
              )}
            </span>
          ))}

        </p>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-600">Your Selection</p>
        <div className="flex justify-between items-center mt-2">
          {data?.predictionInformations?.map(
            (prediction: PredictionInformation, index: number) => (
              <div key={index} className="flex items-center">
                <span
                  className={` rounded-full px-2 py-1 text-xs mr-2 bg-purple-500 text-white `}
                >
                  {prediction.teamName}
                </span>
                <p className="text-sm">{prediction.betAmount}</p>
              </div>
            )
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        <p className="text-xl font-medium text-gray-600">Winning Team:</p>
        <p className="text-xl font-semibold text-purple-500">
          {data.winning_team}
        </p>
      </div>
    </div>
  );
};

export default TableCard;
