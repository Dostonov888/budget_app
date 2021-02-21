
"use strict";



class DomElement {
    constructor(selector, height, width, backgroundColor, fontSize) {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.backgroundColor = backgroundColor;
        this.fontSize = fontSize;
    }
    elementCreate() {
        let block = document.createElement('block'),
            best = document.createElement('best');
        if (this.selector === '.block') {
            document.body.appendChild(block);
            block.style.cssText = `
            selector: ${this.selector}; 
            height: ${this.height};
            width: ${this.width}; 
            background-color: ${this.backgroundColor}; 
            font-size: ${this.fontSize};`;
        } else if (this.selector === '#best') {
            document.body.setAttribute(best);
            best.style.cssText = `
            selector: ${this.selector}; 
            height: ${this.height};
            width: ${this.width}; 
            background-color: ${this.backgroundColor}; 
            font-size: ${this.fontSize};`;

        }
    }

}
let domElement = new DomElement('.block', 100, 100, '#f4ff', 44);

console.log(domElement.elementCreate());
