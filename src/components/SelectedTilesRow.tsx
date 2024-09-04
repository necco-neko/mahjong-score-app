import React from 'react';
import '../App.css';
import HandContainer from './HandContainer';

interface SelectedTilesRowProps {
    ponCount: number;
    chiiCount: number;
    kanCount: number;
    selectedOption1: boolean;
    selectedTiles: (string | null)[];
}

export const SelectedTilesRow: React.FC<SelectedTilesRowProps> = ({ ponCount, chiiCount, kanCount, selectedOption1, selectedTiles }) => {
    const nakiCount = ponCount + chiiCount + kanCount
    if (!selectedOption1) {
        const handNum = 12 - kanCount * 3
        return (
            <div>
                <HandContainer
                    label='手牌'
                    tiles={selectedTiles}
                    startIndex={0}
                    endIndex={handNum}
                />
                {[...Array(kanCount)].map((_, index) => (
                    <HandContainer
                        key={`kan-${index + 1}`}
                        label={`カン${index + 1}`}
                        tiles={selectedTiles}
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
        )
    } else if (nakiCount > 4) {
        return (
            <div className="error-text">鳴き回数の合計が4回を超えています</div>
        )
    } else {
        const handNum = 12 - nakiCount * 3;
        return (
            <div>
                <HandContainer
                    label='手牌'
                    tiles={selectedTiles}
                    startIndex={0}
                    endIndex={handNum}
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
                    <HandContainer
                        key={`kan-${index + 1}`}
                        label={`カン${index + 1}`}
                        tiles={selectedTiles}
                        startIndex={handNum + ponCount * 3 + chiiCount * 3 + index * 4}
                        endIndex={handNum + ponCount * 3 + chiiCount * 3 + index * 4 + 3}
                    />
                ))}
                <HandContainer
                    label='あがり牌'
                    tiles={selectedTiles}
                    startIndex={selectedTiles.length - 1}
                    endIndex={selectedTiles.length - 1}
                />
            </div>
        )
    }
}