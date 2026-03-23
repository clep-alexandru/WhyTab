// lucram cu alarms de la chrome deoarece varianta veche nu functiona
// background.js fiind un service worker, aceste era dezactivat dupa cateva secunde si nu permitea sa verificam daca tab-urile sunt inactive sau nu

// ascultam cand utilizatorul schimba tab-ul
chrome.tabs.onActivated.addListener((activeInfo) => {
    const currentTabId = activeInfo.tabId;

    // la tabul pe care suntem acum stergem clar alarmele 
    chrome.alarms.clear(`stale_tab_${currentTabId}`);

    // cautam toate tab-urile deschise
    chrome.tabs.query({}, (tabs) => {
        // citim delay-ul din storage
        chrome.storage.local.get("inactivityDelayMinutes", (result) => {
            const delayInMinutes = result.inactivityDelayMinutes || 1; // implicit 1 minut
            
            tabs.forEach((tab) => {
                // daca tab-ul gasit nu e cel curent, punem o alarma cu delay-ul configurat
                if (tab.id !== currentTabId) {
                    chrome.alarms.create(`stale_tab_${tab.id}`, { delayInMinutes: delayInMinutes });
                }
            });
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

// logica corecta care grupeaza tab-urile doar intr-un singur grup nu mai multe
function groupStaleTab(tabId) {
    // incercam sa adaugam tab-ul la grupul stocat
    chrome.storage.local.get("staleTabsGroupId", (result) => {
        const storedGroupId = result.staleTabsGroupId;
        
        if (storedGroupId) {
            // verificam daca grupul inca exista
            chrome.tabGroups.get(storedGroupId, (group) => {
                if (!chrome.runtime.lastError && group) {
                    // grupul exista, adaugam tab-ul in el
                    chrome.tabs.group({ groupId: storedGroupId, tabIds: tabId });
                } else {
                    // grupul a fost sters, cream altul
                    createNewStaleTabsGroup(tabId);
                }
            });
        } else {
            // nu exista grup salvat, cream unu nou
            createNewStaleTabsGroup(tabId);
        }
    });
}

// functie ajutatoare pentru crearea unui grup nou
function createNewStaleTabsGroup(tabId) {
    chrome.tabs.group({ tabIds: tabId }, (newGroupId) => {
        chrome.tabGroups.update(newGroupId, {
            title: "Stale Tabs",
            color: "cyan"
        }, () => {
            // salvam ID-ul grupului pentru utilizare ulterioara
            chrome.storage.local.set({ staleTabsGroupId: newGroupId });
        });
    });
}






