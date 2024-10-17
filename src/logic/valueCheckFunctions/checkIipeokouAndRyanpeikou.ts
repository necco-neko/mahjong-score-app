const checkIipeikouAndRyanpeikou  = (structure: string[][], hasCalled: boolean): string | false => {
    //鳴きありの場合はいずれも不成立
    if (hasCalled) {
        return false;
    }
    
    //順子のカウント用マップ
    const sequenceCount: { [key: string]: number } = {};

    //構造内の順子をカウントする
    structure.forEach(group => {
        if (group.length === 3 && parseInt(group[1][1]) === parseInt(group[0][1]) + 1) {
            const sequenceKey = group.join('');
            if (sequenceCount[sequenceKey]) {
                sequenceCount[sequenceKey]++;
            } else {
                sequenceCount[sequenceKey] = 1;
            }
        }
    });

    let iipeikouCount = 0;

    //2つ以上ある順子をカウントする
    Object.values(sequenceCount).forEach(count => {
        if (count >= 2) {
            iipeikouCount++;
        }
    });

    if (iipeikouCount === 2) {
        return "二盃口";
    } else if (iipeikouCount === 1) {
        return "一盃口";
    }

    return false;
};

export default checkIipeikouAndRyanpeikou;
