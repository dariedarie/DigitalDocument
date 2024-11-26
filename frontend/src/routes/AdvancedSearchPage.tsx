// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   FormControl,
//   Select,
//   MenuItem,
//   Grid,
// } from "@mui/material";
// import { useState } from "react";
// import axios from "axios";
// import DocumentCard from "../components/DocumentCard";
// import { Document } from "../types";

// const AdvancedSearchPage = () => {
//   const [name, setName] = useState("");
//   const [surname, setSurname] = useState("");
//   const [governmentName, setGovernmentName] = useState("");
//   const [levelOfAdministration, setLevelOfAdministration] = useState("");
//   const [content, setContent] = useState("");
//   const [booleanOperator, setBooleanOperator] = useState("AND");
//   const [documents, setDocuments] = useState([]);

//   const handleAdvancedSearch = async () => {
//     const searchParams = [
//       `first_name:${name}`,
//       `last_name:${surname}`,
//       `government_name:${governmentName}`,
//       `level_of_administration:${levelOfAdministration}`,
//       `content:${content}`,
//     ].filter((param) => param.split(":")[1] !== "");

//     const requestBody = {
//       keywords: [booleanOperator, ...searchParams],
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:8081/api/search/advanced",
//         requestBody
//       );
//       setDocuments(response.data.content);
//     } catch (error) {
//       console.error("Error during search:", error);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         padding: "2rem",
//         display: "flex",
//         gap: "2rem",
//         flexDirection: "column",
//       }}
//     >
//       <Typography variant="h6" color="inherit">
//         Advanced Search
//       </Typography>

//       <TextField
//         label="First Name"
//         variant="outlined"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <TextField
//         label="Surname"
//         variant="outlined"
//         value={surname}
//         onChange={(e) => setSurname(e.target.value)}
//       />
//       <TextField
//         label="Government Name"
//         variant="outlined"
//         value={governmentName}
//         onChange={(e) => setGovernmentName(e.target.value)}
//       />
//       <TextField
//         label="Level of Administration"
//         variant="outlined"
//         value={levelOfAdministration}
//         onChange={(e) => setLevelOfAdministration(e.target.value)}
//       />
//       <TextField
//         label="Content"
//         variant="outlined"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />

//       <FormControl variant="outlined">
//         <Typography>Boolean Operator</Typography>
//         <Select
//           value={booleanOperator}
//           onChange={(e) => setBooleanOperator(e.target.value)}
//         >
//           <MenuItem value="AND">AND</MenuItem>
//           <MenuItem value="OR">OR</MenuItem>
//           <MenuItem value="NOT">NOT</MenuItem>
//         </Select>
//       </FormControl>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleAdvancedSearch}
//       >
//         Search
//       </Button>
//       {documents.length > 0 && (
//         <div>
//           <Typography variant="h5" gutterBottom>
//             Search Results
//           </Typography>
//           <Grid container spacing={3}>
//             {documents.map((doc: Document) => {
//               return (
//                 <Grid item xs={12} sm={6} key={doc.id}>
//                   <DocumentCard doc={doc} />
//                 </Grid>
//               );
//             })}
//           </Grid>
//         </div>
//       )}
//     </Box>
//   );
// };

// export default AdvancedSearchPage;


import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Paper,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import DocumentCard from "../components/DocumentCard";
import { Document } from "../types";

const AdvancedSearchPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [governmentName, setGovernmentName] = useState("");
  const [levelOfAdministration, setLevelOfAdministration] = useState("");
  const [content, setContent] = useState("");
  const [booleanOperator, setBooleanOperator] = useState("AND");
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleAdvancedSearch = async () => {
    const searchParams = [
      `first_name:${name}`,
      `last_name:${surname}`,
      `government_name:${governmentName}`,
      `level_of_administration:${levelOfAdministration}`,
      `content:${content}`,
    ].filter((param) => param.split(":")[1] !== "");

    const requestBody = {
      keywords: [booleanOperator, ...searchParams],
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/api/search/advanced",
        requestBody
      );
      setDocuments(response.data.content);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 800 }}>
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
  Premium Search
</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Surname"
              variant="outlined"
              fullWidth
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Government Name"
              variant="outlined"
              fullWidth
              value={governmentName}
              onChange={(e) => setGovernmentName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Level of Administration"
              variant="outlined"
              fullWidth
              value={levelOfAdministration}
              onChange={(e) => setLevelOfAdministration(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <Typography variant="subtitle1">Boolean Operator</Typography>
              <Select
                value={booleanOperator}
                onChange={(e) => setBooleanOperator(e.target.value)}
              >
                <MenuItem value="AND">AND</MenuItem>
                <MenuItem value="OR">OR</MenuItem>
                <MenuItem value="NOT">NOT</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAdvancedSearch}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {documents.length > 0 && (
        <Box
          sx={{
            width: "100%",
            maxWidth: 1200,
            mt: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Search Results
          </Typography>
          <Grid container spacing={3}>
            {documents.map((doc: Document) => (
              <Grid item xs={12} sm={6} md={4} key={doc.id}>
                <DocumentCard doc={doc} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default AdvancedSearchPage;