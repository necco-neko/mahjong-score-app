const isIkkiTsukan = (structure: string[][], chiiTiles: string[][]): boolean => {
    const sequences: { [key: string]: number[] } = {
        'm': [],
        'p': [],
        's': [],
    };

    structure.forEach(group => {
        //groupが3枚かつ1枚目と2枚目が連番であれば順子(structureの正当性に基づく)
        if (group.length === 3 && parseInt(group[1][1]) === parseInt(group[0][1]) + 1) {
            const suit = group[0][0];
            const startNumber = parseInt(group[0][1]);

            //萬子・筒子・索子ごとに順子の最初の数字を配列に追加
            sequences[suit].push(startNumber);
        }
    });

    //チーした牌についても順子としてカウント
    chiiTiles.forEach(chii => {
        const suit = chii[0][0];
        const startNumber = parseInt(chii[0][1]);

        sequences[suit].push(startNumber);
    });

    //同じ種類で1,4,7から始まる順子が全て存在すれば一気通貫成立
    for (const suit of ['m', 'p', 's']) {
        if (sequences[suit].includes(1) && sequences[suit].includes(4) && sequences[suit].includes(7)) {
            return true;
        }
    }

    return false;
};

export default isIkkiTsukan;