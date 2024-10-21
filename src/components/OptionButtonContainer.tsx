import React, { useState } from 'react';
import '../App.css';
import { OptionButton1, OptionButton2} from './OptionButton';

interface OptionButtonContainerProps {
    hasCalled: boolean;
    setHasCalled: (value: boolean) => void;
    isRiichi: boolean;
    setIsRiichi: (value: boolean) => void;
    isRon: boolean;
    setIsRon: (value: boolean) => void;
    ponCount: number;
    setPonCount: (value: number) => void;
    chiiCount: number;
    setChiiCount: (value: number) => void;
    kanCount: number;
    setKanCount: (value: number) => void;
    bakaze: string
    setBakaze: (wind: string) => void;
    jikaze: string
    setJikaze: (wind: string) => void;
    numOfDora: number;
    setNumOfDora: (value: number) => void;
}

const OptionButtonContainer: React.FC<OptionButtonContainerProps> = ({
    hasCalled,
    setHasCalled,
    isRiichi,
    setIsRiichi,
    isRon,
    setIsRon,
    ponCount,
    setPonCount,
    chiiCount,
    setChiiCount,
    kanCount,
    setKanCount,
    bakaze,
    setBakaze,
    jikaze,
    setJikaze,
    numOfDora,
    setNumOfDora,
}) => {
  const [showBakazeOptions, setShowBakazeOptions] = useState(false);
  const [showJikazeOptions, setShowJikazeOptions] = useState(false);
  const winds = ["東","南","西","北"];

  const [showDoraOption, setShowDoraOption] = useState(false);

  const toggleBakazeOptions = () => {
    setShowBakazeOptions(!showBakazeOptions);
  };

  const toggleJikazeOptions = () => {
    setShowJikazeOptions(!showJikazeOptions);
  };

  const toggleDoraOption = () => {
    setShowDoraOption(!showDoraOption);
  };

  const selectBakaze = (wind: string) => {
    setBakaze(wind);
    setShowBakazeOptions(false);
  };

  const selectJikaze = (wind: string) => {
    setJikaze(wind);
    setShowJikazeOptions(false);
  };

  const selectDora = (value: number) => {
    setNumOfDora(value);
    setShowDoraOption(false);
  };

  return (
    <div className='option-container'>
        <div className='naki-option-set'>
          <label>鳴き：</label>
          <OptionButton1 label="あり" selected={hasCalled} onClick={() => setHasCalled(true)} />
          <OptionButton1 label="なし" selected={!hasCalled} onClick={() => setHasCalled(false)} />
        </div>

        {/* 鳴きありの場合にポン/チーの回数を表示 */}
        {hasCalled && (
          <>
            <OptionButton2
              values={[0, 1, 2, 3, 4]}
              selectedValue={ponCount}
              onClick={setPonCount}
              label='ポン'
            />
            <OptionButton2
              values={[0, 1, 2, 3, 4]}
              selectedValue={chiiCount}
              onClick={setChiiCount}
              label='チー'
            />
          </>
        )}

        {/* 鳴きなしの場合にリーチの選択を表示 */}
        {!hasCalled && (
          <div className='naki-option-set'>
            <label>リーチ：</label>
            <OptionButton1 label="あり" selected={isRiichi} onClick={() => setIsRiichi(true)} />
            <OptionButton1 label="なし" selected={!isRiichi} onClick={() => setIsRiichi(false)} />
          </div>
        )}

        {/* カンの回数 */}
        <OptionButton2
          values={[0, 1, 2, 3, 4]}
          selectedValue={kanCount}
          onClick={setKanCount}
          label='カン'
        />

        {/* あがり方 */}
        <div className='naki-option-set'>
          <label>あがり方：</label>
          <OptionButton1 label="ロン" selected={isRon} onClick={() => setIsRon(true)} />
          <OptionButton1 label="ツモ" selected={!isRon} onClick={() => setIsRon(false)} />
        </div>

        {/* 場風と自風の選択 */}
        <div className='wind-option'>
          <div>
            <label>場風：</label>
            <button className='wind-button' onClick={toggleBakazeOptions}>
              {bakaze}
            </button>
            {showBakazeOptions && (
              <div className='wind-dropdown-menu'>
                {winds.map((wind) => (
                  <div key={wind} onClick={() => selectBakaze(wind)}>
                    {wind}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label>自風：</label>
            <button className='wind-button' onClick={toggleJikazeOptions}>
              {jikaze}
            </button>
            {showJikazeOptions && (
              <div className='wind-dropdown-menu'>
                {winds.map((wind) => (
                  <div key={wind} onClick={() => selectJikaze(wind)}>
                    {wind}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ドラの数を選択 */}
        <div className='dora-option'>
          <label>ドラ：</label>
          <button className='dora-button' onClick={toggleDoraOption}>
            {numOfDora}
          </button>
          {showDoraOption && (
            <div className='dora-dropdown-menu'>
              {Array.from({ length: 45 }, (_, i) => (
                <div key={i} onClick={() => selectDora(i)}>
                  {i}
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  );
};

export default OptionButtonContainer;
