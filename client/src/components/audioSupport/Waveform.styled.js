
import styled from 'styled-components';
// Waveform Container
export const WaveformContianer = styled.div`
  display: flex;  
  flex-direction: row;  
  align-items: center;
  justify-content: center;
  height: 100px;  width: 100%;
  background: transparent;
`;

// Wave
export const Wave = styled.div`
  width: 100%;
  height: 90px;
`;

// PlayButton:
export const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background: #EFEFEF;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  padding-bottom: 3px;
  &:hover {
    background: #DDD;
  }
`;


// AudioControl:
export const AudioControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column
`;

// AudioControlDisplay:
export const AudioControlDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
`;


