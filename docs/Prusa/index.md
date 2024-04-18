# Prusa Slicer

## Manual Multi Material

![](images/slicer-mmm-extruder.png)

![](images/slicer-mmm-gcode.png)

```gcode
{if layer_num >= 0}
G1 X0 Y0 ; Update this, tell the nozzle to go to 0 0
M600 ; change to filament for extruder
G1 E0.3 F1500 ; prime after color change
{endif}
```

![](images/slicer-mmm-tower.png)
