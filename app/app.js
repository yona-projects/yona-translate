import path from 'path';
import fse from 'fs-extra';
import Minizip from 'node-minizip';
import zipFolder from 'zip-folder';
import glob from 'glob'

const sourceDir = './source';
const workingDir = './tmp';
const outputDir = './output';

const messageFiles = getMessageFiles();

console.log("\n------------------------------");
console.log(`${messageFiles} will be added.`)

const yonaFile = getYonaJarFileName();
const yonaJarFile = yonaFile[0];

fse.ensureDirSync(workingDir);

Minizip.unzip(yonaJarFile, workingDir, function (err) {
  if (err) console.log(err);

  console.log(`${yonaJarFile} unzip successfully.`);

  copyMessageFilesToWorkingDir();
  fse.ensureDirSync('output');
  reZipYonaJarFile();
});


//////////////////////

function getMessageFiles() {
  const messageFiles = glob.sync(`${sourceDir}/messages.*`);
  if (!messageFiles) {
    console.error(`No message files to update at ${sourceDir}/`);
    process.exit(0);
  }
  return messageFiles;
}

function getYonaJarFileName() {
  const yonaFile = glob.sync(`${sourceDir}/yona.yona-?.?.?.jar`);

  if (!yonaFile || yonaFile.length === 0) {
    console.error(`Can't find ${sourceDir}/yona.yona-?.?.?.jar file!!`);
    process.exit(0);
  }
  return yonaFile;
}

function copyMessageFilesToWorkingDir() {
  messageFiles.forEach(file => {
    console.log(`Copy file ${file}`);
    fse.copySync(file, file.replace(sourceDir, workingDir));
  });
}

function reZipYonaJarFile() {
  zipFolder(workingDir, yonaJarFile.replace(sourceDir, outputDir), function (err) {
    if (err) {
      console.log(err);
      process.exit(0);
    }
    console.log(`\nDone! See '${yonaJarFile.replace(sourceDir, outputDir)}' file!`);
    fse.removeSync(workingDir);
  });
}
