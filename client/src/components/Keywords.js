import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const KeywordCell = ({ keyword, onKeywordClick }) => {
  const { text } = keyword;

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => onKeywordClick(keyword.index)}>
        <ListItemText primary={text.toLowerCase()} />
      </ListItemButton>
    </ListItem>
  );
};

const Keywords = ({ keywords, onKeywordClick }) => {
  const [searchText, setSearchText] = useState("");

  // Attach index in original array, sort by count, and filter by search text
  const displayKeywords = keywords
    .map((keyword, index) => ({ ...keyword, index }))
    .sort((a, b) => (a.count < b.count ? 1 : -1))
    .filter((keyword) =>
      keyword.text.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <Box padding={2}>
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
        {displayKeywords.map((keyword, i) => (
          <KeywordCell
            key={i}
            keyword={keyword}
            onKeywordClick={onKeywordClick}
          />
        ))}
      </List>
    </Box>
  );
};

export default Keywords;
