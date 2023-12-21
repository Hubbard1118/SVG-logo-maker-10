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
