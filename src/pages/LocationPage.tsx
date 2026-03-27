import { MapPin, Navigation, Shield, Clock } from 'lucide-react';
import { routeHistory, safeZones } from '@/data/mockData';
import { useEffect, useRef } from 'react';

const LocationPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Dynamic import to avoid SSR issues
    const loadMap = async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      // Clean up existing map
      if ((mapRef.current as any)?._leaflet_id) {
        (mapRef.current as any)._leaflet_id = null;
        mapRef.current!.innerHTML = '';
      }

      const map = L.map(mapRef.current!, {
        zoomControl: false,
      }).setView([-23.5505, -46.6333], 15);

      L.control.zoom({ position: 'topright' }).addTo(map);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB',
      }).addTo(map);

      // Route line
      const routeCoords = routeHistory.map(p => [p.lat, p.lng] as [number, number]);
      L.polyline(routeCoords, { color: '#C5A059', weight: 3, opacity: 0.8, dashArray: '8 4' }).addTo(map);

      // Route markers
      routeHistory.forEach((point, i) => {
        const isLast = i === routeHistory.length - 1;
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:${isLast ? 16 : 10}px;height:${isLast ? 16 : 10}px;background:${isLast ? '#C5A059' : '#4a5568'};border:2px solid ${isLast ? '#C5A059' : '#2d3748'};border-radius:50%;box-shadow:0 0 ${isLast ? 12 : 0}px #C5A05980;"></div>`,
          iconSize: [isLast ? 16 : 10, isLast ? 16 : 10],
          iconAnchor: [isLast ? 8 : 5, isLast ? 8 : 5],
        });
        L.marker([point.lat, point.lng], { icon })
          .addTo(map)
          .bindPopup(`<div style="color:#001B3D;font-weight:600">${point.label}</div><div style="color:#666;font-size:12px">${point.time}</div>`);
      });

      // Safe zones
      safeZones.forEach(zone => {
        L.circle([zone.center.lat, zone.center.lng], {
          radius: zone.radius,
          color: '#C5A059',
          fillColor: '#C5A059',
          fillOpacity: 0.08,
          weight: 1.5,
          dashArray: '6 3',
        }).addTo(map).bindPopup(`<div style="color:#001B3D;font-weight:600">Zona Segura: ${zone.name}</div><div style="color:#666;font-size:12px">Raio: ${zone.radius}m</div>`);
      });

      return () => map.remove();
    };

    loadMap();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          Módulo de Localização
        </h1>
        <p className="text-sm text-muted-foreground mt-1">GPS em tempo real e geofencing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-premium rounded-xl overflow-hidden">
          <div ref={mapRef} className="h-[500px] w-full" />
        </div>

        <div className="space-y-4">
          {/* Safe Zones */}
          <div className="card-premium rounded-xl p-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-primary" />
              Zonas Seguras
            </h3>
            <div className="space-y-2">
              {safeZones.map((zone, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">{zone.name}</p>
                    <p className="text-xs text-muted-foreground">Raio: {zone.radius}m</p>
                  </div>
                  <Navigation className="h-4 w-4 text-primary" />
                </div>
              ))}
            </div>
          </div>

          {/* Route History */}
          <div className="card-premium rounded-xl p-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-primary" />
              Histórico de Rotas
            </h3>
            <div className="space-y-1">
              {routeHistory.map((point, i) => (
                <div key={i} className="flex items-start gap-3 p-2">
                  <div className="flex flex-col items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${i === routeHistory.length - 1 ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                    {i < routeHistory.length - 1 && <div className="w-px h-6 bg-border" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{point.label}</p>
                    <p className="text-xs text-muted-foreground">{point.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
