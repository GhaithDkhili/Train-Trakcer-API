// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { TrainIcon, MapIcon, RouteIcon } from 'lucide-react'

// export default function Home() {
//   return (
//     <div className="space-y-8">
//       <h1 className="text-3xl font-bold">Train Tracker Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Trains
//             </CardTitle>
//             <TrainIcon className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">15</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Stations
//             </CardTitle>
//             <MapIcon className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">32</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Routes
//             </CardTitle>
//             <RouteIcon className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">14</div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrainIcon, MapIcon, RouteIcon } from "lucide-react";
import axios from "axios";

export default function Home() {
  const [stats, setStats] = useState({
    trains: 0,
    stations: 0,
    routes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [trainsResponse, stationsResponse, routesResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/trains"),
          axios.get("http://127.0.0.1:8000/stations"),
          axios.get("http://127.0.0.1:8000/routes"),
        ]);

        setStats({
          trains: trainsResponse.data.length,
          stations: stationsResponse.data.length,
          routes: routesResponse.data.length,
        });
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch statistics");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Welcome to Train Tracker !</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trains</CardTitle>
            <TrainIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.trains}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stations</CardTitle>
            <MapIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.stations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Routes</CardTitle>
            <RouteIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.routes}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
