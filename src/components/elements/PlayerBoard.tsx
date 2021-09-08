import React from "react";
import styled from "styled-components";
import { Piece } from "./";
import { Player } from "../classes/Player";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../reducks/store";
import { getNextPlayer, getSelectedPiece } from "../../reducks/selector";
import { gameActions } from "../../reducks/action";
import { SelectedPieceAlias } from "../../reducks/reducer";

type Props = {
    player: Player;
};

export const PlayerBoard: React.FC<Props> = ({ player, children }) => {
    const selector = useSelector((state: AppState) => state.state);
    const selectedPiece = getSelectedPiece(selector);
    const dispatch = useDispatch();
    const color = player.color;
    const pieces = player.pieces;
    const isMyTurn = getNextPlayer(selector) === color;

    const selectedPiecePosition = selectedPiece?.position;

    return (
        <>
            <Wrapper>
                {pieces.map((piece, index) => {
                    const id = `${"player_" + color + "_" + index}`;
                    const isSelected = selectedPiece !== null && selectedPiecePosition === id;
                    const isExistSelectedPiece = selectedPiece !== null;
                    return (
                        <Piece
                            key={id}
                            id={id}
                            size={piece.size}
                            color={!piece.isUsed ? piece.color : ""}
                            isSelected={isSelected}
                            isClickable={
                                isMyTurn && !piece.isUsed && !isExistSelectedPiece
                            }
                            onClick={
                                isMyTurn && !piece.isUsed && !isExistSelectedPiece
                                    ? () => {
                                          const payload: SelectedPieceAlias = {
                                              size: piece.size,
                                              position: id,
                                              onBoard: false,
                                              index: index,
                                          };
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
                        />
                    );
                })}
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    padding: 20px 0;
    width: 200px;
    color: #fff;
    border: 5px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
`;
