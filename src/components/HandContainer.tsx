import React from 'react';
import './HandContainer.css';

interface HandContainerProps {
    label: string;
    tiles: (string | null)[];
    startIndex: number;
    endIndex: number;
}

const HandContainer: React.FC<HandContainerProps> = ({ label, tiles, startIndex, endIndex }) => {
    return (
        <div className='hand-container'>
            <div className='hand-label'>{label}：</div>
            <div className='tiles-row'>
                {tiles.slice(startIndex, endIndex + 1).map((tile, index) => (
                    <div className='selected-tiles' key={index}>
                        {tile && <img src={tile} alt={`Tile ${startIndex + index + 1}`} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HandContainer;