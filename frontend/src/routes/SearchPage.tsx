import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Grid,
} from "@mui/material";
import { Document } from "../types";
import DocumentCard from "../components/DocumentCard";

const SearchPage = () => {
  const [keywords, setKeywords] = useState("");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle form submission and search
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/search/simple",
        {
          keywords: keywords.split(" "), // Assuming space-separated keywords
        }
      );
      setDocuments(response.data.content); // Assuming the API response follows pagination
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography
      variant="h4"
      gutterBottom
      sx={{
        color: 'gold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        fontWeight: 'bold',
        textAlign: 'center',
      }}
    >
      Phrase Search
    </Typography>

      {/* Search Form */}
      <Paper style={{ padding: "20px", marginBottom: "20px" }}>
        <form onSubmit={handleSearch}>
          <TextField
            label="Enter keywords"
            variant="outlined"
            fullWidth
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Search"}
          </Button>
        </form>
      </Paper>

      {documents.length > 0 && (
        <div>
          <Typography variant="h5" gutterBottom>
            Search Results
          </Typography>
          <Grid container spacing={3}>
            {documents.map((doc: Document) => {
              return (
                <Grid item xs={12} sm={6} key={doc.id}>
                  <DocumentCard doc={doc} keywords={keywords} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </Container>
  );
};

export default SearchPage;
