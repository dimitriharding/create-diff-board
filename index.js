#!/usr/bin/env node
const { program } = require("commander");
const package = require("./package.json");
const { execSync } = require("child_process");
const path = require("path");
const fsx = require("fs-extra");
const colorsx = require("colors");

const modulePath = __dirname;

// Path to template files from which the project will be created
const template = `${modulePath}/template`;

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

const packageJSON = (projectName) => {
    return {
        name: `${projectName}`,
        version: "1.0.0",
        scripts: {
            dev: "cd ./template && npm run dev",
            build: "cd ./template && npm run build",
            preview: "cd ./build && npx serve . -p 5050",
            dep: "cd ./template && npm i --force",
        },
    };
};

let projectName = "";
let destination = "";

program
    .name("create-biff-board")
    .description("CLI to create a diff-board")
    .arguments("<project-directory>", "Name of the project", "diff-board")
    .option("-ci, --ci-server", "Do not auto serve the build", true)
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

async function buildProject() {
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
    if (!options.ciServer) startPreview();
}

async function main() {
    // Create the project directory, and copy the template files
    await copyFiles(template, templateDestination);

    // Create the package.json file
    fsx.writeFileSync(destination + "/package.json", JSON.stringify(packageJSON(projectName), null, 2));

    console.log(colorsx.green.bold(`=> "${projectName}" project created!`));

    buildProject();
}

main();
