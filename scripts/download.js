function detectOS() {
    const userAgent = window.navigator.userAgent;
    // Simplified detection for current release targets
    if (userAgent.includes('Win')) return 'Windows';
    if (userAgent.includes('Linux')) return 'Linux'; // Prioritize Linux detection
    return 'Other';
}

async function getLatestReleaseDownloadLink(os) { // Added os parameter
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

function setDownloadOptions(downloadButtonId, downloadInfoId) {
    const os = detectOS();
    const downloadButton = document.getElementById(downloadButtonId);
    const downloadInfo = document.getElementById(downloadInfoId);

    getLatestReleaseDownloadLink(os).then(url => {
        if (url && (os === 'Windows' || os === 'Linux')) {
            downloadButton.onclick = () => window.location.href = url;
            downloadInfo.textContent = os === 'Windows'
                ? 'For Windows 11/10 64-bit'
                : 'For Linux 64-bit';
        } else {
            downloadButton.onclick = () => alert('Please use "pip install -U feloopy" instead.');
            downloadInfo.textContent = os === 'Other'
                ? 'Your OS is not supported'
                : 'Failed to fetch download link';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setDownloadOptions('download-button1', 'download-info1');
    setDownloadOptions('download-button2', 'download-info2');
});