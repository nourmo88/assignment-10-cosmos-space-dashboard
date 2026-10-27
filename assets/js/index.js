// WRITE YOUR JS CODE HERE

let inspace = document.querySelector("nav .today-in-space");
let launches = document.querySelector("nav .launches");
let planets = document.querySelector("nav .planets");
let pages = document.querySelectorAll(".pages>section");

function toOpen(page) {
    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.add("hidden");
    }
    inspace.classList.remove("bg-blue-500/10", "text-blue-400");
    launches.classList.remove("bg-blue-500/10", "text-blue-400", "text-slate-300");
    planets.classList.remove("bg-blue-500/10", "text-blue-400", "text-slate-300");

    if (page == "today-in-space") {
        inspace.classList.add("bg-blue-500/10", "text-blue-400");
    }
    else if (page == "launches") {
        LauncheAPI();
        launches.classList.add("bg-blue-500/10", "text-blue-400");
    }
    else {
        planets.classList.add("bg-blue-500/10", "text-blue-400");
    }
    document.getElementById(page).classList.remove("hidden");
}

let dateInput = document.getElementById("apod-date-input");
let today = new Date().toLocaleDateString("en-CA");
dateInput.max = today;
dateInput.value = today;
document.getElementById("Date").innerHTML = today;
let date = today;

dateInput.addEventListener("change", function () {
    document.getElementById("Date").innerHTML = dateInput.value;
    date = dateInput.value;
})


async function inspaceApi() {
    let selectedDate = date;
    console.log(selectedDate);
    document.getElementById("apod-image-container").innerHTML = `<div  id="apod-loading" class="text-center ">
                <i class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"></i>
                <p class="text-slate-400">Loading today's image...</p>
              </div>`
    try {
        console.log("API");
        let inspaceAPI = await fetch(`https://api.nasa.gov/planetary/apod?api_key=XEFUXvjRp80RTuEx7ANpNKCaOXckpIdRBzwqIQR3&date=${selectedDate}`);
        if (!inspaceAPI.ok) {
            throw new Error(`API Error: ${inspaceAPI.status}`);
        }

        let inspaceRESPONSE = await inspaceAPI.json();
        console.log(inspaceRESPONSE);
        document.getElementById("apod-date").innerHTML = "Astronomy Picture of the Day - " + new Date(selectedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

        let thephoto = `
        <img id="apod-image" class="w-full h-full object-cover" src="${inspaceRESPONSE.url}"
                alt="Astronomy Picture of the Day" />
              <div
                class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div class="absolute bottom-6 left-6 right-6">
                  <button
                  onclick="openPhoto('${inspaceRESPONSE.url}')"
                    class="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors">
                    <i class="fas fa-expand mr-2"></i>View Full Resolution
                  </button>
                </div>
              </div>
        `;

        document.getElementById("apod-image-container").innerHTML = thephoto;


        let details = `
         <div class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6">
              <h3 id="apod-title" class="text-lg md:text-2xl font-semibold mb-3 md:mb-4">
                ${inspaceRESPONSE.title}
              </h3>
              <div class="flex items-center space-x-4 mb-4 text-sm text-slate-400">
                <span id="apod-date-detail"><i class="far fa-calendar mr-2"></i>${new Date(selectedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</span>
              </div>
              <p id="apod-explanation" class="text-slate-300 leading-relaxed mb-4">
                ${inspaceRESPONSE.explanation}
              </p>
              <div id="apod-copyright" class="text-xs text-slate-400 italic mb-4">
                ${inspaceRESPONSE.copyright ? `&copy; ${inspaceRESPONSE.copyright}` : "Copy right"}
              </div>
            </div>
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h4 class="font-semibold mb-3 flex items-center">
                <i class="fas fa-info-circle text-blue-400 mr-2"></i>
                Image Details
              </h4>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-slate-400">Date</span>
                  <span id="apod-date-info" class="font-medium">${new Date(selectedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Media Type</span>
                  <span id="apod-media-type" class="font-medium">${inspaceRESPONSE.media_type}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Source</span>
                  <span class="font-medium">NASA APOD</span>
                </div>
              </div>
            </div>
        `;
        document.getElementById("main").innerHTML = details;


    } catch (error) {
        console.log(error);
        let warningicon = `
        <div  id="apod-loading" class="text-center ">
                <i style="color: red;" class="fa-solid fa-triangle-exclamation text-5xl"></i>
                <p class="text-slate-400">Failed to load image</p>
              </div>
        `
        document.getElementById("apod-image-container").innerHTML = warningicon;
        document.getElementById("apod-date").innerHTML = "Astronomy Picture of the Day - Invalid Date";

        let details = `
         <div class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6">
                Invalid Date
              
            </div>
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h4 class="font-semibold mb-3 flex items-center">
                <i class="fas fa-info-circle text-blue-400 mr-2"></i>
                Image Details
              </h4>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-slate-400">Date</span>
                  <span id="apod-date-info" class="font-medium">Invalid Date</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Media Type</span>
                  <span id="apod-media-type" class="font-medium">Media</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Source</span>
                  <span class="font-medium">NASA APOD</span>
                </div>
              </div>
            </div>
        `;
        document.getElementById("main").innerHTML = details;

        // alert("The API is temporarily unavailable. Please try again later.");
    }
}

function openPhoto(imageURL) {
    // console.log("image");
    window.open(imageURL, "_blank");
}
loadTodayApod();
function loadTodayApod() {
    console.log("today");
    dateInput.value = today;
    date = today;
    document.getElementById("Date").innerHTML = today;
    inspaceApi();
}


let smallplanets = document.querySelectorAll("#planets-grid>div");
// console.log(smallplanets);

async function newPlanet(index) {
    try {
        console.log("planetAPI");
        let planetAPI = await fetch(`https://solar-system-opendata-proxy.vercel.app/api/planets`);
        if (!planetAPI.ok) {
            throw new Error(`API Error: ${planetAPI.status}`);
        }

        let planetRESPONSE = await planetAPI.json();
        let newPlanet = planetRESPONSE.bodies[index];
        // console.log(newPlanet);


        let planetcart = `
    <div
            class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
            <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">
              <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
                <img id="planet-detail-image" class="w-full h-full object-contain" src="${newPlanet?.image}"
                  alt="${newPlanet?.image}" />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between mb-3 md:mb-4">
                  <h3 id="planet-detail-name" class="text-2xl md:text-3xl font-space font-bold">
                    ${newPlanet.name}
                  </h3>
                  <button class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <i class="far fa-heart"></i>
                  </button>
                </div>
                <p id="planet-detail-description"
                  class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  ${newPlanet.description}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
              <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-ruler text-xs"></i>
                  <span class="text-xs">Semimajor Axis</span>
                </p>
                <p id="planet-distance" class="text-sm md:text-lg font-semibold">
                  ${newPlanet.semimajorAxis}M km
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-circle"></i>
                  Mean Radius
                </p>
                <p id="planet-radius" class="text-lg font-semibold">
                  ${newPlanet.meanRadius} km
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-weight"></i>
                  Mass
                </p>
                <p id="planet-mass" class="text-lg font-semibold">
                ${newPlanet?.mass?.massValue} × 10^${newPlanet?.mass?.massExponent} kg
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-compress"></i>
                  Density
                </p>
                <p id="planet-density" class="text-lg font-semibold">
                  ${newPlanet.density} g/cm³
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-sync-alt"></i>
                  Orbital Period
                </p>
                <p id="planet-orbital-period" class="text-lg font-semibold">
                  ${newPlanet.sideralOrbit} days
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-redo"></i>
                  Rotation Period
                </p>
                <p id="planet-rotation" class="text-lg font-semibold">
                  ${newPlanet.sideralRotation} hours
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-moon"></i>
                  Moons
                </p>
                <p id="planet-moons" class="text-lg font-semibold">
                ${newPlanet.moons?.length ?? 0}
                </p>
              </div>
              <div class="bg-slate-900/50 rounded-lg p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <i class="fas fa-arrows-alt-v"></i>
                  Gravity
                </p>
                <p id="planet-gravity" class="text-lg font-semibold">
                  ${newPlanet.gravity} m/s²
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h4 class="font-semibold mb-4 flex items-center">
                <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                Discovery Info
              </h4>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Discovered By</span>
                  <span id="planet-discoverer" class="font-semibold text-right">${newPlanet.discoveredBy || "Known since antiquity"}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Discovery Date</span>
                  <span id="planet-discovery-date" class="font-semibold">${newPlanet.discoveryDate || "Ancient times"}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Body Type</span>
                  <span id="planet-body-type" class="font-semibold">${newPlanet.bodyType}</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-slate-400">Volume</span>
                  <span id="planet-volume" class="font-semibold">${newPlanet.vol?.volValue} x 10^ ${newPlanet.vol?.volExponent} km</span>
                </div>
              </div>
            </div>
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h4 class="font-semibold mb-4 flex items-center">
                <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                Quick Facts
              </h4>
              <ul id="planet-facts" class="space-y-3 text-sm">
                <li class="flex items-start">
                  <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span class="text-slate-300">Mass: ${newPlanet?.mass?.massValue} × 10^${newPlanet?.mass?.massExponent} kg</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span class="text-slate-300">Surface gravity: ${newPlanet.gravity} m/s</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span class="text-slate-300">Density: ${newPlanet.density} g/cm</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                  <span class="text-slate-300">Axial tilt: ${newPlanet.axialTilt}</span>
                </li>
              </ul>
            </div>
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h4 class="font-semibold mb-4 flex items-center">
                <i class="fas fa-satellite text-blue-400 mr-2"></i>
                Orbital Characteristics
              </h4>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Perihelion</span>
                  <span id="planet-perihelion" class="font-semibold">${newPlanet.perihelion} km</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Aphelion</span>
                  <span id="planet-aphelion" class="font-semibold">${newPlanet.aphelion} km</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Eccentricity</span>
                  <span id="planet-eccentricity" class="font-semibold">${newPlanet.eccentricity}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Inclination</span>
                  <span id="planet-inclination" class="font-semibold">${newPlanet.inclination} °</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Axial Tilt</span>
                  <span id="planet-axial-tilt" class="font-semibold">${newPlanet.axialTilt} °</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-slate-700">
                  <span class="text-slate-400">Avg Temperature</span>
                  <span id="planet-temp" class="font-semibold">${newPlanet.avgTemp} °C</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-slate-400">Escape Velocity</span>
                  <span id="planet-escape" class="font-semibold">${newPlanet.escape} km/s</span>
                </div>
              </div>
            </div>
            <button class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
              <i class="fas fa-book mr-2"></i>Learn More
            </button>
          </div>
    `;
        document.getElementById("planetdiv").innerHTML = planetcart;
    } catch (error) {
        console.log(error);
        // alert("The API is temporarily unavailable. Please try again later.");
    }


}

async function LauncheAPI() {
    try {
        console.log("launche");
        let launcheAPI = await fetch(`https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10`);
        if (!launcheAPI.ok) {
            throw new Error(`API Error: ${launcheAPI.status}`);
        }

        let launcheRESPONSE = await launcheAPI.json();
        let mylaunche = launcheRESPONSE.results;
        // console.log(mylaunche[0]);//arr
        // console.log(mylaunche[0].image.image_url);


        let launcheCard = `
        <div class="flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-3 mb-4">
                    <span
                      class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2">
                      <i class="fas fa-star"></i>
                      Featured Launch
                    </span>
                    <span class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                      Go
                    </span>
                  </div>
                  <h3 class="text-3xl font-bold mb-3 leading-tight">
                   ${mylaunche[0].name}
                  </h3>
                  <div class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-building"></i>
                      <span>SpaceX</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <i class="fas fa-rocket"></i>
                      <span>${mylaunche[0].rocket.configuration.name}</span>
                    </div>
                  </div>
                  <div
                    class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6">
                    <i class="fas fa-clock text-2xl text-blue-400"></i>
                    <div>
                      <p class="text-2xl font-bold text-blue-400">2</p>
                      <p class="text-xs text-slate-400">Days Until Launch</p>
                    </div>
                  </div>
                  <div class="grid xl:grid-cols-2 gap-4 mb-6">
                    <div class="bg-slate-900/50 rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-calendar"></i>
                        Launch Date
                      </p>
                      <p class="font-semibold">${new Date(mylaunche[0].net).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-clock"></i>
                        Launch Time
                      </p>
                      <p class="font-semibold">${mylaunche[0].net ? new Date(mylaunche[0].net).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }) : "Time TBD"} PM UTC</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-map-marker-alt"></i>
                        Location
                      </p>
                      <p class="font-semibold text-sm">${mylaunche[0].pad?.location?.name}</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                      <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-globe"></i>
                        Country
                      </p>
                      <p class="font-semibold">${mylaunche[0].pad?.location?.country?.name}</p>
                    </div>
                  </div>
                  <p class="text-slate-300 leading-relaxed mb-6">
                    ${mylaunche[0]?.mission?.description}
                  </p>
                </div>
                <div class="flex flex-col md:flex-row gap-3">
                  <button
                    class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2">
                    <i class="fas fa-info-circle"></i>
                    View Full Details
                  </button>
                  <div class="icons self-end md:self-center">
                    <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                      <i class="far fa-heart"></i>
                    </button>
                    <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                      <i class="fas fa-bell"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="relative">
                <div class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50">
                  <img src="${mylaunche[0].image.image_url}"alt="${mylaunche[0].name}"class="w-full h-full min-h-[400px] object-cover"/>
                  <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
              </div>
        `
        document.getElementById("bigcard").innerHTML = launcheCard;

        let launchecards = "";
        for (let i = 1; i < mylaunche.length; i++) {
            launchecards += `
             <div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
            <div class="relative h-48 bg-slate-900/50 flex items-center justify-center overflow-hidden">
                <img src="${mylaunche[i].image.image_url}" alt="${mylaunche[i].name}"
                class="w-full h-full max-h-[200px] object-cover transition-transform duration-500 group-hover:scale-110"/>              <div class="absolute top-3 right-3">
                <span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
                  Go
                </span>
              </div>
            </div>
            <div class="p-5">
              <div class="mb-3">
                <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  ${mylaunche[i].name}
                </h4>
                <p class="text-sm text-slate-400 flex items-center gap-2">
                  <i class="fas fa-building text-xs"></i>
                  ${mylaunche[i].pad?.location?.country?.name}
                </p>
              </div>
              <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-calendar text-slate-500 w-4"></i>
                  <span class="text-slate-300">${new Date(mylaunche[i].net).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-clock text-slate-500 w-4"></i>
                  <span class="text-slate-300">${mylaunche[i].net ? new Date(mylaunche[i].net).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }) : "Time TBD"} MP UTC</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-rocket text-slate-500 w-4"></i>
                  <span class="text-slate-300">${mylaunche[i].rocket.configuration.name}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                  <span class="text-slate-300 line-clamp-1">${mylaunche[i].pad?.location?.name}</span>
                </div>
              </div>
              <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
                <button
                  class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
                  Details
                </button>
                <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                  <i class="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
            `
        }
        document.getElementById("launches-grid").innerHTML = launchecards;

    } catch (error) {
        console.log(error);
        // alert("The API is temporarily unavailable. Please try again later.");
    }
}
