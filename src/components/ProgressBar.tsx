import React from "react";
import styled from 'styled-components'

interface ProgressBarProps {
  value: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({value}) => {
  const Container = styled.div`
    ;

    progress[value] {
      width: 28rem;
      margin-left: auto;
      margin-top: 0.5rem;
      appearance: none; 


      ::-webkit-progress-bar {
        height: 10px;
        border-radius: 20px;
        background-color: #eee;
      }

      ::-webkit-progress-value {
        height: 10px;
        border-radius: 20px;
        background-color: #E76F51;
      }
    }
  `


  return (
    <Container>
      <progress value={value} max={100} />
    </Container>
  );
};

export default ProgressBar;