//incarcam setarile salvate pe pagina dupa ce utilizatorul si-a facut decizia
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get("inactivityDelayMinutes", (result) => {
        // implicit 1 minut dacă nu s-a setat nimic
        const delay = result.inactivityDelayMinutes || 1;
        document.getElementById('inactivityDelay').value = delay;
    });
});

//salveaza setarile
document.getElementById('saveBtn').addEventListener('click', () => {
    const delayValue = parseInt(document.getElementById('inactivityDelay').value);
    
    if (isNaN(delayValue) || delayValue < 1 || delayValue > 120) {
        showMessage('Introduceți o valoare între 1 și 120 minute!', false);
        return;
    }
    
    chrome.storage.local.set({ inactivityDelayMinutes: delayValue }, () => {
        showMessage('✅ Setările au fost salvate cu succes!', true);
    });
});

//buton care reseteaza setarile la valorile implicite, 1 minut
document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('inactivityDelay').value = 1;
    chrome.storage.local.set({ inactivityDelayMinutes: 1 }, () => {
        showMessage('Setările au fost resetate la implicit (1 minut)!', true);
    });
});

//implementare functie pentru afisarea mesajelor de status dupa salvare sau resetare, cu diferentiere intre succes si eroare
function showMessage(message, isSuccess) {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.className = isSuccess ? 'status-message success' : 'status-message error';
    
    setTimeout(() => {
        statusEl.className = '';
    }, 3000);
}
