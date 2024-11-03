import React from "react";

interface ScoreCalculationResult {
    status: "invalid" | "yakuman" | "noYaku" | "normal";
    yakuList?: string[];
    numOfFu?: number;
    numOfHan?: number;
    score?: number | number[];
    message?: string;
}

interface CalculateResultProps {
    calculationResult: ScoreCalculationResult | null;
    isRon: boolean;
}

const CalculateResult: React.FC<CalculateResultProps> = ({ calculationResult, isRon }) => {
    if (!calculationResult) {
      return null;
    }
  
    const { status, yakuList, numOfFu, numOfHan, score, message } = calculationResult;

    const formatScore = (score: number | number[] | undefined, isRon: boolean) => {
      if (isRon) {
        return `${score}`;
      } else if (!isRon && typeof score === "number") {
        return `${score * 3}（${score}オール）`;
      } else if (!isRon && Array.isArray(score)) {
        return `${score[0] * 2 + score[1]}（子：${score[0]} 親：${score[1]}）`;
      }
      return "";
    };

    return (
        <div className="score-container">
          {status === "invalid" && (
            <div className="invalid-message">{message}</div>
          )}
          {status === "noYaku" && (
            <div className="no-yaku-message">{message}</div>
          )}
          {status === "yakuman" && (
            <div className="yakuman-container">
                {yakuList && (
                    <div className="yaku-list-container">
                        <p className="yaku-title">役</p>
                        <ul>
                            {yakuList.map((yaku, index) => (
                                <li key={index} className="yaku-contents">{yaku}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <p className="yakuman-type">{message}</p>
            </div>
          )}
          {status === "normal" && (
            <div className="normal-container">
                {yakuList && (
                    <div className="yaku-list-container">
                        <p className="yaku-title">役</p>
                        <ul>
                            {yakuList.map((yaku, index) => (
                                <li key={index} className="yaku-contents">{yaku}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="score-info-container">
                  <p className="fu-han-info">{numOfFu}符 {numOfHan}翻</p>
                  <p className="score-info">{formatScore(score, isRon)}</p>
                </div>
            </div>
          )}
        </div>
    );
};
  
export default CalculateResult;
