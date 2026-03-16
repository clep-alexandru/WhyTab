const timerPentruTab = {};
// tinem evidenta timerelor pentru fiecare tab

// timpul dupa care consideram ca datele sunt invechite si trebuie reimprospatate
// pentru test 1 minut
const STALE_TIME = 60000; //1 minut in milisecunde, mai tarziu va fi schimbat la 24 de ore

chrome.tabs.onActivated.addListener((activeInfo) => {
    const idCurent = activeInfo.tabId;

    if (timerPentruTab[idCurent]) {
        clearTimeout(timerPentruTab[idCurent]); // daca suntem pe tab, resetam timerul de stale
        delete timerPentruTab[idCurent];
    }

    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if (tab.id !== idCurent && !timerPentruTab[tab.id]) {
                // daca nu suntem pe tab si nu avem deja un timer, il setam
                timerPentruTab[tab.id] = setTimeout(() => {
                    groupStaleTab(tab.id);   
                }, STALE_TIME);
            }
        });
    });
});

// functia care grupeaza taburile inactive
function groupStaleTab(tabId) {
    chrome.tabs.group({ tabIds: tabId}, (groupId) => {
        // setam un titlu si o culoare pentru grupul de taburi
        chrome.tabGroups.update(groupId, { title: "Taburi Inactive", color: "orange"});
    })

}






