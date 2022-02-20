import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Chapters from "../components/Chapters";
import Keywords from "../components/Keywords";
import Transcript from "../components/Transcript";
import Waveform from '../components/audioSupport/final-waveform'
import '../pages/style.css';

import { getAudioLink } from "../helpers/endpoints";

const Result = ({ status }) => {
  const keywords = status.auto_highlights_result.results;
  const [playerTime, setPlayerTime] = useState(0);
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  // Keep track of elements of each keyword in transcript, so we can scroll to them later
  // Assuming it's not possible for keywords to change, otherwise might be issues
  const keywordsRef = useRef(
    keywords.map((keyword) => keyword.timestamps.map((_) => null))
  );

  // Initialize refs with keywords
  useEffect(() => {
    keywordsRef.current = keywords.map((keyword) =>
      keyword.timestamps.map((_) => null)
    );
  }, [keywords]);

  const handleKeywordClicked = (keyword) => {
    if (keyword === selectedKeyword) {
      setSelectedKeyword(null);
    } else {
      setSelectedKeyword(keyword);
    }
  };

  return (
    <Box display="flex" justifyContent="space-around" backgroundColor="#92a8d1" overflow="hidden">
      <Grid container spacing={2} justifyContent="space-around" maxWidth={1400}>
        <Grid item xs={12} md={6}>
          <Waveform audio_url={getAudioLink(status.id)} set_time={playerTime} />
          <Transcript
            words={status.words}
            keywords={keywords}
            keywordsRef={keywordsRef}
            selectedKeyword={
              selectedKeyword === null ? null : keywords[selectedKeyword]
            }
            onTimestampClick={(start, end) => setPlayerTime(start / 1000)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Chapters
            chapters={status.chapters}
            onTimestampClick={(start, end) => setPlayerTime(start / 1000)}
          />

          <Keywords
            keywords={keywords}
            keywordsRef={keywordsRef}
            selectedKeyword={selectedKeyword}
            onKeywordClick={(index) => handleKeywordClicked(index)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Result;
