const isSanshokuDouko = (structure: string[][]): boolean => {
    const triplets: { [key: string]: number[] } = {
        'm': [],
        'p': [],
        's': [],
    };

    structure.forEach(group => {
        //groupが3枚かつ1枚目と2枚目が同じであれば刻子(structureの正当性に基づく)
        if (group.length === 3 && group[0] === group[1]) {
            const suit = group[0][0];
            const number = parseInt(group[0][1]);

            //萬子・筒子・索子ごとに刻子の数字を配列に追加
            triplets[suit].push(number);
        }
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