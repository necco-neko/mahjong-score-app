const isSanshokuDouko = (structure: string[][], ponTiles: string[][]): boolean => {
    const triplets: { [key: string]: number[] } = {
        'm': [],
        'p': [],
        's': [],
    };
    //字牌のリスト
    const jihaiList = ["east", "south", "west", "north", "haku", "hatsu", "chun"];

    structure.forEach(group => {
        console.log(group);
        //groupが刻子であることと数牌であることを確認
        if (group.length === 3 && group[0] === group[1] && !jihaiList.includes(group[0])) {
            const suit = group[0][0];
            const number = parseInt(group[0][1]);

            //萬子・筒子・索子ごとに刻子の数字を配列に追加
            triplets[suit].push(number);
        }
    });

    //ポンした牌についても刻子としてカウント
    ponTiles.forEach(pon => {
        const suit = pon[0][0];
        const number = parseInt(pon[0][1]);

        triplets[suit].push(number);
    });

    //萬子・筒子・索子の全てに含まれる数字があれば成立
    for (const number of triplets['m']) {
        if (triplets['p'].includes(number) && triplets['s'].includes(number)) {
            return true;
        }
    }

    return false;
}

export default isSanshokuDouko;