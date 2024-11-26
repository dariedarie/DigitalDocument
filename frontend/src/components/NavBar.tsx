// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
// import { Link as RouterLink } from "react-router-dom";

// const NavBar = () => {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="fixed">
//         <Toolbar>
//           <Button component={RouterLink} color="inherit" to="/index-parse">
//             Index/Parse
//           </Button>
//           |
//           <Button component={RouterLink} color="inherit" to="/search">
//             Search
//           </Button>
//           |
//           <Button component={RouterLink} color="inherit" to="/advanced-search">
//             Advanced search
//           </Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };

// export default NavBar;

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";

const drawerWidth = 240; // širina bočnog menija

// const NavBar = () => {
//   return (
//     <Box sx={{ display: "flex" }}>
//       {/* Drawer component for sidebar */}
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <Toolbar />
//         <Box sx={{ overflow: "auto" }}>
//           <List>
//             <ListItem button component={RouterLink} to="/index-parse">
//               <ListItemText primary="Index/Parse" />
//             </ListItem>
//             <ListItem button component={RouterLink} to="/search">
//               <ListItemText primary="Search" />
//             </ListItem>
//             <ListItem button component={RouterLink} to="/advanced-search">
//               <ListItemText primary="Advanced Search" />
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>

//       {/* Main content */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//       </Box>
//     </Box>
//   );
// };

// export default NavBar;

const NavBar = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer component for sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#FFD700", // Zlatna boja za pozadinu
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem
              button
              component={RouterLink}
              to="/search"
              sx={{ color: "#000000", '&:hover': { backgroundColor: "#FFDA44" } }} // Boja teksta i pozadina pri hover-u
            >
              <ListItemText primary="Search" />
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              to="/advanced-search"
              sx={{ color: "#000000", '&:hover': { backgroundColor: "#FFDA44" } }} // Boja teksta i pozadina pri hover-u
            >
              <ListItemText primary="Premium Search" />
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              to="/document-upload"
              sx={{ color: "#000000", '&:hover': { backgroundColor: "#FFDA44" } }} // Boja teksta i pozadina pri hover-u
            >
              <ListItemText primary="UploadFiles" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      </Box>
    </Box>
  );
};

export default NavBar;
