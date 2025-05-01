
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
        const response = await fetch('stats.json');
        const data = await response.json();
        return parseInt(data.engine_downloads) || 0;
    } catch (error) {
        console.error('Failed to fetch download count:', error);
        return null;
    }
}

async function setDownloadOptions(downloadButtonId, downloadInfoId) {
    const os = detectOS();
    const downloadButton = document.getElementById(downloadButtonId);
    const downloadInfo = document.getElementById(downloadInfoId);

    try {
        const [url, count] = await Promise.all([
            getLatestReleaseDownloadLink(os),
            getDownloadCount()
        ]);

        if (url && (os === 'Windows' || os === 'Linux')) {
            downloadButton.onclick = () => window.location.href = url;
            let infoText = os === 'Windows' 
                ? 'For Windows 10/11 64-bit' 
                : 'For Linux 64-bit';
            
            if (count !== null) {
                const nextUser = getOrdinal(count + 1);
                infoText += ` - Be the ${nextUser} user now!`;
            }
            
            downloadInfo.textContent = infoText;
        } else {
            downloadButton.onclick = () => alert('Please use "pip install -U feloopy[stock]==0.3.8" instead.');
            downloadInfo.textContent = os === 'Other' 
                ? 'Your OS is not supported' 
                : 'Failed to fetch download link';
        }
    } catch (error) {
        console.error('Error setting download options:', error);
        downloadButton.onclick = () => alert('Please use "pip install -U feloopy[stock]==0.3.8" instead.');
        downloadInfo.textContent = 'Error loading download information';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setDownloadOptions('download-button1', 'download-info1');
    setDownloadOptions('download-button2', 'download-info2');
});