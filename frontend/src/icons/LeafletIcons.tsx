import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
    <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>.cls-1{fill:#00df8e;}.cls-2{fill:#bfffc8;}</style>
      </defs>
      <g id="fill">
        <path class="cls-1" d="M26,13.25c0,3.1-3.16,10.73-5.92,14.64a5,5,0,0,1-8.16,0C9.16,24,6,16.35,6,13.25,6,7.73,10.48,2,16,2S26,7.73,26,13.25Z"/>
        <path class="cls-2" d="M16,15.5a4.13,4.13,0,1,1,4.12-4.13A4.13,4.13,0,0,1,16,15.5Zm0-6.25a2.13,2.13,0,1,0,2.12,2.12A2.12,2.12,0,0,0,16,9.25Z"/>
      </g>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const selectedCustomIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
    <svg width="48" height="48" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>.cls-1{fill:#ff7f0e;}.cls-2{fill:#ffbb78;}</style> <!-- Bright orange color -->
      </defs>
      <g id="fill">
        <path class="cls-1" d="M26,13.25c0,3.1-3.16,10.73-5.92,14.64a5,5,0,0,1-8.16,0C9.16,24,6,16.35,6,13.25,6,7.73,10.48,2,16,2S26,7.73,26,13.25Z"/>
        <path class="cls-2" d="M16,15.5a4.13,4.13,0,1,1,4.12-4.13A4.13,4.13,0,0,1,16,15.5Zm0-6.25a2.13,2.13,0,1,0,2.12,2.12A2.12,2.12,0,0,0,16,9.25Z"/>
      </g>
    </svg>
  `),
  iconSize: [48, 48],
  iconAnchor: [24, 48],
});

export { customIcon, selectedCustomIcon };
