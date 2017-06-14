Yona Message Translation Support
---

## Requirements

- nodejs
- npm

## Install

```
git clone https://github.com/yona-projects/yona-translate
cd yona-translate
npm install
```

## Usage

- Copy your yona file and translated message file into source folder
   - eg. messages.ru-RU,  yona.yona-1.5.1.jar
- npm start

Example
```
 npm start

> yona-translate@0.0.1 start 
> babel-node --presets es2015 app/app.js


------------------------------
./source/messages.ru-RU will be added.
./source/yona.yona-1.5.1.jar unzip successfully.
Copy file ./source/messages.ru-RU

Done! See './output/yona.yona-1.5.1.jar' file!
```


Folder Structure
---

```
/source -- Yona jar file & mesage files which you want to add
/output -- Updated yona file will be generated here
```