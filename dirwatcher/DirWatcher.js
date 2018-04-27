"use strict";

const fs = require("fs");

const EventEmitter = require('events').EventEmitter;

class DirWatcher extends EventEmitter {

  constructor() {
    super();
  }

  watch(path, delay) {
    let prev = [];
    setInterval(() => {
      const curr = fs.readdirSync(path, 'utf8');
      if(prev.length){
        const newFiles = curr.reduce((acc, itemCurr)=>{
          if(!prev.includes(itemCurr)){
            acc.push(itemCurr);
          }
          return acc;
        },[]);

        // const deleteFiles = prev.reduce((acc, itemPrev)=>{
        //   if(!curr.includes(itemPrev)){
        //     acc.push(itemPrev);
        //   }
        //   return acc;
        // },[]);

        if(newFiles.length){
          prev = curr;
          this.emit('changed', newFiles)
        }

        // if(deleteFiles.length){
        //   console.log(deleteFiles);
        //   prev = [];
        //   this.emit('delete')
        // }

      }else {
        prev = curr;
        this.emit('changed', prev);
      }
    }, delay);
  }

}

module.exports = DirWatcher;
