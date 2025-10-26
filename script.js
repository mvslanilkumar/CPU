document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const brandFilter = document.getElementById('brand-filter');
    const socketFilter = document.getElementById('socket-filter');
    const cpuList = document.getElementById('cpu-list');
    const lastUpdated = document.getElementById('last-updated');

    let cpus = [];

    // Load CPU data from JSON
    fetch('cpus.json')
        .then(response => response.json())
        .then(data => {
            cpus = data.cpus;
            lastUpdated.textContent = data.lastUpdated;
            populateSocketFilter();
            displayCPUs(cpus);
        })
        .catch(error => console.error('Error loading CPU data:', error));

    function populateSocketFilter() {
        const sockets = [...new Set(cpus.map(cpu => cpu.socket))];
        sockets.forEach(socket => {
            const option = document.createElement('option');
            option.value = socket;
            option.textContent = socket;
            socketFilter.appendChild(option);
        });
    }

    function displayCPUs(cpusToDisplay) {
        cpuList.innerHTML = '';
        cpusToDisplay.forEach(cpu => {
            const cpuItem = document.createElement('div');
            cpuItem.className = 'cpu-item';
            cpuItem.innerHTML = `
                <h3>${cpu.name}</h3>
                <ul class="cpu-specs">
                    <li><strong>Brand:</strong> ${cpu.brand}</li>
                    <li><strong>Socket:</strong> ${cpu.socket}</li>
                    <li><strong>Cores:</strong> ${cpu.cores}</li>
                    <li><strong>Threads:</strong> ${cpu.threads}</li>
                    <li><strong>Base Clock:</strong> ${cpu.baseClock}</li>
                    <li><strong>Boost Clock:</strong> ${cpu.boostClock}</li>
                    <li><strong>TDP:</strong> ${cpu.tdp}W</li>
                    <li><strong>Integrated Graphics:</strong> ${cpu.integratedGraphics ? 'Yes' : 'No'}</li>
                    <li><strong>Release Year:</strong> ${cpu.releaseYear}</li>
                </ul>
            `;
            cpuList.appendChild(cpuItem);
        });
    }

    function filterCPUs() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedBrand = brandFilter.value;
        const selectedSocket = socketFilter.value;

        const filteredCPUs = cpus.filter(cpu => {
            const matchesSearch = cpu.name.toLowerCase().includes(searchTerm) ||
                                  cpu.brand.toLowerCase().includes(searchTerm) ||
                                  cpu.socket.toLowerCase().includes(searchTerm);
            const matchesBrand = !selectedBrand || cpu.brand === selectedBrand;
            const matchesSocket = !selectedSocket || cpu.socket === selectedSocket;

            return matchesSearch && matchesBrand && matchesSocket;
        });

        displayCPUs(filteredCPUs);
    }

    searchButton.addEventListener('click', filterCPUs);
    searchInput.addEventListener('input', filterCPUs);
    brandFilter.addEventListener('change', filterCPUs);
    socketFilter.addEventListener('change', filterCPUs);
});
