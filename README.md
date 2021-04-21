# Hyalus [WIP]

Talk on an open platform.

## Beta

Hyalus is currently in beta, please report bugs & issues.

## Features

* Modern cryptography (x25519/salsa20/argon2id).
* DM/Group messaging & calls.
* File attachments in channels.
* Image/video/audio file previews.
* Configurable typing indicators.
* Noise cancelation for calls.
* Desktop & webapp client.
* 2FA/TOTP authentication support.
* Mostly finished UI design.

## Basic testing instructions 
- Clone a version of hyalus somewhere on your system
- Install NodeJS at version 14 or later (the v14 LTS is what we test with)
- Install yarn on your system
- Start a mongodb and redis instance, easy docker setup can be done using `docker run -dp 127.0.0.1:27017:27017 mongo; docker run -dp 127.0.0.1:6379:6379 redis`
- Move into the directory if you have not already 
- Run `yarn install -W` to update local packages
- To run, use `yarn run` and pick the option you want. They have explainations. Use them.

With this information in the README, I will not answer dumb setup questions. I only officially support running server and web tests on a native Linux system. WSL support is not included in that, if you want to make a PR to fix something feel free, but don't submit an issue or contact me elsewhere about it. If you want more support, maybe go to the upstream repository run by the hyalusapp organization.
