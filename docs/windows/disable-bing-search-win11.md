# Disable Bing Search in Windows 11


Use Windows Registry [^1
1. Click Start and type regedit. Accept the User Account Control (UAC) prompt that is displayed.
2. Navigate to the following location: Computer\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Search
3. Right-click Search and select New > DWORD (32-bit) Value.
4. Name the new DWORD value “BingSearchEnabled”
5. Double-click the new DWORD BingSearchEnabled and set the data to 0 and click OK.
6. Close the Windows Registry when finished and restart your PC for the changes to take effect.

[^1]: [www.onmsft.com](https://www.onmsft.com/how-to/how-to-disable-bing-search-on-windows-11/)
