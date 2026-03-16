// lucram cu alarms de la chrome deoarece varianta veche nu functiona
// background.js fiind un service worker, aceste era dezactivat dupa cateva secunde si nu permitea sa verificam daca tab-urile sunt inactive sau nu

// ascultam cand utilizatorul schimba tab-ul
chrome.tabs.onActivated.addListener((activeInfo) => {
    const currentTabId = activeInfo.tabId;

    // la tabul pe care suntem acum stergem clar alarmele 
    chrome.alarms.clear(`stale_tab_${currentTabId}`);

    // cautam toate tab-urile deschise
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            // daca tab-ul gasit nu e cel curent, punem o alarma de un minut(testing)
            if (tab.id !== currentTabId) {
                chrome.alarms.create(`stale_tab_${tab.id}`, { delayInMinutes: 1 });
            }
        });
    });
});

// ascultam cand o alarma suna
chrome.alarms.onAlarm.addListener((alarm) => {
    // daca alarma e pentru un tab inactiv, il grupam
    if (alarm.name.startsWith("stale_tab_")) {
        // din numele alarmei incercam extragerea id-ului specific tab-ului
        const tabId = parseInt(alarm.name.replace("stale_tab_", ""));
        
        // verificam daca tab-ul mai este deschis in chrome, daca da il grupam
        chrome.tabs.get(tabId, (tab) => {
            if (!chrome.runtime.lastError && tab) {
                groupStaleTab(tabId);
            }
        });
    }
});

// Funcția care grupează efectiv tab-ul
function groupStaleTab(tabId) {
    chrome.tabs.group({ tabIds: tabId }, (groupId) => {
        chrome.tabGroups.update(groupId, {
            title: "Stale Tabs",
            color: "grey"
        });
    });
}






