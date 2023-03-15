# Disable Bing Search in Windows 11


Use Windows Registry [^1]
1. Press Win+R and type `regedit` to open the registry editor.
3. Navigate to the following location: `Computer\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Search`
4. Right-click Search and select `New > DWORD (32-bit)` Value.
5. Name the new DWORD value “BingSearchEnabled”
6. Double-click the new DWORD BingSearchEnabled and set the data to 0 and click OK.
7. Close the Windows Registry when finished and restart your PC for the changes to take effect.

[^1]: [www.onmsft.com](https://www.onmsft.com/how-to/how-to-disable-bing-search-on-windows-11/)
