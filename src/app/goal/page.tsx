// import { useEffect, useRef, useState } from "react";
// import bombImg from "../assets/img/bomb.png";
// import explosionImg from "../assets/img/expolition.png";
// import useIsMobile from "@/hooks/useIsMobile";
// import axiosServices from "@/util/axios";
// import { generateHash } from "@/util/generateHash";
// import SwitchTab from "@/components/SwitchTab";
// import AmountInput from "@/components/AmountInput";
// import { Button } from "@heroui/react";
// import { BallIcon } from "@/components/svgs";
// import CurrencyIcon from "@/components/CurrencyIcon";
// import CustomInput from "@/components/CustomInput";

// const grids = {
//     0: {
//         w: 3,
//         h: 4,
//         multipliers: [1.45, 2.18, 3.27, 4.91].reverse()
//     },
//     1: {
//         w: 4,
//         h: 7,
//         multipliers: [1.29, 1.72, 2.30, 3.30, 4.09, 5.45, 7.27].reverse()
//     },
//     2: {
//         w: 5,
//         h: 10,
//         multipliers: [1.21, 1.52, 1.89, 2.37, 2.96, 3.79, 4.64, 5.78, 7.23, 9.03].reverse()
//     },
// }

// export const hashToColumnPosition = (hash: string, gridWidth: number): number => {
//     return parseInt(hash.substring(0, 8), 16) % gridWidth;
// };

// let isSoundEnable = false;

// const playAudio = (key: string) => {
//     if (!isSoundEnable) return;
//     try {
//         if (key === "bet") {
//             const auido = new Audio();
//             auido.src = "/assets/audio/bet.DUx2OBl3.mp3";
//             auido.play().then(() => { }).catch((error: any) => {
//                 console.log("Failed to autoplay audio:", error);
//             });
//         } else if (key === "success") {
//             const auido = new Audio();
//             auido.src = "/assets/audio/success.wav";
//             auido.volume = .5;
//             auido.play().then(() => { }).catch((error: any) => {
//                 console.log("Failed to autoplay audio:", error);
//             });
//         } else if (key === "move") {
//             const auido = new Audio();
//             auido.src = "/assets/audio/goal_ball_move.mp3";
//             auido.play().then(() => { }).catch((error: any) => {
//                 console.log("Failed to autoplay audio:", error);
//             });
//         } else if (key === "win") {
//             const audio = new Audio();
//             audio.src = "/assets/audio/win.BpDMfFMt.mp3";
//             audio.play().then(() => { }).catch((error: any) => {
//                 console.log("Failed to autoplay audio:", error);
//             });
//         } else if (key === "loss") {
//             const audio = new Audio();
//             audio.src = "/assets/audio/lose.CSJf_1E1.mp3";
//             audio.play().then(() => { }).catch((error: any) => {
//                 console.log("Failed to autoplay audio:", error);
//             })
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// const GoalGame = () => {
//     const isMobile = useIsMobile();
//     const [activeTab, setActiveTab] = useState(0);
//     const [activeLevel, setLevel] = useState<0 | 1 | 2>(0);
//     const [betAmount, setBetAmount] = useState(0);
//     const [gameId, setGameId] = useState("");
//     const [privateHash, setPrivateHash] = useState("");
//     const [publicKey, setPublicKey] = useState("");
//     const [privatekey, setPrivateKey] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [showResult, setShowModal] = useState(false);
//     const [profit, setProfit] = useState(0);
//     const [multiplier, setMultiplier] = useState(1);
//     const groundRef = useRef<any>(null);
//     const startRef = useRef<any>(null);
//     const goalRef = useRef<any>(null);

//     const [rounds, setRounds] = useState<{ position: number, lossPostion: number }[]>([]);

//     const [ballPosition, setBallPosition] = useState({ x: 0, y: 0, w: 0, h: 0 });

//     const [bombs, setBombs] = useState<number[]>([]);
//     const [isEnd, setEnd] = useState(false);
//     const [linePositions, setLinePositions] = useState<
//         { x1: number, y1: number, x2: number, y2: number }[]
//     >([]);

//     const currentGrid = grids[activeLevel];
//     const multipliers = currentGrid.multipliers;
//     const isLoss = (rounds.length > 0 && rounds[rounds.length - 1].position == rounds[rounds.length - 1].lossPostion);
//     const inPlayDisable = gameId !== "" || loading;

//     const handleCellClick = async (position: number) => {
//         setLoading(true);
//         if (inPlayDisable) {
//             const { data } = await axiosServices.post("/goal/bet", { position });
//             playAudio("move");
//             const { status, result } = data;
//             if (status) {
//                 if (result === "LOST" || result === "WIN") {
//                     setPrivateKey(data.privateKey);
//                     setGameId("");
//                     const _bombs = [];
//                     for (let i = data.rounds.length; i < currentGrid.h; i++) {
//                         const roundHash = generateHash(data.privateKey + publicKey + i);
//                         _bombs.push(hashToColumnPosition(roundHash, currentGrid.w));
//                     }
//                     setBombs(_bombs);
//                     setEnd(true);
//                     if (result === "WIN") {
//                         setProfit(data.profit);
//                         setMultiplier(data.multiplier);
//                         setShowModal(true);
//                         playAudio("win");
//                     } else {
//                         playAudio("loss");
//                     }
//                 }
//                 setRounds(data.rounds);
//             }
//         } else {
//             toast.error("Please create bet");
//         }
//         setLoading(false);
//     };

//     const createBet = async () => {
//         setRounds([]);
//         setShowModal(false);
//         setLoading(true);
//         setPrivateKey("");
//         try {
//             const { data } = await axiosServices.post("/goal/create-bet", {
//                 amount: betAmount,
//                 currency: "",
//                 size: activeLevel
//             });
//             playAudio("bet");
//             const { status, size, amount, currency } = data;
//             if (size !== activeLevel) {
//                 setLevel(size);
//             }
//             if (status) {
//                 setGameId(data.gameId);
//                 setBetAmount(amount);
//                 setPrivateHash(data.privateHash);
//                 setRounds(data.rounds);
//                 setPublicKey(data.publicKey);
//                 setEnd(false);
//             }
//         } catch (error) {
//         }
//         setLoading(false);
//     }

//     const cashOut = async () => {
//         if (loading) return;
//         setLoading(true);
//         try {
//             const { data } = await axiosServices.post("/goal/cashout");
//             const _bombs = [];
//             for (let i = data.rounds.length; i < currentGrid.h; i++) {
//                 const roundHash = generateHash(data.privateKey + data.publicKey + i);
//                 _bombs.push(hashToColumnPosition(roundHash, currentGrid.w));
//             }
//             playAudio("win");
//             setBombs(_bombs);
//             setEnd(true);
//             setGameId("");
//             setLevel(data.size);
//             setPrivateKey(data.privateKey);
//             setProfit(data.profit);
//             setMultiplier(data.multiplier);
//             setShowModal(true);
//         } catch (error) {
//         }
//         setLoading(false);
//     }

//     const buttonStatus = () => {
//         if (gameId !== "") {
//             return "Cashout";
//         } else {
//             return "Bet";
//         }
//     }

//     const calculateBallPostion = () => {
//         if (groundRef.current) {
//             const container = groundRef.current as HTMLDivElement;
//             const startPos = startRef.current as HTMLDivElement;
//             const goalPos = goalRef.current as HTMLDivElement;
//             const w = Math.floor(container.clientWidth / currentGrid.w);
//             const h = Math.floor(container.clientHeight / currentGrid.h);
//             const rect = container.getBoundingClientRect();
//             let x = 0;
//             let y = 0;
//             let bw = 0;
//             if (rounds.length === 0) {
//                 const react1 = startPos.getBoundingClientRect();
//                 x = container.clientWidth / 2;
//                 y = react1.top - rect.top;
//                 bw = startPos.clientHeight * .7;
//             } else {
//                 const lastRound = rounds[rounds.length - 1];
//                 x = Math.floor(w / 2) + w * lastRound.position;
//                 y = Math.floor(h / 2) + h * (currentGrid.h - rounds.length);
//                 bw = h * .7;
//             }
//             setBallPosition({
//                 x: x,
//                 y: y,
//                 w: bw,
//                 h: bw
//             });

//             if (rounds.length !== 0 && rounds.length === currentGrid.h && !isLoss) {
//                 const react1 = goalPos.getBoundingClientRect();
//                 let y1 = react1.top - rect.top;
//                 let x1 = container.clientWidth / 2;
//                 let bw1 = goalPos.clientHeight * .7;
//                 setTimeout(() => {
//                     setBallPosition({
//                         x: x1,
//                         y: y1,
//                         w: bw1 * 4,
//                         h: bw1 * 4
//                     });
//                     setTimeout(() => {
//                         setLinePositions((prev) => prev.length !== rounds.length ? [...prev, {
//                             x1: x,
//                             y1: y,
//                             x2: x1,
//                             y2: y1
//                         }] : [...prev]);
//                     }, 300);
//                 }, 500);
//             }

//             if (rounds.length - 1 !== linePositions.length) {
//                 calculateLines();
//             } else {
//                 setTimeout(() => {
//                     calculateLines();
//                 }, 300);
//             }
//         }
//     }

//     const calculateLines = () => {
//         const container = groundRef.current as HTMLDivElement;
//         const w = Math.floor(container.clientWidth / currentGrid.w);
//         const h = Math.floor(container.clientHeight / currentGrid.h);

//         let positions: { x1: number, y1: number, x2: number, y2: number }[] = [];

//         rounds.forEach((round, index) => {
//             if (index < rounds.length - 1) {
//                 const currentRound = rounds[index];
//                 const nextRound = rounds[index + 1];

//                 const x1 = Math.floor(w / 2) + w * (currentRound.position);
//                 const y1 = Math.floor(h / 2) + h * (currentGrid.h - index - 1);

//                 const x2 = Math.floor(w / 2) + w * nextRound.position;
//                 const y2 = Math.floor(h / 2) + h * (currentGrid.h - index - 2);

//                 positions.push({ x1, y1, x2, y2 });
//             }
//         });

//         setLinePositions(positions);
//     };

//     const handleBetButton = () => {
//         !inPlayDisable ? createBet() : cashOut();
//     }

//     useEffect(() => {
//         calculateBallPostion();
//         if (groundRef.current) {
//             const resize = () => {
//                 calculateBallPostion();
//             }
//             window.onresize = resize;

//             const container = groundRef.current as HTMLDivElement;
//             container.addEventListener("resize", resize)
//             return () => {
//                 container.removeEventListener("resize", resize)
//             }
//         }

//     }, [groundRef.current, rounds]);

//     useEffect(() => {
//         isSoundEnable = true;
//     }, [])

//     return <div className="w-full bg-[#10100f] h-full flex justify-center ">
//         <div className={`max-w-[1300px] mt-5 ${isMobile ? "w-full p-1" : "w-full"} `}>
//             <div className="grid grid-cols-1 sm:grid-cols-4 rounded-md overflow-hidden bg-panel shadow-md">
//                 {!isMobile && <div className="col-span-1 p-2 md:min-h-[560px] bg-sider_panel shadow-[0px_0px_15px_rgba(0,0,0,0.25)] flex flex-col justify-start">
//                     <SwitchTab active={activeTab} onChange={setActiveTab} options={["BET", "Fairness"]} disabled={loading} />
//                     {activeTab === 0 ? <>
//                         <AmountInput onChange={setBetAmount} value={betAmount} disabled={inPlayDisable} />
//                         <SwitchTab options={["Small", "Middle", "Big"]} type="sub" onChange={(v) => {
//                             setRounds([]);
//                             setLevel(v as 0 | 1 | 2)
//                         }} active={activeLevel} disabled={inPlayDisable} />
//                         <Button disabled={loading || (gameId !== "" && rounds.length == 0)} onClick={handleBetButton} >{buttonStatus()}</Button>
//                     </> : <>
//                         <FairnessView publicSeed={publicKey} privateHash={privateHash} privateSeed={privatekey} />
//                     </>}
//                 </div>}
//                 <div className={`col-span-3 ${isMobile ? "min-h-[470px] " : "min-h-[300px] "} relative h-full overflow-hidden`}>
//                     <div className="flex flex-col w-full h-full justify-center p-2" >
//                         <div className="flex justify-center">
//                             <div className="md:w-36 w-28 aspect-[1/0.1] border-0 rounded-t-md border-[#fff] z-20" ref={goalRef}></div>
//                         </div>
//                         <div className="flex justify-center">
//                             {!isMobile && <div className="flex flex-col h-full justify-between space-y-1 py-3">
//                                 {multipliers.map((multiplier, index) => (
//                                     <div key={index} className="text-sm font-bold text-white text-center py-2 px-4 rounded-md">
//                                         {multiplier}x
//                                     </div>
//                                 ))}
//                             </div>}
//                             <div ref={groundRef} className={`flex flex-col space-y-[1px] md:min-w-[430px] min-w-[340px] md:w-[500px] relative border-4 border-[#ffffff9c] rounded-md`}>

//                                 {Array.from({ length: currentGrid.h }).map((_, rowIndex) => {
//                                     const postion = currentGrid.h - rowIndex - 1;
//                                     const round = rounds[postion];
//                                     let allow = postion > rounds.length;
//                                     let disabled = false;
//                                     if (round) disabled = true;
//                                     return (<div key={rowIndex}
//                                         className={`flex space-x-[1px] w-full ${(!disabled && !allow) && ""}`}>
//                                         {Array.from({ length: currentGrid.w }).map((_, colIndex) => {
//                                             let isBallHere = false;
//                                             let isLast = false;
//                                             let isBomb = false;
//                                             let row = bombs[postion - rounds.length];
//                                             if (typeof row !== "undefined" && row === colIndex) {
//                                                 isBomb = true;
//                                             }
//                                             if (round && round.position === colIndex) {
//                                                 isBallHere = true;
//                                                 if (postion + 1 == rounds.length)
//                                                     isLast = true;
//                                             }
//                                             if (round && round.lossPostion === colIndex) {
//                                                 isBomb = true;
//                                             }
//                                             return (<div
//                                                 className={` 
//                                                     ${disabled || allow ? " cursor-not-allowed " : "hover:bg-[#3f8d2780] cursor-pointer"} 
//                                                     ${(allow) ? "bg-[#11380fb0]" : disabled ? "bg-[#316200ab]" : "bg-[#538124b4]"}
//                                                      flex items-center justify-center rounded-sm
//                                                      "}
//                                                      w-full border-[#ffffff8f] relative ` }
//                                                 key={colIndex}
//                                             >
//                                                 <div className="aspect-[1/0.8] w-full"></div>
//                                                 <div style={{ width: `${Math.floor(100 / currentGrid.w)}%` }}>
//                                                     <div onClick={(e) => (!disabled && !allow) && handleCellClick(colIndex)}
//                                                         className={`w-full absolute top-0 left-0 flex justify-center items-center h-full z-20`}>
//                                                         {
//                                                             (isBomb && isLoss && isBallHere) ? <div className="absolute h-full flex justify-center items-center animate-zoom">
//                                                                 <img src={`/assets/img/expolition.png`} className="w-[70%]" alt="" />
//                                                             </div> : (isBomb && isEnd) ? <div className="absolute h-full animate-zoom flex justify-center items-center">
//                                                                 <img src={`/assets/img/bomb.png`} className="w-[70%]" alt="" />
//                                                             </div> : isBallHere ? <>
//                                                                 {(isBallHere && (!isLast || rounds.length === currentGrid.h)) && <div
//                                                                     className={`transition-transform duration-1000 ease-out transform scale-110 w-[30%] opacity-75`}>
//                                                                     <BallIcon />
//                                                                 </div>}
//                                                             </> : <></>
//                                                         }
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             )
//                                         })}
//                                     </div>)
//                                 })}
//                                 <svg style={{ pointerEvents: 'none' }} strokeWidth={3} className="absolute w-full h-full z-0 stroke-[#c2c2c279] fill-none" viewBox="0 0 290 290" >
//                                     <circle r="45" cx="145" cy="145" />
//                                     <line x1={-145} y1={145} x2={"140%"} y2={145} />
//                                     <circle r="45" cx="145" cy={`${-(30 - (100 / currentGrid.h))}%`} />
//                                 </svg>
//                                 <svg className="absolute w-full h-full z-0" style={{ pointerEvents: 'none' }}>
//                                     {linePositions.map((line, index) => (
//                                         <line
//                                             key={index}
//                                             x1={line.x1}
//                                             y1={line.y1}
//                                             x2={line.x2}
//                                             y2={line.y2}
//                                             stroke="white"
//                                             strokeWidth="1"
//                                         />
//                                     ))}
//                                 </svg>
//                                 {ballPosition.w !== 0 && <div
//                                     className="absolute transition-all duration-300 ease-in-out z-30"
//                                     style={{
//                                         left: `${ballPosition.x}px`,
//                                         top: `${ballPosition.y}px`,
//                                         width: `${ballPosition.w}px`,
//                                         height: `${ballPosition.h}px`,
//                                         transform: 'translate(-50%, -50%)',
//                                     }}
//                                 >
//                                     <div className={isLoss ? "animate-ping p-2" : "animate-rotating"}>
//                                         <BallIcon />
//                                     </div>
//                                 </div>}
//                             </div>
//                             {!isMobile && <div className="flex flex-col h-full justify-between space-y-1 py-3">
//                                 {multipliers.map((multiplier, index) => (
//                                     <div
//                                         key={index}
//                                         className="text-sm font-bold text-white text-center py-2 px-4 rounded-md"
//                                     >
//                                         {multiplier}x
//                                     </div>
//                                 ))}
//                             </div>}
//                         </div>
//                         <div className="flex justify-center relative" >
//                             <div className="absolute w-28 top-80 h-28" ref={startRef} ></div>
//                         </div>
//                     </div>
//                     <ResultModal visible={showResult} profit={profit} odds={multiplier} onClose={() => setShowModal(false)} />
//                 </div>
//                 {isMobile &&
//                     <div className="col-span-1 p-2 bg-sider_panel shadow-[0px_0px_15px_rgba(0,0,0,0.25)] flex flex-col justify-start">
//                         {activeTab == 0 ? <>
//                             <Button disabled={loading || (gameId !== "" && rounds.length == 0)} onClick={handleBetButton} >{buttonStatus()}</Button>
//                             <AmountInput onChange={setBetAmount} value={betAmount} disabled={inPlayDisable} />
//                             <SwitchTab
//                                 options={["Small", "Middle", "Big"]}
//                                 type="sub"
//                                 onChange={(v) => {
//                                     setRounds([]);
//                                     setLevel(v as 0 | 1 | 2)
//                                 }}
//                                 active={activeLevel}
//                                 disabled={inPlayDisable} />
//                         </> : <>
//                             <FairnessView publicSeed={publicKey} privateHash={privateHash} privateSeed={privatekey} />
//                         </>}
//                         <SwitchTab active={activeTab} onChange={setActiveTab} options={["BET", "Fairness"]} disabled={loading} />
//                     </div>}
//             </div>
//         </div >
//     </div >
// }

// export default GoalGame;



// const ResultModal = ({ visible, profit, odds, onClose }: { visible?: boolean, profit: number, odds: number, onClose: () => void }) => {
//     return visible ? <div onClick={onClose} className="top-0 left-0 absolute w-full h-full z-40 bg-[#00000048] flex justify-center items-center">
//         <div className="relative animate-zoomIn w-[50%] md:w-[30%] min-h-40 border-2 rounded-md border-[#36e95d] bg-[#0a0a0aaf] flex-col justify-around flex "
//             style={{
//                 boxShadow: "0 0px 15px 3px rgb(0 188 15 / 73%), 0 4px 6px -4px rgb(86 252 26 / 75%)"
//             }}
//         >
//             <div className="text-lg font-bold text-white flex justify-center">You Win!</div>
//             <div className="text-lg text-white uppercase flex justify-center font-bold">
//                 {odds.toFixed(2)}x
//             </div>
//             <div className="flex text-white text-sm p-2 items-center justify-around font-bold">
//                 <div>{profit.toFixed(6)}</div><div className="w-6 h-6"><CurrencyIcon /></div>
//             </div>
//         </div>
//     </div> : <></>
// }



// export const FairnessView = ({ publicSeed, privateHash, privateSeed }: { publicSeed: string, privateHash: string, privateSeed: string }) => {
//     const [active, setActiveTab] = useState(0);
//     const [_privateSeed, setPrivateSeed] = useState("");
//     const [_publicSeed, setPublicSeed] = useState("");
//     const [activeLevel, setLevel] = useState<0 | 1 | 2>(0);
//     const [bombs, setBombs] = useState<number[]>([]);
//     const currentGrid = grids[activeLevel];

//     const copyToClipboard = async (value: string) => {
//         try {
//             await navigator.clipboard.writeText(value);
//             toast.success("Copied!")
//         } catch (err) {
//             console.error('Failed to copy text: ', err);
//         }
//     }
//     useEffect(() => {
//         setPrivateSeed(privateSeed);
//     }, [privateSeed]);
//     useEffect(() => {
//         setPublicSeed(publicSeed);
//     }, [publicSeed])
//     useEffect(() => {
//         if (_privateSeed !== "" && _publicSeed !== "") {
//             const _bombs = [];
//             for (let i = 0; i < currentGrid.h; i++) {
//                 const roundHash = generateHash(_privateSeed + _publicSeed + i);
//                 _bombs.push(hashToColumnPosition(roundHash, currentGrid.w));
//             }
//             setBombs(_bombs);
//         }
//     }, [_privateSeed, _publicSeed, activeLevel])
//     return <>
//         <SwitchTab options={["Seeds", "Verify"]} active={active} onChange={(e) => setActiveTab(e)} type={"sub"} />
//         {active === 0 ? <>
//             <CustomInput disabled={true} value={_privateSeed == "" ? publicSeed : ""} label={"Active Client Seed"} type={"text"} icon={<button onClick={() => copyToClipboard(publicSeed)} className="px-1 py-2 w-full "><CopyIcon /></button>} />
//             <CustomInput disabled={true} value={_privateSeed == "" ? privateHash : ""} label={"Active Server Seed (Hashed)"} type={"text"} icon={<button onClick={() => copyToClipboard(privateHash)} className="px-1 py-2 w-full "><CopyIcon /></button>} />

//             <div className="mt-4"></div>
//             <CustomInput disabled={true} value={_privateSeed == "" ? "" : _publicSeed} label={"Previous Client Seed "} type={"text"} icon={<button onClick={() => copyToClipboard(publicSeed)} className="px-1 py-2 w-full "><CopyIcon /></button>} />
//             <CustomInput disabled={true} value={_privateSeed == "" ? "" : _privateSeed} label={"Previous Server Seed"} type={"text"} icon={<button onClick={() => copyToClipboard(privateHash)} className="px-1 py-2 w-full "><CopyIcon /></button>} />
//         </> : <>
//             <div className="p-2 border-dashed mt-3 px-5 border-[1px] min-h-52 border-[#3dff23b4] rounded-md flex items-center justify-center font-bold text-[20px]">
//                 <div className="flex flex-col space-y-[1px] w-[300px]">
//                     {Array.from({ length: currentGrid.h }).map((_, index) => {
//                         const postion = currentGrid.h - index - 1;
//                         return <div className="flex space-x-[1px] w-full" key={index}>
//                             {Array.from({ length: currentGrid.w }).map((_, indexw) => {
//                                 return <div
//                                     className="flex items-center justify-cente bg-[#538124b4] relative"
//                                     style={{ width: `${100 / currentGrid.w}%` }}
//                                     key={indexw}>
//                                     <div className="w-full aspect-[1/0.5]" ></div>
//                                     {indexw == bombs[postion] && <div className="absolute flex justify-center items-center w-full" >
//                                         <img src={`/assets/img/bomb.png`} className="w-[20%] animate-zoom" alt="" />
//                                     </div>}
//                                 </div>
//                             })}
//                         </div>
//                     })}
//                 </div>
//             </div>
//             <SwitchTab
//                 options={["Small", "Middle", "Big"]}
//                 type="sub"
//                 onChange={(v) => {
//                     setLevel(v as 0 | 1 | 2)
//                 }}
//                 active={activeLevel}
//             />
//             <CustomInput onChange={setPrivateSeed} value={_privateSeed} label={"Server Seed"} type={"text"} />
//             <CustomInput disabled={true} value={_privateSeed === "" ? "" : generateHash(_privateSeed || "")} label={"Server Seed(Hash)"} type={"text"} />
//             <CustomInput onChange={setPublicSeed} value={_publicSeed} label={"Client Seed"} type={"text"} />
//         </>}
//     </>
// }
