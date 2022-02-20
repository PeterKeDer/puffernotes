import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { orange } from "@mui/material/colors";

import { msToTimeString } from "../helpers/timeUtil";

import './UploadBox.css'

const Word = ({
  word,
  onTimestampClick,
  isHighlighted,
  isSpaceHighlighted,
  forwardRef,
}) => {
  const { text, start, end } = word;
  const backgroundColor = isHighlighted ? orange[200] : "transparent";
  const spaceBackgroundColor = isSpaceHighlighted ? orange[200] : "transparent";

  return (
    <>
      <Box
        ref={forwardRef}
        component="span"
        sx={{
          cursor: "pointer",
          background: backgroundColor,
          "&:hover": {
            backgroundColor: "grey.200",
          },
        }}
        onClick={() => onTimestampClick(start, end)}
      >
        {text}
      </Box>
      <Box component="span" backgroundColor={spaceBackgroundColor}>
        {" "}
      </Box>
    </>
  );
};

const Sentence = ({ sentence, selectedKeyword, onTimestampClick, keywordsRef, keywordStarts }) => {
  const start = sentence[0].start;
  const end = sentence[sentence.length - 1].end;

  const selectedIntervals =
    selectedKeyword === null ? [] : selectedKeyword.timestamps;

  return (
    <Box sx={{ display: "flex", alignItems: "start" }}>
      <Button
        sx={{ minWidth: "6em" }}
        onClick={() => onTimestampClick(start, end)}
      >
        {msToTimeString(start)}
      </Button>
      <Typography variant="body1" color="text.secondary" paddingTop={0.85}>
        {sentence.map((word, i) => (
          <Word
            key={i}
            word={word}
            onTimestampClick={onTimestampClick}
            isHighlighted={selectedIntervals.some(
              ({ start, end }) => start <= word.start && word.end <= end
            )}
            isSpaceHighlighted={selectedIntervals.some(
              ({ start, end }) => start <= word.start && word.end < end
            )}
            forwardRef={(node) => {
              // Add this element to ref if it is the start of a keyword
              if (keywordStarts.has(word.start)) {
                // Add node to ref
                keywordStarts.get(word.start).forEach((indices) => {
                  const [ki, ti] = indices;
                  keywordsRef.current[ki][ti] = node;
                });
              }
            }}
          />
        ))}
      </Typography>
    </Box>
  );
};

const Transcript = ({ words, selectedKeyword, onTimestampClick, keywords, keywordsRef }) => {
  if (words.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        No transcript available.
      </Typography>
    );
  }

  // Map to keep track of the start of each keyword occurrence
  // Maps starting timestamp to an array of [keyword index, timestamp index] into keywordsRef
  const keywordStarts = new Map();

  keywords.forEach((keyword, i) => {
    keyword.timestamps.forEach((timestamp, j) => {
      const start = timestamp.start;
      if (!keywordStarts.has(start)) {
        keywordStarts.set(start, []);
      }
      keywordStarts.get(start).push([i, j]);
    });
  });


  // Try to separate into sentences (i.e. array of arrays of words)
  const sentences = words.reduce(
    (acc, word) => {
      const { text } = word;
      acc[acc.length - 1].push(word);
      if (text.endsWith(".") || text.endsWith("!") || text.endsWith("?")) {
        acc.push([]);
      }
      return acc;
    },
    [[]]
  );
  if (sentences[sentences.length - 1].length === 0) {
    // Last sentence may be empty, so remove it
    sentences.pop();
  }

  return (
    <Box
      className="noscroll"
      textAlign="left"
      backgroundColor="white"
      height="65vh"
      marginBottom="5vh"
      overflow="auto"
      borderRadius="15px"
      padding="5px"
      border="2px solid #020887"
    >
      {sentences.map((sentence, i) => (
        <Sentence
          key={i}
          keywordStarts={keywordStarts}
          keywordsRef={keywordsRef}
          sentence={sentence}
          onTimestampClick={onTimestampClick}
          selectedKeyword={selectedKeyword}
        />
      ))}
    </Box>
  );
};

export default Transcript;
