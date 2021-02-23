
"use strict";



function DomElement(selector, height, width, backgroundColor, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.backgroundColor = backgroundColor;
    this.fontSize = fontSize;
}
DomElement.prototype.addElement = function () {
    if (this.selector.charAt(0) === '.') {
        let block = document.createElement('div');
        block.classList.add(this.selector.slice(1));
        block.textContent = 'Блок';
        document.body.prepend(block);
        block.style.cssText = `
            height: ${this.height};
            width: ${this.width};
            background-color: ${this.backgroundColor};
            font-size: ${this.fontSize}`;
    } else if (this.selector.charAt(0) === '#') {
        let best = document.createElement('p');
        best.id = this.selector.slice(1);
        best.textContent = 'Параграф';
        document.body.prepend(best);
        best.style.cssText = ` 
            height: ${this.height};
            width: ${this.width}; 
            background-color: ${this.backgroundColor}; 
            font-size: ${this.fontSize}`;

    }
};
let domElementDiv = new DomElement('.block', '50px', '200px', 'red', '24px');
let domElemP = new DomElement('#best', '40px', '200px', 'green', '24px');

domElementDiv.addElement();
domElemP.addElement();

