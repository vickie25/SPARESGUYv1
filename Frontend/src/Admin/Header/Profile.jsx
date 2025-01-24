// import React from "react";
// import { Dropdown, Badge } from "react-bootstrap";
// import { FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";

// const Profile = () => {
//   return (
//     <div
//       className="d-flex align-items-center justify-content-between"
//       style={{ gap: "20px" }}
//     >
//       {/* Profile Section */}
//       <div className="d-flex align-items-center" style={{ gap: "10px" }}>
//         <FaUserCircle size={36} color="#f2a900" />
//         <div>
//           <strong style={{ color: "#333" }}>apbc</strong>
//           <br />
//           <span style={{ fontSize: "12px", color: "#888" }}>Administrator</span>
//         </div>
//       </div>

//       {/* Notifications */}
//       <div className="d-flex align-items-center" style={{ gap: "15px" }}>
//         <div style={{ position: "relative" }}>
//           <FaBell size={20} style={{ cursor: "pointer" }} />
//           <Badge
//             pill
//             bg="danger"
//             style={{
//               position: "absolute",
//               top: "-5px",
//               right: "-5px",
//               fontSize: "10px",
//             }}
//           >
//             3
//           </Badge>
//         </div>
//         <div style={{ position: "relative" }}>
//           <FaEnvelope size={20} style={{ cursor: "pointer" }} />
//           <Badge
//             pill
//             bg="danger"
//             style={{
//               position: "absolute",
//               top: "-5px",
//               right: "-5px",
//               fontSize: "10px",
//             }}
//           >
//             5
//           </Badge>
//         </div>

//         {/* Dropdown */}
//         <Dropdown align="end">
//           <Dropdown.Toggle variant="light" id="dropdown-basic">
//             Actions
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//             <Dropdown.Item href="#/profile">Profile Settings</Dropdown.Item>
//             <Dropdown.Item href="#/logout">Log Out</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </div>
//   );
// };

// export default Profile;
