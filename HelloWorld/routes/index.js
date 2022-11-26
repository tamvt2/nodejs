var express = require('express');
var router = express.Router();
const multer = require('multer');
let alert = require('alert');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const upload = multer({ dest: 'uploads/' });

// router.use(Express.static(__dirname+'/uploads'));

const uri = "mongodb+srv://tamvt:CIg65aKTZxz4zsq4@cluster0.zkfrmhr.mongodb.net/?retryWrites=true&w=majority"
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/404', function(req, res, next) {
  res.render('404', { title: 'Express' });
});

router.get('/blank', function(req, res, next) {
  res.render('blank', { title: 'Express' });
});

router.get('/forgot-password', function(req, res, next) {
  res.render('forgot-password', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/buttons', function(req, res, next) {
  res.render('buttons', { title: 'Express' });
});

router.get('/cards', function(req, res, next) {
  res.render('cards', { title: 'Express' });
});

router.get('/charts', function(req, res, next) {
  res.render('charts', { title: 'Express' });
});

router.get('/tables', function(req, res, next) {
  res.render('tables', { title: 'Express' });
});

router.get('/utilities-animation', function(req, res, next) {
  res.render('utilities-animation', { title: 'Express' });
});

router.get('/utilities-border', function(req, res, next) {
  res.render('utilities-border', { title: 'Express' });
});

router.get('/utilities-color', function(req, res, next) {
  res.render('utilities-color', { title: 'Express' });
});

router.get('/utilities-other', function(req, res, next) {
  res.render('utilities-other', { title: 'Express' });
});

router.get('/categories', function (req, res, next) {
  var name = 'lamnh';
  var number = 100;
  var array =[1,2,3,4,5,6,7,8,9,0];
  var names = ['lamnh','phuongpk','annv'];
  var soThu = 9.8;
  var kyTu = 'A';
  var trueOfalse = true;
  var hoTen = `ten cua aban   la ${name}`;

  var OBJ = {
    name : 'lamnh2',
    sge : 22,
    diaChi: '17tb'
  };
  var arrObject =[
    {
      name : 'lamnh3',
      sge : 23,
      diaChi: '17tb'
    },
    {
      name : 'lamnh4',
      sge : 24,
      diaChi: '17tb'
    },
    {
      name : 'lamnh5',
      sge : 25,
      diaChi: '17tb'
    }
  ]
  res.render('categories',{title :'helooo moi nguoi minh la ',name :name,
    number: number,
    array :array,
    arrObject :arrObject,
    kyTu :kyTu,
    names: names,
    trueOfalse :trueOfalse,
    hoTen: hoTen,
    soThu :soThu})
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits : {fileSize : 1000000},
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/png') {
      return cb(null, false, new Error('goes wrong on the mimetype'));
    }
    cb(null, true);
  }
})

router.post('/upload', upload.single('avatar'), function (req, res, next) {
})

router.post('/login', function (req, res) {
  var username = req.body.Username;
  var password = req.body.Password;
  if (username == 'admin' && password == 123456) {
    alert('Login thành công');
  } else if (username == '' || password == '') {
    alert('Chưa nhập Username hoặc Password');
  } else {
    alert('Usename hoặc Password sai');
  }
});

router.post('/register', upload.single('avatar'), function (req, res) {
  var username = req.body.Username;
  var password = req.body.Password;
  var repeatPassword = req.body.RepeatPassword;
  console.log(req.file)
  if (username != '' && password != '' && repeatPassword == password) {
    alert('Register thành công');
  } else {
    alert('Chưa nhập Username hoặc Password');
  }
});

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connect to MongoDB");
  } catch (e) {
    console.error(e);
  }
}

connect();

const SinhVien = new mongoose.Schema({
  id: String,
  name: String,
  sdt: String
});

router.post('/insert', function (req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const sdt = req.body.sdt;
  const SV = mongoose.model('Student', SinhVien);

  const Sv = new SV({
    id: id,
    name: name,
    sdt: sdt
  })
  Sv.save().then(data => {
    if (data != null) {
      res.render('categories', {title: 'them thanh cong'});
    } else {
      res.render('categories', {title: 'them khong thanh cong'});
    }
  })
});

router.get('/update', function (req, res) {
  const SV = mongoose.model('Student', SinhVien);

  SV.updateOne({_id: '637df8b4f385a86210e2547c', SinhVien}, {
    id: 342343,
    name: 'HUY HUY HUY',
    sdt: '123456789',
  }).then(data => {
    if (data != null) res.send("Update thanh cong~!!!!")
  })

})
router.get('/delete', function (req, res) {
  const SV = mongoose.model('Student', SinhVien);

  SV.deleteOne({_id: '637df7bc6c14fc9b695a6507'}).then(data => {
    if (data != null) res.send("Delete thanh cong~!!!!")
  })
})
router.get('/danhSach', function (req, res) {
  const SV = mongoose.model('Student', SinhVien);

  SV.find({}).then(data => {
    res.send(data)
  })
})

module.exports = router;