const ep = require('express').Router();
const profor = require('./processFormat.js');
const wap = require('./webAutoProcess.js');

const deSite = () => (req,res,next)=>{
  res.sendFile('./views/indexDE.html', {root: __dirname })
};
const deSitePost = () => (req,res,next)=>{
      let toDo = profor.shrink(profor.convert2procForm(req.body));
      wap.startAutoProcess(toDo);
    res.sendFile('./views/indexDe.html', {root: __dirname });
}


const enSite = () => (req,res,next)=>{
  res.sendFile('./views/indexEN.html', {root: __dirname })
};
const enSitePost = () => (req,res,next)=>{
  let toDo = profor.shrink(profor.convert2procForm(req.body));
      wap.startAutoProcess(toDo);
    res.sendFile('./views/indexEN.html', {root: __dirname });
};

ep.get('/',deSite());
ep.post('/', deSitePost());
ep.get('/de', deSite());
ep.post('/de', deSitePost());
ep.get('/en', enSite());
ep.post('/en', enSitePost());

ep.get('/src/:type/:filename',(req,res)=>{
  let type = req.params.type;
  let fname = req.params.filename;
  let fpath = './'+type+'/'+fname+'.'+type;
  let options = {root: __dirname}
  switch (type) {
    case 'css':
      break;
    case 'js':
    options=Object.assign(options,{headers:{"Content-Type": "application/json; charset=UTF-8"}});
    type='application/json';
      break;
    default:
  }
  res.type(type).sendFile(fpath, options);
})


ep.route('/example/:example')
.post((req,res,next)=>{
  let todo={};
  switch(req.params.example){
    case 'duckNode':
    todo = { target_url: 'https://www.duckduckgo.com',
              actions:
           [ { actionNr: '1',
               actionSel: 'click',
               cssQuery: '#search_form_input_homepage' },
             { actionNr: '2',
               actionSel: 'type',
               cssQuery: '#search_form_input_homepage',
               furtherInput: 'nodejs' },
             { actionNr: '3',
               actionSel: 'click',
               cssQuery: '#search_button_homepage' } ] }

    break;

    case 'rimh333':
todo = { target_url: 'http://phrase-catalog.com/phrasentext/search',
  actions:
   [ { actionNr: '1',
       actionSel: 'click',
       cssQuery: '#PhrasentextSearchPhrasencode' },
     { actionNr: '2',
       actionSel: 'type',
       cssQuery: '#PhrasentextSearchPhrasencode',
       furtherInput: 'H333' },
     { actionNr: '3',
       actionSel: 'click',
       cssQuery: '#PhrasentextSearchSearchForm div.submit input' } ] }

    break;

    case "rimh501":
     let examp = [
         { actionNr: '1',
           actionSel: 'click',
           cssQuery: '#PhrasentextSearchPhrasencode' },
         { actionNr: '2',
           actionSel: 'type',
           cssQuery: '#PhrasentextSearchPhrasencode',
           furtherInput: 'H001' },
         { actionNr: '3',
           actionSel: 'click',
           cssQuery: '#PhrasentextSearchSearchForm div.submit input' },
           { actionNr: '4',
           actionSel: 'click',
           cssQuery: '#PhrasentextSearchSearchForm div.submit input' },
           { actionNr: '5',
             actionSel: 'type',
             cssQuery: '#PhrasentextSearchPhrasencode',
             furtherInput: '  ' },
        ];

        let multAct = [];
        for (var i = 0; i < 15; i++) {
          examp.map(e=>{
              if(e.hasOwnProperty('furtherInput')){
                e.furtherInput='H'+(1+i<100?(1+i<10?'00':'0'):'')+1+i;
              }
              e.actionNr=e.actionNr+(i*5);
              return e;
            })
            .forEach(e=>multAct.push(e));
        }

       todo = { target_url: 'http://phrase-catalog.com/phrasentext/search',
           actions: multAct
        }
    break;
  }
  wap.startAutoProcess(profor.shrink(todo));
  res.sendFile('./views/indexDE.html', {root: __dirname })
})

module.exports = ep;
