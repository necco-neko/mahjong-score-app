const checkWind = (jikaze: string, bakaze: string, tileCount: { [key: string]: number }): string[] => {
    const yakuList: string[] = [];

    //風は日本語入力なので牌名(英語)に変換
    const windTranslate: { [key: string]: string } = {
        "東": "east",
        "南": "south",
        "西": "west",
        "北": "north"
    };
    const jikazeKey = windTranslate[jikaze];
    const bakazeKey = windTranslate[bakaze];

    //自風の確認
    if (tileCount[jikazeKey] >= 3) {
        yakuList.push(`門風牌(${jikaze})`);
    }

    //場風の確認
    if (tileCount[bakazeKey] >= 3) {
        yakuList.push(`荘風牌(${bakaze})`);
    }

    return yakuList;
};

export default checkWind;