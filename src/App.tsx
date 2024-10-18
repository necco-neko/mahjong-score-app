import React, { useState, useEffect } from 'react';
import './App.css';
import tilesData from './data/tilesData';
import { SelectedTilesRow } from './components/SelectedTilesRow';
import OptionButtonContainer from './components/OptionButtonContainer';
import OtherOptions from './components/OtherOptions';
import scoreCalculation from './logic/scoreCalculation';

const App: React.FC = () => {
  //選択オプション
  const [hasCalled, setHasCalled] = useState<boolean>(false);
  const [isRiichi, setIsRiichi] = useState<boolean>(false);
  const [isRon, setIsRon] = useState<boolean>(false);
  const [ponCount, setPonCount] = useState<number>(0);
  const [chiiCount, setChiiCount] = useState<number>(0);
  const [kanCount, setKanCount] = useState<number>(0);
  const [bakaze, setBakaze] = useState<string>("東");
  const [jikaze, setJikaze] = useState<string>("東");

  //「その他」内の選択オプション
  const [isIppatsu, setIsIppatsu] = useState(false); //リーチ一発
  const [isDoubleriichi, setIsDoubleriichi] = useState(false); //ダブルリーチ
  const [isRinshankaiho, setIsRinshankaiho] = useState(false); //嶺上開花
  const [isChankan, setIsChankan] = useState(false); //槍槓
  const [isHaitei, setIsHaitei] = useState(false);
  const [isHotei, setIsHotei] = useState(false);
  const [isTenho, setIsTenho] = useState(false);
  const [isChiho, setIsChiho] = useState(false);

  //選択された牌の記録
  const [selectedTiles, setSelectedTiles] = useState<(string | null)[]>(Array(14).fill(null));

  //カンの種類(true: 明カン, false: 暗カン)
  const [typeOfKan, setTypeOfKan] = useState<boolean[]>(Array(kanCount).fill(false));

  // カンの種類を更新する関数
  const handleSetTypeOfKan = (index: number, value: boolean) => {
    const newTypeOfKan = [...typeOfKan];
    newTypeOfKan[index] = value;
    setTypeOfKan(newTypeOfKan);
  };

  // selectedOption1がfalseに変更された(鳴きなしのとき)、typeOfKanを全てfalseにする
  useEffect(() => {
    if (!hasCalled) {
      setTypeOfKan(Array(kanCount).fill(false));
    }
  }, [hasCalled, kanCount]);

  //麻雀牌クリックによる牌ロットへの追加処理
  const handleTilesClick = (src: string) => {
    //ロットに空欄があることを確認(あれば最初のインデックスを返し、なければ-1を返す)
    const index = selectedTiles.findIndex(src => src === null);
    if (index !== -1) {
      const newTiles = [...selectedTiles];
      newTiles[index] = src;
      setSelectedTiles(newTiles);
    }
  };

  //選択されたカンの回数に応じて更新
  useEffect(() => {
    setSelectedTiles(Array(14 + kanCount).fill(null));
    setTypeOfKan(Array(kanCount).fill(false));
  }, [kanCount]);

  //一つ戻るボタンの処理
  const backTiles = () => {
    const newTiles = [...selectedTiles];
    for (let i = newTiles.length - 1; i >= 0; i--) {
      if (newTiles[i] !== null) {
        newTiles[i] = null;
        break;
      }
    }
    setSelectedTiles(newTiles);
  };

  //牌リセットボタンの処理
  const resetTiles = () => {
    setSelectedTiles(Array(14 + kanCount).fill(null))
  };

  //全リセットボタンの処理
  const resetAll = () => {
    setHasCalled(false);
    setIsRiichi(false);
    setIsRon(false);
    setPonCount(0);
    setChiiCount(0);
    setKanCount(0);
    setBakaze("東");
    setJikaze("東");
    setSelectedTiles(Array(14).fill(null));
    setTypeOfKan(Array(0).fill(false));
    setIsIppatsu(false);
    setIsDoubleriichi(false);
    setIsRinshankaiho(false);
    setIsChankan(false);
    setIsHaitei(false);
    setIsHotei(false);
    setIsTenho(false);
    setIsChiho(false);
  };

  //計算ボタンの処理
  const calculateScore = () => {
    scoreCalculation(hasCalled, isRiichi, isRon, ponCount, chiiCount, kanCount, bakaze, jikaze, isIppatsu, isDoubleriichi, isRinshankaiho, isChankan, isHaitei, isHotei, isTenho, isChiho, selectedTiles, typeOfKan);
  };

  return (
    <div className='container'>
      {/*タイトル*/}
      <h1 className='title'>麻雀点数計算</h1>
      {/*オプションボタン*/}
      <OptionButtonContainer
        hasCalled={hasCalled}
        setHasCalled={setHasCalled}
        isRiichi={isRiichi}
        setIsRiichi={setIsRiichi}
        isRon={isRon}
        setIsRon={setIsRon}
        ponCount={ponCount}
        setPonCount={setPonCount}
        chiiCount={chiiCount}
        setChiiCount={setChiiCount}
        kanCount={kanCount}
        setKanCount={setKanCount}
        bakaze={bakaze}
        setBakaze={setBakaze}
        jikaze={jikaze}
        setJikaze={setJikaze}
      />
      {/*その他のオプション*/}
      <OtherOptions
        hasCalled={hasCalled}
        isRiichi={isRiichi}
        isRon={isRon}
        isKan={kanCount > 0}
        isIppatsu={isIppatsu}
        setIsIppatsu={setIsIppatsu}
        isDoubleriichi={isDoubleriichi}
        setIsDoubleriichi={setIsDoubleriichi}
        isRinshankaiho={isRinshankaiho}
        setIsRinshankaiho={setIsRinshankaiho}
        isChankan={isChankan}
        setIsChankan={setIsChankan}
        isHaitei={isHaitei}
        setIsHaitei={setIsHaitei}
        isHotei={isHotei}
        setIsHotei={setIsHotei}
        isTenho={isTenho}
        setIsTenho={setIsTenho}
        isChiho={isChiho}
        setIsChiho={setIsChiho}
      />
      {/*麻雀牌の選択肢*/}
      <div className="tiles-row">
        {tilesData.map((tile, index) => (
          <img key={index} src={tile.src} alt={`Tiles ${index + 1}`} onClick={() => handleTilesClick(tile.src)} className="tiles" />
        ))}
      </div>
      {/*選択された麻雀牌を表示*/}
      <SelectedTilesRow 
        ponCount={ponCount} 
        chiiCount={chiiCount} 
        kanCount={kanCount} 
        hasCalled={hasCalled} 
        selectedTiles={selectedTiles}
        typeOfKan={typeOfKan}
        setTypeOfKan={handleSetTypeOfKan}
      />
      {/*ボタン各種*/}
      <div className='button-container'>
        <button onClick={backTiles}>一つ戻る</button>
        <button onClick={resetTiles}>牌リセット</button>
        <button onClick={resetAll}>全リセット</button>
        <button onClick={calculateScore}>計算する</button>
      </div>
    </div>
  )
}

export default App;
