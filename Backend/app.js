const express = require('express');
const cors = require('cors');

const path = require('path');
const formcontroller = require('./controllers/formcontroller');
const {mongoconnect} = require('./utils/pathutils');

const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', 'views');
// app.use(cors())
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
// app.options('*', cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', formcontroller.getform);
app.post('/api/users',formcontroller.postform);
// app.get('/api/users/:id',formcontroller.getuserbyid);
app.patch('/api/users/:id',formcontroller.updateuserbyid);
app.use((req, res) => {
  res.status(404).send('<h1>Page Not Found</h1>');
});
const port=8000;  // backend cha port
mongoconnect(()=>{
app.listen(port, () => {
 console.log(`server running on http://localhost:${port}`);

})});
