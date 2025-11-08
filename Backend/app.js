const express = require('express');


const path = require('path');
const formcontroller = require('./controllers/formcontroller');
const {mongoconnect} = require('./utils/pathutils');

const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', formcontroller.getform);
app.post('/api/users',formcontroller.postform);
app.get('/api/users/:id',formcontroller.getuserbyid);
app.put('/api/users/:id',formcontroller.updateuserbyid);
app.use((req, res) => {
  res.status(404).send('<h1>Page Not Found</h1>');
});
const port=3000;
mongoconnect(()=>{
app.listen(port, () => {
 console.log(`server running on http://localhost:${port}`);

})});