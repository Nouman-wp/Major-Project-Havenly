
        // document.addEventListener("DOMContentLoaded", function () {
        //     const locationQuery = "<%= listing.location %>";

        //     fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${locationQuery}`)
        //         .then(response => response.json())
        //         .then(data => {
        //             if (data.length > 0) {
        //                 const lat = parseFloat(data[0].lat);
        //                 const lon = parseFloat(data[0].lon);

        //                 const map = new ol.Map({
        //                     target: 'map',
        //                     layers: [
        //                         new ol.layer.Tile({
        //                             source: new ol.source.OSM()
        //                         })
        //                     ],
        //                     view: new ol.View({
        //                         center: ol.proj.fromLonLat([lon, lat]),
        //                         zoom: 12
        //                     })
        //                 });

        //                 const marker = new ol.Feature({
        //                     geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
        //                 });

        //                 const vectorSource = new ol.source.Vector({
        //                     features: [marker]
        //                 });

        //                 const markerLayer = new ol.layer.Vector({
        //                     source: vectorSource
        //                 });

        //                 map.addLayer(markerLayer);
        //             } else {
        //                 console.error("Location not found");
        //             }
        //         })
        //         .catch(error => console.error("Error fetching location data:", error));
        // });
