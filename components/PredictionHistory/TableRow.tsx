import React from "react";

interface Game {
  gameId: string;
  match_type: string;
  which_sport: string;
  prediction_type: string;
  predictionInformations: any;
  match_date: string;
  match_time: string;
  winning_team: string;
  teams: string[];
}

interface TableRowProps {
  data: Game;
}

const TableRow: React.FC<TableRowProps> = ({ data }) => {
  // console.log(data);
  return (
    <tr className="bg-white border-b border-purple-600">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-purple-500">
        {data.match_date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-purple-500">
        {data.match_type} / {data.which_sport}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-purple-500">
        {data?.teams?.map((team: string, teamIndex: any) => (
          <span key={teamIndex}>
            {team}
            {teamIndex < data?.teams?.length - 1 && (
              <span className="mx-1">vs</span>
            )}
          </span>
        ))}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 border border-purple-500">
        <table className="">
          <thead>
            <tr className="">
              <th className="pr-10">Team</th>
              <th className="pr-10">Prediction</th>
              <th className="">Winnings</th>
            </tr>
          </thead>
          <tbody>
            {data.predictionInformations.map(
              (prediction: any, predictionIndex: number) => (
                <tr key={predictionIndex}>
                  <td className="">{prediction.teamName}</td>
                  <td className="">$ {prediction.betAmount}</td>
                  <td className="">$ {prediction.potentialWinnings}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-purple-600 border border-purple-500">
        {data.winning_team}
      </td>
    </tr>
  );
};

export default TableRow;
