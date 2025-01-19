"use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalTitle,
//   ModalFooter,
//   ModalTrigger,
// } from "@/components/ui/modal";

// interface Route {
//   id: number;
//   name: string;
//   source: string;
//   destination: string;
//   duration: number;
// }

// export default function RoutesPage() {
//   const [routes, setRoutes] = useState<Route[]>([]);
//   const [editingRoute, setEditingRoute] = useState<Route | null>(null);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [newRoute, setNewRoute] = useState<Omit<Route, "id">>({
//     name: "",
//     source: "",
//     destination: "",
//     duration: 0,
//   });

//   // Backend API Base URL
//   const API_BASE_URL = "http://localhost:8000/routes";

//   // Fetch Routes from the Backend
//   useEffect(() => {
//     axios
//       .get(API_BASE_URL)
//       .then((response) => {
//         setRoutes(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching routes:", error);
//       });
//   }, []);

//   // Add a New Route
//   const handleAdd = () => {
//     axios
//       .post(API_BASE_URL, newRoute)
//       .then((response) => {
//         setRoutes((prevRoutes) => [...prevRoutes, response.data]);
//         setIsAddModalOpen(false);
//         setNewRoute({ name: "", source: "", destination: "", duration: 0 });
//       })
//       .catch((error) => {
//         console.error("Error adding route:", error);
//       });
//   };

//   // Edit an Existing Route
//   const handleEdit = (route: Route) => {
//     setEditingRoute(route);
//   };

//   const handleSave = () => {
//     if (editingRoute) {
//       axios
//         .put(`${API_BASE_URL}/${editingRoute.id}`, editingRoute)
//         .then((response) => {
//           setRoutes((prevRoutes) =>
//             prevRoutes.map((route) =>
//               route.id === editingRoute.id ? response.data : route
//             )
//           );
//           setEditingRoute(null);
//         })
//         .catch((error) => {
//           console.error("Error updating route:", error);
//         });
//     }
//   };

//   // Delete a Route
//   const handleDelete = (id: number) => {
//     axios
//       .delete(`${API_BASE_URL}/${id}`)
//       .then(() => {
//         setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== id));
//       })
//       .catch((error) => {
//         console.error("Error deleting route:", error);
//       });
//   };

//   return (
//     <div className="space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Routes</h1>
//         <Modal open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//           <ModalTrigger asChild>
//             <Button>Add Route</Button>
//           </ModalTrigger>
//           <ModalContent>
//             <ModalHeader>
//               <ModalTitle>Add New Route</ModalTitle>
//             </ModalHeader>
//             <div className="grid gap-4 py-4">
//               <Input
//                 placeholder="Name"
//                 value={newRoute.name}
//                 onChange={(e) =>
//                   setNewRoute({ ...newRoute, name: e.target.value })
//                 }
//               />
//               <Input
//                 placeholder="Source"
//                 value={newRoute.source}
//                 onChange={(e) =>
//                   setNewRoute({ ...newRoute, source: e.target.value })
//                 }
//               />
//               <Input
//                 placeholder="Destination"
//                 value={newRoute.destination}
//                 onChange={(e) =>
//                   setNewRoute({ ...newRoute, destination: e.target.value })
//                 }
//               />
//               <Input
//                 type="number"
//                 placeholder="Duration (minutes)"
//                 value={newRoute.duration}
//                 onChange={(e) =>
//                   setNewRoute({
//                     ...newRoute,
//                     duration: Number(e.target.value),
//                   })
//                 }
//               />
//             </div>
//             <ModalFooter>
//               <Button onClick={handleAdd}>Add Route</Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Source</TableHead>
//             <TableHead>Destination</TableHead>
//             <TableHead>Duration (minutes)</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {routes.map((route) => (
//             <TableRow key={route.id}>
//               <TableCell>
//                 {editingRoute?.id === route.id ? (
//                   <Input
//                     value={editingRoute.name}
//                     onChange={(e) =>
//                       setEditingRoute({
//                         ...editingRoute,
//                         name: e.target.value,
//                       })
//                     }
//                   />
//                 ) : (
//                   route.name
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editingRoute?.id === route.id ? (
//                   <Input
//                     value={editingRoute.source}
//                     onChange={(e) =>
//                       setEditingRoute({
//                         ...editingRoute,
//                         source: e.target.value,
//                       })
//                     }
//                   />
//                 ) : (
//                   route.source
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editingRoute?.id === route.id ? (
//                   <Input
//                     value={editingRoute.destination}
//                     onChange={(e) =>
//                       setEditingRoute({
//                         ...editingRoute,
//                         destination: e.target.value,
//                       })
//                     }
//                   />
//                 ) : (
//                   route.destination
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editingRoute?.id === route.id ? (
//                   <Input
//                     type="number"
//                     value={editingRoute.duration}
//                     onChange={(e) =>
//                       setEditingRoute({
//                         ...editingRoute,
//                         duration: Number(e.target.value),
//                       })
//                     }
//                   />
//                 ) : (
//                   route.duration
//                 )}
//               </TableCell>
//               <TableCell>
//                 {editingRoute?.id === route.id ? (
//                   <Button onClick={handleSave}>Save</Button>
//                 ) : (
//                   <>
//                     <Button
//                       onClick={() => handleEdit(route)}
//                       className="mr-2"
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       onClick={() => handleDelete(route.id)}
//                       variant="destructive"
//                     >
//                       Delete
//                     </Button>
//                   </>
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';



// interface Route {
//   id: number;
//   name: string;
//   source_station: string;
//   destination_station: string;
//   duration: number;
// }

// const RoutesPage: React.FC = () => {
//   const [routes, setRoutes] = useState<Route[]>([]); // State to store the list of routes
//   const [newRoute, setNewRoute] = useState<Route>({
//     id: 0,
//     name: '',
//     source_station: '',
//     destination_station: '',
//     duration: 0,
//   }); // State to store the data for a new route

//   const [loading, setLoading] = useState<boolean>(false); // Loading state
//   const [error, setError] = useState<string | null>(null); // Error state

//   // Fetch routes when the component mounts
//   useEffect(() => {
//     setLoading(true);
//     axios.get('http://localhost:8000/routes')  // Replace with your backend URL
//       .then((response) => {
//         setRoutes(response.data); // Set the routes data to the state
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError('Failed to fetch routes');
//         setLoading(false);
//       });
//   }, []);

//   // Handle adding a new route (POST request)
//   const handleAddRoute = () => {
//     axios.post('http://localhost:8000/routes', newRoute) // Replace with your backend URL
//       .then((response) => {
//         setRoutes([...routes, response.data]); // Add the new route to the state
//         setNewRoute({ id: 0, name: '', source_station: '', destination_station: '', duration: 0 }); // Reset the new route form
//       })
//       .catch((error) => {
//         setError('Failed to add route');
//       });
//   };

//   // Handle updating a route (PUT request)
//   const handleUpdateRoute = (routeId: number) => {
//     const updatedRoute = { ...newRoute }; // Assuming you are updating using the form data
    
//     axios.put(`http://localhost:8000/routes/${routeId}`, updatedRoute) // Replace with your backend URL
//       .then((response) => {
//         const updatedRoutes = routes.map(route =>
//           route.id === routeId ? response.data : route
//         );
//         setRoutes(updatedRoutes); // Update the state with the updated route
//       })
//       .catch((error) => {
//         setError('Failed to update route');
//       });
//   };

//   // Handle deleting a route (DELETE request)
//   const handleDeleteRoute = (routeId: number) => {
//     axios.delete(`http://localhost:8000/routes/${routeId}`) // Replace with your backend URL
//       .then(() => {
//         setRoutes(routes.filter(route => route.id !== routeId)); // Remove the deleted route from the state
//       })
//       .catch((error) => {
//         setError('Failed to delete route');
//       });
//   };

//   // Handle form input changes for new route
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewRoute({ ...newRoute, [name]: value });
//   };

//   return (
//     <div>
//       <h1>Routes</h1>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       {/* Table displaying current routes */}
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Source</th>
//             <th>Destination</th>
//             <th>Duration</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {routes.map((route) => (
//             <tr key={route.id}>
//               <td>{route.name}</td>
//               <td>{route.source_station}</td>
//               <td>{route.destination_station}</td>
//               <td>{route.duration}</td>
//               <td>
//                 <button onClick={() => handleUpdateRoute(route.id)}>Update</button>
//                 <button onClick={() => handleDeleteRoute(route.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Form for adding a new route */}
//       <h2>Add New Route</h2>
//       <form onSubmit={(e) => { e.preventDefault(); handleAddRoute(); }}>
//         <input
//           type="text"
//           name="name"
//           value={newRoute.name}
//           onChange={handleInputChange}
//           placeholder="Route Name"
//         />
//         <input
//           type="text"
//           name="source_station"
//           value={newRoute.source_station}
//           onChange={handleInputChange}
//           placeholder="Source Station"
//         />
//         <input
//           type="text"
//           name="destination_station"
//           value={newRoute.destination_station}
//           onChange={handleInputChange}
//           placeholder="Destination Station"
//         />
//         <input
//           type="number"
//           name="duration"
//           value={newRoute.duration}
//           onChange={handleInputChange}
//           placeholder="Duration"
//         />
//         <button type="submit">Add Route</button>
//       </form>
//     </div>
//   );
// };

// export default RoutesPage;

"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter, ModalTrigger } from "@/components/ui/modal";

interface Route {
  id: number;
  name: string;
  source_station: string;
  destination_station: string;
  duration: number;
}

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [newRoute, setNewRoute] = useState<Omit<Route, "id">>({
    name: "",
    source_station: "",
    destination_station: "",
    duration: 0,
  });
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch routes from the backend on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/routes")
      .then((response) => {
        setRoutes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch routes");
        setLoading(false);
      });
  }, []);

  const handleEdit = (route: Route) => {
    setEditingRoute(route);
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:8000/routes/${id}`)
      .then(() => {
        setRoutes(routes.filter((route) => route.id !== id));
      })
      .catch((error) => setError("Failed to delete route"));
  };

  const handleSave = () => {
    if (editingRoute) {
      axios
        .put(`http://localhost:8000/routes/${editingRoute.id}`, editingRoute)
        .then((response) => {
          setRoutes(
            routes.map((route) =>
              route.id === editingRoute.id ? response.data : route
            )
          );
          setEditingRoute(null);
        })
        .catch((error) => setError("Failed to update route"));
    }
  };

  const handleAdd = () => {
    axios
      .post("http://localhost:8000/routes", newRoute)
      .then((response) => {
        setRoutes([...routes, response.data]);
        setIsAddModalOpen(false);
        setNewRoute({ name: "", source_station: "", destination_station: "", duration: 0 });
      })
      .catch((error) => setError("Failed to add route"));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Routes</h1>
        <Modal open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <ModalTrigger asChild>
            <Button>Add Route</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Add New Route</ModalTitle>
            </ModalHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Name"
                value={newRoute.name}
                onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
              />
              <Input
                placeholder="Source Station"
                value={newRoute.source_station}
                onChange={(e) => setNewRoute({ ...newRoute, source_station: e.target.value })}
              />
              <Input
                placeholder="Destination Station"
                value={newRoute.destination_station}
                onChange={(e) => setNewRoute({ ...newRoute, destination_station: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Duration"
                value={newRoute.duration}
                onChange={(e) => setNewRoute({ ...newRoute, duration: Number(e.target.value) })}
              />
            </div>
            <ModalFooter>
              <Button onClick={handleAdd}>Add Route</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Source Station</TableCell>
            <TableCell>Destination Station</TableCell>
            <TableCell>Duration (min)</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes.map((route) => (
            <TableRow key={route.id}>
              <TableCell>
                {editingRoute?.id === route.id ? (
                  <Input
                    value={editingRoute.name}
                    onChange={(e) => setEditingRoute({ ...editingRoute, name: e.target.value })}
                  />
                ) : (
                  route.name
                )}
              </TableCell>
              <TableCell>
                {editingRoute?.id === route.id ? (
                  <Input
                    value={editingRoute.source_station}
                    onChange={(e) =>
                      setEditingRoute({ ...editingRoute, source_station: e.target.value })
                    }
                  />
                ) : (
                  route.source_station
                )}
              </TableCell>
              <TableCell>
                {editingRoute?.id === route.id ? (
                  <Input
                    value={editingRoute.destination_station}
                    onChange={(e) =>
                      setEditingRoute({ ...editingRoute, destination_station: e.target.value })
                    }
                  />
                ) : (
                  route.destination_station
                )}
              </TableCell>
              <TableCell>
                {editingRoute?.id === route.id ? (
                  <Input
                    type="number"
                    value={editingRoute.duration}
                    onChange={(e) =>
                      setEditingRoute({ ...editingRoute, duration: Number(e.target.value) })
                    }
                  />
                ) : (
                  route.duration
                )}
              </TableCell>
              <TableCell>
                {editingRoute?.id === route.id ? (
                  <Button onClick={handleSave}>Save</Button>
                ) : (
                  <>
                    <Button onClick={() => handleEdit(route)} className="mr-2">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(route.id)} variant="destructive">
                      Delete
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
