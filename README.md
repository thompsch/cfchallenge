# Culture Foundry Challenge

## Architecture
### Tech stack
This demo app uses NodeJS for the backend engine and Vue for rendering. I've also included Bootstrap because that's the easiest way I know to mock-up UI.

Currently, this app uses an in-memory cache, which prevents repeated calls to the source APIs (which we can't be sure will be available at any given moment and we don't know if they can handle the traffic). Before deploying to production, we  would replace with redis or another distributed cache.

### Arch decisions
- All configuration lives with the .env file (and/or the environment variables).
- NodeJS hosts the backend and the front end (Vue).
- The backend consists of internal APIs that do nothing but return the cached data. The Vue components load their data from these internal APIs.
- When the cached items expire (which is *never* when ```ENVIRONMENT=dev```), the proxy classes call the external APIs to get the latest data. _N.B.:_ we should update this so that the cache doesn't actually expire unless/until we get good data back from the source--is it better to serve no data or stale data?
- All UI is currently out-of-the-box Bootstrap CSS, which is easily replaced/amended with CSS files in the /assets/css folder.

### A note about the cached objects
As a sign of my jumping in and working from the BE up, I started by caching each of the APIs as we get them from the source. After shifting my focus from the FE down, I realized that those objects really didn't serve the needs of the FE developer, so I now take those objects and build a custom race object that makes building the views much easier. I have not removed the other cached items at this point, because I think they ight be useful in other ways...like, if we wanted to expose our APIs for other apps.

## More work to be done
This is an MVP proof of concept. Obviously we'd want to spend some time on the fit-and-finish, adding branding, images, etc.
### dev work
- Implement the Also Ran / Scratched functionality
- More unit test coverage: proxies (need to refactor to take in a mock url)

### features
In addition, I think the following would be cool:
- A page that shows the details for each horse. There's a lot of data there that we're not taking advantage of yet. This could be linked from the horse's name in the entry or results tables, or hit directly via URL (which I've stubbed out)
- Auto-refresh the Active Races page around the time of the race itself.
- The Active Races view could have a live stream of the race.
- If there are no Upcoming or Recent races, we could hide those "tabs", rather that display the generic "no current races" messages.
- Format race time to something more friendly.
- Add search, especially if we want to have a view that displays horses and their details.
- Make the tables sortable.
- I'm sure a 30 minute brainstorm with smart people will extend this list further...

## To run this app locally
- clone this repository, then:
- ```npm install```
- ```npm start _or_ node server```
- in a browser, hit http://localhost:8081

## Testing
### Unit tests
```npm test```

### Lint
```npm run lint```

## To deploy this app to EB
- install the EBCLI, then:
- ```eb init```
- ```eb deploy```
