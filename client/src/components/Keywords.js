import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import { msToTimeString } from "../helpers/timeUtil";

import './UploadBox.css'


const KeywordCell = ({ keyword, isSelected, onKeywordClick, keywordsRef }) => {
  const { text } = keyword;

  const handleTimestampClick = (index) => {
    keywordsRef.current[keyword.index][index].scrollIntoView({ block: 'center',  behavior: 'smooth' });
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => onKeywordClick(keyword.index)}>
          <ListItemText primary={text.toLowerCase()} />
        </ListItemButton>
      </ListItem>
      <Collapse in={isSelected}>
        <List disablePadding sx={{ paddingLeft: 3 }}>
          {keyword.timestamps.map((timestamp, index) => (
            <ListItem key={timestamp.start} disablePadding>
              <ListItemButton onClick={() => handleTimestampClick(index)}>
                <Typography variant="body2" color="text.secondary">
                  {msToTimeString(timestamp.start) +
                    " - " +
                    msToTimeString(timestamp.end)}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

const Keywords = ({ keywords, selectedKeyword, onKeywordClick, keywordsRef }) => {
  const [searchText, setSearchText] = useState("");

  // Attach index in original array, sort by count, and filter by search text
  const displayKeywords = keywords
    .map((keyword, index) => ({ ...keyword, index }))
    .sort((a, b) => (a.count < b.count ? 1 : -1))
    .filter((keyword) =>
      keyword.text.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <Box padding={2} 
    backgroundColor="white"
    height="25vh"
    overflow="auto"
    borderRadius="15px"
    border="2px solid #020887"
    className="noscroll"
    >
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="keyword-search"
          label="Search keywords"
          variant="standard"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>
      <List>
        {displayKeywords.map((keyword) => (
          <KeywordCell
            key={keyword.index}
            keyword={keyword}
            keywordsRef={keywordsRef}
            isSelected={keyword.index === selectedKeyword}
            onKeywordClick={onKeywordClick}
          />
        ))}
      </List>
    </Box>
  );
};

export default Keywords;
