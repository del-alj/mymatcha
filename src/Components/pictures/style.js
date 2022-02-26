import styled from "styled-components";

export const Div = styled.div`
  /* border: 1px solid red; */

  max-width: 50rem;
  width: 100%;
  /* flex: 1; */
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* box-sizing: border-box; */
  flex-wrap: wrap;
  /* justify-content: center; */

  // for ther is no picture
  justify-content: ${(props) => (props.status ? "center" : "none")};
  > div {
    margin: ${(props) => (props.status ? "3rem" : "none")};
  }
`;

export const Img = styled.img`
  width: 33.33%;
  padding: 2rem;
`;

export const Add = styled.div`
  width: 5rem;
  height: 5rem;
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  align-items: center;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-shadow: 1px 1px #f8f8f8;
  padding: 2rem;
  margin-left: 3rem;
`;
