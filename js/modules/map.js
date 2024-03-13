async function initMap() {
    const geo = { lat: 50.076705, lng: 14.417842 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const map = new Map(document.getElementById("map"), {
        zoom: 15,
        center: geo,
        mapId: "DEMO_MAP_ID",
    });

    const marker = new AdvancedMarkerElement({
        map: map,
        position: geo,
        title: "CTU",
    });
}

export default initMap