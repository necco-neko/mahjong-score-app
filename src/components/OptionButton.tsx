import React from 'react';
import './OptionButton.css';

interface OptionButton1Props {
    label: string;
    selected: boolean;
    onClick: () => void;
}

interface OptionButton2Props {
    values: number[];
    selectedValue: number;
    onClick: (value: number) => void;
    label: string;
}

export const OptionButton1: React.FC<OptionButton1Props> = ({ label, selected, onClick }) => (
    <button className={`option-button ${selected ? 'selected' : ''}`} onClick={onClick}>
        {label}
    </button>
);

export const OptionButton2: React.FC<OptionButton2Props> = ({ values, selectedValue, onClick, label }) => {
    return (
        <div className='naki-option-set'>
            <label>{label}：</label>
            {values.map((value) => (
                <button
                    key={value}
                    className={`option-button ${selectedValue === value ? 'selected' : ''}`}
                    onClick={() => onClick(value)}
                >
                    {value}
                </button>
            ))}
            回
        </div>
    );
};