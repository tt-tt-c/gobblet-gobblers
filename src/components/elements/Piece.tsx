import React from "react";
import styled from "styled-components";
import logoBlue from "../../assets/img/piece_img_blue.svg";
import logoOrange from "../../assets/img/piece_img_orange.svg";
import { colors, sizes } from "../classes/typeAlias";

type Props = {
    color: colors | "";
    id?: string;
    size?: sizes;
    onClick: Function;
    isSelected?: boolean;
    isClickable?: boolean;
};

export const Piece: React.FC<Props> = ({
    color,
    id,
    size = 0,
    isSelected = false,
    isClickable = false,
    onClick,
}) => {
    const logoElm = getLogoElm(color, size, isSelected, isClickable);

    return (
        <>
            <Wrapper id={id} isClickable={isClickable} onClick={() => onClick()}>
                {logoElm}
            </Wrapper>
        </>
    );
};
const Wrapper = styled.div<{isClickable: boolean;}>`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    margin: 5px;
    cursor: ${({ isClickable }) => (isClickable ? "pointer" : "inherit")};
    z-index: ${({ isClickable }) => (isClickable ? "2000" : "inherit")};
`;

const Logo = styled.img<{
    size: sizes;
    isSelected: boolean;
    isClickable: boolean;
}>`
    display: block;
    width: ${({ size }) => (size < 1 ? "50px" : size < 2 ? "70px" : "100px")};
    height: ${({ size }) => (size < 1 ? "50px" : size < 2 ? "70px" : "100px")};
    margin: 0 auto;
    cursor: ${({ isClickable }) => (isClickable ? "pointer" : "inherit")};
    opacity: ${({ isSelected }) => (isSelected ? "0.5" : "1")};
    z-index: ${({ isClickable }) => (isClickable ? "2000" : "inherit")};
`;

const NoImg = styled.div<{ size: sizes; isClickable: boolean }>`
    display: block;
    width: ${({ size }) => (size < 1 ? "50px" : size < 2 ? "70px" : "100px")};
    height: ${({ size }) => (size < 1 ? "50px" : size < 2 ? "70px" : "100px")};
    margin: 0 auto;
    cursor: ${({ isClickable }) => (isClickable ? "pointer" : "inherit")};
`;

const getLogoElm = (
    color: colors | "",
    size: sizes,
    isSelected: boolean,
    isClickable: boolean
) => {
    const logoImg =
        color === "blue" ? logoBlue : color === "orange" ? logoOrange : "";

    if (logoImg !== "")
        return (
            <Logo
                size={size}
                src={logoImg}
                isSelected={isSelected}
                isClickable={isClickable}
            />
        );
    else return <NoImg size={size ? size: 0} isClickable={isClickable} />;
};
