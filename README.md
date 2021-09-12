# Character Sheet Generator

This is intended as learning project. Firstly we aimed to learn [React](https://reactjs.org/) and then we decided to take [Vue](https://vuejs.org/) road. React created application is in branch [main-react](https://github.com/haterzlin/character-sheet/tree/main-react).

Current version of application can be viewed at [https://lubomir.mlich.cz/quest/branches/main/].

Purpose of this project is to enable to create [VTM5](https://whitewolf.fandom.com/wiki/Vampire:_The_Masquerade_5th_Edition) character sheet and export it to JSON file for further use or print.

In future we can try to use different than VTM5 model and try to use exported JSON file in some other webapp.

## Development environment setup

Installation on Ubuntu 20.04

    sudo apt install snapd
    sudo snap install node --classic --channel=14
    sudo npm install vue@next
    sudo npm install -g @vue/cli

    npm init vite@latest character-sheet -- --template vue
    cd character-sheet
    npm install

    # install cypress to be able to run the tests
    npm install cypress --save-dev

### Run development environment on http://localhost:3000

    npm run dev

### Open Cypress to run the tests

    npm run cypress:open

### Build production files

    npm run build
