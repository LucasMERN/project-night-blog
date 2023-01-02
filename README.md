<div id="top"></div>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Project Night Blog</h3>

  <p align="center">
    The goal here is to create a fullstack blog style application built on Node, Express, and EJS.
    <br />
    <br />
<!--     <a href="https://github.com/LucasMERN/project-night-blog">View Demo</a> 
    ·-->
    <a href="https://github.com/LucasMERN/project-night-blog/issues">Report Bug</a>
    ·
    <a href="https://github.com/LucasMERN/project-night-blog/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Desktop Index View
![image](https://user-images.githubusercontent.com/72772558/188334814-fbbcaedb-2191-4a5a-9fc8-7ac55818ea2e.png)
Desktop Login View
![image](https://user-images.githubusercontent.com/72772558/188335517-585edcfd-038f-4291-b024-9dc37b32d5ee.png)
Desktop Edit Profile View
![image](https://user-images.githubusercontent.com/72772558/188335539-9c19036f-2311-4a03-8f61-c7bf7185322d.png)

Mobile index & Login Profile view
![image](https://user-images.githubusercontent.com/72772558/188335447-ebf722ed-8304-4bf8-98e5-2311f73c7b8b.png)
Mobile index & Register Profile view
![image](https://user-images.githubusercontent.com/72772558/188335457-bab78bf6-4eca-42b0-acb5-46052e5bf809.png)
Mobile index & Edit Profile view
![image](https://user-images.githubusercontent.com/72772558/188335465-486891a0-b192-4896-abf3-f0e379137aa0.png)

TODO: Define Post views for Desktop and Mobile

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [JavaScript](https://www.javascript.com/)
* [Express](https://expressjs.com/)
* [EJS](https://ejs.co/)
* [Express-session](https://www.npmjs.com/package/express-session)
* [MongoDB](https://www.mongodb.com/)
* [Mongoosejs](https://mongoosejs.com/)
* [Node.js](https://nodejs.org/)
* [Passport.js](https://www.passportjs.org/)
* [Marked.js](https://marked.js.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To run the projects you will need to follow the instructions below. This will run a localhost version of the website.

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/LucasMERN/project-night-blog.git
   ```
2. Install NPM packages:
   ```sh
   npm install
   ```
3. Run LocalHost:
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

### Features
- [x] Set up a basic blog structure
    - [x] Add Layout based on figma
          - [x] Left Navbar
          - [x] Top Navbar
          - [x] Index Page
          - [x] Post view
          - [x] Profile view
          - [ ] Search view: Feature Update
- [x] Set up Authentication system using Passport
- [x] Routes
    - [x] '/' 
    - [x] '/blog'
    - [x] '/user'
    - [x] '/login'
    - [x] '/register'
- [x] Set up a Database (MongoDB) using Model
  - [x] post  Completed with PR #11
    - [x] create post
    - [x] edit post
    - [x] favorite post
    - [x] bookmark post
    - [] pin post
  - [x] users
    - [x] username
    - [x] password
    - [x] email
- [x] Darkmode toggle: Added with PR #10

### Future

- [x] Create User Profile pages
  - [ ] Edit Photo
  - [ ] Add/Edit Bio
  - Can use this for tooltips on hover in comment/Suggested follow sections
- [ ] Search Bar
- [ ] Filter Post Buttons
  - [ ] Popular (filter by Most Liked posts)
  - [ ] Authors Followed (filter by author)
  - [ ] Latest Posts (filter by CreateAt date)
- [ ] Trending Posts
- [ ] socket.io for DMs

See the [open issues](https://github.com/LucasMERN/project-night-blog/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch
    > git checkout -b feature/AmazingFeature
3. Commit your changes
    > git commit -m 'Add some AmazingFeature'
4. Push to the Branch
    > git push origin feature/AmazingFeature
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

* Lucas Winkler - [@MERN_Man_Luke](https://twitter.com/MERN_Man_Luke)
* Mark Spratt - [@_Hopelezz](https://twitter.com/_Hopelezz)
* Aubrette Swiontek - [@swionTech](https://twitter.com/swionTech)
* Matt Misko - [@miskocodes](https://twitter.com/miskocodes)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/LucasMERN/project-night-blog.svg?style=for-the-badge
[contributors-url]: https://github.com/LucasMERN/project-night-blog/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/LucasMERN/project-night-blog.svg?style=for-the-badge
[forks-url]: https://github.com/LucasMERN/project-night-blog/network/members
[stars-shield]: https://img.shields.io/github/stars/LucasMERN/project-night-blog.svg?style=for-the-badge
[stars-url]: https://github.com/LucasMERN/project-night-blog/stargazers
[issues-shield]: https://img.shields.io/github/issues/LucasMERN/project-night-blog.svg?style=for-the-badge
[issues-url]: https://github.com/LucasMERN/project-night-blog/issues
[license-shield]: https://img.shields.io/github/license/LucasMERN/project-night-blog.svg?style=for-the-badge
[license-url]: https://github.com/LucasMERN/project-night-blog/blob/master/LICENSE.txt
