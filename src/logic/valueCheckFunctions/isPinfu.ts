const isPinfu = (structure: string[][], hasCalled: boolean, agariTile: string): boolean => {
    //鳴きありの場合、不成立
    if (hasCalled) {
        return false;
    }

    //雀頭1・順子4であるか確認
    const sequences: string[][] = [];
    let pair = false;

    for (const group of structure) {
        if (group.length >= 3 && group[0] === group[1]) {
            //刻子(槓子)が含まれているので不成立
            return false;
        } else if (group.length === 3) {
            //刻子以外で長さが3のものは順子のみ
            sequences.push(group);
        } else {
            //その他は雀頭
            pair = true
        }
    }
    
    //雀頭が存在しないか順子が4なければ不成立
    if (!pair || sequences.length !== 4) {
        return false;
    }

    for (const sequence of sequences) {
        if (sequence.includes(agariTile)) {
            const num1 = parseInt(sequence[0][1]);
            const num3 = parseInt(sequence[2][1]);
            const agariNum = parseInt(agariTile[1]);

            //順子が[1,2,3]または[7,8,9]のいずれかの場合、あがり牌は1または9でなければならない。
            if (num1 === 1 || num3 === 9) {
                if (agariNum === 1 || agariNum === 9) {
                    return true; //平和成立
                } else {
                    return false; //あがり牌が1,9でない場合不成立
                }
            }

            //その他の順子の場合、あがり牌が中央の数字でないことを確認
            const num2 = parseInt(sequence[1][1]);
            if (agariNum !== num2) {
                return true; //平和成立
            }
        }
    }

    return false;
};

export default isPinfu;
