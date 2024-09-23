function detectOS() {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf('Win') !== -1) return 'Windows';
    if (userAgent.indexOf('Mac') !== -1) return 'Mac';
    if (userAgent.indexOf('X11') !== -1) return 'Unix';
    if (userAgent.indexOf('Linux') !== -1) return 'Linux';
    return 'Unknown';
}

function setDownloadOptions(downloadButtonId, downloadInfoId) {
    const os = detectOS();
    const downloadButton = document.getElementById(downloadButtonId);
    const downloadInfo = document.getElementById(downloadInfoId);

    switch (os) {
        case 'Windows':
            downloadButton.onclick = () => window.location.href = 'https://github.com/feloopy/engine';
            downloadInfo.textContent = 'For Windows 11/10 64-bit.';
            break;
        default:
            downloadButton.onclick = () => alert('Please use "pip install -U feloopy" instead.');
            downloadInfo.textContent = 'Your OS is not supported.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setDownloadOptions('download-button1', 'download-info1');
    setDownloadOptions('download-button2', 'download-info2');
});