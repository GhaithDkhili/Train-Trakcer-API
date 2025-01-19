//"use client"

// import { useState } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter, ModalTrigger } from "@/components/ui/modal"

// interface Train {
//   id: number
//   name: string
//   speed: number
//   capacity: number
//   maintenance: string
//   route: string
// }

// export default function TrainsPage() {
//   const [trains, setTrains] = useState<Train[]>([
//     { id: 1, name: "Express 1", speed: 120, capacity: 200, maintenance: "OK", route: "Route A" },
//     { id: 2, name: "Local 1", speed: 80, capacity: 150, maintenance: "Scheduled", route: "Route B" },
//     { id: 3, name: "Express 2", speed: 130, capacity: 180, maintenance: "OK", route: "Route C" },
//   ])

//   const [editingTrain, setEditingTrain] = useState<Train | null>(null)
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false)
//   const [newTrain, setNewTrain] = useState<Omit<Train, 'id'>>({
//     name: "",
//     speed: 0,
//     capacity: 0,
//     maintenance: "",
//     route: ""
//   })

//   const handleEdit = (train: Train) => {
//     setEditingTrain(train)
//   }

//   const handleDelete = (id: number) => {
//     setTrains(trains.filter(train => train.id !== id))
//   }

//   const handleSave = () => {
//     if (editingTrain) {
//       setTrains(trains.map(train => train.id === editingTrain.id ? editingTrain : train))
//       setEditingTrain(null)
//     }
//   }

//   const handleAdd = () => {
//     const id = Math.max(...trains.map(t => t.id)) + 1
//     setTrains([...trains, { id, ...newTrain }])
//     setIsAddModalOpen(false)
//     setNewTrain({ name: "", speed: 0, capacity: 0, maintenance: "", route: "" })
//   }

//   return (
//     <div className="space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Trains</h1>
//         <Modal open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//           <ModalTrigger asChild>
//             <Button>Add Train</Button>
//           </ModalTrigger>
//           <ModalContent>
//             <ModalHeader>
//               <ModalTitle>Add New Train</ModalTitle>
//             </ModalHeader>
//             <div className="grid gap-4 py-4">
//               <Input
//                 placeholder="Name"
//                 value={newTrain.name}
//                 onChange={(e) => setNewTrain({ ...newTrain, name: e.target.value })}
//               />
//               <Input
//                 type="number"
//                 placeholder="Speed"
//                 value={newTrain.speed}
//                 onChange={(e) => setNewTrain({ ...newTrain, speed: Number(e.target.value) })}
//               />
//               <Input
//                 type="number"
//                 placeholder="Capacity"
//                 value={newTrain.capacity}
//                 onChange={(e) => setNewTrain({ ...newTrain, capacity: Number(e.target.value) })}
//               />
//               <Input
//                 placeholder="Maintenance"
//                 value={newTrain.maintenance}
//                 onChange={(e) => setNewTrain({ ...newTrain, maintenance: e.target.value })}
//               />
//               <Input
//                 placeholder="Route"
//                 value={newTrain.route}
//                 onChange={(e) => setNewTrain({ ...newTrain, route: e.target.value })}
//               />
//             </div>
//             <ModalFooter>
//               <Button onClick={handleAdd}>Add Train</Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Speed (km/h)</TableHead>
//             <TableHead>Capacity</TableHead>
//             <TableHead>Maintenance</TableHead>
//             <TableHead>Route</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {trains.map((train) => (
//             <TableRow key={train.id}>
//               <TableCell>{editingTrain?.id === train.id ? 
//                 <Input 
//                   value={editingTrain.name} 
//                   onChange={(e) => setEditingTrain({...editingTrain, name: e.target.value})}
//                 /> : train.name}
//               </TableCell>
//               <TableCell>{editingTrain?.id === train.id ? 
//                 <Input 
//                   type="number"
//                   value={editingTrain.speed} 
//                   onChange={(e) => setEditingTrain({...editingTrain, speed: Number(e.target.value)})}
//                 /> : train.speed}
//               </TableCell>
//               <TableCell>{editingTrain?.id === train.id ? 
//                 <Input 
//                   type="number"
//                   value={editingTrain.capacity} 
//                   onChange={(e) => setEditingTrain({...editingTrain, capacity: Number(e.target.value)})}
//                 /> : train.capacity}
//               </TableCell>
//               <TableCell>{editingTrain?.id === train.id ? 
//                 <Input 
//                   value={editingTrain.maintenance} 
//                   onChange={(e) => setEditingTrain({...editingTrain, maintenance: e.target.value})}
//                 /> : train.maintenance}
//               </TableCell>
//               <TableCell>{editingTrain?.id === train.id ? 
//                 <Input 
//                   value={editingTrain.route} 
//                   onChange={(e) => setEditingTrain({...editingTrain, route: e.target.value})}
//                 /> : train.route}
//               </TableCell>
//               <TableCell>
//                 {editingTrain?.id === train.id ? (
//                   <Button onClick={handleSave}>Save</Button>
//                 ) : (
//                   <>
//                     <Button onClick={() => handleEdit(train)} className="mr-2">Edit</Button>
//                     <Button onClick={() => handleDelete(train.id)} variant="destructive">Delete</Button>
//                   </>
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter, ModalTrigger } from "@/components/ui/modal";
import axios from "axios";

interface Train {
  id: number;
  name: string;
  speed: number;
  capacity: number;
  maintenance: string;
  route_id: number; 
}

export default function TrainsPage() {
  const [trains, setTrains] = useState<Train[]>([]);
  const [newTrain, setNewTrain] = useState<Omit<Train, "id">>({
    name: "",
    speed: 0,
    capacity: 0,
    maintenance: "",
    route_id: 0, 
  });
  const [editingTrain, setEditingTrain] = useState<Train | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch trains from the backend on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/trains") 
      .then((response) => {
        setTrains(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch trains");
        setLoading(false);
      });
  }, []);

  const handleEdit = (train: Train) => {
    setEditingTrain(train);
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://127.0.0.1:8000/trains/${id}`) // Replace with your backend URL
      .then(() => {
        setTrains(trains.filter((train) => train.id !== id));
      })
      .catch(() => setError("Failed to delete train"));
  };

  const handleSave = () => {
    if (editingTrain) {
      axios
        .put(`http://127.0.0.1:8000/trains/${editingTrain.id}`, editingTrain)
        .then((response) => {
          setTrains(
            trains.map((train) =>
              train.id === editingTrain.id ? response.data : train
            )
          );
          setEditingTrain(null);
        })
        .catch(() => setError("Failed to update train"));
    }
  };

  const handleAdd = () => {
    axios
      .post("http://127.0.0.1:8000/trains", newTrain) // Replace with your backend URL
      .then((response) => {
        setTrains([...trains, response.data]);
        setIsAddModalOpen(false);
        setNewTrain({ name: "", speed: 0, capacity: 0, maintenance: "", route_id: 0 });
      })
      .catch(() => setError("Failed to add train"));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Trains</h1>
        <Modal open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <ModalTrigger asChild>
            <Button>Add Train</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Add New Train</ModalTitle>
            </ModalHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Name"
                value={newTrain.name}
                onChange={(e) => setNewTrain({ ...newTrain, name: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Speed"
                value={newTrain.speed}
                onChange={(e) => setNewTrain({ ...newTrain, speed: Number(e.target.value) })}
              />
              <Input
                type="number"
                placeholder="Capacity"
                value={newTrain.capacity}
                onChange={(e) => setNewTrain({ ...newTrain, capacity: Number(e.target.value) })}
              />
              <Input
                placeholder="Maintenance"
                value={newTrain.maintenance}
                onChange={(e) => setNewTrain({ ...newTrain, maintenance: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Route ID"
                value={newTrain.route_id}
                onChange={(e) => setNewTrain({ ...newTrain, route_id: Number(e.target.value) })}
              />
            </div>
            <ModalFooter>
              <Button onClick={handleAdd}>Add Train</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Speed (km/h)</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Maintenance</TableHead>
            <TableHead>Route ID</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trains.map((train) => (
            <TableRow key={train.id}>
              <TableCell>
                {editingTrain?.id === train.id ? (
                  <Input
                    value={editingTrain.name}
                    onChange={(e) =>
                      setEditingTrain({ ...editingTrain, name: e.target.value })
                    }
                  />
                ) : (
                  train.name
                )}
              </TableCell>
              <TableCell>
                {editingTrain?.id === train.id ? (
                  <Input
                    type="number"
                    value={editingTrain.speed}
                    onChange={(e) =>
                      setEditingTrain({ ...editingTrain, speed: Number(e.target.value) })
                    }
                  />
                ) : (
                  train.speed
                )}
              </TableCell>
              <TableCell>
                {editingTrain?.id === train.id ? (
                  <Input
                    type="number"
                    value={editingTrain.capacity}
                    onChange={(e) =>
                      setEditingTrain({ ...editingTrain, capacity: Number(e.target.value) })
                    }
                  />
                ) : (
                  train.capacity
                )}
              </TableCell>
              <TableCell>
                {editingTrain?.id === train.id ? (
                  <Input
                    value={editingTrain.maintenance}
                    onChange={(e) =>
                      setEditingTrain({ ...editingTrain, maintenance: e.target.value })
                    }
                  />
                ) : (
                  train.maintenance
                )}
              </TableCell>
              <TableCell>
                {editingTrain?.id === train.id ? (
                  <Input
                    type="number"
                    value={editingTrain.route_id}
                    onChange={(e) =>
                      setEditingTrain({ ...editingTrain, route_id: Number(e.target.value) })
                    }
                  />
                ) : (
                  train.route_id
                )}
              </TableCell>
              <TableCell>
                {editingTrain?.id === train.id ? (
                  <Button onClick={handleSave}>Save</Button>
                ) : (
                  <>
                    <Button onClick={() => handleEdit(train)} className="mr-2">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(train.id)} variant="destructive">
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
