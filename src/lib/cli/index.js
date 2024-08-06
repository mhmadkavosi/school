#!/usr/bin/env node

const {Command} = require('commander');
const fs = require('fs').promises;
const path = require('path');

const program = new Command();

program.name('amir-cli').description('Amir terminal Manage Project!').version('1.0.0');

function formatModuleName(name) {
    const words = name.split('-');
    const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join('');
}

program
    .command('module <name>')
    .description('create module')
    .action(async (name) => {
        try {
            const moduleName = formatModuleName(name);
            const modulePath = path.join('./src/modules', name);

            await Promise.all([
                fs.mkdir(modulePath, {recursive: true}),
                fs.mkdir(path.join(modulePath, 'controllers/Teacher'), {recursive: true}),
                fs.mkdir(path.join(modulePath, 'methods'), {recursive: true}),
                fs.mkdir(path.join(modulePath, 'routes/Teacher'), {recursive: true}),
                fs.mkdir(path.join(modulePath, 'models/enums'), {recursive: true})
            ]);

            await Promise.all([
                fs.writeFile(path.join(modulePath, 'controllers', `${name}.controller.ts`), ''),
                fs.writeFile(path.join(modulePath, 'controllers/Teacher', `Teacher_${name}.controller.ts`), ''),

                fs.writeFile(
                    path.join(modulePath, 'methods', `${name}_create.ts`),
                    `export class ${moduleName}Create {}`
                ),
                fs.writeFile(
                    path.join(modulePath, 'methods', `${name}_info.ts`),
                    `export class ${moduleName}Info {}`
                ),
                fs.writeFile(
                    path.join(modulePath, 'methods', `${name}_update.ts`),
                    `export class ${moduleName}Update {}`
                ),
                fs.writeFile(
                    path.join(modulePath, 'methods', `${name}_destroy.ts`),
                    `export class ${moduleName}Destroy {}`
                ),

                fs.writeFile(path.join(modulePath, 'models', `${name}.model.ts`), ''),

                fs.writeFile(
                    path.join(modulePath, 'routes', `${name}.routes.ts`),
                    `
import * as ${moduleName}Controller from '../controllers/${name}.controller';
import { Router } from 'express';

const ${moduleName}Router: Router = Router();

const route_prefix ='${name}';

//Todo add routes

export default ${moduleName}Router;
                `
                )
            ]);

            console.log(`Module '${name}' created successfully.`);
        } catch (error) {
            console.error('Error:', error.message);
        }
    });

program.parse();
