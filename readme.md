<h1 align="center">RentMyRide</h1>

<div align="center">
Quickly build beautiful [React](https://reactjs.org/) apps. RentMyRide is a private car sharing single page application, built with ReactJS.
</div>

---

## Contents :file_folder:

- [Features]()
- [Installation]()
- [Todos]()
- [Support]()
- [Credits]()
- [License]()

---

## Features :gem:

- Working and customizable rent and lent platform
- Users can rent cars from other users
- Users can lent out cars to other users
- Frontend was built with [React](https://github.com/facebook/react) and [Material-UI](https://github.com/mui-org/material-ui)
- Backend was built with [Express](https://github.com/expressjs/express)
- Backend utilizes [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud storage
- Database communication is facilitated with [Mongoose](https://github.com/Automattic/mongoose)

---

## Installation :wrench:

```
# clone the repository with git or github CLI
$ git clone https://github.com/EchoProfileName/RentMyRide2.git
$ gh repo clone EchoProfileName/RentMyRide2

# install dependencies server
$ cd RentMyRide2
$ npm install

# install dependencies client
$ cd RentMyRide2
$ npm clientinstall

# connect your db and add jwt secret
$ cd RentMyRide2/config
$ touch default.json
$ code default.json
-> add {
  "mongoURI": "<Your Mongo DB Atlas database cluster link>",
  "jwtSecret": "secret"
}

# enable location search
-> create free account on geocodeapi.com
-> copy your account api key
$ cd RentMyRide2/client
$ touch .env.local
$ code .env.local
-> add REACT_APP_GEOCODE_API='<Your Geocode API Key>'

# launch client and server in dev mode
$ cd RentMyRide2
$ npm run dev

```

---

## Todos

- Landing page company vision and info possibly with Three
- How It Works page
- About page
- Pagination for Search Componet
- Chat for bookings
- Display booked cards in profile

---

## Support

Use the issue ticker to submit bugs or requests. <br>
If you wish to contribute to this project, please feel free to do so.:octocat:

## Credits

The backdrop of the landing page uses a video from [RoyaltyFreetube](https://royaltyfreetube.com/synthwave-animation-sunset-drive-loop-2-rain-creative-commons/).

- A blur filter was applied
- A hue-rotation was performed
- Brightness was adjusted

All ownership of the video lies with (c) 2021 royaltyfreetube.com

## License :page_facing_up:
