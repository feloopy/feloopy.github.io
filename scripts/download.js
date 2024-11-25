function detectOS() {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf('Win') !== -1) return 'Windows';
    if (userAgent.indexOf('Mac') !== -1) return 'Mac';
    if (userAgent.indexOf('X11') !== -1) return 'Unix';
    if (userAgent.indexOf('Linux') !== -1) return 'Linux';
    return 'Unknown';
}

async function getLatestReleaseDownloadLink() {
    const response = await fetch('https://api.github.com/repos/feloopy/engine/releases/latest');
    const data = await response.json();

    const zipAsset = data.assets.find(asset => asset.name === 'feloopy-engine.zip');
    return zipAsset ? zipAsset.browser_download_url : null;
}

function setDownloadOptions(downloadButtonId, downloadInfoId) {
    const os = detectOS();
    const downloadButton = document.getElementById(downloadButtonId);
    const downloadInfo = document.getElementById(downloadInfoId);

    getLatestReleaseDownloadLink().then(latestReleaseUrl => {
        if (latestReleaseUrl) {
            switch (os) {
                case 'Windows':
                    downloadButton.onclick = () => window.location.href = latestReleaseUrl;
                    downloadInfo.textContent = 'For Windows 11/10 64-bit.';
                    break;
                default:
                    downloadButton.onclick = () => alert('Please use "pip install -U feloopy" instead.');
                    downloadInfo.textContent = 'Your OS is not supported.';
            }
        } else {
            downloadButton.onclick = () => alert('Latest release not found.');
            downloadInfo.textContent = 'Failed to fetch latest release.';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setDownloadOptions('download-button1', 'download-info1');
    setDownloadOptions('download-button2', 'download-info2');
});
