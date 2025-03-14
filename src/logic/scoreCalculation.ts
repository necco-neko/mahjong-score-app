import tilesData from "../data/tilesData";
import tileCount from "../utils/tileCount";
import calculateFu from "./calculateFu";
import calculateHan from "./calculateHan";
import checkHandValues from "./checkHandValues";
import checkSelectedTiles from "./checkSelectedTiles";
import countYakuman from "./countYakuman";
import getScoreFromTable from "./getScoreFromTable";

//選択された牌のリスト(srcの配列)から牌のラベルのリストを取得する関数
const getLabelsFromSrc = (selectedTiles: (string | null)[]) => {
    return selectedTiles.map((tileSrc) => {
        const matchedTile = tilesData.find((tile) => tile.src === tileSrc);
        return matchedTile ? matchedTile.label : null;
    });
};

interface ScoreCalculationResult {
  status: "invalid" | "yakuman" | "noYaku" | "normal";
  yakuList?: string[];
  numOfFu?: number;
  numOfHan?: number;
  score?: number | number[];
  message?: string;
}

const scoreCalculation = (
    hasCalled: boolean,
    isRiichi: boolean,
    isRon: boolean,
    ponCount: number,
    chiiCount: number,
    kanCount: number,
    bakaze: string,
    jikaze: string,
    isIppatsu: boolean,
    isDoubleriichi: boolean,
    isRinshankaiho: boolean,
    isChankan: boolean,
    isHaitei: boolean,
    isHotei: boolean,
    isTenho: boolean,
    isChiho: boolean,
    selectedTiles: (string | null)[],
    typeOfKan: boolean[],
    numOfDora: number,
): ScoreCalculationResult => {
    const selectedLabels = getLabelsFromSrc(selectedTiles);
    const handStructures = checkSelectedTiles(selectedLabels, hasCalled, ponCount, chiiCount, kanCount);
    //不正な手牌の場合は計算せず終了
    if (handStructures === false) {
      console.log("あがれません");
      return { status: "invalid", message: "不正な手牌のためあがれません。\nページのリロードまたは「全リセット」を行った後、\n再度入力し直してください。" };
    };

    //役を確認

    //不正の場合を除外したため、string,string[]として扱える
    const tileCountOfAll = tileCount(selectedLabels as string[]);
    const agariTile = selectedLabels[selectedLabels.length - 1] as string;

    //その他で選択されたオプション役の状態
    const otherOptions = [isRiichi, isIppatsu, isDoubleriichi, isRinshankaiho, isChankan, isHaitei, isHotei, isTenho, isChiho];

    //役リストとその時の手牌の構造を取得
    const { yakuList, bestStructure } = checkHandValues(tileCountOfAll, handStructures, agariTile, kanCount, typeOfKan, hasCalled, isRon, bakaze, jikaze, otherOptions);

    //役満の確認
    const yakumanCount = countYakuman(yakuList);
    if (yakumanCount > 0) { //役満があれば終了
      const yakumanText = yakumanCount === 1 ? "役満" : yakumanCount === 2 ? "ダブル役満" : yakumanCount === 3 ? "トリプル役満" : `${yakumanCount}倍役満`;
      return { status: "yakuman", yakuList: yakuList, message: yakumanText };
    }

    //通常役の翻数を計算
    let numOfHan = calculateHan(yakuList, hasCalled);

    //0翻数の場合は役なしを出力して終了
    if (numOfHan === 0) {
      console.log("役がありません");
      return { status: "noYaku", message: "役がないためあがれません。" };
    }

    //翻数および役リストにドラを加算
    numOfHan += numOfDora;
    yakuList.push(`ドラ${numOfDora}`);

    //符計算
    const numOfFu = calculateFu(bestStructure, hasCalled, isRon, bakaze, jikaze, agariTile, typeOfKan, yakuList);

    //〜符〜翻を出力
    

    //符・翻数に応じた点数を計算

    //親か子かを確認し、どの表を参照するか決定
    const isOya = jikaze === "東";

    //表から点数を取得
    const score = getScoreFromTable(numOfFu, numOfHan, isOya, isRon);
    
    console.log(yakuList);
    console.log(`${numOfFu}符 ${numOfHan}翻`);
    console.log(score);

    return {
      status: "normal",
      yakuList: yakuList,
      numOfFu: numOfFu,
      numOfHan: numOfHan,
      score: score
    };
};

export default scoreCalculation;
