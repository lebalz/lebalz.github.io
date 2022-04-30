---
title: "Fix: Keyboard"
---

# Surface 4: Keyboard not working

Surface Keyboard not working:
- no LED when connecting
- no device shown in device Manager

:::success FIX
1. Press `Volume Up` + `Power Button` for 15s - you will see the UEFI screen 
2. Go to `Devices` and disable `Type Cover`
3. Save and Exit UEFI (restart)
4. Proceed with `Volume Up` + `Power Button` for 15s again
5. Enable the `Type Cover` again
6. Save and Exit
7. Check whether its working
    ```py
    if works:
        🥳
    else:
        🤬🤬🤬🤯
    ```
:::

Helpful Links:
- https://windowsreport.com/surface-pro-4-type-cover/