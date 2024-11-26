import { Card, ListItemText, Typography, Button } from "@mui/material";
import { Document } from "../types";

type DocumentCardProps = {
  doc: Document;
  keywords?: string;
  searchedName?: string;
  searchedSurname?: string;
  searchedGovernmentName?: string;
  searchedLevelOfAdministration?: string;
  searchedContent?: string;
};

const DocumentCard = ({
  doc,
  keywords = "",
  searchedName = "",
  searchedGovernmentName = "",
  searchedSurname = "",
  searchedLevelOfAdministration = "",
  searchedContent = "",
}: DocumentCardProps) => {
  const { governmentName, levelOfAdministration, title, contentEn, contentSr } =
    doc;

  // Function to highlight the search keywords in the content
  const highlightText = (text: string, keywords: string[]) => {
    if (!keywords.length) return text; // Return text as is if there are no keywords
    // Create regex for normalized keywords
    const regex = new RegExp(`(${keywords.join("|")})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <mark key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Combine all search inputs into a single array of keywords
  const combinedKeywords = [
    keywords,
    searchedName,
    searchedSurname,
    searchedGovernmentName,
    searchedLevelOfAdministration,
    searchedContent,
  ]
    .filter(Boolean) // Remove any undefined or empty values
    .join(" ")
    .split(" "); // Convert to array of keywords

  const handleDownload = (filename: string) => {
    const downloadUrl = `http://localhost:8081/api/file/${filename}`;
    window.open(downloadUrl, "_blank");
  };

  return (
    <Card style={{ padding: "2rem" }}>
      <ListItemText
        primary={<strong>{title}</strong>}
        secondary={
          <div>
            {governmentName && (
              <Typography variant="body1">
                Government Name:{" "}
                {highlightText(governmentName, combinedKeywords)}
              </Typography>
            )}
            {levelOfAdministration && (
              <Typography variant="body1">
                Level of Administration:{" "}
                {highlightText(levelOfAdministration, combinedKeywords)}
              </Typography>
            )}
            {(contentSr || contentEn) && (
              <Typography variant="body2">
                {highlightText(
                  contentSr ? contentSr : contentEn,
                  combinedKeywords
                )}
              </Typography>
            )}
          </div>
        }
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleDownload(doc.serverFilename)}
        style={{ marginTop: "10px" }}
      >
        Download
      </Button>
    </Card>
  );
};

export default DocumentCard;
