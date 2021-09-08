import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getBoard, getPlayers } from "../../reducks/selector";
import { AppState } from "../../reducks/store";
import { PlayerBoard, MainBoard } from "./";

export const Board: React.FC = ({ children }) => {
    const selector = useSelector((state: AppState) => state.state)
    const players = getPlayers(selector);
    const board = getBoard(selector);
    const player1 = players.blue;
    const player2 = players.orange;

    return (
        <>
            <Wrapper>
                <PlayerBoard player={player1}></PlayerBoard>
                <MainBoard board={board}></MainBoard>
                <PlayerBoard player={player2}></PlayerBoard>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    height: 100%;
    width: 100%;
`;
