const inquirer = require("inquirer");
const { Circle, Triangle, Square } = require("./shapes");
const { writeFile } = require("fs/promises");

class CLI {
    start(){
        return inquirer
          .prompt([
            {
              name: "logo",
              type: "input",
              message:
                "Enter text for the logo:",
              validate: (text) =>
                text.length <= 3 ||
                "please enter only 3 characters",
            },
            {
              name: "logoColor",
              type: "input",
              message: "Enter a logo color",
            },
            {
              name: "shape",
              type: "list",
              message: "Select a shape",
              choices: ["circle", "square", "triangle"],
            },
            {
              name: "shapeColor",
              type: "input",
              message: "Enter a color for the shape",
            },
          ])
          .then(({ logo, logoColor, shape, shapeColor }) => {
            let shape;
            switch (shape) {
              case "circle":
                shape = new Circle();
                break;
    
              case "square":
                shape = new Square();
                break;
    
              default:
                shape = new Triangle();
                break;
            }
            shape.setColor(shapeColor);
    
            const svg = new SVG();
            svg.setText(logo, logoColor);
            svg.setShape(shape);
            return writeFile("logo.svg", svg.render());
          })
          .then(() => {
            console.log("Logo complete!");
          })
          .catch((error) => {
            console.log(error);
          });
      }
}

class SVG {
    constructor() {
      this.logoElement = "";
      this.shapeElement = "";
    }
  
    render() {
      return `<svg version="1.1" width="350" height="250" xmlns="http://www.w3.org/2000/svg">${this.shapeElement}${this.logoElement}</svg>`;
    }
  
    setText(message, color) {
      if (message.length > 3) {
        throw new Error("please only 3 characters!");
      }
      this.logoElement = `<text x="125" y="125" font-size="50" text-anchor="middle" fill="${color}">${message}</text>`;
    }
  
    setShape(shape) {
      this.shapeElement = shape.render();
    }
  }
  
  