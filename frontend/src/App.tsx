import "./App.css";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

// function App() {
//   return (
//     <>
//       <NavBar />
//       <div
//         style={{
//           width: "100%",
//           display: "flex",
//           alignItems: "center",
//           flexDirection: "column",
//           minHeight: "100vh",
//           marginTop: "5rem", // Pushes content below NavBar
//           padding: "0 1rem", // Optional: Adds some padding on smaller screens
//         }}
//       >
//         <div
//           style={{
//             maxWidth: "1280px", // Set max width to 1280px
//             width: "100%", // Ensure content takes up full width until maxWidth is reached
//           }}
//         >
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Fiksirani NavBar sa leve strane */}
      <NavBar />
      
      {/* Glavni sadržaj aplikacije */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: "240px", // Ovo je da sadržaj bude desno od fiksiranog bočnog menija
          width: "calc(100% - 240px)", // Postavlja širinu sadržaja pored NavBar-a
        }}
      >
        <Toolbar />
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "100vh",
            padding: "0 1rem", // Padding za manje ekrane
          }}
        >
          <div
            style={{
              maxWidth: "1280px", // Maksimalna širina sadržaja
              width: "100%", // Zauzima celu širinu do maxWidth
            }}
          >
            <Outlet />
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default App;