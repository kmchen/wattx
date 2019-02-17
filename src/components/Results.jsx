import React, { Component } from "react";
import styled from 'styled-components';

const specialLogoImgUrl = 'https://previews.123rf.com/images/arcady31/arcady311606/arcady31160600002/59113161-special-offer-red-star-icon.jpg';

const Summary = ({results}) => {
  return results.map(result =>
      <div key={result.title} className="column is-narrow">
        <article className="message is-warning">
          <div className="message-header">
            <p>{result.title}</p>
          </div>
          <div className="message-body">
            <BoardItem className="board-item">
              <BoardItemContent className="board-item-content">
                { result.isSpecialOffer &&
                  (<SpecialLogo>
                    <SpecialLogoImg src={specialLogoImgUrl} />
                  </SpecialLogo>)
                }
                <span>Price: {result.price}{result.currency}</span>
                <br/>
                <span>Rating: {result.rating}</span>
              </BoardItemContent>
            </BoardItem>
          </div>
        </article>
      </div>
  );
};

export const Results = ({results}) => {
  return (
    <Section className="container cards-container">
      <SectionContainer className="columns is-centered is-multiline is-mobile" id="sectioncontainer">
        <Summary results={results} />
      </SectionContainer>
    </Section>
  );
};

const Section = styled.section`
  max-width: 95%;
`;

const SectionContainer = styled.div`
  margin-top: 20px;
`;

const BoardItem = styled.div`
  margin: 5px 0;
  will-change: transform;
`;

const SpecialLogo = styled.div`
  position: fixed;
`;

const SpecialLogoImg = styled.img`
  max-width: 50px;
  max-height: 50px;
`;

const BoardItemContent = styled.div`
  word-wrap: normal;
  position: relative;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  font-size: 17px;
  text-align: center;
  -webkit-box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.2);
  box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.2);
  margin: 5px;
`;
