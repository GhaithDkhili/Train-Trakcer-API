"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter, ModalTrigger } from "@/components/ui/modal";
import axios from "axios";

interface Station {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function StationsPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [newStation, setNewStation] = useState<Omit<Station, "id">>({
    name: "",
    latitude: 0,
    longitude: 0,
  });
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch stations from the backend on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/stations") // Replace with your backend URL
      .then((response) => {
        setStations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch stations");
        setLoading(false);
      });
  }, []);

  const handleEdit = (station: Station) => {
    setEditingStation(station);
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://127.0.0.1:8000/stations/${id}`) // Replace with your backend URL
      .then(() => {
        setStations(stations.filter((station) => station.id !== id));
      })
      .catch(() => setError("Failed to delete station"));
  };

  const handleSave = () => {
    if (editingStation) {
      axios
        .put(`http://127.0.0.1:8000/stations/${editingStation.id}`, editingStation)
        .then((response) => {
          setStations(
            stations.map((station) =>
              station.id === editingStation.id ? response.data : station
            )
          );
          setEditingStation(null);
        })
        .catch(() => setError("Failed to update station"));
    }
  };

  const handleAdd = () => {
    axios
      .post("http://127.0.0.1:8000/stations", newStation) // Replace with your backend URL
      .then((response) => {
        setStations([...stations, response.data]);
        setIsAddModalOpen(false);
        setNewStation({ name: "", latitude: 0, longitude: 0 });
      })
      .catch(() => setError("Failed to add station"));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Stations</h1>
        <Modal open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <ModalTrigger asChild>
            <Button>Add Station</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Add New Station</ModalTitle>
            </ModalHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Name"
                value={newStation.name}
                onChange={(e) => setNewStation({ ...newStation, name: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Latitude"
                value={newStation.latitude}
                onChange={(e) => setNewStation({ ...newStation, latitude: Number(e.target.value) })}
              />
              <Input
                type="number"
                placeholder="Longitude"
                value={newStation.longitude}
                onChange={(e) => setNewStation({ ...newStation, longitude: Number(e.target.value) })}
              />
            </div>
            <ModalFooter>
              <Button onClick={handleAdd}>Add Station</Button>
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
            <TableHead>Latitude</TableHead>
            <TableHead>Longitude</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stations.map((station) => (
            <TableRow key={station.id}>
              <TableCell>
                {editingStation?.id === station.id ? (
                  <Input
                    value={editingStation.name}
                    onChange={(e) =>
                      setEditingStation({ ...editingStation, name: e.target.value })
                    }
                  />
                ) : (
                  station.name
                )}
              </TableCell>
              <TableCell>
                {editingStation?.id === station.id ? (
                  <Input
                    type="number"
                    value={editingStation.latitude}
                    onChange={(e) =>
                      setEditingStation({ ...editingStation, latitude: Number(e.target.value) })
                    }
                  />
                ) : (
                  station.latitude
                )}
              </TableCell>
              <TableCell>
                {editingStation?.id === station.id ? (
                  <Input
                    type="number"
                    value={editingStation.longitude}
                    onChange={(e) =>
                      setEditingStation({ ...editingStation, longitude: Number(e.target.value) })
                    }
                  />
                ) : (
                  station.longitude
                )}
              </TableCell>
              <TableCell>
                {editingStation?.id === station.id ? (
                  <Button onClick={handleSave}>Save</Button>
                ) : (
                  <>
                    <Button onClick={() => handleEdit(station)} className="mr-2">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(station.id)} variant="destructive">
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

