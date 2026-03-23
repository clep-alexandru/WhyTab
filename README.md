# WhyTab

Te-ai gândit vreodată în timp ce lucrai la un proiect nou sau făceai browsing de ce ai 20 de tab-uri deschise?
Pun pariu că aveai tab-uri pe care nu le-ai mai folosit de măcar câteva zile și nu mai aveai nici o idee ce se întampla acolo dar ceva înăuntrul tău îți spunea să nu le închizi.

WhyTab, o extensie realizată pentru Chrome, ar putea fi o soluție la această problemă pe care mulți din noi o întâmpinăm.

## How to use:

### **Instalare**
- Clonează/descarcă repository-ul
- Deschide `chrome://extensions/` în Chrome
- Activează **"Developer mode"** (colțul din dreapta sus)
- Apasă **"Load unpacked"** și selectează folderul acestei extensii

### 2. **Configurare inițială**
- Fă click pe iconița extensiei WhyTab din dreapta sus
- Apasă butonul **"Settings"** pentru a configura
- Selectează după cât timp (minute) vrei ca taburile să fie considerate inactive (ai opțiunea între 1 și 120 de minute)
- Apasă **"Salvează setările"** și setările vor fi aplicate

### 3. **Cum funcționează?**
- **Automat**: De fiecare dată când schimbi tab-ul, extensia pornește un timer pentru celelalte taburi
- **După delay**: Dacă nu revin la acel tab în timp stabilit, va fi automat adăugat la grupul **"Stale Tabs"**
- **Revin la el**: Dacă accesezi din nou tabul inactiv, timer-ul se resetează

### 4. **Gestionarea taburilor inactive**
- Taburile inactive vor fi grupate în grupul **"Stale Tabs"**
- Poți extinde grupul pentru a vedea care taburi sunt inactive
- Poți să le deschizi din nou dacă ai nevoie
- Poți să le închizi pur și simplu dacă nu mai ai nevoie

### Setări disponibile:
- **Delay de inactivitate**: Alege între 1 și 120 de minute
- **Resetare la implicit**: Redeschide oricând pentru a reseta la 1 minut

