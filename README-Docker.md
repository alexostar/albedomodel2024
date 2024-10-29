## Deployment

CarbonGames-01
Deploying kolefnisvaktin:v07 2024-09-07 - vedurstodvar added
Deploying kolefnisvaktin:v08 2024-09-08 - vinnukort added
Deploying kolefnisvaktin:v09 2024-09-12 - more data and maps added
Deploying kolefnisvaktin:v10 2024-09-17 - more photos, new marker, sveitarfélag
Deploying kolefnisvaktin:v11 2024-09-19 - TDEE added
Deploying kolefnisvaktin:v12 2024-09-21 - Navigation cleaned - tables in folder
Deploying kolefnisvaktin:v13 2024-09-30 - Major revision
Deploying kolefnisvaktin:v14 2024-10-01 - Minor refinements - link to project documents added
Deploying kolefnisvaktin:v15 2024-10-07 - Projects linked to multiple weather stations
Deploying kolefnisvaktin:v16 2024-10-15 - Preparing for final review
Deploying kolefnisvaktin:v17 2024-10-20 - Last changes before going public
Deploying kolefnisvaktin:v17 2024-10-20 - Last changes before going public
Deploying kolefnisvaktin:v18 2024-10-21 - Google analytics added

CarbonGames-02
Deploying kolefnisvaktin:v19 2024-10-29 - Moving to carbongames-02

```bash


docker build . --platform linux/amd64  -t ghcr.io/alexostar/kolefnisvaktin:v19
docker login ghcr.io
docker push ghcr.io/alexostar/kolefnisvaktin:v19
```

Stop the existing container in pt.casabrava.se

Then as root on ssh to the Hostinger VPS
ssh root@..ipadress...

For IP address, see the dashboard in the cloudpanel (cp.casabrava.se)

```bash
docker login ghcr.io
docker run -p 3900:3000 -d ghcr.io/alexostar/kolefnisvaktin:v19

```

Stop the container in the terminal and then use portainer to change the restart policy of the container (to "Unless stopped")

3600 is for the carbongames.natturuvinir.is site
3900 is for the kolefnisvaktin.natturuvinir.is site
Earlier 3500:3000 for the vefsja.natturuvinir.is site

### When updating types wiht the type gen tool one needs to change the type of

latlng:

```
import { LatLngExpression, LatLngTuple } from 'leaflet'
latlng: LatLngExpression | LatLngTuple
```

and add the objects of the media array to the types file
