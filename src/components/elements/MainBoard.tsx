import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Piece } from ".";
import { Board } from "../classes/Board";
import { AppState } from "../../reducks/store";
import {
    getNextPlayer,
    getPlayers,
    getSelectedPiece,
} from "../../reducks/selector";
import greenCircleImg from "../../assets/img/bg_img_02.png";
import { SelectedPieceAlias } from "../../reducks/reducer";
import { gameActions } from "../../reducks/action";

type Props = {
    board: Board;
};

export const MainBoard: React.FC<Props> = ({ board }) => {
    const selector = useSelector((state: AppState) => state.state);
    const selectedPiece = getSelectedPiece(selector);
    const dispatch = useDispatch();
    const tcol = board.boardState.length / 3;
    const trow = tcol;
    const players = getPlayers(selector);
    const nextPlayer = getNextPlayer(selector);

    const getTdsOfRow = (
        sindex: number,
        tcols: number,
        board: Board,
        slectedPiece: SelectedPieceAlias | null
    ) => {
        const elms = [];
        if (slectedPiece === null) {
            for (let i = sindex; i < tcols + sindex; i++) {
                const id = `${"board_piece_" + i}`;
                const topColor = board.boardState[i].getTopColor();
                const topSize = board.boardState[i].getTopSize();
                const isClickable = topColor !== "" && topColor === nextPlayer;
                const payload: SelectedPieceAlias = {
                    size: topSize,
                    index: i,
                    position: id,
                    onBoard: true,
                };
                elms.push(
                    <Td>
                        <div>
                            <Piece
                                color={topColor}
                                id={id}
                                size={topSize}
                                onClick={
                                    isClickable
                                        ? () => {
                                              dispatch(
                                                  gameActions.updateSelectedPiece(
                                                      payload
                                                  )
                                              );
                                          }
                                        : () => {
                                              return;
                                          }
                                }
                                isSelected={false}
                                isClickable={isClickable}
                            />
                        </div>
                    </Td>
                );
            }
        } else {
            let settableIndexes = board.getSettableIndexes(slectedPiece.size);
            let sliceCount = 0;
            for (let i = 0; i < settableIndexes.length; i++) {
                if (settableIndexes[i] < sindex) {
                    sliceCount++;
                }
            }
            settableIndexes = settableIndexes.slice(sliceCount);
            const selectedPieceSize =
                selectedPiece !== null ? selectedPiece.size : 0;
            const selectedIndex =
                selectedPiece !== null ? selectedPiece.index : 0;
            const selectedPiecePosition =
                selectedPiece !== null ? selectedPiece.position : "";
            const onBoard =
                selectedPiece !== null ? selectedPiece.onBoard : false;

            for (let i = 0; i < tcols; i++) {
                const id = `${"board_piece_" + (sindex + i)}`;
                let isSettable =
                    settableIndexes.length > 0 &&
                    sindex + i === settableIndexes[0] &&
                    selectedPiecePosition !== id;
                if (isSettable) settableIndexes = settableIndexes.slice(1);

                let onClick:Function;
                if(isSettable && onBoard) {
                    onClick = () => {
                        board.boardState[
                            sindex + i
                        ].cellState[selectedPieceSize] =
                            nextPlayer;
                        board.boardState[selectedIndex].cellState[selectedPieceSize] = "";
                        dispatch(
                            gameActions.updateBoardState(
                                board
                            )
                        );
                        dispatch(
                            gameActions.updateNextUserAction()
                        );
                        dispatch(
                            gameActions.deleteSelectedPiece()
                        );
                    }
                } else if(isSettable) {
                    onClick = () => {
                        if (nextPlayer === "blue")
                            players.blue.getPiece(
                                selectedIndex
                            ).isUsed = true;
                        else
                            players.orange.getPiece(
                                selectedIndex
                            ).isUsed = true;
  
                        board.boardState[
                            sindex + i
                        ].cellState[selectedPieceSize] =
                            nextPlayer;
                        dispatch(
                            gameActions.updatePlayers(
                                players
                            )
                        );
                        dispatch(
                            gameActions.updateBoardState(
                                board
                            )
                        );
                        dispatch(
                            gameActions.updateNextUserAction()
                        );
                        dispatch(
                            gameActions.deleteSelectedPiece()
                        );
                    }
                } else  onclick = () => {return;}

                elms.push(
                    <Td isSettable={isSettable}>
                        <div>
                            <Piece
                                color={board.boardState[
                                    sindex + i
                                ].getTopColor()}
                                id={id}
                                size={board.boardState[sindex + i].getTopSize()}
                                onClick={() => onClick()}
                                isClickable={isSettable}
                            />
                        </div>
                    </Td>
                );
            }
        }

        return elms;
    };

    const tRowElms = [];
    for (let i = 0; i < trow; i++) {
        tRowElms.push(
            <tr>{getTdsOfRow(i * tcol, tcol, board, selectedPiece)}</tr>
        );
    }

    return (
        <>
            <Wrapper>
                <Table>
                    <tbody>{tRowElms}</tbody>
                </Table>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    color: #fff;
    text-align: center;
`;

const Table = styled.table`
    margin: 0 auto;
    table-layout: fixed;
    tr {
        box-sizing: border-box;
    }
`;

const Td = styled.td<{ isSettable?: boolean }>`
    border-collapse: collapse;
    height: 120px;
    width: 120px;
    border: 10px solid #fff;
    position: relative;
    div {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        margin: auto;
        box-sizing: border-box;
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        background: ${({ isSettable }) =>
            isSettable ? `center/cover url(${greenCircleImg})` : ""};
    }
`;
