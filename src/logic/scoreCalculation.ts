import tilesData from "../data/tilesData";
import tileCount from "../utils/tileCount";
import calculateHan from "./calculateHan";
import checkHandValues from "./checkHandValues";
import checkSelectedTiles from "./checkSelectedTiles";
import countYakuman from "./countYakuman";

//選択された牌のリスト(srcの配列)から牌のラベルのリストを取得する関数
const getLabelsFromSrc = (selectedTiles: (string | null)[]) => {
    return selectedTiles.map((tileSrc) => {
        const matchedTile = tilesData.find((tile) => tile.src === tileSrc);
        return matchedTile ? matchedTile.label : null;
    });
};

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
) => {
    console.log(typeOfKan);
    const selectedLabels = getLabelsFromSrc(selectedTiles);
    const handStructures = checkSelectedTiles(selectedLabels, hasCalled, ponCount, chiiCount, kanCount);
    //不正な手牌の場合は計算せず終了
    if (handStructures === false) {
      console.log("あがれません");
      return;
    };

    console.log(handStructures);

    //役を確認

    // checkSelectedTilesによりnullを含まないことを保証
    const tileCountOfAll = tileCount(selectedLabels as string[]);
    const agariTile = selectedLabels[selectedLabels.length - 1] as string;
    //その他で選択されたオプション役の状態
    const otherOptions = [isRiichi, isIppatsu, isDoubleriichi, isRinshankaiho, isChankan, isHaitei, isHotei, isTenho, isChiho];
    const yakuList = checkHandValues(tileCountOfAll, handStructures, agariTile, kanCount, typeOfKan, hasCalled, isRon, bakaze, jikaze, otherOptions);
    console.log(yakuList);
    if (yakuList.length > 0) {
      //役満の確認
      countYakuman(yakuList);
      //通常役を確認
      console.log("通常役を確認します");
      const numOfHan = calculateHan(yakuList, hasCalled);
      console.log(numOfHan + "翻");
      return;
    }
};

export default scoreCalculation;
