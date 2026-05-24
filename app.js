// Leave these as "#" while your desktop application is still in development!
const DOWNLOAD_LINKS = {
    windows: "#",
    mac: "#",
    linux: "#",
    fallback: "#"
};

function initDownloads() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const mainBtn = document.getElementById('mainDownloadBtn');
    const allLinks = document.querySelectorAll('.alt-link, .btn');

    // 1. Detect device OS system and set up main view target button
    if (userAgent.indexOf("win") !== -1) {
        mainBtn.innerText = "Download for Windows 11";
        mainBtn.dataset.os = "Windows 11";
    } else if (userAgent.indexOf("mac") !== -1) {
        mainBtn.innerText = "Download for macOS";
        mainBtn.dataset.os = "macOS";
    } else if (userAgent.indexOf("linux") !== -1) {
        mainBtn.innerText = "Download for Linux";
        mainBtn.dataset.os = "Linux";
    } else {
        mainBtn.innerText = "Download THEremover";
        mainBtn.dataset.os = "your desktop";
    }

    // 2. Click behavior logic interception
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Pick up platform details from tracking attributes or plain text format
            const osName = this.dataset.os || this.innerText.split(' (')[0];
            
            // Trigger coming soon popup window if no files are ready
            if (DOWNLOAD_LINKS.windows === "#") {
                e.preventDefault(); 
                showComingSoonModal(osName);
            }
        });
    });
}

function showComingSoonModal(osName) {
    const modal = document.getElementById('statusModal');
    const modalText = document.getElementById('modalText');
    
    modalText.innerHTML = `<strong>THEremover</strong> for <span>${osName}</span> is currently cooking in the development lab! We are busy mapping out the system residual paths.`;
    
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('statusModal');
    modal.classList.remove('active');
}

document.addEventListener("DOMContentLoaded", () => {
    initDownloads();
    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
});
