import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { msToTimeString } from "../helpers/timeUtil";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ChapterCell = ({ chapterNumber, chapter, onClickTimestamp }) => {
  const { start, end, headline, gist, summary } = chapter;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 720, textAlign: "left" }}>
      <CardHeader
        title={<Typography variant="h6">{chapterNumber + 1}. {gist}</Typography>}
        action={
          <Button onClick={() => onClickTimestamp(start, end)}>
            {msToTimeString(start) + " - " + msToTimeString(end)}
          </Button>
        }
      />
      <CardContent>
        <Typography variant="body" color="text.secondary">
          {headline}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {summary}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Chapters = ({ chapters, onClickTimestamp }) => {
  return (
    <Grid container direction="column" padding={2} gap={2}>
      {chapters.map((chapter, i) => (
        <ChapterCell
          key={i}
          chapterNumber={i}
          chapter={chapter}
          onClickTimestamp={onClickTimestamp}
        />
      ))}
    </Grid>
  );
};

export default Chapters;
