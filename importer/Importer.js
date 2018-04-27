"use strict";

const pathToDir = "./data";
const DELAY = 1000;
const fs = require("fs");
const os = require("os");
const util = require('util');


const DirWatcher = require('./../dirwatcher/DirWatcher');
const dirWatcher = new DirWatcher();
class Importer{
  constructor(){
    dirWatcher.on('changed', (newFiles)=>{
      console.log("changed", newFiles);

      newFiles.forEach((item)=>{
        console.log(`ImportSync. Data from ${pathToDir}/${item}`);
        const buffSync = this.importSync(`${pathToDir}/${item}`).toString('utf8');
        console.log(buffSync)
      });

      newFiles.forEach((item)=>{
        console.log(`Import. Data from ${pathToDir}/${item}`);
        const promise = this.import(`${pathToDir}/${item}`);
        promise.then((data)=>{
          console.log(data.toString('utf8'))
        }).catch(error=>{throw error});
      });

    });

    // dirWatcher.on('delete', ()=>{
    //   console.log("delete")
    // });
    dirWatcher.watch(pathToDir, DELAY);
  }

  import(path){
    const read = util.promisify(fs.readFile);
    return read(path);
  }

  importSync(path){
    return fs.readFileSync(path);
  }

}
module.exports = Importer;
