# AlgoBlock

AlgoBlock is a web app dedicated to making stock trading simpler. This allows users to use drop-down menus to create a trading strategy and converts these drop-downs into code. Users can then run that code to trade stocks automatically.

You can view the main source code here:
- [Source Folder](/src/pages/Home.jsx)

The production version is hosted here:
- [https://algoblock.net/](https://algoblock.net)

## Running Locally

In order to run this locally, run the following command in the terminal in the projects directory:

```sh
$ npm run dev
```

## Deploying

In order to deploy a new version of this website, you can run the following command:

```sh
$ firebase deploy --only hosting
```

> This command will run `npm run build` as a pre-deploy command, so there is no need to build before deployment with a separate command.
