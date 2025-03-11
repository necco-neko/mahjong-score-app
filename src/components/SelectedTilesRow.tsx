import React from 'react';
import './SelectedTilesRow.css';
import HandContainer from './HandContainer';

interface SelectedTilesRowProps {
    ponCount: number;
    chiiCount: number;
    kanCount: number;
    hasCalled: boolean;
    selectedTiles: (string | null)[];
    typeOfKan: boolean[];
    setTypeOfKan: (index: number, value: boolean) => void;
}

export const SelectedTilesRow: React.FC<SelectedTilesRowProps> = ({ ponCount, chiiCount, kanCount, hasCalled, selectedTiles, typeOfKan, setTypeOfKan }) => {
    const nakiCount = ponCount + chiiCount + kanCount
    const backTileSrc = `${process.env.PUBLIC_URL}/mahjong-score-app/tupai2_1/p_bk_1.gif`;

    const getDisplayedTiles = (kanType: boolean) => {
        //明カンならそのまま
        if (kanType) {
            return selectedTiles;
        }
        //暗カンの場合
        const displayedTiles = [...selectedTiles];
        let currentIndex = 13 - kanCount * 3;
        //カンの牌を入力完了後、両端を裏面にする
        for (let i = 0; i < kanCount; i++) {
            if (displayedTiles[currentIndex + 3] !== null) {
                displayedTiles[currentIndex] = backTileSrc;
                displayedTiles[currentIndex + 3] = backTileSrc;
            }
            currentIndex += 4;
        }
        return displayedTiles;
    };

    if (!hasCalled) {// 鳴き無しの場合(暗カンは存在し得る)
        const handNum = 13 - kanCount * 3
        return (
            <div className='selected-tiles-container'>
                <div className='child-container'>
                    <HandContainer
                        label='手牌'
                        tiles={selectedTiles}
                        startIndex={0}
                        endIndex={handNum - 1}
                    />
                    {[...Array(kanCount)].map((_, index) => (
                        <HandContainer
                            key={`kan-${index + 1}`}
                            label={`カン${index + 1}`}
                            tiles={getDisplayedTiles(typeOfKan[index])}
                            startIndex={handNum + index * 4}
                            endIndex={handNum + index * 4 + 3}
                        />
                    ))}
                    <HandContainer
                        label='あがり牌'
                        tiles={selectedTiles}
                        startIndex={selectedTiles.length - 1}
                        endIndex={selectedTiles.length - 1}
                    />
                </div>
            </div>
        )
    } else if (nakiCount > 4) {// 鳴き回数が過剰な場合
        return (
            <div className="error-text">鳴き回数の合計が4回を超えています</div>
        )
    } else {// 鳴きあり、かつ、回数も正常な場合
        const handNum = 13 - nakiCount * 3;
        return (
            <div className='selected-tiles-container'>
                <div className='child-container'>
                    <HandContainer
                        label='手牌'
                        tiles={selectedTiles}
                        startIndex={0}
                        endIndex={handNum - 1}
                    />
                    {[...Array(ponCount)].map((_, index) => (
                        <HandContainer
                            key={`pon-${index + 1}`}
                            label={`ポン${index + 1}`}
                            tiles={selectedTiles}
                            startIndex={handNum + index * 3}
                            endIndex={handNum + index * 3 + 2}
                        />
                    ))}
                    {[...Array(chiiCount)].map((_, index) => (
                        <HandContainer
                            key={`chii-${index + 1}`}
                            label={`チー${index + 1}`}
                            tiles={selectedTiles}
                            startIndex={handNum + ponCount * 3 + index * 3}
                            endIndex={handNum + ponCount * 3 + index * 3 + 2}
                        />
                    ))}
                    {[...Array(kanCount)].map((_, index) => (
                        <div key={`kan-${index + 1}`} className="kan-container">
                            <HandContainer
                                key={`kan-${index + 1}`}
                                label={`カン${index + 1}`}
                                tiles={getDisplayedTiles(typeOfKan[index])}
                                startIndex={handNum + ponCount * 3 + chiiCount * 3 + index * 4}
                                endIndex={handNum + ponCount * 3 + chiiCount * 3 + index * 4 + 3}
                            />
                            <input
                                type="checkbox"
                                className='kan-checkbox'
                                checked={typeOfKan[index]}
                                onChange={(e) => setTypeOfKan(index, e.target.checked)}
                            />
                            <span className="kan-label">明カン</span>
                        </div>
                    ))}
                    <HandContainer
                        label='あがり牌'
                        tiles={selectedTiles}
                        startIndex={selectedTiles.length - 1}
                        endIndex={selectedTiles.length - 1}
                    />
                </div>
            </div>
        )
    }
}