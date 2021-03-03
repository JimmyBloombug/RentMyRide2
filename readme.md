<h1 align="center">RentMyRide</h1>

<p align="center">
  <a href="https://github.com/EchoProfileName/RentMyRide2"><img width="150" src="https://github.com/EchoProfileName/RentMyRide2/blob/master/client/src/assets/logo/logo.svg" alt="RentMyRide Logo"></a>
</p>

<div align="center">
RentMyRide is a private car sharing single page application, which was built with ReactJS. This project may be used as an inspiration for everyone who wants to launch a sharing platform into a rapidly growing market.
<br>
This application utilizes MERN Stack.
</div>

---

## Contents :file_folder:

- [Features](https://github.com/EchoProfileName/RentMyRide2#features-gem)
- [Installation](https://github.com/EchoProfileName/RentMyRide2#installation-wrench)
- [Todos](https://github.com/EchoProfileName/RentMyRide2#todos-clipboard)
- [Support](https://github.com/EchoProfileName/RentMyRide2#support-fire_engine)
- [Credits](https://github.com/EchoProfileName/RentMyRide2#credits-pray)
- [License](https://github.com/EchoProfileName/RentMyRide2#license-page_facing_up)

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
-> add
  {
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

## Todos :clipboard:

- Landing page company vision and info possibly with Three
- How It Works page
- About page
- Pagination for Search Componet
- Chat for bookings
- Display booked cards in profile

---

## Support :fire_engine:

Use the issue ticker to submit bugs or requests. <br>
If you wish to contribute to this project, please feel free to do so.:panda_face::wrench:

---

## Credits :pray:

The backdrop of the landing page uses a video from [RoyaltyFreetube](https://royaltyfreetube.com/synthwave-animation-sunset-drive-loop-2-rain-creative-commons/).

- A blur filter was applied
- A hue-rotation was performed
- Brightness was adjusted

All ownership of the video lies with (c) 2021 [royaltyfreetube.com](https://royaltyfreetube.com/)

---

## License :page_facing_up:

This project is licensed under the [MIT License](LICENSE.md).
