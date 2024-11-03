## Deployment

AlbedoGames-01
Deploying albedovaktin:v01 2024-11-03 - First deployment

```bash

docker build . --platform linux/amd64  -t ghcr.io/alexostar/albedovaktin:v01
docker login ghcr.io
docker push ghcr.io/alexostar/albedovaktin:v01
```

Stop the existing container in pt.casabrava.se
Then login to the VPS

```bash
docker login ghcr.io
docker run -p 3500:3500 -d ghcr.io/alexostar/albedovaktin:v01

```

Set restart policy for container to "Unless stopped"

Use port 3500
3900 is for the kolefnisvaktin.natturuvinir.is site

### When updating types with the type-gentool one needs to change the type of latlng:

```
import { LatLngExpression, LatLngTuple } from 'leaflet'
latlng: LatLngExpression | LatLngTuple
```

and add the objects of the media array to the types file
