import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { orange } from "@mui/material/colors";

import { msToTimeString } from "../helpers/timeUtil";

const Word = ({
  word,
  onTimestampClick,
  isHighlighted,
  isSpaceHighlighted,
}) => {
  const { text, start, end } = word;
  const backgroundColor = isHighlighted ? orange[200] : "transparent";
  const spaceBackgroundColor = isSpaceHighlighted ? orange[200] : "transparent";

  return (
    <>
      <Box
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

const Sentence = ({ sentence, onTimestampClick }) => {
  const start = sentence[0].start;
  const end = sentence[sentence.length - 1].end;

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
          />
        ))}
      </Typography>
    </Box>
  );
};

const Transcript = ({ words, onTimestampClick }) => {
  if (words.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        No transcript available.
      </Typography>
    );
  }

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
    <Box textAlign="left">
      {sentences.map((sentence, i) => (
        <Sentence
          key={i}
          sentence={sentence}
          onTimestampClick={onTimestampClick}
        />
      ))}
    </Box>
  );
};

export default Transcript;
