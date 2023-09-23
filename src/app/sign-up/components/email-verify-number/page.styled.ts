import { styled } from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

export const Title = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

export const SubTitle = styled.p`
  margin-top: 15px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  color: ${({ theme }) => theme.colors.neutral.bg40};
`;

export const MainContainer = styled.div`
  margin-top: 30px;
`;

export const NextButtonWrapper = styled.div`
  margin-top: 142px;
`;
