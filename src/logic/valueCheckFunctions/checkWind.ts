const checkWind = (jikaze: string, bakaze: string, tileCount: { [key: string]: number }): string[] => {
    const yakuList: string[] = [];

    //自風の確認
    if (tileCount[jikaze] >= 3) {
        yakuList.push(`門風牌(${jikaze})`);
    }

    //場風の確認
    if (tileCount[bakaze] >= 3) {
        yakuList.push(`荘風牌(${bakaze})`);
    }

    return yakuList;
};

export default checkWind;