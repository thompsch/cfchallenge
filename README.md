# Culture Foundry Totes Test

## Architecture
### stack
This demo app uses NodeJS for the backend engine and Vue for rendering. I've also included Bootstrap because that's the easiest
way I know to mock up UI.
Currently, this app uses an in-memory cache, which prevents repeated calls to the soruce APIs (which we can't be sure will be available at any given moment and we don't know if they can handle the traffic). Before deploying to production, we would should probably replace with redis.

### arch decisions
All configuration lives with the .env file (and/or the environment variables).
NodeJS hosts the backend and the front end (Vue). The backend consists of internal APIs that do nothing but return the cached data. The Vue components load their data from these internal APIs.
When the cached items expire (*not* when ENVIRONMENT=dev), the proxy classes call the external APIs to get the latest data. _note_ we should probably update this so that the cache doesn't actually expire unless we get good data back from the source--is it better to serve no data or stale data?
All UI is currently out-of-the-box Bootstrap CSS. Easily replaced with CSS files in the /assets/css folder.


