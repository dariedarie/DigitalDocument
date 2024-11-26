// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Button,
//   Typography,
//   Box,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";

// const UploadPage = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [uploadMessage, setUploadMessage] = useState<string | null>(null);
//   const [documentType, setDocumentType] = useState<string>("contract"); // Default to 'contract'

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (file.type === "application/pdf") {
//         setSelectedFile(file);
//         setErrorMessage(null);
//       } else {
//         setSelectedFile(null);
//         setErrorMessage("Please upload a valid PDF file.");
//       }
//     }
//   };

//   const handleDocumentTypeChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setDocumentType(event.target.value);
//   };

//   const handleUpload = async () => {
//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       try {
//         // Send POST request to the backend with the file
//         const url =
//           documentType === "contract"
//             ? "http://localhost:8081/api/contract-document"
//             : "http://localhost:8081/api/law-document";

//         const response = await axios.post(url, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         setUploadMessage("File uploaded successfully.");
//         console.log("Response:", response.data);
//       } catch (error) {
//         setUploadMessage("Failed to upload file.");
//         console.error("Error uploading file:", error);
//       }
//     }
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
//       <Typography variant="h5" gutterBottom>
//         Upload PDFs
//       </Typography>

//       <RadioGroup
//         value={documentType}
//         onChange={handleDocumentTypeChange}
//         row
//         aria-label="document-type"
//       >
//         <FormControlLabel
//           value="contract"
//           control={<Radio />}
//           label="Contract Document"
//         />
//         <FormControlLabel
//           value="law"
//           control={<Radio />}
//           label="Law Document"
//         />
//       </RadioGroup>

//       <Button variant="contained" component="label">
//         Choose File
//         <input
//           type="file"
//           hidden
//           accept="application/pdf"
//           onChange={handleFileChange}
//         />
//       </Button>

//       {selectedFile ? (
//         <Typography variant="body1">
//           Selected file: {selectedFile.name}
//         </Typography>
//       ) : (
//         <Typography variant="body1" color="error">
//           {errorMessage || "No file selected"}
//         </Typography>
//       )}

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleUpload}
//         disabled={!selectedFile}
//       >
//         Upload File
//       </Button>

//       {uploadMessage && (
//         <Typography variant="body2" color="textSecondary">
//           {uploadMessage}
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default UploadPage;


// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Button,
//   Typography,
//   Box,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";

// const UploadPage = () => {
//   const [selectedContractFile, setSelectedContractFile] = useState<File | null>(null);
//   const [selectedLawFile, setSelectedLawFile] = useState<File | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [uploadMessage, setUploadMessage] = useState<string | null>(null);
//   const [documentType, setDocumentType] = useState<string>("contract"); // Default to 'contract'

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (file.type === "application/pdf") {
//         if (type === "contract") {
//           setSelectedContractFile(file);
//         } else if (type === "law") {
//           setSelectedLawFile(file);
//         }
//         setErrorMessage(null);
//       } else {
//         setErrorMessage("Please upload a valid PDF file.");
//         if (type === "contract") {
//           setSelectedContractFile(null);
//         } else if (type === "law") {
//           setSelectedLawFile(null);
//         }
//       }
//     }
//   };

//   const handleDocumentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setDocumentType(event.target.value);
//   };

//   const handleUpload = async () => {
//     let file;
//     if (documentType === "contract") {
//       file = selectedContractFile;
//     } else if (documentType === "law") {
//       file = selectedLawFile;
//     }

//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);

//       try {
//         // Send POST request to the backend with the file
//         const url =
//           documentType === "contract"
//             ? "http://localhost:8081/api/contract-document"
//             : "http://localhost:8081/api/law-document";

//         const response = await axios.post(url, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         setUploadMessage("File uploaded successfully.");
//         console.log("Response:", response.data);
//       } catch (error) {
//         setUploadMessage("Failed to upload file.");
//         console.error("Error uploading file:", error);
//       }
//     }
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" gap={2} sx={{ p: 3 }}>
//       <Typography variant="h5" gutterBottom>
//         Upload PDFs
//       </Typography>

//       <RadioGroup
//         value={documentType}
//         onChange={handleDocumentTypeChange}
//         row
//         aria-label="document-type"
//         sx={{ mb: 3 }}
//       >
//         <FormControlLabel
//           value="contract"
//           control={<Radio />}
//           label="Contract Document"
//         />
//         <FormControlLabel
//           value="law"
//           control={<Radio />}
//           label="Law Document"
//         />
//       </RadioGroup>

//       {documentType === "contract" && (
//         <Button variant="contained" component="label">
//           Choose Contract File
//           <input
//             type="file"
//             hidden
//             accept="application/pdf"
//             onChange={(e) => handleFileChange(e, "contract")}
//           />
//         </Button>
//       )}

//       {documentType === "law" && (
//         <Button variant="contained" component="label">
//           Choose Law File
//           <input
//             type="file"
//             hidden
//             accept="application/pdf"
//             onChange={(e) => handleFileChange(e, "law")}
//           />
//         </Button>
//       )}

//       {documentType === "contract" && selectedContractFile && (
//         <Typography variant="body1">
//           Selected Contract file: {selectedContractFile.name}
//         </Typography>
//       )}

//       {documentType === "law" && selectedLawFile && (
//         <Typography variant="body1">
//           Selected Law file: {selectedLawFile.name}
//         </Typography>
//       )}

//       {(!selectedContractFile && documentType === "contract") || (!selectedLawFile && documentType === "law") ? (
//         <Typography variant="body1" color="error">
//           {errorMessage || "No file selected"}
//         </Typography>
//       ) : null}

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleUpload}
//         disabled={!(documentType === "contract" ? selectedContractFile : selectedLawFile)}
//         sx={{ mt: 2 }}
//       >
//         Upload File
//       </Button>

//       {uploadMessage && (
//         <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
//           {uploadMessage}
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default UploadPage;

import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, Box, RadioGroup, FormControlLabel, Radio, Paper } from "@mui/material";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<string>("contract"); // Default to 'contract'

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setErrorMessage(null);
      } else {
        setSelectedFile(null);
        setErrorMessage("Please upload a valid PDF file.");
      }
    }
  };

  const handleDocumentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentType(event.target.value);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const url =
          documentType === "contract"
            ? "http://localhost:8081/api/contract-document"
            : "http://localhost:8081/api/law-document";

        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setUploadMessage("File uploaded successfully.");
        console.log("Response:", response.data);
      } catch (error) {
        setUploadMessage("Failed to upload file.");
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      minHeight="100vh"
      sx={{ p: 3 }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: 600, width: "100%" }}>
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
      Upload your Document
    </Typography>

        <RadioGroup
          value={documentType}
          onChange={handleDocumentTypeChange}
          row
          aria-label="document-type"
          sx={{ mb: 3 }}
        >
          <FormControlLabel
            value="contract"
            control={<Radio />}
            label="Contract Document"
          />
          <FormControlLabel
            value="law"
            control={<Radio />}
            label="Law Document"
          />
        </RadioGroup>

        <Button
          variant="outlined"
          component="label"
          sx={{ mb: 2, color: "primary.main", borderColor: "primary.main" }}
        >
          {documentType === "contract" ? "Choose Contract File" : "Choose Law File"}
          <input
            type="file"
            hidden
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </Button>

        {selectedFile && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            Selected file: <strong>{selectedFile.name}</strong>
          </Typography>
        )}

        {errorMessage && (
          <Typography variant="body1" color="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          Upload File
        </Button>

        {uploadMessage && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            {uploadMessage}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default UploadPage;