# To Do App
[heading__top]:
  #to-do-app
  "&#x2B06; Simple static Progressive Web Application"


Simple static Progressive Web Application


## [![Byte size of To Do App][badge__main__to_do_app__source_code]][to_do_app__main__source_code] [![Open Issues][badge__issues__to_do_app]][issues__to_do_app] [![Open Pull Requests][badge__pull_requests__to_do_app]][pull_requests__to_do_app] [![Latest commits][badge__commits__to_do_app__main]][commits__to_do_app__main] [![to-do-app Demos][badge__gh_pages__to_do_app]][gh_pages__to_do_app]


---


- [:arrow_up: Top of Document][heading__top]

- [:building_construction: Requirements][heading__requirements]

- [&#x1F9F0; Usage][heading__usage]

- [&#x1F5D2; Notes][heading__notes]

- [:chart_with_upwards_trend: Contributing][heading__contributing]

  - [:trident: Forking][heading__forking]
  - [:currency_exchange: Sponsor][heading__sponsor]

- [:card_index: Attribution][heading__attribution]

- [:balance_scale: Licensing][heading__license]


---



## Requirements
[heading__requirements]:
  #requirements
  "&#x1F3D7; Prerequisites and/or dependencies that this project needs to function properly"


NodeJS dependencies may be installed via NPM...


```Bash
npm install
```


This repository makes use of Git Submodules to track dependencies, to avoid incomplete downloads clone with the `--recurse-submodules` option...


```Bash
git clone --recurse-submodules git@github.com:web-dev-examples/to-do-app.git
```


To update tracked Git Submodules issue the following commands...


```Bash
git pull

git submodule update --init --merge --recursive
```


To force upgrade of Git Submodules...


```Bash
git submodule update --init --merge --recursive --remote
```


> Note, forcing and update of Git Submodule tracked dependencies may cause instabilities and/or merge conflicts; if however everything operates as expected after an update please consider submitting a Pull Request.


______



## Usage
[heading__usage]:
  #usage
  "&#x1F9F0; How to utilize this repository"


Navigate to the [GitHub Pages hosted][gh_pages__to_do_app] web-app, optionally install it as a PWA (Progressive Web Application), then add or remove to-do list items.


All data is saved within the web-browser via `window.localStorage` API, which is also used to restore lists and items. No server-side databases or scripts are required!


______


## Notes
[heading__notes]:
  #notes
  "&#x1F5D2; Additional things to keep in mind when developing"


This repository may not be feature complete, Pull Requests that add necessary features or fix bugs are certainly welcomed.


______


## Contributing
[heading__contributing]:
  #contributing
  "&#x1F4C8; Options for contributing to to-do-app and web-dev-examples"


Options for contributing to to-do-app and web-dev-examples


---


### Forking
[heading__forking]:
  #forking
  "&#x1F531; Tips for forking to-do-app"


Start making a [Fork][to_do_app__fork_it] of this repository to an account that you have write permissions for.


- Add remote for fork URL. The URL syntax is _`git@github.com:<NAME>/<REPO>.git`_...


```Bash
cd ~/git/hub/web-dev-examples/to-do-app

git remote add fork git@github.com:<NAME>/to-do-app.git
```


- Install development dependencies


```bash
cd ~/git/hub/web-dev-examples/to-do-app

git submodule update --init --merge --recurse

npm install
```


- Commit your changes and push to your fork, eg. to fix an issue...


```Bash
cd ~/git/hub/web-dev-examples/to-do-app


git commit -F- <<'EOF'
:bug: Fixes #42 Issue


**Edits**


- `<SCRIPT-NAME>` script, fixes some bug reported in issue
EOF


git push fork main
```


> Note, the `-u` option may be used to set `fork` as the default remote, eg. _`git push -u fork main`_ however, this will also default the `fork` remote for pulling from too! Meaning that pulling updates from `origin` must be done explicitly, eg. _`git pull origin main`_


- Then on GitHub submit a Pull Request through the Web-UI, the URL syntax is _`https://github.com/<NAME>/<REPO>/pull/new/<BRANCH>`_


> Note; to decrease the chances of your Pull Request needing modifications before being accepted, please check the [dot-github](https://github.com/web-dev-examples/.github) repository for detailed contributing guidelines.


---


### Sponsor
  [heading__sponsor]:
  #sponsor
  "&#x1F4B1; Methods for financially supporting web-dev-examples that maintains to-do-app"


Thanks for even considering it!


Via Liberapay you may <sub>[![sponsor__shields_io__liberapay]][sponsor__link__liberapay]</sub> on a repeating basis.


Regardless of if you're able to financially support projects such as to-do-app that web-dev-examples maintains, please consider sharing projects that are useful with others, because one of the goals of maintaining Open Source repositories is to provide value to the community.


______


## Attribution
[heading__attribution]:
  #attribution
  "&#x1F4C7; Resources that where helpful in building this project so far."


- [CSS Tricks -- Float Labels with CSS](https://css-tricks.com/float-labels-css/)

- [CSS Tricks -- HTML Inputs and Labels: A Love Story](https://css-tricks.com/html-inputs-and-labels-a-love-story/)

- [Dev IO -- Destructuring JavaScript objects with default value](https://dev.to/varundey/destructuring-javascript-objects-with-default-value-2765)

- [GitHub -- `github-utilities/make-readme`](https://github.com/github-utilities/make-readme)

- [MDN -- `<details>`: The Details disclosure element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)

- [MDN -- `<input>`: The Input (Form Input) element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input)

- [MDN -- `<noscript>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript)

- [MDN -- Using data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)

- [MDN -- Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest)

- [MDN -- Progressive web apps (PWAs)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

- [StackOverflow -- Typescript: Index signature is missing in type](https://stackoverflow.com/questions/37006008/)


______


## License
[heading__license]:
  #license
  "&#x2696; Legal side of Open Source"


```
Simple static Progressive Web Application
Copyright (C) 2021 S0AndS0

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```


For further details review full length version of [AGPL-3.0][branch__current__license] License.



[branch__current__license]:
  /LICENSE
  "&#x2696; Full length version of AGPL-3.0 License"


[badge__commits__to_do_app__main]:
  https://img.shields.io/github/last-commit/web-dev-examples/to-do-app/main.svg

[commits__to_do_app__main]:
  https://github.com/web-dev-examples/to-do-app/commits/main
  "&#x1F4DD; History of changes on this branch"


[to_do_app__community]:
  https://github.com/web-dev-examples/to-do-app/community
  "&#x1F331; Dedicated to functioning code"

[to_do_app__gh_pages]:
  https://github.com/web-dev-examples/to-do-app/tree/
  "Source code examples hosted thanks to GitHub Pages!"

[badge__gh_pages__to_do_app]:
  https://img.shields.io/website/https/web-dev-examples.github.io/to-do-app/index.html.svg?down_color=darkorange&down_message=Offline&label=Demo&logo=Demo%20Site&up_color=success&up_message=Online

[gh_pages__to_do_app]:
  https://web-dev-examples.github.io/to-do-app/index.html
  "&#x1F52C; Check the example collection tests"

[issues__to_do_app]:
  https://github.com/web-dev-examples/to-do-app/issues
  "&#x2622; Search for and _bump_ existing issues or open new issues for project maintainer to address."

[to_do_app__fork_it]:
  https://github.com/web-dev-examples/to-do-app/
  "&#x1F531; Fork it!"

[pull_requests__to_do_app]:
  https://github.com/web-dev-examples/to-do-app/pulls
  "&#x1F3D7; Pull Request friendly, though please check the Community guidelines"

[to_do_app__main__source_code]:
  https://github.com/web-dev-examples/to-do-app/
  "&#x2328; Project source!"

[badge__issues__to_do_app]:
  https://img.shields.io/github/issues/web-dev-examples/to-do-app.svg

[badge__pull_requests__to_do_app]:
  https://img.shields.io/github/issues-pr/web-dev-examples/to-do-app.svg

[badge__main__to_do_app__source_code]:
  https://img.shields.io/github/repo-size/web-dev-examples/to-do-app


[jekyll_rb__home]:
  https://jekyllrb.com/
  "Jekyll home page"

[jekyll_rb__github_pages]:
  https://jekyllrb.com/docs/github-pages/
  "Jekyll documentation for GitHub Pages setup"

[github_docs__github_pages__jekyll]:
  https://docs.github.com/en/github/working-with-github-pages/setting-up-a-github-pages-site-with-jekyll
  "GitHub Pages documentation on Jekyll setup"


[sponsor__shields_io__liberapay]:
  https://img.shields.io/static/v1?logo=liberapay&label=Sponsor&message=web-dev-examples

[sponsor__link__liberapay]:
  https://liberapay.com/web-dev-examples
  "&#x1F4B1; Sponsor developments and projects that web-dev-examples maintains via Liberapay"

