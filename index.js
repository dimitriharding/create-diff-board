#!/usr/bin/env node
const { program } = require("commander");
const package = require("./package.json");
const { execSync } = require("child_process");
const path = require("path");
const fsx = require("fs-extra");
const colorsx = require("colors");

const modulePath = __dirname;
const appSingleFileHTML = path.join(modulePath, '/dist/index.html');

// Path to template files from which the project will be created
const template = `${modulePath}/template`;
const staticTemplate = `${modulePath}/hugo-template`;

const copyFiles = (source, destination) => {
    return new Promise((resolve, reject) => {
        return fsx.copy(source, destination, (err) => {
            if (err) {
                reject(err);
                console.log(colorsx.red("=> There was an error while copying the files: ", err));
            }
            resolve();
            console.log(colorsx.grey("=> Files copied " + destination));
        });
    });
};

const configHtml = (config, indexJs) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/assets/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Diff Board</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
        ${indexJs}
    </script>
    <script type="application/json" id="config">
        ${JSON.stringify(config)}
    </script>
  </body>
</html>
`;

const packageJSON = (projectName) => {
    return {
        name: `${projectName}`,
        version: "1.0.0",
        scripts: {
            preview: "cd ./build && npx serve . -p 5050",
        },
    };
};

const staticPackageJSON = (projectName) => {
    return {
        name: `${projectName}`,
        version: package.version,
        scripts: {
            dep: "cd ./template && npm i",
            build: "cd ./template && npm run build",
        },
    };
};

let projectName = "";
let destination = "";

program
    .name("create-biff-board")
    .description("CLI to create a diff-board")
    .arguments("<project-directory>", "Name of the project", "diff-board")
    .option("-ci, --ci-server", "Do not auto serve the build", false)
    .version(package.version)
    .action(function (name) {
        projectName = name;
    });

program.parse();

const options = program.opts();
destination = path.join("./", projectName);
const templateDestination = path.join(destination, "/template");

function startPreview() {
    execSync(`npm run preview`, { cwd: destination, stdio: 'inherit' });
}

async function staticBuildProject(buildDestination) {

    console.log(colorsx.green(`=> "${projectName}" project building...`));


    if (!fsx.existsSync(templateDestination)) {
        await copyFiles(staticTemplate, templateDestination);
    }

    // Create the package.json file
    fsx.writeFileSync(destination + "/package.json", JSON.stringify(staticPackageJSON(projectName), null, 2));

    // copy config to data folder
    await copyFiles(path.join("./", '/diff-reports', 'config.json'), path.join(templateDestination, '/data/config.json'));

    // copy diff reports to static folder
    await copyFiles(path.join("./", '/diff-reports'), path.join(templateDestination, '/static'));

    // npm static dependencies
    execSync(`npm run dep`, { cwd: destination, stdio: [] });

    // npm static build
    execSync(`npm run build`, { cwd: destination, stdio: [] });

    // copy build folder to destination
    await copyFiles(path.join(templateDestination, '.build'), buildDestination);

    // delete template folder
    fsx.removeSync(templateDestination);

    console.log(colorsx.green(`=> "${projectName}" project built!`));
    console.log(colorsx.green(`=> View static HTML at ${buildDestination}/index.html"`));
}

async function devBuildProject() {
    console.log(colorsx.green(`=> "${projectName}" project building...`));
    // check if template folder exists
    if (!fsx.existsSync(templateDestination)) {
        console.log(colorsx.grey(`=> Template folder doesn't exist.`));
        console.log(colorsx.grey(`=> Re-creating before building the project.`));
        await copyFiles(template, templateDestination);
    }
    execSync(`npm run dep`, { cwd: destination, stdio: [] });
    execSync(`npm run build`, { cwd: destination, stdio: [] });
    console.log(colorsx.green(`=> "${projectName}" project built!`));
    console.log(colorsx.grey(`=> To serve the build, run: ${colorsx.magenta(`npx serve ${projectName}/build -p 5050`)}`));
    fsx.removeSync(templateDestination);
}

async function main() {
    const buildDestination = path.join(destination, "/build");

    // if on CI server, build static project
    if (process.env.ON_CI) {
        await staticBuildProject(buildDestination);
        return;
    } else {
        console.log(colorsx.green(`=> "${projectName}" project building...`));

        // create build folder with diff results
        await copyFiles(path.join("./", '/diff-reports'), buildDestination);

        // read config file
        const config = fsx.readFileSync(path.join("./", '/diff-reports', 'config.json'), 'utf8');

        // read application script
        const indexJs = fsx.readFileSync(path.join(path.join(modulePath, 'dist/index.js')));

        // HTML with JavaScript and Config JSON
        const html = configHtml(JSON.parse(config), indexJs);

        // copy index.html to build folder
        fsx.writeFileSync(path.join(buildDestination + '/index.html'), html);

        // Create the package.json file
        fsx.writeFileSync(destination + "/package.json", JSON.stringify(packageJSON(projectName), null, 2));

        console.log(colorsx.grey(`=> To serve the build, run: ${colorsx.magenta(`npx serve ${projectName}/build -p 5050`)}`));

        startPreview();
    }
}

main();
