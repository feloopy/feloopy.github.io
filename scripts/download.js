function detectOS() {
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();

    if (platform.includes('win')) return 'Windows';
    if (platform.includes('linux')) return 'Linux';
    if (platform.includes('mac') || userAgent.includes('mac')) return 'Other';
    return 'Other';
}

async function getLatestReleaseDownloadLink(os) {
    try {
        const response = await fetch('https://api.github.com/repos/feloopy/engine/releases/latest');
        const data = await response.json();

        const assetName = `feloopy-engine-${os.toLowerCase()}.zip`;
        const asset = data.assets.find(a => a.name === assetName);

        return asset ? asset.browser_download_url : null;
    } catch (error) {
        console.error('Failed to fetch release:', error);
        return null;
    }
}

function getOrdinal(n) {
    const j = n % 10,
          k = n % 100;
    if (j === 1 && k !== 11) return n + "st";
    if (j === 2 && k !== 12) return n + "nd";
    if (j === 3 && k !== 13) return n + "rd";
    return n + "th";
}

async function getDownloadCount() {
    try {
        const response = await fetch('../stats.json');
        const data = await response.json();
        return parseInt(data.engine_downloads) || 0;
    } catch (error) {
        console.error('Failed to fetch download count:', error);
        return null;
    }
}

async function getStats() {
    try {
        const response = await fetch('../stats.json');
        const data = await response.json();
        return {
            version: data.version || '0.3.8', 
            engineDownloads: parseInt(data.engine_downloads) || 0
        };
    } catch (error) {
        console.error('Failed to fetch stats:', error);
        return {
            version: '0.3.8',
            engineDownloads: 0
        };
    }
}

async function setDownloadOptions(downloadButtonId, downloadInfoId) {
    const os = detectOS();
    const downloadButton = document.getElementById(downloadButtonId);
    const downloadInfo = document.getElementById(downloadInfoId);

    try {
        const [url, stats] = await Promise.all([
            getLatestReleaseDownloadLink(os),
            getStats()
        ]);

        const pipCommand = `pip install -U feloopy[full]==${stats.version}`;

        if (url && (os === 'Windows' || os === 'Linux')) {
            downloadButton.onclick = () => window.location.href = url;
        
            let infoText = os === 'Windows'
                ? 'For Windows 10/11 64-bit'
                : 'For Linux 64-bit';
        
            if (stats.engineDownloads !== null) {
                const nextUser = getOrdinal(stats.engineDownloads + 1);
                infoText += `<br>Be the <strong>${nextUser}</strong> user now!`;
            }
        
            downloadInfo.innerHTML = infoText;
        }
        else {
            downloadButton.onclick = () => alert(`Please use "${pipCommand}" instead.`);
            downloadInfo.textContent = os === 'Other'
                ? 'Your OS is not supported'
                : 'Failed to fetch download link';
        }

        const installCommands = document.querySelectorAll('.code-box[id^="installCommand"]');
        installCommands.forEach(el => {
            el.value = `pip install feloopy[stock]==${stats.version}`;
        });
    } catch (error) {
        console.error('Error setting download options:', error);
        const pipCommand = `pip install -U feloopy[full]==${stats?.version || '0.3.8'}`;
        downloadButton.onclick = () => alert(`Please use "${pipCommand}" instead.`);
        downloadInfo.textContent = 'Error loading download information';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    setDownloadOptions('download-button1', 'download-info1');
    setDownloadOptions('download-button2', 'download-info2');
});



