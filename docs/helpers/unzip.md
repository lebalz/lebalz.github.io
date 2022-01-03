---
title: unzip.py
---

# Unzip Folders

```py title=unzip.py
#!/usr/bin/env python3

import sys
from pathlib import Path
from zipfile import ZipFile

source = Path(sys.argv[1])
if not source.is_dir():
    raise RuntimeError(f'No folder "{source}" found.')

for zip in source.glob('*.zip'):
    dest = zip.parent.joinpath(zip.stem)
    i = 0
    while dest.exists():
        i = i + 1
        dest = zip.parent.joinpath(f'{zip.stem} ({i})')
    # Create a ZipFile Object and load sample.zip in it
    print('Extract to', dest.name)
    with ZipFile(zip, 'r') as zipObj:
        zipObj.extractall(dest)
```