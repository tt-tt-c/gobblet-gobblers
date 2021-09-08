import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Board } from "../components/elements";
import { gameActions } from "../reducks/action";
import { generateInitalState } from "../reducks/reducer";
import { getBoard, getNextPlayer, getSelectedPiece } from "../reducks/selector";
import { AppState } from "../reducks/store";
import { Path } from "../RouteContainer";

const GamePage: React.FC = () => {
    const selector = useSelector((state: AppState) => state.state);
    const nextPlayer = getNextPlayer(selector);
    const board = getBoard(selector);
    const winnerPlayer = board.getWinnedPlayer(nextPlayer);
    const [winner, setWinner] = useState(winnerPlayer);
    const title =
        winner !== "" ? `Winner: ${winner}` : `${nextPlayer + "のターン"}`;
    const selectedPiece = getSelectedPiece(selector);
    const dispatch = useDispatch();

    useEffect(() => {
        setWinner(winnerPlayer);
    }, [winnerPlayer, nextPlayer]);

    return (
        <Wrapper>
            <Body>
                {winner === "" && <Title>{title}</Title>}
                {winner !== "" && <Title hasWinner={true}>{title}</Title>}

                <Board></Board>
                {selectedPiece && (
                    <Overray
                        zIndex={1000}
                        onClick={() => {
                            dispatch(gameActions.deleteSelectedPiece());
                        }}
                    />
                )}
                {winner !== "" && (
                    <Overray zIndex={3000} isBlacked={true}>
                        <LinkWrapper>
                            <TopLink to={Path.top} onClick={()=> dispatch(gameActions.initGame(generateInitalState()))}>トップ</TopLink>
                            <GameLink
                                onClick={() => {
                                    dispatch(gameActions.initGame(generateInitalState()));
                                }}
                            >
                                New Game
                            </GameLink>
                        </LinkWrapper>
                    </Overray>
                )}
            </Body>
        </Wrapper>
    );
};

const Body = styled.div``;

const Wrapper = styled.div`
    text-align: center;
    padding: 0 calc(50% - 540px);
`;

const Title = styled.h2<{ hasWinner?: boolean }>`
    position: relative;
    text-align: center;
    font-size: 36px;
    padding: 30px;
    z-index: ${({ hasWinner }) => (hasWinner ? 4000 : "inherit")};
`;

const Overray = styled.div<{ zIndex?: number; isBlacked?: boolean }>`
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${({ zIndex }) => (zIndex ? zIndex : 1000)};
    background: ${({ isBlacked }) =>
        isBlacked ? "rgba(0,0,0,0.5)" : "inherit"};
    div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const LinkWrapper = styled.div`
    z-index: 5000;
    padding: 10px;
    background-color: #fff;
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const TopLink = styled(Link)`
    display: block;
    font-size: 50px;
    color: #000;
    padding: 30px;
    margin: 0 5px;
`;
const GameLink = styled.p`
    display: block;
    text-decoration: underline;
    font-size: 50px;
    color: #000;
    padding: 30px;
    margin: 0 5px;
    cursor: pointer;
`;

export default GamePage;
