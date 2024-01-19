<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GNU GPL V3 License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/loredous/tommyknocker">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">Tommyknocker</h3>

  <p align="center">
    Tommyknocker is a platform designed to allow for continuous, automated testing and validation of various security controls. Each time you make a change to your environment or security controls, you run the risk of impacting the proper functioning or reporting of other controls in the environment. For example, a change in firewall policy on an external firewall may lead to exposure of internal resources that were believed to be blocked by another internal firewall. Additionally, if a malicious threat actor, or insider threat actor manages to disable a security control, you may not realize it until the next time someone is investigating that control for some reason. Tommyknocker gives you the ability to build up the equivalent of a regression test suite focusing on ensuring that your security controls remain active and effective over time.
    <!-- <br />
    <a href="https://github.com/loredous/tommyknocker"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/loredous/tommyknocker">View Demo</a> -->
    ·
    <a href="https://github.com/loredous/tommyknocker/issues">Report Bug</a>
    ·
    <a href="https://github.com/loredous/tommyknocker/issues">Request Feature</a>
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
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


Tommyknocker started from the idea to bring the long understood benefits of regression testing methods to the realm of infosec. In a traditional regression test, the fix for each reported bug or issue in a software product is accompanied by a small test that validates that the same issue does not occur again in the future. With Tommyknocker, each security control put in place can be accompanied by a test case, which can ensure that future changes do not impact the functioning anb/or reporting of that control. 


Most organizations will often avoid doing testing of security controls unless it is absolutely necessary for an event such as an audit or yearly review. This can easily lead to the organization having a false sense of security, as controls may be inactive or improperly configured for months or even years before the next event that requires a test. By automating the process of testing these controls, organizations can not only ensure that controls remain functional, they can reduce the manual effort required to produce evidence of controls for auditing purposes significantly!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Python][Python-shield]][Python-url]
* [![Angular][Angular-shield]][Angular-url]
* [![Clarity][Clarity-shield]][Clarity-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Coming Soon!

### Prerequisites

All Python back-end dependencies are managed using Pipenv, and UI dependencies are managed with npm
* Pipenv
    ```sh
    pipenv install --dev
    ```
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

Coming Soon!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->

## Usage

Coming Soon!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Basic Clarity WebUI
- [ ] Dockerized deployment
- [ ] Ability to organize tests and test-suites by tags (Control IDs, CVE numbers, etc)

See the [open issues](https://github.com/loredous/tommyknocker/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the GNU GPLv3 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Jeremy Banker - loredous@loredous.net

Project Link: [https://github.com/loredous/tommyknocker](https://github.com/loredous/tommyknocker)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Coming Soon!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/loredous/tommyknocker.svg?style=for-the-badge
[contributors-url]: https://github.com/loredous/tommyknocker/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/loredous/tommyknocker.svg?style=for-the-badge
[forks-url]: https://github.com/loredous/tommyknocker/network/members
[stars-shield]: https://img.shields.io/github/stars/loredous/tommyknocker.svg?style=for-the-badge
[stars-url]: https://github.com/loredous/tommyknocker/stargazers
[issues-shield]: https://img.shields.io/github/issues/loredous/tommyknocker.svg?style=for-the-badge
[issues-url]: https://github.com/loredous/tommyknocker/issues
[license-shield]: https://img.shields.io/github/license/loredous/tommyknocker.svg?style=for-the-badge
[license-url]: https://github.com/loredous/tommyknocker/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/jbanker
[product-screenshot]: images/screenshot.png

[Angular-shield]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Python-shield]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://python.org/
[Clarity-shield]: https://img.shields.io/badge/Clarity-0079AD?style=for-the-badge
[Clarity-url]: https://clarity.design/