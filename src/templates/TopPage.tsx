import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import { Path } from "../RouteContainer";

const TopPage: React.FC = () => {
    return (
        <>
            <GlobalStyle />

            <Wrapper>
                <Title>ゴブレットゴブラーズ</Title>

                <Container>
                    <SubTitle>ルール</SubTitle>
                    <Text>
                        3×3のマス目には何もなく、各自手元に自分の色の駒(ゴブラーズというキャラクター)を用意した状態から始めます。
                    </Text>
                    <Text>
                        交互に、自分の駒1個を取って、空いているマスに置くか、より小さい駒に被せるように動かし、縦/横/斜めの1列に自色のゴブラーズ3個を並べた人の勝ちです。
                    </Text>
                </Container>
                <GameStartLink to={Path.game}>Game Start</GameStartLink>
            </Wrapper>
        </>
    );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const Wrapper = styled.div`
    text-align: center;
    padding: 0 calc(50% - 540px);
`;

const Container = styled.div`
    text-align: center;
    margin: 30px 0;
`;

const Title = styled.h2`
    text-align: center;
    font-size: 36px;
    padding: 30px;
`;

const SubTitle = styled.p`
    display: table;
    width: auto;
    margin: 0 auto 10px;
    padding: 10px;
    text-align: center;
    font-size: 24px;
    border: 1px solid #ff0000;
`;

const Text = styled.p`
    line-height: 1.4;
    font-size: 16px;
    text-align: left;
    width: 500px;
    margin: 0 auto;
    text-indent: 1em;
`;

const GameStartLink = styled(Link)`
    margin-top: 30px;
    color: #FFFFFF;
`;

export default TopPage;
