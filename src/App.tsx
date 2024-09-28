import React, { useState, useEffect } from 'react';
import './App.css';
import tilesData from './data/tilesData';
import { SelectedTilesRow } from './components/SelectedTilesRow';
import OptionButtonContainer from './components/OptionButtonContainer';
import checkSelecetedTiles from './logic/checkSelectedLabels';

const App: React.FC = () => {
  //選択オプション
  const [selectedOption1, setSelectedOption1] = useState<boolean>(false);
  const [selectedOption2, setSelectedOption2] = useState<boolean>(false);
  const [selectedOption3, setSelectedOption3] = useState<boolean>(false);
  const [ponCount, setPonCount] = useState<number>(0);
  const [chiiCount, setChiiCount] = useState<number>(0);
  const [kanCount, setKanCount] = useState<number>(0);

  //選択された牌の記録
  const [selectedTiles, setSelectedTiles] = useState<(string | null)[]>(Array(14).fill(null));

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
    setSelectedOption1(false);
    setSelectedOption2(false);
    setSelectedOption3(false);
    setPonCount(0);
    setChiiCount(0);
    setKanCount(0);
    setSelectedTiles(Array(14).fill(null));
  };

  //選択された牌のリスト(srcの配列)から牌のラベルのリストを取得する関数
  const getLabelsFromSrc = (selectedTiles: (string | null)[]) => {
    return selectedTiles.map((tileSrc) => {
      const matchedTile = tilesData.find((tile) => tile.src === tileSrc);
      return matchedTile ? matchedTile.label : null;
    });
  };

  //計算ボタンの処理
  const calculateScore = () => {
    const selectedLabels = getLabelsFromSrc(selectedTiles);
    const isValid = checkSelecetedTiles(selectedLabels, ponCount, chiiCount, kanCount);
    console.log(isValid);
  };

  return (
    <div className='container'>
      {/*タイトル*/}
      <h1 className='title'>麻雀点数計算</h1>
      {/*オプションボタン*/}
      <OptionButtonContainer
        selectedOption1={selectedOption1}
        setSelectedOption1={setSelectedOption1}
        selectedOption2={selectedOption2}
        setSelectedOption2={setSelectedOption2}
        selectedOption3={selectedOption3}
        setSelectedOption3={setSelectedOption3}
        ponCount={ponCount}
        setPonCount={setPonCount}
        chiiCount={chiiCount}
        setChiiCount={setChiiCount}
        kanCount={kanCount}
        setKanCount={setKanCount}
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
        selectedOption1={selectedOption1} 
        selectedTiles={selectedTiles} 
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
