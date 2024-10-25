import { manganTableKo, manganTableOya, scoreTableKo, scoreTableOya } from "../data/scoreTable";

const getScoreFromTable = (numOfFu: number, numOfHan: number, isOya: boolean, isRon: boolean): number | number[] => {
    if (isOya) { //親の場合
        if (numOfHan <= 4) { //4翻以下はscoreTableから点数を取得
            if (isRon) {
                return scoreTableOya[numOfFu][numOfHan].ron;
            } else {
                return scoreTableOya[numOfFu][numOfHan].tsumo;
            }
        } else if (numOfHan <= 12 ){ //5〜12翻はmanganTableから点数を取得
            if (isRon) {
                return manganTableOya[numOfHan].ron;
            } else {
                return manganTableOya[numOfHan].tsumo;
            }
        } else { //13翻以上は数え役満(13翻)とする
            if (isRon) {
                return manganTableOya[13].ron;
            } else {
                return  manganTableOya[13].tsumo;
            }
        }
    } else { //子の場合
        if (numOfHan <= 4) { //4翻以下はscoreTableから点数を取得
            if (isRon) {
                return scoreTableKo[numOfFu][numOfHan].ron;
            } else {
                return scoreTableKo[numOfFu][numOfHan].tsumo;
            }
        } else if (numOfHan <= 12 ){ //5〜12翻はmanganTableから点数を取得
            if (isRon) {
                return manganTableKo[numOfHan].ron;
            } else {
                return manganTableKo[numOfHan].tsumo;
            }
        } else { //13翻以上は数え役満(13翻)とする
            if (isRon) {
                return manganTableKo[13].ron;
            } else {
                return  manganTableKo[13].tsumo;
            }
        }
    }
};

export default getScoreFromTable;