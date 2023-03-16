# Disable Bing Search in Windows 11

## Windows Search Bar

Use Windows Registry [^1]
1. Press Win+R and type `regedit` to open the registry editor.
3. Navigate to the following location: `Computer\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Search`
4. Right-click Search and select `New > DWORD (32-bit)` Value.
5. Name the new DWORD value “BingSearchEnabled”
6. Double-click the new DWORD BingSearchEnabled and set the data to 0 and click OK.
7. Close the Windows Registry when finished and restart your PC for the changes to take effect.

## Edge Bing-Button (Sidebar)

Use Windows Registry [^2]
1. Press Win+R and type `regedit` to open the registry editor.
2. Navigate to the following location: `Computer\HKEY_LOCAL_MACHINE \ Software \ Policies \ Microsoft`
3. If there is no Key for `Edge`, add one by right-click `Microsoft > New > Key` and name it "Edge"
4. Right-click "Edge" and select `New > DWORD (32-bit)` Value.
5. Name the new DWORD value “HubsSidebarEnabled”
6. Double-click the new DWORD HubsSidebarEnabled and set the data to 0 and click OK.
7. In Edge, navigate to `edge://policy/` and click "Reload Policies" - voilà.

[^1]: [www.onmsft.com](https://www.onmsft.com/how-to/how-to-disable-bing-search-on-windows-11/)
[^2]: [www.drwindows.de](https://www.drwindows.de/news/windows-anleitungen-faq/anleitung-bing-button-in-microsoft-edge-ausblenden)
