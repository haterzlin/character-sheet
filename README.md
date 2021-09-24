# Character Sheet Generator

This is intended as learning project. Firstly we aimed to learn [React](https://reactjs.org/) and then we decided to take [Vue](https://vuejs.org/) road. React created application is in branch [main-react](https://github.com/haterzlin/character-sheet/tree/main-react).

Current version of application can be viewed at [https://lubomir.mlich.cz/quest/branches/main/].

Purpose of this project is to enable to create [VTM5](https://whitewolf.fandom.com/wiki/Vampire:_The_Masquerade_5th_Edition) character sheet and export it to JSON file for further use or print.

In future we can try to use different than VTM5 model and try to use exported JSON file in some other webapp.

## Development environment setup

Installation on Ubuntu 20.04

    cd /opt
    wget https://nodejs.org/dist/v14.17.6/node-v14.17.6-linux-x64.tar.xz
    tar -xf ./node-v14.17.6-linux-x64.tar.xz
    export PATH="$PATH:/opt/node-v14.17.6-linux-x64/bin"
    npm install vue@next
    npm install -g @vue/cli
    # what is important is to have correct version of npm and node, for example:
    # $ npm --version
    # 7.21.1
    # $ node --version
    # v14.17.6

    npm init vite@latest character-sheet -- --template vue
    cd character-sheet
    npm install

    # install cypress to be able to run the tests
    npm install cypress --save-dev

### Run development environment on http://localhost:3000

    npm run dev

### Open Cypress to run the tests

    export CYPRESS_baseUrl=http://localhost:3000
    npm run cypress:open

### Run headless Cypress tests

    export CYPRESS_baseUrl=http://localhost:3000
    npm run cypress:run

### Build production files

    npm run build
