import express from 'express';
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import fileUpload from 'express-fileupload'
const app = express();
const swaggerDocument = YAML.load("./swagger.yaml");
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

let courses = [
    {
      id: "11",
      name: "Learn Reactjs",
      price: 299,
    },
    {
      id: "22",
      name: "Learn Angular",
      price: 399,
    },
    {
      id: "33",
      name: "Learn Django",
      price: 499,
    },
  ];
  
  app.get("/", (req, res) => {
    res.send("hello from stacks");
  });
  
  app.get("/api/v1/stacks", (req, res) => {
    res.send("hello from stacks docs");
  });
  
  app.get("/api/v1/stacksobject", (req, res) => {
    res.send({ id: "55", name: "Learn Backend", price: 999 });
  });

  app.get("/api/v1/courses", (req, res) => {
    res.send(courses);
  });

  app.get("/api/v1/mycourses/:courseId", (req, res) => {
    const myCourseId = courses.find((course)=>
        course.id === req.params.courseId
    )
    res.send(myCourseId);
  });
  app.post("/api/v1/addCourse", (req, res) => {
    console.log(req.body);
    courses.push(req.body);
    res.send(true);
  });

  app.get("/api/v1/coursequery", (req, res) => {
    let location = req.query.location;
    let device = req.query.device;
  
    res.send({ location, device });
  });
  


  app.post("/api/v1/courseupload", (req, res) => {
    console.log(req.headers);
    const file = req.files.file;
    console.log(file);

    // __dirname implies give me the directory path to the project
    let path = __dirname + "/images/" + Date.now() + ".jpg";
    console.log(path);
  
    file.mv(path, (err) => {
      res.send(true);
    });
    // 
  });
  

app.listen(4000, ()=>{
    console.log ('server is running at port 4000');
})